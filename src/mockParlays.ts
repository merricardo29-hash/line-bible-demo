export interface ParlayLeg {
  label: string;
  book: string;
  odds: string;
  signal: string;
}

export interface ParlayCard {
  title: string;
  style: 'conservative' | 'balanced' | 'aggressive';
  combinedOdds: string;
  confidence: number;
  risk: 'low' | 'medium' | 'high';
  rationale: string;
  legs: ParlayLeg[];
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
  },
];
