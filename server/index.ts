import cors from 'cors';
import express from 'express';
import { getBestLines, getLineHistory } from './lib';
import { loadStore } from './store';
import type { MarketType, OutcomeSide } from '../src/types';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/bootstrap', (_req, res) => {
  const store = loadStore();
  res.json({ sportsbooks: store.sportsbooks, events: store.events });
});

app.get('/api/odds/history', (req, res) => {
  const { eventId, marketType, side } = req.query;
  if (!eventId || !marketType || !side) return res.status(400).json({ error: 'eventId, marketType, and side are required' });

  const store = loadStore();
  const history = getLineHistory(store.snapshots, String(eventId), String(marketType) as MarketType, String(side) as OutcomeSide);
  res.json({ history });
});

app.get('/api/odds/best-line', (req, res) => {
  const { eventId, marketType, side } = req.query;
  if (!eventId || !marketType || !side) return res.status(400).json({ error: 'eventId, marketType, and side are required' });

  const store = loadStore();
  const bestLines = getBestLines(store.snapshots, String(eventId), String(marketType) as MarketType, String(side) as OutcomeSide);
  res.json({ bestLines });
});

const port = 8787;
app.listen(port, () => {
  console.log(`sports-odds api listening on http://localhost:${port}`);
});
