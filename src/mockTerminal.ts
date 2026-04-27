export const terminalSignals = [
  { label: 'Market status', value: 'LIVE', tone: 'green' },
  { label: 'Alert queue', value: '12', tone: 'gold' },
  { label: 'Watchlist', value: '8', tone: 'blue' },
  { label: 'Execution edge', value: '+1.4%', tone: 'green' },
];

export const watchlistRows = [
  { game: 'Lakers @ Nuggets', market: 'Spread', value: 'LAL +3.5', delta: '+1.5 CLV' },
  { game: 'Celtics @ Heat', market: 'Total', value: 'O 219.5', delta: 'Steam' },
  { game: 'Chiefs @ Bills', market: 'ML', value: 'BUF +112', delta: 'Lagging line' },
  { game: 'Yankees @ Red Sox', market: 'Total', value: 'U 8.5', delta: 'Best price' },
];

export const screenerRows = [
  { label: 'Stale lines', count: 6, note: 'Books lagging market consensus' },
  { label: 'Arb / middle spots', count: 3, note: 'Spread gaps worth review' },
  { label: 'Steam moves', count: 9, note: 'Rapid movement in past 30m' },
  { label: 'Best underdog prices', count: 7, note: 'Top plus-money opportunities' },
];
