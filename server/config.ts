export const config = {
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/line_bible',
  runtime: (process.env.ODDS_RUNTIME ?? 'file') as 'file' | 'postgres',
  pregamePollMs: Number(process.env.ODDS_PREGAME_POLL_MS ?? 15_000),
  livePollMs: Number(process.env.ODDS_LIVE_POLL_MS ?? 3_000),
  defaultLeague: process.env.ODDS_DEFAULT_LEAGUE ?? 'NBA',
  oddsApiKey: process.env.ODDS_API_KEY ?? '',
  oddsSportKey: process.env.ODDS_SPORT_KEY ?? 'basketball_nba',
  kalshiSeriesTickers: (process.env.KALSHI_SERIES_TICKERS ?? 'KXNBAGAME,KXNBATOTAL').split(',').map((item) => item.trim()).filter(Boolean),
};
