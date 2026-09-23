export type NegotiationRole = 'comprador' | 'vendedor';

export interface ProbabilityFactors {
  poder: number; // 40, 20, 0
  tipo: number;  // 15, 10, 5
  cultura: number; // 15, 5, 0
  plazos: number;  // 15, 5, -10
  mercado: number; // 15, 5, -5
}

export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'COP'
  | 'MXN'
  | 'CLP'
  | 'ARS'
  | 'PEN'
  | 'BRL'
  | 'GBP'
  | 'CAD'
  | 'CHF';

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
  category?: string;
  buyerRoleLabel?: string;
  sellerRoleLabel?: string;
  probFactors: ProbabilityFactors;
  reservationPoint: ReservationPointState;
}

export type NegotiationNature = 'comercial' | 'politico' | 'social' | 'gubernamental';

export type AgeGroup = 'joven' | 'intermedio' | 'senior';

export type TimeHorizon = 'urgente' | 'medio' | 'largo';

export type ScaleVolume = 'piloto' | 'medio' | 'masivo';

export type MarketCondition = 'estable' | 'volatil' | 'inflacionario' | 'regulatorio' | 'escasez';

export interface CountryProfile {
  id: string;
  name: string;
  flag: string;
  region: string;
  communicationStyle: 'directa' | 'indirecta' | 'contextual_alta' | 'formal_analitica';
  communicationLabel: string;
  communicationDesc: string;
  trustBasis: 'tarea' | 'relacion' | 'institucional';
  trustLabel: string;
  trustDesc: string;
  hierarchyStyle: 'egalitaria' | 'jerarquica' | 'consensual';
  hierarchyLabel: string;
  bargainingNorm: 'bajo' | 'moderado' | 'alto';
  bargainingMarginPercent: number; // Porcentaje típico de concesión / colchón de regateo
  bargainingDesc: string;
  timeOrientation: 'monocronico' | 'policronico';
  timeLabel: string;
  paceOfNegotiation: 'rapido' | 'moderado' | 'deliberativo';
  paceLabel: string;
  keyTactics: string[];
  taboos: string[];
  roleBehavior: {
    comercial: string;
    politico: string;
    social: string;
    gubernamental: string;
  };
}

export interface CountryComparisonState {
  countryAId: string;
  countryBId: string;
  ageGroupA: AgeGroup;
  ageGroupB: AgeGroup;
  nature: NegotiationNature;
  timeHorizon: TimeHorizon;
  deliveryDays: number;
  unitPrice: number;
  quantity: number;
  scale: ScaleVolume;
  marketCondition: MarketCondition;
  currency: CurrencyCode;
}

