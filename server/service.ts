import { adapters } from './adapters';
import { config } from './config';
import { detectSnapshotChanges } from './changeDetector';
import type { MarketType, OutcomeSide } from '../src/types';
import { createRepository } from './repository';

const repository = createRepository();
const sportsbookCatalog = [
  { key: 'draftkings', label: 'DraftKings', kind: 'sportsbook', difficulty: 'easy', status: 'mvp-ready' },
  { key: 'fanduel', label: 'FanDuel', kind: 'sportsbook', difficulty: 'easy', status: 'mvp-ready' },
  { key: 'betmgm', label: 'BetMGM', kind: 'sportsbook', difficulty: 'easy', status: 'mvp-ready' },
  { key: 'bet365', label: 'bet365', kind: 'sportsbook', difficulty: 'medium', status: 'mvp-ready' },
  { key: 'kalshi', label: 'Kalshi', kind: 'prediction-market', difficulty: 'easy', status: 'mvp-ready' },
] as const;

export async function ingestAllBooks(input: { live?: boolean; league?: string } = {}) {
  const existing = await repository.getSnapshots();
  const payloads = await Promise.all(adapters.map((adapter) => adapter.fetchOdds(input)));

  const summary = [] as { sportsbook: string; changed: number; scanned: number }[];

  for (const payload of payloads) {
    const changes = detectSnapshotChanges(existing, payload.snapshots);
    const changedSnapshots = changes.filter((item) => item.changed).map((item) => item.current);
    await repository.upsertPayload({ ...payload, snapshots: changedSnapshots });
    summary.push({ sportsbook: payload.sportsbook, changed: changedSnapshots.length, scanned: payload.snapshots.length });
  }

  return { payloads, summary };
}

export async function getBootstrapData() {
  const events = await repository.getEvents();
  const snapshots = await repository.getSnapshots();
  const seen = new Set(snapshots.map((snapshot) => snapshot.sportsbook));
  const sportsbooks = sportsbookCatalog.filter((book) => seen.size === 0 || seen.has(book.key));
  return {
    events,
    sportsbooks,
  };
}

export async function getSourceStatus() {
  const snapshots = await repository.getSnapshots();
  const events = await repository.getEvents();
  return {
    runtime: config.runtime,
    adapters: adapters.map((adapter) => ({
      key: adapter.key,
      supportsLive: adapter.supportsLive,
      supportsPregame: adapter.supportsPregame,
    })),
    counts: {
      events: events.length,
      snapshots: snapshots.length,
      sportsbooks: new Set(snapshots.map((snapshot) => snapshot.sportsbook)).size,
    },
    usesOddsApi: Boolean(config.oddsApiKey),
    kalshiSeries: config.kalshiSeriesTickers,
  };
}

export async function queryHistory(eventId: string, marketType: MarketType, side: OutcomeSide) {
  const snapshots = await repository.getSnapshots();
  return snapshots
    .filter((snapshot) => snapshot.canonicalEventId === eventId && snapshot.marketType === marketType && snapshot.side === side)
    .sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp));
}

export async function queryBestLines(eventId: string, marketType: MarketType, side: OutcomeSide) {
  const snapshots = await repository.getSnapshots();
  const latestByBook = new Map<string, (typeof snapshots)[number]>();

  snapshots
    .filter((snapshot) => snapshot.canonicalEventId === eventId && snapshot.marketType === marketType && snapshot.side === side)
    .sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp))
    .forEach((snapshot) => latestByBook.set(snapshot.sportsbook, snapshot));

  const ranked = [...latestByBook.values()].sort((a, b) => {
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

