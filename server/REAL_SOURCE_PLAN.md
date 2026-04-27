# First Real Source Plan

## Best immediate source
Use **The Odds API** (or similar broad odds feed) first for:
- DraftKings
- FanDuel
- BetMGM
- bet365

Keep **Kalshi** as its own direct adapter immediately.

## Why this is the best next step
It gives us:
- real sportsbook data quickly
- normalized pregame odds
- lower maintenance than day-1 scraping
- a fast path to a working real backend

## What is wired now
- env config supports `ODDS_API_KEY`
- adapter selection auto-switches when key is present
- broad source adapter normalizes moneyline / spread / total
- direct Kalshi adapter pulls public sports market data for configured series tickers

## What still needs work
- split broad-feed data into per-book logical outputs for cleaner ownership
- true live support
- better league/sport mapping
- robust error + quota handling
- richer Kalshi market coverage (props/futures/additional series)

## Recommended next activation steps
1. get API key
2. set `ODDS_API_KEY` in `.env`
3. run pregame ingest loop
4. inspect bootstrap/history/best-line endpoints
5. add Postgres when local DB or hosted DB is ready
