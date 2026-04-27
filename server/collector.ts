import { loadStore, saveStore } from './store';

function nudge(value: number, delta: number) {
  return Math.round((value + delta) * 10) / 10;
}

function nextPrice(price: number, swing: number) {
  return Math.round(price + swing);
}

const store = loadStore();
const now = new Date().toISOString();

const nextSnapshots = store.snapshots
  .filter((snapshot) => {
    const latestTs = Math.max(
      ...store.snapshots
        .filter((s) => s.eventId === snapshot.eventId && s.sportsbook === snapshot.sportsbook && s.marketType === snapshot.marketType && s.side === snapshot.side)
        .map((s) => new Date(s.timestamp).getTime()),
    );

    return new Date(snapshot.timestamp).getTime() === latestTs;
  })
  .map((snapshot, index) => ({
    ...snapshot,
    id: `${Date.now()}-${index}`,
    timestamp: now,
    line:
      snapshot.marketType === 'moneyline'
        ? null
        : nudge(snapshot.line ?? 0, index % 2 === 0 ? -0.5 : 0.5),
    price: nextPrice(snapshot.price, index % 2 === 0 ? -4 : 5),
  }));

store.snapshots.push(...nextSnapshots);
saveStore(store);

console.log(`collector wrote ${nextSnapshots.length} snapshots at ${now}`);
