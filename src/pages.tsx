import { formatLine, formatPrice, marketLabels } from './data';
import { activeBets, settledBets } from './mockBets';
import { bestOpportunities, marketMovers, sportCategories } from './mockMarkets';
import { performanceHistory, performanceWindows } from './mockPerformance';
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

      <section className="tv-grid-main">
        <div className="left-rail">
          <section className="panel hero-panel">
            <div>
              <p className="eyebrow">markets</p>
              <h2>TradingView-style market discovery</h2>
              <p className="subtle">Scan sports, spot movers, then drill into the line board and chart.</p>
            </div>
            <div className="hero-books">DraftKings · FanDuel · BetMGM · bet365 · Kalshi</div>
          </section>

          <section className="panel category-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">by sport</p>
                <h2>Market categories</h2>
              </div>
            </div>
            <div className="category-grid">
              {sportCategories.map((item) => (
                <div className="category-card" key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.games} games</span>
                  <small>{item.booksLive} books live</small>
                </div>
              ))}
            </div>
          </section>

          <section className="panel filters">
            <label>
              Game
              <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
                {events.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.awayTeam} @ {item.homeTeam}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Market
              <select value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value as MarketType)}>
                {(['spread', 'moneyline', 'total'] as MarketType[]).map((market) => (
                  <option key={market} value={market}>
                    {marketLabels[market]}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Side
              <select value={selectedSide} onChange={(e) => setSelectedSide(e.target.value as OutcomeSide)}>
                {availableSides.map((side) => (
                  <option key={side} value={side}>
                    {side}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="panel chart-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">line chart</p>
                <h2>{event.awayTeam} @ {event.homeTeam}</h2>
              </div>
              <div className="chart-meta">{marketLabels[selectedMarket]} · {selectedSide}</div>
            </div>
            <LineChart snapshots={history} usePriceAxis={selectedMarket === 'moneyline'} />
          </section>

          <section className="panel board-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">comparison board</p>
                <h2>Book-by-book best line</h2>
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
        </div>

        <div className="right-rail">
          <section className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">watchlist</p>
                <h2>Radar</h2>
              </div>
            </div>
            <div className="opportunity-table">
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

          <section className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">screeners</p>
                <h2>Operator tools</h2>
              </div>
            </div>
            <div className="opportunity-table">
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
