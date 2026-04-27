import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { fetchBestLines, fetchBootstrap, fetchHistory } from './api';
import { LandingPage } from './LandingPage';
import { appNav, brand } from './brand';
import {
  AlertsPage,
  MarketsPage,
  PerformancePage,
  PortfolioPage,
  ScreenersPage,
} from './pages';
import type { BestLineResult, Event, MarketType, OddsSnapshot, OutcomeSide, SportsbookMeta } from './types';

function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [activeSection, setActiveSection] = useState('Markets');
  const [sportsbooks, setSportsbooks] = useState<SportsbookMeta[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<MarketType>('spread');
  const [selectedSide, setSelectedSide] = useState<OutcomeSide>('away');
  const [history, setHistory] = useState<OddsSnapshot[]>([]);
  const [bestLines, setBestLines] = useState<BestLineResult[]>([]);

  useEffect(() => {
    fetchBootstrap().then((data) => {
      setSportsbooks(data.sportsbooks);
      setEvents(data.events);
      setSelectedEventId(data.events[0]?.id ?? '');
    });
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;
    fetchHistory(selectedEventId, selectedMarket, selectedSide).then(setHistory);
    fetchBestLines(selectedEventId, selectedMarket, selectedSide).then(setBestLines);
  }, [selectedEventId, selectedMarket, selectedSide]);

  const event = useMemo(() => events.find((item) => item.id === selectedEventId), [events, selectedEventId]);
  const availableSides: OutcomeSide[] = selectedMarket === 'total' ? ['over'] : ['away'];

  useEffect(() => {
    setSelectedSide(availableSides[0]);
  }, [selectedMarket]);

  if (view === 'landing') {
    return <LandingPage onEnterApp={() => setView('dashboard')} />;
  }

  if (!event) {
    return <div className="app-shell"><div className="panel">Loading dashboard…</div></div>;
  }

  return (
    <div className="app-shell trading-shell app-frame">
      <aside className="sidebar panel">
        <div className="sidebar-brand">
          <div className="brand-mark">{brand.shortName}</div>
          <div>
            <p className="brand-kicker">{brand.name.toLowerCase()}</p>
            <strong>{brand.tagline}</strong>
          </div>
        </div>

        <nav className="sidebar-nav">
          {appNav.map((item) => (
            <button key={item} className={`nav-item ${activeSection === item ? 'active' : ''}`} onClick={() => setActiveSection(item)}>
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Upgrade</p>
          <strong>Unlock pro alerts</strong>
          <span>Steam moves, target lines, CLV tracking, and advanced screeners.</span>
        </div>
      </aside>

      <main className="main-shell">
        <header className="topbar">
          <div>
            <p className="brand-kicker">{brand.name.toLowerCase()}</p>
            <h1>{activeSection}</h1>
          </div>
          <div className="topbar-actions">
            <button className="signal-pill" onClick={() => setView('landing')}>Landing</button>
            <div className="signal-pill live">Live market</div>
            <div className="signal-pill premium">Pro alerts</div>
          </div>
        </header>

        {activeSection === 'Markets' && (
          <MarketsPage
            event={event}
            events={events}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
            selectedMarket={selectedMarket}
            setSelectedMarket={setSelectedMarket}
            selectedSide={selectedSide}
            setSelectedSide={setSelectedSide}
            availableSides={availableSides}
            history={history}
            bestLines={bestLines}
          />
        )}
        {activeSection === 'Portfolio' && <PortfolioPage />}
        {activeSection === 'Performance' && <PerformancePage />}
        {activeSection === 'Alerts' && <AlertsPage />}
        {activeSection === 'Screeners' && <ScreenersPage />}

        <section className="panel footer-strip">
          <div className="mini-books">
            {sportsbooks.map((book) => (
              <span key={book.key} className="mini-book">{book.label}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
