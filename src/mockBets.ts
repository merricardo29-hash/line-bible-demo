export interface UserBet {
  id: string;
  status: 'active' | 'settled';
  book: string;
  event: string;
  market: string;
  pick: string;
  stake: number;
  odds: number;
  lineGot: string;
  currentLine: string;
  clv: string;
  placedAt: string;
  result?: 'win' | 'loss' | 'push';
  pnl?: number;
}

export const activeBets: UserBet[] = [
  {
    id: 'bet-1',
    status: 'active',
    book: 'DraftKings',
    event: 'Lakers @ Nuggets',
    market: 'Spread',
    pick: 'Lakers +4.5',
    stake: 100,
    odds: -110,
    lineGot: '+4.5',
    currentLine: '+3.0',
    clv: '+1.5',
    placedAt: '7:14 PM',
  },
  {
    id: 'bet-2',
    status: 'active',
    book: 'bet365',
    event: 'Celtics @ Heat',
    market: 'Total',
    pick: 'Over 218.5',
    stake: 75,
    odds: -108,
    lineGot: '218.5',
    currentLine: '220.0',
    clv: '+1.5',
    placedAt: '6:48 PM',
  },
  {
    id: 'bet-3',
    status: 'active',
    book: 'Kalshi',
    event: 'Lakers @ Nuggets',
    market: 'Moneyline',
    pick: 'Lakers ML',
    stake: 50,
    odds: 140,
    lineGot: '+140',
    currentLine: '+128',
    clv: '+12',
    placedAt: '5:59 PM',
  },
];

export const settledBets: UserBet[] = [
  {
    id: 'bet-4',
    status: 'settled',
    book: 'FanDuel',
    event: 'Knicks @ Bucks',
    market: 'Spread',
    pick: 'Knicks +5.5',
    stake: 100,
    odds: -110,
    lineGot: '+5.5',
    currentLine: '+4.0',
    clv: '+1.5',
    placedAt: 'Yesterday',
    result: 'win',
    pnl: 90.91,
  },
  {
    id: 'bet-5',
    status: 'settled',
    book: 'BetMGM',
    event: 'Suns @ Kings',
    market: 'Moneyline',
    pick: 'Kings ML',
    stake: 120,
    odds: 135,
    lineGot: '+135',
    currentLine: '+142',
    clv: '-7',
    placedAt: 'Yesterday',
    result: 'loss',
    pnl: -120,
  },
];
