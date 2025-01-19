import { DateTime } from 'luxon';

export const usdCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const usdCurrency0 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const percentFormat = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
});

export function dateFormat(date, format = 'yyyy-LL-dd') {
  return DateTime.fromISO(date).toUTC().toFormat(format);
}
