/**
 * lib/format.ts — Formatting helpers safe for client + server components.
 */

export function formatPrice(cents: number): string {
  const pounds = cents / 100;
  return pounds.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function pluralize(n: number, singular: string, plural?: string): string {
  return n === 1 ? singular : plural || singular + 's';
}

export function leadTimeLabel(days: number): string {
  if (days === 0) return 'Ready same day';
  if (days === 1) return '24-hour lead time';
  if (days < 7) return `${days}-day lead time`;
  const weeks = Math.round(days / 7);
  return weeks === 1 ? '1 week lead time' : `${weeks} weeks lead time`;
}
