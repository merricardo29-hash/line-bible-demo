import cors from 'cors';
import express from 'express';
import type { MarketType, OutcomeSide } from '../src/types';
import { getBootstrapData, getSourceStatus, ingestAllBooks, queryBestLines, queryHistory } from './service';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/bootstrap', async (_req, res) => {
  const data = await getBootstrapData();
  res.json(data);
});

app.get('/api/status', async (_req, res) => {
  const status = await getSourceStatus();
  res.json(status);
});

app.post('/api/ingest', async (req, res) => {
  const live = Boolean(req.body?.live);
  const result = await ingestAllBooks({ live });
  res.json({ ok: true, live, summary: result.summary });
});

app.get('/api/odds/history', async (req, res) => {
  const { eventId, marketType, side } = req.query;
  if (!eventId || !marketType || !side) return res.status(400).json({ error: 'eventId, marketType, and side are required' });

  const history = await queryHistory(String(eventId), String(marketType) as MarketType, String(side) as OutcomeSide);
  res.json({ history });
});

app.get('/api/odds/best-line', async (req, res) => {
  const { eventId, marketType, side } = req.query;
  if (!eventId || !marketType || !side) return res.status(400).json({ error: 'eventId, marketType, and side are required' });

  const bestLines = await queryBestLines(String(eventId), String(marketType) as MarketType, String(side) as OutcomeSide);
  res.json({ bestLines });
});

const port = 8787;
app.listen(port, () => {
  console.log(`sports-odds api listening on http://localhost:${port}`);
});
