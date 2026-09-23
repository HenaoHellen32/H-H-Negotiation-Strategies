import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'USD ($) - Dólar Estadounidense',
    locale: 'en-US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'EUR (€) - Euro',
    locale: 'es-ES',
  },
  COP: {
    code: 'COP',
    symbol: '$',
    name: 'COP ($) - Peso Colombiano',
    locale: 'es-CO',
  },
  MXN: {
    code: 'MXN',
    symbol: '$',
    name: 'MXN ($) - Peso Mexicano',
    locale: 'es-MX',
  },
  CLP: {
    code: 'CLP',
    symbol: '$',
    name: 'CLP ($) - Peso Chileno',
    locale: 'es-CL',
  },
  ARS: {
    code: 'ARS',
    symbol: '$',
    name: 'ARS ($) - Peso Argentino',
    locale: 'es-AR',
  },
  PEN: {
    code: 'PEN',
    symbol: 'S/',
    name: 'PEN (S/) - Sol Peruano',
    locale: 'es-PE',
  },
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    name: 'BRL (R$) - Real Brasileño',
    locale: 'pt-BR',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'GBP (£) - Libra Esterlina',
    locale: 'en-GB',
  },
  CAD: {
    code: 'CAD',
    symbol: '$',
    name: 'CAD ($) - Dólar Canadiense',
    locale: 'en-CA',
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF',
    name: 'CHF (CHF) - Franco Suizo',
    locale: 'de-CH',
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
    return `${config.symbol} ${Math.round(amount).toLocaleString()}`;
  }
}
