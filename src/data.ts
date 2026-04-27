import type { MarketType } from './types';

export const marketLabels: Record<MarketType, string> = {
  spread: 'Spread',
  total: 'Total',
  moneyline: 'Moneyline',
};

export function formatPrice(price: number) {
  return price > 0 ? `+${price}` : `${price}`;
}

export function formatLine(line: number | null) {
  if (line === null) return '—';
  return Number.isInteger(line) ? `${line}.0` : `${line}`;
}
