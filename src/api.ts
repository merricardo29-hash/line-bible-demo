import { demoEvents, demoSnapshots, demoSportsbooks } from './demoData';
import { getBestLines, getLineHistory } from './demoLib';
import type { BestLineResult, Event, MarketType, OddsSnapshot, OutcomeSide, SportsbookMeta } from './types';

export interface SourceStatus {
  runtime: 'file' | 'postgres';
  adapters: { key: string; supportsLive: boolean; supportsPregame: boolean }[];
  counts: { events: number; snapshots: number; sportsbooks: number };
  usesOddsApi: boolean;
  kalshiSeries: string[];
}

const API_BASE = 'http://localhost:8787';

async function tryJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchBootstrap(): Promise<{ sportsbooks: SportsbookMeta[]; events: Event[] }> {
  const data = await tryJson<{ sportsbooks: SportsbookMeta[]; events: Event[] }>(`${API_BASE}/api/bootstrap`);
  return data ?? { sportsbooks: demoSportsbooks, events: demoEvents };
}

export async function fetchHistory(eventId: string, marketType: MarketType, side: OutcomeSide): Promise<OddsSnapshot[]> {
  const params = new URLSearchParams({ eventId, marketType, side });
  const data = await tryJson<{ history: OddsSnapshot[] }>(`${API_BASE}/api/odds/history?${params.toString()}`);
  return data?.history ?? getLineHistory(demoSnapshots, eventId, marketType, side);
}

export async function fetchBestLines(eventId: string, marketType: MarketType, side: OutcomeSide): Promise<BestLineResult[]> {
  const params = new URLSearchParams({ eventId, marketType, side });
  const data = await tryJson<{ bestLines: BestLineResult[] }>(`${API_BASE}/api/odds/best-line?${params.toString()}`);
  return data?.bestLines ?? getBestLines(demoSnapshots, eventId, marketType, side);
}

export async function fetchSourceStatus(): Promise<SourceStatus | null> {
  return tryJson<SourceStatus>(`${API_BASE}/api/status`);
}
