# Sports Odds MVP

Small front-end MVP for a line-shopping product.

## What it shows
- Best current line by market
- Line movement chart by sportsbook
- Recommended integration order for MVP
- Local API + collector pipeline scaffold

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

## Simulate new line movement
```bash
npm run collector
```

That appends fresh snapshots into `server/data/snapshots.json` so the history graph has a real ingestion path.

## API endpoints
- `GET /api/bootstrap`
- `GET /api/odds/history?eventId=...&marketType=...&side=...`
- `GET /api/odds/best-line?eventId=...&marketType=...&side=...`

## Database starter
- SQL schema: `db/schema.sql`

## Next build steps
- swap mock collector logic for real bookmaker adapters
- move file storage into Postgres/Timescale
- add event matching across books
- add alerting and real-time updates
