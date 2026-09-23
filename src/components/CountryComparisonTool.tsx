import React, { useState } from 'react';
import {
  Globe,
  ArrowRightLeft,
  Briefcase,
  Landmark,
  HeartHandshake,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  Clock,
  Layers,
  Sparkles,
  Users,
  Info
} from 'lucide-react';
import {
  CountryComparisonState,
  CountryProfile,
  NegotiationNature,
  AgeGroup,
  TimeHorizon,
  ScaleVolume,
  MarketCondition,
  CurrencyCode
} from '../types';
import {
  COUNTRIES,
  NATURE_CONFIG,
  AGE_GROUP_CONFIG,
  MARKET_CONDITIONS_CONFIG
} from '../data/countries';
import { formatCurrency, CURRENCIES } from '../utils/formatters';

interface CountryComparisonToolProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange?: (c: CurrencyCode) => void;
}

export const CountryComparisonTool: React.FC<CountryComparisonToolProps> = ({
  currentCurrency,
  onCurrencyChange
}) => {
  const [state, setState] = useState<CountryComparisonState>({
    countryAId: 'US',
    countryBId: 'CN',
    ageGroupA: 'intermedio',
    ageGroupB: 'senior',
    nature: 'comercial',
    timeHorizon: 'medio',
    deliveryDays: 60,
    unitPrice: 500,
    quantity: 1000,
    scale: 'medio',
    marketCondition: 'volatil',
    currency: currentCurrency
  });

  const [hasCopiedReport, setHasCopiedReport] = useState(false);

  // Sync currency from props if changed outside
  React.useEffect(() => {
    setState((prev) => ({ ...prev, currency: currentCurrency }));
  }, [currentCurrency]);

  const countryA = COUNTRIES.find((c) => c.id === state.countryAId) || COUNTRIES[0];
  const countryB = COUNTRIES.find((c) => c.id === state.countryBId) || COUNTRIES[3];

  const handleSwapCountries = () => {
    setState((prev) => ({
      ...prev,
      countryAId: prev.countryBId,
      countryBId: prev.countryAId,
      ageGroupA: prev.ageGroupB,
      ageGroupB: prev.ageGroupA
    }));
  };

  const updateField = <K extends keyof CountryComparisonState>(
    field: K,
    value: CountryComparisonState[K]
  ) => {
    setState((prev) => ({ ...prev, [field]: value }));
    if (field === 'currency' && onCurrencyChange) {
      onCurrencyChange(value as CurrencyCode);
    }
  };

  // Economic calculations
  const totalValue = (state.unitPrice || 0) * (state.quantity || 0);
  const bargainingMargin = countryB.bargainingMarginPercent;
  const recommendedOpeningAnchor =
    totalValue > 0
      ? state.nature === 'comercial'
        ? totalValue * (1 + bargainingMargin / 100)
        : totalValue * (1 + (bargainingMargin * 0.7) / 100)
      : 0;

  // Compatibility score calculation (0-100)
  const calculateCompatibility = () => {
    let score = 70; // baseline

    // Communication style friction
    if (countryA.communicationStyle === countryB.communicationStyle) {
      score += 10;
    } else if (
      (countryA.communicationStyle === 'directa' && countryB.communicationStyle === 'indirecta') ||
      (countryA.communicationStyle === 'indirecta' && countryB.communicationStyle === 'directa')
    ) {
      score -= 15;
    }

    // Trust model friction
    if (countryA.trustBasis === countryB.trustBasis) {
      score += 10;
    } else if (
      (countryA.trustBasis === 'tarea' && countryB.trustBasis === 'relacion') ||
      (countryA.trustBasis === 'relacion' && countryB.trustBasis === 'tarea')
    ) {
      score -= 12;
    }

    // Time orientation friction
    if (countryA.timeOrientation === countryB.timeOrientation) {
      score += 5;
    } else {
      score -= 8;
    }

    // Age gap impact
    if (state.ageGroupA === state.ageGroupB) {
      score += 5;
    } else if (
      (state.ageGroupA === 'joven' && state.ageGroupB === 'senior') ||
      (state.ageGroupA === 'senior' && state.ageGroupB === 'joven')
    ) {
      // High hierarchy countries penalize age gap more
      if (countryB.hierarchyStyle === 'jerarquica') {
        score -= 12;
      } else {
        score -= 6;
      }
    }

    // Market condition stress
    if (state.marketCondition === 'volatil' || state.marketCondition === 'inflacionario') {
      score -= 7;
    } else if (state.marketCondition === 'escasez') {
      score -= 5;
    }

    return Math.max(25, Math.min(95, score));
  };

  const compatibilityScore = calculateCompatibility();

  const getCompatibilityBadge = (score: number) => {
    if (score >= 75) {
      return {
        label: 'Alta Sintonía Cultural (Baja Fricción)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      };
    }
    if (score >= 55) {
      return {
        label: 'Sintonía Moderada (Requiere Ajuste Táctico)',
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      };
    }
    return {
      label: 'Alto Riesgo de Fricción Transcultural',
      color: 'text-rose-700 bg-rose-50 border-rose-200'
    };
  };

  const compatBadge = getCompatibilityBadge(compatibilityScore);

  const handleCopyComparisonReport = () => {
    const reportText = `================================================
MEMORANDO DE NEGOCIACIÓN INTERNACIONAL COMPARADA
================================================
1. PERFIL DE LAS PARTES:
- País A (Tu Organización): ${countryA.flag} ${countryA.name} [${AGE_GROUP_CONFIG[state.ageGroupA].badge}]
- País B (Contraparte): ${countryB.flag} ${countryB.name} [${AGE_GROUP_CONFIG[state.ageGroupB].badge}]
- Carácter: ${NATURE_CONFIG[state.nature].label}
- Índice de Compatibilidad Cultural: ${compatibilityScore}% (${compatBadge.label})

2. VARIABLES ECONÓMICAS Y OPERATIVAS:
- Moneda: ${state.currency}
- Precio Unitario: ${formatCurrency(state.unitPrice, state.currency)}
- Cantidad / Volumen: ${state.quantity.toLocaleString()} unidades (Escala: ${state.scale.toUpperCase()})
- Valor Total Estimado: ${formatCurrency(totalValue, state.currency)}
- Colchón de Regateo Sugerido para ${countryB.name}: +${countryB.bargainingMarginPercent}%
  -> Precio de Anclaje de Apertura Recomendado: ${formatCurrency(recommendedOpeningAnchor, state.currency)}
- Plazo y Horizonte: ${state.timeHorizon.toUpperCase()} (${state.deliveryDays} días de entrega)
- Condición del Mercado: ${MARKET_CONDITIONS_CONFIG[state.marketCondition].label}

3. COMPARATIVA CULTURAL DIRECTA:
- Estilo de Comunicación:
  * ${countryA.name}: ${countryA.communicationLabel}
  * ${countryB.name}: ${countryB.communicationLabel}
- Base de la Confianza:
  * ${countryA.name}: ${countryA.trustLabel}
  * ${countryB.name}: ${countryB.trustLabel}
- Gestión del Tiempo:
  * ${countryA.name}: ${countryA.timeLabel} (${countryA.paceLabel})
  * ${countryB.name}: ${countryB.timeLabel} (${countryB.paceLabel})

4. CONSEJOS TÁCTICOS PARA NEGOCIAR CON ${countryB.name.toUpperCase()}:
${countryB.keyTactics.map((t, idx) => `  ${idx + 1}. ${t}`).join('\n')}

5. TABÚES Y ERRORES CRÍTICOS A EVITAR:
${countryB.taboos.map((t, idx) => `  [!] ${t}`).join('\n')}

6. CLÁUSULA CONTRACTUAL RECOMENDADA:
${MARKET_CONDITIONS_CONFIG[state.marketCondition].clauseAdvice}
================================================`;

    navigator.clipboard.writeText(reportText);
    setHasCopiedReport(true);
    setTimeout(() => setHasCopiedReport(false), 2500);
  };

  return (
    <div id="country-comparison-tool" className="space-y-8">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Módulo Transcultural y Multivariable
              </span>
              <span className="text-xs text-slate-400">• Comparador Estratégico</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Comparador de Negociaciones entre Países
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Evalúa discrepancias culturales, brecha etaria, carácter del acuerdo (comercial, político, social o estatal), plazos, precios, volumen y contingencias de mercado para anticipar fricciones y blindar tu estrategia de negociación.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyComparisonReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-sm shrink-0 cursor-pointer"
          >
            {hasCopiedReport ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>¡Informe Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span>Copiar Memorando Internacional</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              Variables de la Negociación
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Configura a las partes, el tipo de trato y las condiciones de mercado.
            </p>
          </div>

          {/* Countries Selector */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Países a Comparar</span>
              <button
                type="button"
                onClick={handleSwapCountries}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 p-1 hover:bg-white rounded transition cursor-pointer"
                title="Intercambiar países y edades"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Invertir Partes</span>
              </button>
            </div>

            {/* Country A */}
            <div>
              <label htmlFor="country-a-select" className="text-[11px] font-semibold text-slate-500 block mb-1">
                País A (Tu Organización):
              </label>
              <select
                id="country-a-select"
                value={state.countryAId}
                onChange={(e) => updateField('countryAId', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none"
              >
                {COUNTRIES.map((c) => (
                  <option key={`a-${c.id}`} value={c.id}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>

            {/* Country B */}
            <div>
              <label htmlFor="country-b-select" className="text-[11px] font-semibold text-slate-500 block mb-1">
                País B (Contraparte Internacional):
              </label>
              <select
                id="country-b-select"
                value={state.countryBId}
                onChange={(e) => updateField('countryBId', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none"
              >
                {COUNTRIES.map((c) => (
                  <option key={`b-${c.id}`} value={c.id}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Age / Generation Variables */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Rango de Edad de los Negociadores</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-medium text-slate-500 block mb-1">
                  Tu Equipo ({countryA.flag}):
                </span>
                <select
                  value={state.ageGroupA}
                  onChange={(e) => updateField('ageGroupA', e.target.value as AgeGroup)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-700 outline-none"
                >
                  <option value="joven">&lt; 35 años (Joven)</option>
                  <option value="intermedio">35 - 52 años (Mid-Career)</option>
                  <option value="senior">&gt; 52 años (Senior)</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] font-medium text-slate-500 block mb-1">
                  Contraparte ({countryB.flag}):
                </span>
                <select
                  value={state.ageGroupB}
                  onChange={(e) => updateField('ageGroupB', e.target.value as AgeGroup)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-700 outline-none"
                >
                  <option value="joven">&lt; 35 años (Joven)</option>
                  <option value="intermedio">35 - 52 años (Mid-Career)</option>
                  <option value="senior">&gt; 52 años (Senior)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Negotiation Nature */}
          <div>
            <label htmlFor="nature-select" className="text-xs font-bold text-slate-700 block mb-1.5">
              Carácter de la Negociación
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(NATURE_CONFIG) as NegotiationNature[]).map((nat) => {
                const conf = NATURE_CONFIG[nat];
                const isSelected = state.nature === nat;
                return (
                  <button
                    key={nat}
                    type="button"
                    onClick={() => updateField('nature', nat)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800 truncate">
                      {nat === 'comercial' && '💼 Comercial / B2B'}
                      {nat === 'politico' && '🏛️ Político / Diplomático'}
                      {nat === 'social' && '🤝 Social / Laboral'}
                      {nat === 'gubernamental' && '🏢 Contratación Pública'}
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{conf.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Economic Terms: Price, Quantity & Currency */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Precios y Volumen
              </span>
              {/* Currency Selector */}
              <select
                value={state.currency}
                onChange={(e) => updateField('currency', e.target.value as CurrencyCode)}
                className="text-xs font-bold bg-white border border-slate-300 rounded px-2 py-0.5 text-slate-800 outline-none"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={`curr-${c.code}`} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="unit-price-input" className="text-[11px] font-medium text-slate-600 block mb-1">
                  Precio Unitario:
                </label>
                <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1.5">
                  <span className="text-xs font-bold text-slate-400 mr-1.5">
                    {CURRENCIES[state.currency]?.symbol || '$'}
                  </span>
                  <input
                    id="unit-price-input"
                    type="number"
                    min="0"
                    step="10"
                    value={state.unitPrice}
                    onChange={(e) => updateField('unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-bold text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quantity-input" className="text-[11px] font-medium text-slate-600 block mb-1">
                  Cantidad / Unidades:
                </label>
                <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1.5">
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    step="10"
                    value={state.quantity}
                    onChange={(e) => updateField('quantity', parseInt(e.target.value) || 0)}
                    className="w-full text-xs font-bold text-slate-800 outline-none"
                  />
                  <span className="text-[10px] font-semibold text-slate-400 ml-1">uds</span>
                </div>
              </div>
            </div>

            {/* Total Value Readout */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
              <span className="font-semibold text-slate-600">Valor Total del Acuerdo:</span>
              <span className="font-bold text-emerald-700 text-sm">
                {formatCurrency(totalValue, state.currency)}
              </span>
            </div>
          </div>

          {/* Time & Delivery Horizons */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Plazos y Horizonte Temporal</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['urgente', 'medio', 'largo'] as TimeHorizon[]).map((hor) => (
                <button
                  key={hor}
                  type="button"
                  onClick={() => updateField('timeHorizon', hor)}
                  className={`p-2 rounded-lg border text-center text-xs font-semibold capitalize transition cursor-pointer ${
                    state.timeHorizon === hor
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {hor === 'urgente' && 'Urgente (<30d)'}
                  {hor === 'medio' && 'Medio (1-3m)'}
                  {hor === 'largo' && 'Largo (>3m)'}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-xs font-medium text-slate-600">Plazo de Entrega / Cumplimiento:</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="5"
                  max="365"
                  value={state.deliveryDays}
                  onChange={(e) => updateField('deliveryDays', parseInt(e.target.value) || 0)}
                  className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-xs font-bold text-slate-800 text-center outline-none"
                />
                <span className="text-xs text-slate-500 font-medium">días</span>
              </div>
            </div>
          </div>

          {/* Changing Market Conditions */}
          <div>
            <label htmlFor="market-condition-select" className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
              <span>Condiciones Cambiantes del Mercado</span>
            </label>
            <select
              id="market-condition-select"
              value={state.marketCondition}
              onChange={(e) => updateField('marketCondition', e.target.value as MarketCondition)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-800 outline-none"
            >
              <option value="estable">Estable y Predecible (Baja Volatilidad)</option>
              <option value="volatil">Alta Volatilidad Cambiaria / Precios Dinámicos</option>
              <option value="inflacionario">Presión Inflacionaria Acentuada</option>
              <option value="regulatorio">Incertidumbre Regulatoria o Arancelaria</option>
              <option value="escasez">Tensión de Suministro / Cuellos de Botella</option>
            </select>
          </div>
        </div>

        {/* Right Column: Comparative Strategic Analysis (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Compatibility & Friction Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                  VS
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  Compatibilidad Cultural: {countryA.name} vs {countryB.name}
                </h3>
              </div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${compatBadge.color}`}>
                {compatBadge.label}
              </span>
            </div>

            {/* Visual Gauge Score */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Índice de Sintonía Negociadora:</span>
                <span className="font-bold text-slate-900 text-sm">{compatibilityScore}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    compatibilityScore >= 70
                      ? 'bg-emerald-500'
                      : compatibilityScore >= 50
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${compatibilityScore}%` }}
                />
              </div>
            </div>

            {/* Quick Side-by-Side Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Country A Card */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-lg">{countryA.flag}</span>
                  <span className="font-bold text-xs text-slate-800">{countryA.name}</span>
                  <span className="text-[10px] text-slate-500 ml-auto font-medium">Origen</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-700">Comunicación: </span>
                    <span>{countryA.communicationLabel}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Confianza: </span>
                    <span>{countryA.trustLabel}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Tiempo: </span>
                    <span>{countryA.timeLabel}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Margen Regateo: </span>
                    <span className="font-bold text-slate-800">~{countryA.bargainingMarginPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Country B Card */}
              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200/70">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-lg">{countryB.flag}</span>
                  <span className="font-bold text-xs text-blue-900">{countryB.name}</span>
                  <span className="text-[10px] text-blue-700 ml-auto font-medium">Contraparte</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-700">Comunicación: </span>
                    <span>{countryB.communicationLabel}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Confianza: </span>
                    <span>{countryB.trustLabel}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Tiempo: </span>
                    <span>{countryB.timeLabel}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Margen Regateo: </span>
                    <span className="font-bold text-blue-800">~{countryB.bargainingMarginPercent}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generational / Age Analysis */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">Interacción Generacional ({AGE_GROUP_CONFIG[state.ageGroupA].badge} vs {AGE_GROUP_CONFIG[state.ageGroupB].badge}): </span>
                {state.ageGroupA === state.ageGroupB ? (
                  <span>
                    Ambos equipos pertenecen al mismo rango etario. Hay sintonía en ritmo de trabajo, expectativas de canales de comunicación y tolerancia al riesgo.
                  </span>
                ) : state.ageGroupA === 'joven' && state.ageGroupB === 'senior' ? (
                  <span>
                    <strong>Cuidado con el protocolo:</strong> Tu equipo ({AGE_GROUP_CONFIG[state.ageGroupA].badge}) priorizará velocidad y pragmatismo, pero la contraparte de {countryB.name} ({AGE_GROUP_CONFIG[state.ageGroupB].badge}) exige respeto a jerarquías, precedentes históricos y formalidad estricta. Evita presionar por WhatsApp o saltarte las líneas de mando.
                  </span>
                ) : (
                  <span>
                    Disparidad generacional detectada. Combina la solidez y protocolo de la generación senior con la adaptabilidad tecnológica y agilidad para evitar impaciencias en la mesa.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Pricing, Bargaining & Market Risk Advisory */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Estrategia Económica y Condiciones de Mercado
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Anchor Price Recommendation */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block">
                  Oferta de Anclaje Sugerida
                </span>
                <div className="text-xl font-extrabold text-emerald-900">
                  {formatCurrency(recommendedOpeningAnchor, state.currency)}
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  En {countryB.name} se espera un regateo del <strong>~{countryB.bargainingMarginPercent}%</strong>. Abre la negociación con este colchón para poder realizar concesiones sin comprometer tu Punto de Reserva.
                </p>
              </div>

              {/* Delivery & Schedule Friction */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                  Ritmo y Plazo ({state.deliveryDays} días)
                </span>
                <div className="text-xs font-bold text-slate-800">
                  Ritmo {countryB.paceLabel}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {countryB.timeOrientation === 'monocronico'
                    ? `En ${countryB.name} el plazo de ${state.deliveryDays} días se toma como compromiso contractual sagrado. Cualquier demora acarreará penalizaciones inmediatas.`
                    : `En ${countryB.name} la relación y los imprevistos prevalecen sobre el reloj rígido. Establece amortiguadores de 10 a 15 días adicionales.`}
                </p>
              </div>
            </div>

            {/* Market Condition Contingency Clause */}
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 leading-relaxed">
                <span className="font-bold">Cláusula Recomendada ({MARKET_CONDITIONS_CONFIG[state.marketCondition].label}): </span>
                {MARKET_CONDITIONS_CONFIG[state.marketCondition].clauseAdvice}
              </div>
            </div>
          </div>

          {/* Tactical Roadmap: Do's and Taboos */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Hoja de Ruta Táctica: Qué Hacer y Qué NUNCA Hacer con {countryB.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Best Practices */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Prácticas Ganadoras (Recomendado)
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {countryB.keyTactics.map((tactic, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Taboos */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Errores Críticos y Tabúes a Evitar
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {countryB.taboos.map((taboo, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 bg-rose-50/40 p-2 rounded-lg border border-rose-100">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>{taboo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specific Behavior for the Selected Nature */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-1">
                Dinámica según el Carácter ({NATURE_CONFIG[state.nature].label}):
              </span>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                {countryB.roleBehavior[state.nature]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
