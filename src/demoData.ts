import type { Event, OddsSnapshot, SportsbookMeta } from './types';

export const demoSportsbooks: SportsbookMeta[] = [
  { key: 'draftkings', label: 'DraftKings', kind: 'sportsbook', difficulty: 'easy', status: 'mvp-ready' },
  { key: 'fanduel', label: 'FanDuel', kind: 'sportsbook', difficulty: 'easy', status: 'mvp-ready' },
  { key: 'betmgm', label: 'BetMGM', kind: 'sportsbook', difficulty: 'easy', status: 'mvp-ready' },
  { key: 'bet365', label: 'bet365', kind: 'sportsbook', difficulty: 'medium', status: 'mvp-ready' },
  { key: 'kalshi', label: 'Kalshi', kind: 'prediction-market', difficulty: 'easy', status: 'mvp-ready' },
];

export const demoEvents: Event[] = [
  {
    id: 'nba-lal-den-1',
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Denver Nuggets',
    awayTeam: 'Los Angeles Lakers',
    startTime: '2026-04-27T02:00:00Z',
  },
  {
    id: 'nba-bos-mia-1',
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Miami Heat',
    awayTeam: 'Boston Celtics',
    startTime: '2026-04-27T23:30:00Z',
  },
];

export const demoSnapshots: OddsSnapshot[] = [
  { id: '1', eventId: 'nba-lal-den-1', sportsbook: 'draftkings', marketType: 'spread', side: 'away', line: 4.5, price: -110, timestamp: '2026-04-26T15:00:00Z' },
  { id: '2', eventId: 'nba-lal-den-1', sportsbook: 'draftkings', marketType: 'spread', side: 'away', line: 3.0, price: -112, timestamp: '2026-04-26T19:00:00Z' },
  { id: '3', eventId: 'nba-lal-den-1', sportsbook: 'betmgm', marketType: 'spread', side: 'away', line: 3.5, price: -100, timestamp: '2026-04-26T19:00:00Z' },
  { id: '4', eventId: 'nba-lal-den-1', sportsbook: 'kalshi', marketType: 'spread', side: 'away', line: 3.0, price: -107, timestamp: '2026-04-26T19:00:00Z' },
  { id: '5', eventId: 'nba-lal-den-1', sportsbook: 'fanduel', marketType: 'spread', side: 'away', line: 3.5, price: -110, timestamp: '2026-04-26T19:00:00Z' },
  { id: '6', eventId: 'nba-lal-den-1', sportsbook: 'bet365', marketType: 'spread', side: 'away', line: 3.0, price: -108, timestamp: '2026-04-26T19:00:00Z' },
  { id: '7', eventId: 'nba-lal-den-1', sportsbook: 'draftkings', marketType: 'moneyline', side: 'away', line: null, price: 138, timestamp: '2026-04-26T19:00:00Z' },
  { id: '8', eventId: 'nba-lal-den-1', sportsbook: 'fanduel', marketType: 'moneyline', side: 'away', line: null, price: 141, timestamp: '2026-04-26T19:00:00Z' },
  { id: '9', eventId: 'nba-lal-den-1', sportsbook: 'betmgm', marketType: 'moneyline', side: 'away', line: null, price: 142, timestamp: '2026-04-26T19:00:00Z' },
  { id: '10', eventId: 'nba-lal-den-1', sportsbook: 'bet365', marketType: 'moneyline', side: 'away', line: null, price: 144, timestamp: '2026-04-26T19:00:00Z' },
  { id: '11', eventId: 'nba-lal-den-1', sportsbook: 'kalshi', marketType: 'moneyline', side: 'away', line: null, price: 140, timestamp: '2026-04-26T19:00:00Z' },
  { id: '12', eventId: 'nba-bos-mia-1', sportsbook: 'draftkings', marketType: 'total', side: 'over', line: 219.5, price: -112, timestamp: '2026-04-26T19:00:00Z' },
  { id: '13', eventId: 'nba-bos-mia-1', sportsbook: 'fanduel', marketType: 'total', side: 'over', line: 219.0, price: -108, timestamp: '2026-04-26T19:00:00Z' },
  { id: '14', eventId: 'nba-bos-mia-1', sportsbook: 'betmgm', marketType: 'total', side: 'over', line: 220.0, price: -110, timestamp: '2026-04-26T19:00:00Z' },
  { id: '15', eventId: 'nba-bos-mia-1', sportsbook: 'bet365', marketType: 'total', side: 'over', line: 219.5, price: -105, timestamp: '2026-04-26T19:00:00Z' },
  { id: '16', eventId: 'nba-bos-mia-1', sportsbook: 'kalshi', marketType: 'total', side: 'over', line: 219.5, price: -102, timestamp: '2026-04-26T19:00:00Z' },
];
