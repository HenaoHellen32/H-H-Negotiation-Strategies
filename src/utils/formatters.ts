import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'Dólar (USD)',
    locale: 'en-US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro (EUR)',
    locale: 'de-DE',
  },
  MXN: {
    code: 'MXN',
    symbol: '$',
    name: 'Peso Mexicano (MXN)',
    locale: 'es-MX',
  },
  COP: {
    code: 'COP',
    symbol: '$',
    name: 'Peso Colombiano (COP)',
    locale: 'es-CO',
  },
};

export function formatCurrency(amount: number, currency: CurrencyCode = 'USD'): string {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  try {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.code,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${config.symbol}${Math.round(amount).toLocaleString()}`;
  }
}
