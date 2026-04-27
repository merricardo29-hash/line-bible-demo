# Sports Line Bible — Product Plan

## Positioning
A line-shopping and line-movement product for serious bettors.

Core promise:
- find the best number fast
- see how the market moved
- know when a valuable line appears

## MVP Books
1. DraftKings
2. FanDuel
3. BetMGM
4. bet365
5. Kalshi

## MVP Sports
- NBA
- NFL

## MVP Markets
- Spread
- Moneyline
- Total

## Free Tier
- current best line across 5 books
- basic line movement chart
- game-level line shopping
- opening vs current line
- limited history window

## Paid Tier
- full line history
- instant line move alerts
- watchlists
- closing line tracking
- CLV tools
- advanced filters
- props and niche markets
- steam move / major move detection
- book-by-book comparison dashboards

## Best Premium Hook
Alerts.

The strongest paid feature is not just data display.
It is:
- tell me when a target line appears
- tell me when a line moves hard
- tell me when one book lags the market

## Suggested Pricing
### Free
- $0
- limited history
- basic charts
- 5 books

### Pro
- $19-$39/mo
- full history
- alerts
- watchlists
- advanced movement tools

### Pro+
- $79-$149/mo
- props
- advanced screeners
- API access later
- heavier alert limits

## Product Moat
Not the UI alone.
The moat is:
1. reliable multi-book ingestion
2. accurate event/market matching
3. deep historical archive
4. fast alerting

## Build Order
### Phase 1
- 5-book UI
- normalized schema
- API endpoints
- history chart
- best-line board

### Phase 2
- real integrations
- persistent DB
- user accounts
- saved watchlists
- alert engine

### Phase 3
- billing
- premium gating
- props
- mobile notifications
- sharp analytics

## Immediate Next Steps
1. make the UI explicitly 5-book
2. add premium section to app
3. add adapter placeholders for the 5 books
4. move storage from file to Postgres
5. integrate first real source
