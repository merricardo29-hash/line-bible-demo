import { appNav, brand } from './brand';

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="landing-shell">
      <header className="landing-nav">
        <div className="landing-brand">{brand.name.toUpperCase()}</div>
        <nav className="landing-links">
          {appNav.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <button className="landing-cta" onClick={onEnterApp}>Open Dashboard</button>
      </header>

      <section className="landing-hero">
        <div className="landing-copy">
          <p className="eyebrow accent">Binance feel. Coinbase premium depth.</p>
          <h1>{brand.tagline}.</h1>
          <p className="landing-subtext">
            Shop the best line across major books, track line movement like a market chart, and manage your bets like a portfolio.
          </p>
          <div className="landing-actions">
            <button className="btn-primary" onClick={onEnterApp}>See the dashboard</button>
            <button className="btn-secondary">View Pro features</button>
          </div>

          <div className="landing-feature-grid">
            <FeatureCard title="Best line screen" text="Compare 5 books instantly." />
            <FeatureCard title="Trading-style charts" text="Opening vs current vs closing line." />
            <FeatureCard title="Bet portfolio" text="Track CLV, P&L, and exposure." />
            <FeatureCard title="Pro alerts" text="Target number and steam move alerts." />
          </div>
        </div>

        <div className="landing-terminal panel">
          <div className="terminal-top">
            <div>
              <p className="eyebrow">Live terminal</p>
              <h2>Market overview</h2>
            </div>
            <div className="signal-pill premium">Pro</div>
          </div>

          <div className="terminal-stats">
            <MiniStat label="Books" value="5" note="DK · FD · MGM · 365 · Kalshi" />
            <MiniStat label="Alerts today" value="24" note="target + steam" positive />
            <MiniStat label="Tracked P&L" value="+$1,948" note="lifetime" positive />
            <MiniStat label="CLV" value="+0.6" note="avg lifetime" positive />
          </div>

          <div className="landing-chart panel-inner">
            <svg viewBox="0 0 520 240" className="chart">
              <line x1="24" y1="20" x2="24" y2="208" className="axis" />
              <line x1="24" y1="208" x2="500" y2="208" className="axis" />
              <polyline points="24,82 110,98 190,120 280,132 360,162 430,184 500,196" fill="none" stroke="#f0b90b" strokeWidth="4" />
              <polyline points="24,174 110,152 190,180 280,188 360,156 430,128 500,108" fill="none" stroke="#0ddb8b" strokeWidth="4" />
              <polyline points="24,190 110,185 190,180 280,160 360,166 430,178 500,182" fill="none" stroke="#4d7cff" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </section>

      <section className="landing-sections">
        <div className="panel landing-block">
          <p className="eyebrow">Why it wins</p>
          <h2>More terminal. Less generic odds site.</h2>
          <p className="subtle">
            The edge is not just showing odds. It’s showing movement, best execution, alerts, CLV, and betting performance in one sharp workspace.
          </p>
        </div>

        <div className="panel landing-block">
          <p className="eyebrow">Premium</p>
          <h2>Alerts. Performance. Edge.</h2>
          <p className="subtle">
            Full history, target-line alerts, bankroll analytics, props, advanced screeners, and performance tracking like a trading platform.
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="feature-card">
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

function MiniStat({ label, value, note, positive }: { label: string; value: string; note: string; positive?: boolean }) {
  return (
    <div className="mini-stat">
      <span>{label}</span>
      <strong className={positive ? 'positive' : ''}>{value}</strong>
      <small>{note}</small>
    </div>
  );
}
