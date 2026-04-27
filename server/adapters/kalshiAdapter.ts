import type { CanonicalEvent, MarketSnapshot, NormalizedOddsPayload, SportsbookAdapter } from '../domain';

const BASE_URL = 'https://api.elections.kalshi.com/trade-api/v2';

interface KalshiMarketRow {
  ticker: string;
  event_ticker: string;
  title: string;
  yes_sub_title?: string;
  no_sub_title?: string;
  yes_bid_dollars?: string;
  no_bid_dollars?: string;
}

interface KalshiEventRow {
  event_ticker: string;
  title: string;
  sub_title?: string;
  category?: string;
  product_metadata?: {
    competition?: string;
    competition_scope?: string;
  };
}

export function createKalshiAdapter(seriesTickers = ['KXNBAGAME', 'KXNBATOTAL']): SportsbookAdapter {
  return {
    key: 'kalshi',
    supportsLive: false,
    supportsPregame: true,
    async fetchOdds() {
      const pulledAt = new Date().toISOString();
      const marketRows = (await Promise.all(seriesTickers.map(fetchSeriesMarkets))).flat();
      const uniqueEventTickers = [...new Set(marketRows.map((row) => row.event_ticker))];
      const eventRows = await Promise.all(uniqueEventTickers.map(fetchEvent));
      const eventMap = new Map(eventRows.map((event) => [event.event_ticker, event]));

      const events = uniqueEventTickers
        .map((ticker) => normalizeEvent(ticker, eventMap.get(ticker)))
        .filter(Boolean) as CanonicalEvent[];

      const snapshots = marketRows.flatMap((row) => normalizeMarket(row, pulledAt));

      return {
        sportsbook: 'kalshi',
        pulledAt,
        events,
        snapshots,
      } satisfies NormalizedOddsPayload;
    },
  };
}

async function fetchSeriesMarkets(seriesTicker: string): Promise<KalshiMarketRow[]> {
  const url = `${BASE_URL}/markets?series_ticker=${encodeURIComponent(seriesTicker)}&status=open&limit=200`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Kalshi markets request failed for ${seriesTicker}: ${response.status}`);
  const data = (await response.json()) as { markets?: KalshiMarketRow[] };
  return data.markets ?? [];
}

async function fetchEvent(eventTicker: string): Promise<KalshiEventRow> {
  const response = await fetch(`${BASE_URL}/events/${encodeURIComponent(eventTicker)}`);
  if (!response.ok) throw new Error(`Kalshi event request failed for ${eventTicker}: ${response.status}`);
  const data = (await response.json()) as { event: KalshiEventRow };
  return data.event;
}

function normalizeEvent(eventTicker: string, event?: KalshiEventRow): CanonicalEvent | null {
  if (!event) return null;

  const subtitle = event.sub_title ?? '';
  const matchup = subtitle.match(/(.+?) at (.+?) \(/);
  const awayTeam = matchup?.[1]?.trim() ?? event.title;
  const homeTeam = matchup?.[2]?.trim() ?? event.title;

  return {
    id: eventTicker,
    sport: 'Sports',
    league: event.product_metadata?.competition ?? event.category ?? 'Kalshi Sports',
    awayTeam,
    homeTeam,
    startTime: new Date().toISOString(),
    status: 'scheduled',
  };
}

function normalizeMarket(row: KalshiMarketRow, pulledAt: string): MarketSnapshot[] {
  if (row.event_ticker.startsWith('KXNBAGAME') || row.title.includes('Winner?')) {
    return [
      {
        id: `${row.ticker}:yes:${pulledAt}`,
        canonicalEventId: row.event_ticker,
        sportsbook: 'kalshi',
        marketType: 'moneyline',
        side: inferWinnerSide(row),
        line: null,
        price: dollarsToAmerican(row.yes_bid_dollars),
        timestamp: pulledAt,
        isLive: false,
        source: 'api',
      },
    ];
  }

  if (row.event_ticker.startsWith('KXNBATOTAL') || row.title.includes('Total Points Over')) {
    const line = parseTotalLine(row.title);
    return [
      {
        id: `${row.ticker}:over:${pulledAt}`,
        canonicalEventId: row.event_ticker,
        sportsbook: 'kalshi',
        marketType: 'total',
        side: 'over',
        line,
        price: dollarsToAmerican(row.yes_bid_dollars),
        timestamp: pulledAt,
        isLive: false,
        source: 'api',
      },
      {
        id: `${row.ticker}:under:${pulledAt}`,
        canonicalEventId: row.event_ticker,
        sportsbook: 'kalshi',
        marketType: 'total',
        side: 'under',
        line,
        price: dollarsToAmerican(row.no_bid_dollars),
        timestamp: pulledAt,
        isLive: false,
        source: 'api',
      },
    ];
  }

  return [];
}

function inferWinnerSide(row: KalshiMarketRow): 'home' | 'away' {
  const titleMatch = row.title.match(/: (.+?) at (.+?) Winner\?/);
  const away = titleMatch?.[1]?.trim();
  const home = titleMatch?.[2]?.trim();
  const yesSide = row.yes_sub_title?.trim();
  if (yesSide && home && yesSide === home) return 'home';
  if (yesSide && away && yesSide === away) return 'away';
  return 'home';
}

function parseTotalLine(title: string): number {
  const match = title.match(/Over ([0-9]+(?:\.[0-9]+)?) points scored/);
  return match ? Number(match[1]) : 0;
}

function dollarsToAmerican(value?: string): number {
  const price = Number(value ?? '0');
  if (!price || price <= 0 || price >= 1) return 0;
  return price >= 0.5 ? Math.round(-(price / (1 - price)) * 100) : Math.round(((1 - price) / price) * 100);
}
