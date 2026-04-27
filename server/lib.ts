import type { BestLineResult, MarketType, OddsSnapshot, OutcomeSide } from '../src/types';

export function getLatestSnapshots(snapshots: OddsSnapshot[], eventId: string, marketType: MarketType) {
  const filtered = snapshots.filter((snapshot) => snapshot.eventId === eventId && snapshot.marketType === marketType);
  const latestByBook = new Map<string, OddsSnapshot>();

  [...filtered]
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .forEach((snapshot) => latestByBook.set(`${snapshot.sportsbook}:${snapshot.side}`, snapshot));

  return [...latestByBook.values()];
}

export function getLineHistory(snapshots: OddsSnapshot[], eventId: string, marketType: MarketType, side: OutcomeSide) {
  return snapshots
    .filter((snapshot) => snapshot.eventId === eventId && snapshot.marketType === marketType && snapshot.side === side)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

export function getBestLines(snapshots: OddsSnapshot[], eventId: string, marketType: MarketType, side: OutcomeSide): BestLineResult[] {
  const latest = getLatestSnapshots(snapshots, eventId, marketType).filter((snapshot) => snapshot.side === side);
  const ranked = [...latest].sort((a, b) => {
    if (marketType === 'moneyline') return b.price - a.price;
    const lineDiff = (b.line ?? 0) - (a.line ?? 0);
    if (lineDiff !== 0) return lineDiff;
    return b.price - a.price;
  });

  return ranked.map((bestSnapshot, index) => ({
    side,
    bestSnapshot,
    rationale: index === 0 ? 'Best number on the board right now.' : 'Good, but not the top line.',
  }));
}
