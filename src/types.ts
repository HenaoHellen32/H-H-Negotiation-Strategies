export type NegotiationRole = 'comprador' | 'vendedor';

export interface ProbabilityFactors {
  poder: number; // 40, 20, 0
  tipo: number;  // 15, 10, 5
  cultura: number; // 15, 5, 0
  plazos: number;  // 15, 5, -10
  mercado: number; // 15, 5, -5
}

export type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'COP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
}

export interface ReservationPointState {
  rol: NegotiationRole;
  base: number;
  transicion: number;
  riesgo: number;
}

export interface PresetScenario {
  id: string;
  name: string;
  tagline: string;
  probFactors: ProbabilityFactors;
  reservationPoint: ReservationPointState;
}
