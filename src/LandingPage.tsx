import { appNav } from './brand';

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="landing-shell">
      <header className="landing-nav">
        <div className="landing-brand lockup">
          <img src="./line-bible-wordmark-v2.svg" alt="Line Bible logo" className="brand-logo" />
        </div>
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
          <h1>The terminal for sports bettors.</h1>
          <p className="landing-subtext">
            Shop the best line. Track movement. Bet smarter.
          </p>
          <div className="landing-actions">
            <button className="btn-primary" onClick={onEnterApp}>Open terminal</button>
            <button className="btn-secondary">See Pro</button>
          </div>

          <div className="luxury-note">
            <span className="status-dot gold" />
            Premium market intelligence
          </div>

          <div className="landing-feature-grid">
            <FeatureCard title="Best lines" text="Compare 5 books fast." />
            <FeatureCard title="Charts" text="Track movement cleanly." />
            <FeatureCard title="Portfolio" text="Monitor CLV and P&L." />
            <FeatureCard title="Alerts" text="Catch target numbers." />
          </div>
        </div>

        <div className="landing-terminal panel art-panel">
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

          <div className="hero-art-wrap panel-inner">
            <img src="./cockpit-terminal-hero.svg" alt="Luxury sports betting cockpit terminal concept" className="hero-art" />
          </div>
        </div>
      </section>

      <section className="landing-sections">
        <div className="panel landing-block">
          <p className="eyebrow">Why it wins</p>
          <h2>More terminal. Less noise.</h2>
          <p className="subtle">
            Best lines, movement, alerts, CLV, and performance in one clean workspace.
          </p>
        </div>

        <div className="panel landing-block">
          <p className="eyebrow">Premium</p>
          <h2>Alerts. Performance. Edge.</h2>
          <p className="subtle">
            Full history, props, advanced screeners, and deeper performance tracking.
          </p>
        </div>
      </section>

      <section className="luxury-strip panel">
        <img src="./line-bible-mark.svg" alt="Line Bible mark" className="luxury-mark" />
        <div>
          <p className="eyebrow">Brand signature</p>
          <h2>Luxury mood. Professional terminal discipline.</h2>
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
