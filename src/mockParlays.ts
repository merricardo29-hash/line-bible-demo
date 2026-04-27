export interface ParlayLeg {
  label: string;
  book: string;
  odds: string;
  signal: string;
}

export interface ParlayReason {
  label: string;
  detail: string;
}

export interface ExecutionLeg {
  leg: string;
  bestBook: string;
  bestOdds: string;
  note: string;
}

export interface ParlayCard {
  title: string;
  style: 'conservative' | 'balanced' | 'aggressive';
  combinedOdds: string;
  confidence: number;
  risk: 'low' | 'medium' | 'high';
  rationale: string;
  legs: ParlayLeg[];
  reasons: ParlayReason[];
  execution: ExecutionLeg[];
}

export const parlayCards: ParlayCard[] = [
  {
    title: 'Signal Stack Alpha',
    style: 'conservative',
    combinedOdds: '+184',
    confidence: 82,
    risk: 'low',
    rationale: 'Market support, favorable team rates, and stable roster context across both legs.',
    legs: [
      { label: 'Lakers +3.5', book: 'BetMGM', odds: '-100', signal: 'Sharp spread support' },
      { label: 'Heat/Celtics Over 219.5', book: 'FanDuel', odds: '-108', signal: 'Pace + offensive efficiency' },
    ],
    reasons: [
      { label: 'Line movement', detail: 'Lakers spread tightened from +4.5 to +3.0 with market-wide confirmation.' },
      { label: 'Team rates', detail: 'Both offenses support the total through pace and efficiency profiles.' },
      { label: 'Roster stability', detail: 'No late-breaking absence changing expected usage materially.' },
    ],
    execution: [
      { leg: 'Lakers +3.5', bestBook: 'BetMGM', bestOdds: '-100', note: 'Best spread execution on board' },
      { leg: 'Over 219.5', bestBook: 'FanDuel', bestOdds: '-108', note: 'Best total price among tracked books' },
    ],
  },
  {
    title: 'Late Drift Pair',
    style: 'balanced',
    combinedOdds: '+266',
    confidence: 74,
    risk: 'medium',
    rationale: 'Both legs show line movement confirmation with pricing still short of full repricing.',
    legs: [
      { label: 'Bills ML', book: 'bet365', odds: '+112', signal: 'Lagging moneyline' },
      { label: 'Nuggets/Lakers Under 228.5', book: 'DraftKings', odds: '-110', signal: 'Defensive closeout setup' },
    ],
    reasons: [
      { label: 'Book lag', detail: 'bet365 held a better number while consensus compressed.' },
      { label: 'Game script', detail: 'Late-game half-court profile supports under volatility compression.' },
      { label: 'Execution window', detail: 'Current prices still offer edge before likely convergence.' },
    ],
    execution: [
      { leg: 'Bills ML', bestBook: 'bet365', bestOdds: '+112', note: 'Top moneyline still available' },
      { leg: 'Under 228.5', bestBook: 'DraftKings', bestOdds: '-110', note: 'Cleanest under number among books' },
    ],
  },
  {
    title: 'Roster Edge Combo',
    style: 'balanced',
    combinedOdds: '+312',
    confidence: 71,
    risk: 'medium',
    rationale: 'Usage shifts and roster news align with current player/team pricing inefficiencies.',
    legs: [
      { label: 'Star guard Over 6.5 assists', book: 'FanDuel', odds: '-105', signal: 'Usage bump from injuries' },
      { label: 'Celtics ML', book: 'Kalshi', odds: '+120', signal: 'Roster edge + market confirmation' },
    ],
    reasons: [
      { label: 'Player context', detail: 'Ball-handling and touch concentration rise under current roster conditions.' },
      { label: 'Team mismatch', detail: 'Net rating edge supports the side beyond market baseline.' },
      { label: 'Price inefficiency', detail: 'Book pricing has not fully moved with underlying usage change.' },
    ],
    execution: [
      { leg: 'Assists Over 6.5', bestBook: 'FanDuel', bestOdds: '-105', note: 'Best prop price in current board' },
      { leg: 'Celtics ML', bestBook: 'Kalshi', bestOdds: '+120', note: 'Best return for this side' },
    ],
  },
  {
    title: 'Volatility Capture',
    style: 'aggressive',
    combinedOdds: '+458',
    confidence: 63,
    risk: 'high',
    rationale: 'A higher-upside build using two market signals plus one stats-driven leg.',
    legs: [
      { label: 'Lakers +3.5', book: 'BetMGM', odds: '-100', signal: 'Best spread execution' },
      { label: 'Bills ML', book: 'bet365', odds: '+112', signal: 'Momentum pricing' },
      { label: 'Player rebounds Over 9.5', book: 'DraftKings', odds: '+115', signal: 'Rate matchup edge' },
    ],
    reasons: [
      { label: 'Volatility setup', detail: 'This build leans into books still misaligned on multi-market movement.' },
      { label: 'Correlation discipline', detail: 'Legs are selected for thesis alignment without obvious over-correlation.' },
      { label: 'Upside tradeoff', detail: 'Higher payout comes with wider variance and lower model confidence.' },
    ],
    execution: [
      { leg: 'Lakers +3.5', bestBook: 'BetMGM', bestOdds: '-100', note: 'Best execution among spread books' },
      { leg: 'Bills ML', bestBook: 'bet365', bestOdds: '+112', note: 'Best plus-money entry' },
      { leg: 'Rebounds Over 9.5', bestBook: 'DraftKings', bestOdds: '+115', note: 'Top prop payout currently' },
    ],
  },
];
