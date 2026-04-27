export type SportbookKey =
  | 'draftkings'
  | 'fanduel'
  | 'betmgm'
  | 'bet365'
  | 'kalshi';

export type MarketType = 'spread' | 'total' | 'moneyline';

export type OutcomeSide = 'home' | 'away' | 'over' | 'under';

export interface Event {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
}

export interface OddsSnapshot {
  id: string;
  eventId: string;
  sportsbook: SportbookKey;
  marketType: MarketType;
  side: OutcomeSide;
  line: number | null;
  price: number;
  timestamp: string;
}

export interface SportsbookMeta {
  key: SportbookKey;
  label: string;
  kind: 'sportsbook' | 'prediction-market';
  difficulty: 'easy' | 'medium';
  status: 'mvp-ready' | 'next';
}

export interface BestLineResult {
  side: OutcomeSide;
  bestSnapshot: OddsSnapshot;
  rationale: string;
}
