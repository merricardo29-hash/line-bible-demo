export interface PerformanceWindow {
  label: string;
  wagered: number;
  pnl: number;
  roi: number;
  winRate: number;
  clv: number;
}

export interface PerformancePoint {
  day: string;
  bankroll: number;
  pnl: number;
}

export const performanceWindows: PerformanceWindow[] = [
  { label: 'Today', wagered: 225, pnl: 34.5, roi: 15.3, winRate: 66, clv: 1.2 },
  { label: '7D', wagered: 1180, pnl: 142.75, roi: 12.1, winRate: 58, clv: 0.9 },
  { label: '30D', wagered: 4860, pnl: 522.3, roi: 10.7, winRate: 56, clv: 0.7 },
  { label: 'Lifetime', wagered: 18340, pnl: 1948.6, roi: 10.6, winRate: 55, clv: 0.6 },
];

export const performanceHistory: PerformancePoint[] = [
  { day: 'Mon', bankroll: 10000, pnl: 0 },
  { day: 'Tue', bankroll: 10085, pnl: 85 },
  { day: 'Wed', bankroll: 10042, pnl: 42 },
  { day: 'Thu', bankroll: 10190, pnl: 190 },
  { day: 'Fri', bankroll: 10240, pnl: 240 },
  { day: 'Sat', bankroll: 10188, pnl: 188 },
  { day: 'Sun', bankroll: 10342, pnl: 342 },
];
