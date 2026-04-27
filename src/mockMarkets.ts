export interface MarketMover {
  game: string;
  market: string;
  move: string;
  note: string;
}

export interface BestOpportunity {
  game: string;
  side: string;
  bestBook: string;
  line: string;
  edge: string;
}

export interface SportCategory {
  name: string;
  games: number;
  booksLive: number;
}

export const marketMovers: MarketMover[] = [
  { game: 'Lakers @ Nuggets', market: 'Spread', move: 'LAL +4.5 → +3.0', note: 'Heavy buy on Lakers' },
  { game: 'Celtics @ Heat', market: 'Total', move: '218.5 → 220.0', note: 'Over steaming across 3 books' },
  { game: 'Chiefs @ Bills', market: 'Moneyline', move: 'BUF +118 → +108', note: 'Sharp support on Bills' },
];

export const bestOpportunities: BestOpportunity[] = [
  { game: 'Lakers @ Nuggets', side: 'Lakers +3.5', bestBook: 'BetMGM', line: '-100', edge: 'Best spread price' },
  { game: 'Celtics @ Heat', side: 'Over 219.5', bestBook: 'FanDuel', line: '-108', edge: 'Market lag' },
  { game: 'Chiefs @ Bills', side: 'Bills ML', bestBook: 'bet365', line: '+112', edge: 'Top moneyline' },
  { game: 'Yankees @ Red Sox', side: 'Under 8.5', bestBook: 'DraftKings', line: '-105', edge: 'Best total' },
];

export const sportCategories: SportCategory[] = [
  { name: 'NBA', games: 9, booksLive: 5 },
  { name: 'NFL', games: 14, booksLive: 5 },
  { name: 'MLB', games: 11, booksLive: 4 },
  { name: 'NHL', games: 6, booksLive: 4 },
  { name: 'Soccer', games: 18, booksLive: 3 },
];
