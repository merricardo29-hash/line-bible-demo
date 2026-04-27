import { useState } from 'react';
import { formatLine, formatPrice, marketLabels } from './data';
import { activeBets, settledBets } from './mockBets';
import { executionLadder, premiumPropsPreview, signalLog } from './mockGameDetail';
import { bestOpportunities, marketMovers, sportCategories } from './mockMarkets';
import { performanceHistory, performanceWindows } from './mockPerformance';
import { parlayCards } from './mockParlays';
import { screenerRows, terminalSignals, watchlistRows } from './mockTerminal';
import type { BestLineResult, Event, MarketType, OddsSnapshot, OutcomeSide } from './types';

export function MarketsPage({
  event,
  events,
  selectedEventId,
  setSelectedEventId,
  selectedMarket,
  setSelectedMarket,
  selectedSide,
  setSelectedSide,
  availableSides,
  history,
  bestLines,
}: {
  event: Event;
  events: Event[];
  selectedEventId: string;
  setSelectedEventId: (value: string) => void;
  selectedMarket: MarketType;
  setSelectedMarket: (value: MarketType) => void;
  selectedSide: OutcomeSide;
  setSelectedSide: (value: OutcomeSide) => void;
  availableSides: OutcomeSide[];
  history: OddsSnapshot[];
  bestLines: BestLineResult[];
}) {
  return (
    <>
      <section className="signal-strip">
        {terminalSignals.map((item) => (
          <div key={item.label} className={`signal-box tone-${item.tone}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className="stats-grid">
        <StatCard label="Games live" value="32" detail="Across tracked leagues" tone="gold" />
        <StatCard label="Books tracked" value="5" detail="DK · FD · MGM · 365 · Kalshi" tone="blue" />
        <StatCard label="Big movers" value="14" detail="Notable moves today" tone="green" />
        <StatCard label="Premium hook" value="Alerts" detail="Target number + steam moves" tone="purple" />
      </section>

      <section className="tv-grid-top">
        <section className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">featured board</p>
              <h2>Best line opportunities</h2>
            </div>
          </div>
          <div className="opportunity-table">
            {bestOpportunities.map((item) => (
              <div className="table-row" key={`${item.game}-${item.side}`}>
                <div>
                  <strong>{item.game}</strong>
                  <p>{item.side}</p>
                </div>
                <div className="table-meta">
                  <span>{item.bestBook}</span>
                  <span>{item.line}</span>
                  <span className="positive">{item.edge}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">market movers</p>
              <h2>Biggest line moves</h2>
            </div>
          </div>
          <div className="opportunity-table">
            {marketMovers.map((item) => (
              <div className="table-row" key={`${item.game}-${item.market}`}>
                <div>
                  <strong>{item.game}</strong>
                  <p>{item.market}</p>
                </div>
                <div className="table-meta">
                  <span>{item.move}</span>
                  <span>{item.note}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="market-terminal-grid">
        <div className="terminal-main">
          <section className="panel terminal-header">
            <div>
              <p className="eyebrow">market terminal</p>
              <h2>{event.awayTeam} @ {event.homeTeam}</h2>
              <p className="subtle">Binance-style execution screen for line movement, best price, and signal alignment.</p>
            </div>
            <div className="hero-books">DraftKings · FanDuel · BetMGM · bet365 · Kalshi</div>
          </section>

          <section className="panel page-toolbar">
            <label className="toolbar-field toolbar-wide">
              <span>Game</span>
              <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
                {events.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.awayTeam} @ {item.homeTeam}
                  </option>
                ))}
              </select>
            </label>

            <label className="toolbar-field">
              <span>Market</span>
              <select value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value as MarketType)}>
                {(['spread', 'moneyline', 'total'] as MarketType[]).map((market) => (
                  <option key={market} value={market}>
                    {marketLabels[market]}
                  </option>
                ))}
              </select>
            </label>

            <label className="toolbar-field">
              <span>Side</span>
              <select value={selectedSide} onChange={(e) => setSelectedSide(e.target.value as OutcomeSide)}>
                {availableSides.map((side) => (
                  <option key={side} value={side}>
                    {side}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="panel chart-panel chart-dominant">
            <div className="panel-head">
              <div>
                <p className="eyebrow">line chart</p>
                <h2>{marketLabels[selectedMarket]} movement</h2>
              </div>
              <div className="chart-meta">{selectedSide} · live execution view</div>
            </div>
            <LineChart snapshots={history} usePriceAxis={selectedMarket === 'moneyline'} />
          </section>

          <section className="terminal-bottom-grid">
            <section className="panel board-panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">line ladder</p>
                  <h2>Best book execution</h2>
                </div>
              </div>
              <div className="best-line-list">
                {bestLines.map(({ bestSnapshot, rationale }, index) => (
                  <div className={`line-card ${index === 0 ? 'winner' : ''}`} key={bestSnapshot.id}>
                    <div>
                      <strong>{bestSnapshot.sportsbook}</strong>
                      <p>{rationale}</p>
                    </div>
                    <div className="line-values">
                      <span>{formatLine(bestSnapshot.line)}</span>
                      <span>{formatPrice(bestSnapshot.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel category-panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">sports</p>
                  <h2>Market categories</h2>
                </div>
              </div>
              <div className="category-grid compact-categories">
                {sportCategories.map((item) => (
                  <div className="category-card" key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.games} games</span>
                    <small>{item.booksLive} books live</small>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>

        <div className="terminal-rail">
          <section className="panel rail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">watchlist</p>
                <h2>Radar</h2>
              </div>
            </div>
            <div className="opportunity-table dense-table">
              {watchlistRows.map((item) => (
                <div className="table-row" key={`${item.game}-${item.market}`}>
                  <div>
                    <strong>{item.game}</strong>
                    <p>{item.market}</p>
                  </div>
                  <div className="table-meta">
                    <span>{item.value}</span>
                    <span className="positive">{item.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel rail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">operator tools</p>
                <h2>Screeners</h2>
              </div>
            </div>
            <div className="opportunity-table dense-table">
              {screenerRows.map((item) => (
                <div className="table-row" key={item.label}>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.note}</p>
                  </div>
                  <div className="table-meta">
                    <span>{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel rail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">market movers</p>
                <h2>Fast tape</h2>
              </div>
            </div>
            <div className="opportunity-table dense-table">
              {marketMovers.map((item) => (
                <div className="table-row" key={`${item.game}-${item.market}`}>
                  <div>
                    <strong>{item.game}</strong>
                    <p>{item.market}</p>
                  </div>
                  <div className="table-meta">
                    <span>{item.move}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export function GameDetailPage({
  event,
  selectedMarket,
  selectedSide,
  history,
  bestLines,
}: {
  event: Event;
  selectedMarket: MarketType;
  selectedSide: OutcomeSide;
  history: OddsSnapshot[];
  bestLines: BestLineResult[];
}) {
  return (
    <>
      <section className="signal-strip">
        {terminalSignals.map((item) => (
          <div key={item.label} className={`signal-box tone-${item.tone}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className="game-detail-grid">
        <div className="terminal-main">
          <section className="panel terminal-header">
            <div>
              <p className="eyebrow">game detail terminal</p>
              <h2>{event.awayTeam} @ {event.homeTeam}</h2>
              <p className="subtle">Chart-first execution page with line history, signals, best-book routing, and premium props preview.</p>
            </div>
            <div className="hero-books">{marketLabels[selectedMarket]} · {selectedSide}</div>
          </section>

          <section className="panel chart-panel chart-dominant">
            <div className="panel-head">
              <div>
                <p className="eyebrow">line movement</p>
                <h2>{marketLabels[selectedMarket]} history</h2>
              </div>
              <div className="chart-meta">Execution view</div>
            </div>
            <LineChart snapshots={history} usePriceAxis={selectedMarket === 'moneyline'} />
          </section>

          <section className="terminal-bottom-grid">
            <section className="panel board-panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">execution ladder</p>
                  <h2>Best book routing</h2>
                </div>
              </div>
              <div className="opportunity-table dense-table">
                {executionLadder.map((item) => (
                  <div className={`table-row ${item.status === 'best' ? 'winner' : ''}`} key={item.book}>
                    <div>
                      <strong>{item.book}</strong>
                      <p>{item.status === 'best' ? 'Best current execution' : 'Tracked market price'}</p>
                    </div>
                    <div className="table-meta">
                      <span>{item.line}</span>
                      <span className={item.status === 'best' ? 'positive' : ''}>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel board-panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">best line board</p>
                  <h2>Current board snapshot</h2>
                </div>
              </div>
              <div className="best-line-list">
                {bestLines.map(({ bestSnapshot, rationale }, index) => (
                  <div className={`line-card ${index === 0 ? 'winner' : ''}`} key={bestSnapshot.id}>
                    <div>
                      <strong>{bestSnapshot.sportsbook}</strong>
                      <p>{rationale}</p>
                    </div>
                    <div className="line-values">
                      <span>{formatLine(bestSnapshot.line)}</span>
                      <span>{formatPrice(bestSnapshot.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>

        <div className="terminal-rail">
          <section className="panel rail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">signal log</p>
                <h2>Tape</h2>
              </div>
            </div>
            <div className="opportunity-table dense-table">
              {signalLog.map((item) => (
                <div className="table-row" key={`${item.time}-${item.label}`}>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.detail}</p>
                  </div>
                  <div className="table-meta">
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel rail-panel premium-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">premium</p>
                <h2>Player Props 🔒</h2>
              </div>
            </div>
            <div className="opportunity-table dense-table">
              {premiumPropsPreview.map((item) => (
                <div className="table-row" key={`${item.player}-${item.prop}`}>
                  <div>
                    <strong>{item.player}</strong>
                    <p>{item.prop}</p>
                  </div>
                  <div className="table-meta">
                    <span className="positive">{item.move}</span>
                    <span>Locked</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export function PortfolioPage() {
  return (
    <>
      <section className="stats-grid">
        <StatCard label="Active bets" value={String(activeBets.length)} detail="$225 staked" tone="gold" />
        <StatCard label="Open exposure" value="$1,420" detail="Across 5 books" tone="blue" />
        <StatCard label="Best CLV" value="+1.5" detail="Current top ticket" tone="green" />
        <StatCard label="Pending payout" value="$468" detail="Open positions" tone="purple" />
      </section>

      <section className="main-grid">
        <div className="left-rail">
          <section className="panel performance-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">portfolio</p>
                <h2>Active positions</h2>
              </div>
            </div>
            <div className="bet-table">
              {activeBets.map((bet) => (
                <div className="bet-row" key={bet.id}>
                  <div>
                    <strong>{bet.pick}</strong>
                    <p>{bet.book} · {bet.event}</p>
                  </div>
                  <div className="bet-metrics">
                    <span>Got {bet.lineGot}</span>
                    <span>Now {bet.currentLine}</span>
                    <span className="positive">CLV {bet.clv}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="right-rail">
          <section className="panel history-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">allocation</p>
                <h2>Exposure radar</h2>
              </div>
            </div>
            <div className="opportunity-table">
              <div className="table-row"><div><strong>NBA</strong><p>2 open bets</p></div><div className="table-meta"><span>$150</span></div></div>
              <div className="table-row"><div><strong>Totals</strong><p>1 open bet</p></div><div className="table-meta"><span>$75</span></div></div>
              <div className="table-row"><div><strong>Moneyline</strong><p>1 open bet</p></div><div className="table-meta"><span>$50</span></div></div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export function PerformancePage() {
  return (
    <>
      <section className="performance-grid">
        {performanceWindows.map((window) => (
          <PerformanceCard key={window.label} {...window} />
        ))}
      </section>

      <section className="main-grid">
        <div className="left-rail">
          <section className="panel performance-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">performance</p>
                <h2>Bankroll + P&L curve</h2>
              </div>
              <div className="chart-meta positive">+$342 week</div>
            </div>
            <PerformanceChart />
          </section>
        </div>

        <div className="right-rail">
          <section className="panel history-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">history</p>
                <h2>Settled bets</h2>
              </div>
            </div>
            <div className="settled-list">
              {settledBets.map((bet) => (
                <div className="settled-row" key={bet.id}>
                  <div>
                    <strong>{bet.pick}</strong>
                    <p>{bet.book} · {bet.placedAt}</p>
                  </div>
                  <div className="settled-metrics">
                    <span className={bet.result === 'win' ? 'positive' : 'negative'}>{bet.result}</span>
                    <span>{bet.clv} CLV</span>
                    <span className={bet.pnl && bet.pnl > 0 ? 'positive' : 'negative'}>
                      {bet.pnl && bet.pnl > 0 ? '+' : ''}{bet.pnl?.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export function AlertsPage() {
  return (
    <section className="tv-grid-top">
      <section className="panel">
        <div className="panel-head"><div><p className="eyebrow">alerts center</p><h2>Target line alerts</h2></div></div>
        <div className="opportunity-table">
          <div className="table-row"><div><strong>Lakers +4.5</strong><p>Trigger when any book reaches target</p></div><div className="table-meta"><span>Armed</span><span className="positive">Live</span></div></div>
          <div className="table-row"><div><strong>Bills ML +115</strong><p>Notify on best price</p></div><div className="table-meta"><span>Waiting</span><span>bet365</span></div></div>
          <div className="table-row"><div><strong>Heat/Celtics Over 218.5</strong><p>Alert on reverse move</p></div><div className="table-meta"><span>Monitoring</span><span>All books</span></div></div>
        </div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><p className="eyebrow">signal queue</p><h2>Recent triggers</h2></div></div>
        <div className="opportunity-table">
          <div className="table-row"><div><strong>Steam move</strong><p>Lakers spread moved 1.5 points in 30m</p></div><div className="table-meta"><span className="positive">Triggered</span></div></div>
          <div className="table-row"><div><strong>Lagging book</strong><p>bet365 held +112 while market shifted</p></div><div className="table-meta"><span className="positive">Triggered</span></div></div>
        </div>
      </section>
    </section>
  );
}

export function ScreenersPage() {
  return (
    <section className="tv-grid-top">
      <section className="panel">
        <div className="panel-head"><div><p className="eyebrow">screeners</p><h2>Market scanner</h2></div></div>
        <div className="opportunity-table">
          {screenerRows.map((item) => (
            <div className="table-row" key={item.label}>
              <div><strong>{item.label}</strong><p>{item.note}</p></div>
              <div className="table-meta"><span>{item.count}</span></div>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><p className="eyebrow">sportsbooks</p><h2>Book monitor</h2></div></div>
        <div className="opportunity-table">
          <div className="table-row"><div><strong>DraftKings</strong><p>Fast updates, strong NBA coverage</p></div><div className="table-meta"><span>Healthy</span></div></div>
          <div className="table-row"><div><strong>bet365</strong><p>Wide board, key pricing edges</p></div><div className="table-meta"><span>Watching</span></div></div>
          <div className="table-row"><div><strong>Kalshi</strong><p>Prediction market signal input</p></div><div className="table-meta"><span>Healthy</span></div></div>
        </div>
      </section>
    </section>
  );
}

export function ParlayLabPage() {
  const [mode, setMode] = useState<'conservative' | 'balanced' | 'aggressive'>('conservative');
  const filtered = parlayCards.filter((parlay) => parlay.style === mode);

  return (
    <>
      <section className="stats-grid">
        <StatCard label="Curated parlays" value="4" detail="2-leg and 3-leg builds" tone="gold" />
        <StatCard label="Model stance" value="Signal-backed" detail="Not marketed as locks" tone="blue" />
        <StatCard label="Focus" value="High conviction" detail="Line movement + stats + roster" tone="green" />
        <StatCard label="Premium" value="Parlay Lab" detail="Daily curated builds" tone="purple" />
      </section>

      <section className="panel hero-panel">
        <div>
          <p className="eyebrow">parlay lab</p>
          <h2>Signal-backed 2-leg and 3-leg builds</h2>
          <p className="subtle">Built from line movement, team rates, current player form, and roster context — not lottery-ticket nonsense.</p>
        </div>
      </section>

      <section className="mode-tabs panel">
        <button className={`mode-tab ${mode === 'conservative' ? 'active' : ''}`} onClick={() => setMode('conservative')}>Safe</button>
        <button className={`mode-tab ${mode === 'balanced' ? 'active' : ''}`} onClick={() => setMode('balanced')}>Balanced</button>
        <button className={`mode-tab ${mode === 'aggressive' ? 'active' : ''}`} onClick={() => setMode('aggressive')}>Aggressive</button>
        <div className="premium-badge">Premium</div>
      </section>

      <section className="parlay-grid">
        {filtered.map((parlay) => (
          <div className={`panel parlay-card ${parlay.style}`} key={parlay.title}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">{parlay.style}</p>
                <h2>{parlay.title}</h2>
              </div>
              <div className="table-meta">
                <span>{parlay.combinedOdds}</span>
                <span className={parlay.risk === 'low' ? 'positive' : parlay.risk === 'high' ? 'negative' : ''}>{parlay.risk} risk</span>
              </div>
            </div>

            <div className="parlay-confidence">
              <span>Confidence</span>
              <strong>{parlay.confidence}/100</strong>
            </div>

            <p className="subtle">{parlay.rationale}</p>

            <div className="opportunity-table">
              {parlay.legs.map((leg) => (
                <div className="table-row" key={leg.label}>
                  <div>
                    <strong>{leg.label}</strong>
                    <p>{leg.book}</p>
                  </div>
                  <div className="table-meta">
                    <span>{leg.odds}</span>
                    <span className="positive">{leg.signal}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="premium-module">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">premium</p>
                  <h2>Why this parlay qualifies</h2>
                </div>
              </div>
              <div className="opportunity-table">
                {parlay.reasons.map((reason) => (
                  <div className="table-row" key={reason.label}>
                    <div>
                      <strong>{reason.label}</strong>
                      <p>{reason.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-module">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">premium</p>
                  <h2>Best book execution</h2>
                </div>
              </div>
              <div className="opportunity-table">
                {parlay.execution.map((item) => (
                  <div className="table-row" key={item.leg}>
                    <div>
                      <strong>{item.leg}</strong>
                      <p>{item.note}</p>
                    </div>
                    <div className="table-meta">
                      <span>{item.bestBook}</span>
                      <span className="positive">{item.bestOdds}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function StatCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: 'gold' | 'green' | 'blue' | 'purple' }) {
  return (
    <div className={`panel stat-card tone-${tone}`}>
      <p className="eyebrow">{label}</p>
      <h3>{value}</h3>
      <span>{detail}</span>
    </div>
  );
}

function PerformanceCard({ label, wagered, pnl, roi, winRate, clv }: { label: string; wagered: number; pnl: number; roi: number; winRate: number; clv: number }) {
  return (
    <div className="panel performance-card">
      <p className="eyebrow">{label}</p>
      <div className="performance-topline">
        <h3 className={pnl >= 0 ? 'positive' : 'negative'}>{pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}</h3>
        <span className={roi >= 0 ? 'positive' : 'negative'}>{roi >= 0 ? '+' : ''}{roi.toFixed(1)}% ROI</span>
      </div>
      <div className="performance-stats">
        <div><span>Wagered</span><strong>${wagered}</strong></div>
        <div><span>Win rate</span><strong>{winRate}%</strong></div>
        <div><span>CLV</span><strong>{clv > 0 ? '+' : ''}{clv}</strong></div>
      </div>
    </div>
  );
}

function PerformanceChart() {
  const min = Math.min(...performanceHistory.map((point) => point.bankroll));
  const max = Math.max(...performanceHistory.map((point) => point.bankroll));
  const span = max - min || 1;
  const points = performanceHistory
    .map((point, index) => {
      const x = 36 + (index / Math.max(performanceHistory.length - 1, 1)) * 654;
      const y = 250 - ((point.bankroll - min) / span) * 190;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="chart-wrap">
      <svg viewBox="0 0 720 300" className="chart">
        <line x1="36" y1="24" x2="36" y2="250" className="axis" />
        <line x1="36" y1="250" x2="690" y2="250" className="axis" />
        <polyline fill="none" stroke="#24c997" strokeWidth="4" points={points} />
      </svg>
      <div className="performance-days">
        {performanceHistory.map((point) => (
          <span key={point.day}>{point.day}</span>
        ))}
      </div>
    </div>
  );
}

function LineChart({ snapshots, usePriceAxis }: { snapshots: OddsSnapshot[]; usePriceAxis: boolean }) {
  if (!snapshots.length) return <div className="empty-state">No snapshots yet for this view.</div>;

  const grouped = snapshots.reduce<Record<string, OddsSnapshot[]>>((acc, snapshot) => {
    acc[snapshot.sportsbook] ??= [];
    acc[snapshot.sportsbook].push(snapshot);
    return acc;
  }, {});

  const colors = ['#d8ba76', '#24c997', '#7fa6ff', '#f06f82', '#8b5cf6'];
  const allValues = snapshots.map((snapshot) => (usePriceAxis ? snapshot.price : snapshot.line ?? 0));
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const span = max - min || 1;

  return (
    <div className="chart-wrap">
      <svg viewBox="0 0 720 300" className="chart">
        <line x1="36" y1="24" x2="36" y2="250" className="axis" />
        <line x1="36" y1="250" x2="690" y2="250" className="axis" />
        {Object.entries(grouped).map(([book, bookSnapshots], index) => {
          const points = bookSnapshots
            .map((snapshot, pointIndex) => {
              const x = 36 + (pointIndex / Math.max(bookSnapshots.length - 1, 1)) * 654;
              const rawValue = usePriceAxis ? snapshot.price : snapshot.line ?? 0;
              const y = 250 - ((rawValue - min) / span) * 200;
              return `${x},${y}`;
            })
            .join(' ');

          return <polyline key={book} fill="none" stroke={colors[index % colors.length]} strokeWidth="3" points={points} />;
        })}
      </svg>

      <div className="legend">
        {Object.keys(grouped).map((book, index) => (
          <div className="legend-item" key={book}>
            <span className="legend-dot" style={{ backgroundColor: colors[index % colors.length] }} />
            {book}
          </div>
        ))}
      </div>
    </div>
  );
}
