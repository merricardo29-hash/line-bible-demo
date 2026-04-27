# Line Bible MVP

Luxury sports betting terminal MVP.

## MVP status
Current MVP includes:
- luxury landing page + terminal UI
- Markets / Game Detail / Portfolio / Performance / Alerts / Screeners / Parlay Lab pages
- local API
- direct Kalshi sports adapter
- Postgres-ready backend foundation
- real-source seam for mainstream books via broad odds feed

## What it shows
- best current line by market
- line movement chart by sportsbook
- chart-first game detail terminal
- portfolio + performance pages
- alerts architecture
- premium-locked props/parlay detail

## MVP strategy
Start with:
1. DraftKings
2. FanDuel
3. BetMGM
4. bet365
5. Kalshi

Why:
- enough coverage to feel real to bettors
- still small enough to build cleanly
- lets you focus on the real moat: event + market normalization

## Run
```bash
npm install
npm run dev
```

This starts:
- Vite front end
- local API on `http://localhost:8787`

## Real source activation
### Kalshi direct
Works out of the box in the backend.

### Broad odds feed for DraftKings / FanDuel / BetMGM / bet365
Add to `.env`:
```bash
ODDS_API_KEY=your_key_here
ODDS_SPORT_KEY=basketball_nba
```

Then call ingest or run the loop:
```bash
npm run ingest:pregame
# or
npm run ingest:live
```

## Simulate new line movement
```bash
npm run collector
```

That appends fresh snapshots into `server/data/snapshots.json` so the history graph has a real ingestion path.

## API endpoints
- `GET /api/bootstrap`
- `GET /api/status`
- `POST /api/ingest`
- `GET /api/odds/history?eventId=...&marketType=...&side=...`
- `GET /api/odds/best-line?eventId=...&marketType=...&side=...`

## Database starter
- SQL schema: `db/schema.sql`

## Remaining next steps after MVP
- activate a broad odds feed key
- switch runtime to Postgres
- add event matching refinement across books
- add websocket/live updates
- expand Kalshi market coverage
