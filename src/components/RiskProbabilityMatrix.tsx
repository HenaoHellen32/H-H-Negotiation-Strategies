import React from 'react';
import { CurrencyCode } from '../types';
import { formatCurrency } from '../utils/formatters';
import { ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Target, ArrowUpRight } from 'lucide-react';

interface RiskProbabilityMatrixProps {
  totalProb: number; // 0 - 100
  riskAmount: number; // Monetary risk value
  baseValue: number; // Base valuation / BATNA
  currency: CurrencyCode;
}

export const RiskProbabilityMatrix: React.FC<RiskProbabilityMatrixProps> = ({
  totalProb,
  riskAmount,
  baseValue,
  currency,
}) => {
  // Determine coordinate thresholds
  // Probability threshold: 50%
  const isHighProb = totalProb >= 50;

  // Risk threshold: riskAmount is considered "High Risk" if risk is >= 15% of base value, or absolute > 5000 (or adjustable)
  const riskRatio = baseValue > 0 ? riskAmount / baseValue : 0;
  const isHighRisk = riskRatio >= 0.15 || riskAmount >= 5000;

  // Determine quadrant ID
  // 1: High Prob, Low Risk (Ideal / Strategic Priority)
  // 2: High Prob, High Risk (Managed Risk / High Value Opportunity)
  // 3: Low Prob, Low Risk (Marginal / Conditional)
  // 4: Low Prob, High Risk (Critical Exposure / Walk-Away)

  let quadrantTitle = '';
  let quadrantDesc = '';
  let quadrantColor = '';
  let badgeIcon = <CheckCircle2 className="w-4 h-4 text-emerald-600" />;

  if (isHighProb && !isHighRisk) {
    quadrantTitle = 'Prioridad Estratégica (Alta Probabilidad / Bajo Riesgo)';
    quadrantDesc = 'Escenario óptimo. El acuerdo presenta alta viabilidad estructural y baja exposición financiera. Recomendación: Avanzar hacia el cierre con términos favorables.';
    quadrantColor = 'bg-emerald-50 border-emerald-300 text-emerald-900';
    badgeIcon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
  } else if (isHighProb && isHighRisk) {
    quadrantTitle = 'Oportunidad de Alto Valor (Alta Probabilidad / Alto Riesgo)';
    quadrantDesc = 'Viabilidad favorable pero con exposición financiera considerable. Recomendación: Negociar cláusulas de mitigación de riesgo, garantías o tramos condicionados.';
    quadrantColor = 'bg-blue-50 border-blue-300 text-blue-900';
    badgeIcon = <Target className="w-4 h-4 text-blue-600 shrink-0" />;
  } else if (!isHighProb && !isHighRisk) {
    quadrantTitle = 'Zona Marginal (Baja Probabilidad / Bajo Riesgo)';
    quadrantDesc = 'Poca probabilidad de éxito pero con bajo costo de oportunidad. Recomendación: Exigir mayores concesiones o reevaluar el BATNA antes de continuar.';
    quadrantColor = 'bg-amber-50 border-amber-300 text-amber-900';
    badgeIcon = <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
  } else {
    quadrantTitle = 'Zona de Crítica Exposición (Baja Probabilidad / Alto Riesgo)';
    quadrantDesc = 'Alerta máxima. Alta probabilidad de fallo con fuerte impacto financiero. Recomendación: Suspender negociaciones y activar de inmediato la Mejor Alternativa (BATNA).';
    quadrantColor = 'bg-rose-50 border-rose-300 text-rose-900';
    badgeIcon = <XCircle className="w-4 h-4 text-rose-600 shrink-0" />;
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f172a] text-slate-200 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
            Matriz 2x2 de Riesgo vs. Probabilidad
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a]">
            Posicionamiento Estratégico en la Matriz de Decisión
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ploteo dinámico en tiempo real cruzando la probabilidad de éxito calculada ({totalProb}%) frente al nivel de riesgo financiero ({formatCurrency(riskAmount, currency)}).
          </p>
        </div>

        <div className="bg-slate-100 border border-slate-300 px-3.5 py-2 rounded-xl text-right shrink-0">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Exposición de Riesgo</div>
          <div className="text-sm font-extrabold text-[#0f172a]">
            {formatCurrency(riskAmount, currency)} <span className="text-xs font-medium text-slate-500">({(riskRatio * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      {/* 2x2 Matrix Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Matrix Grid Canvas */}
        <div className="lg:col-span-7 relative bg-slate-900 rounded-2xl p-4 sm:p-6 text-white border border-slate-800 shadow-inner">
          {/* Y-Axis Label */}
          <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
            Nivel de Riesgo Financiero
          </div>

          <div className="ml-4 sm:ml-6 space-y-3">
            {/* Top Row: High Risk */}
            <div className="grid grid-cols-2 gap-3">
              {/* Quadrant 2: High Prob / High Risk */}
              <div
                className={`relative rounded-xl p-4 border transition-all flex flex-col justify-between min-h-[130px] ${
                  isHighProb && isHighRisk
                    ? 'bg-blue-950/90 border-blue-400 shadow-lg ring-2 ring-blue-400/50'
                    : 'bg-slate-800/60 border-slate-700/80 opacity-75'
                }`}
              >
                {isHighProb && isHighRisk && (
                  <span className="absolute -top-2.5 -right-2.5 bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    Posición Actual
                  </span>
                )}
                <div>
                  <div className="text-[11px] font-bold text-blue-300 uppercase tracking-wide">Cuadrante II</div>
                  <div className="text-xs font-bold text-white mt-1">Alto Riesgo / Alta Probabilidad</div>
                </div>
                <div className="text-[11px] text-slate-300 mt-2">Oportunidad de Alto Valor (Mitigar Riesgo)</div>
              </div>

              {/* Quadrant 4: Low Prob / High Risk */}
              <div
                className={`relative rounded-xl p-4 border transition-all flex flex-col justify-between min-h-[130px] ${
                  !isHighProb && isHighRisk
                    ? 'bg-rose-950/90 border-rose-400 shadow-lg ring-2 ring-rose-400/50'
                    : 'bg-slate-800/60 border-slate-700/80 opacity-75'
                }`}
              >
                {!isHighProb && isHighRisk && (
                  <span className="absolute -top-2.5 -right-2.5 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    Posición Actual
                  </span>
                )}
                <div>
                  <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wide">Cuadrante IV</div>
                  <div className="text-xs font-bold text-white mt-1">Alto Riesgo / Baja Probabilidad</div>
                </div>
                <div className="text-[11px] text-slate-300 mt-2">Crítica Exposición (Activar BATNA)</div>
              </div>
            </div>

            {/* Bottom Row: Low Risk */}
            <div className="grid grid-cols-2 gap-3">
              {/* Quadrant 1: High Prob / Low Risk */}
              <div
                className={`relative rounded-xl p-4 border transition-all flex flex-col justify-between min-h-[130px] ${
                  isHighProb && !isHighRisk
                    ? 'bg-emerald-950/90 border-emerald-400 shadow-lg ring-2 ring-emerald-400/50'
                    : 'bg-slate-800/60 border-slate-700/80 opacity-75'
                }`}
              >
                {isHighProb && !isHighRisk && (
                  <span className="absolute -top-2.5 -right-2.5 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    Posición Actual
                  </span>
                )}
                <div>
                  <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide">Cuadrante I</div>
                  <div className="text-xs font-bold text-white mt-1">Bajo Riesgo / Alta Probabilidad</div>
                </div>
                <div className="text-[11px] text-slate-300 mt-2">Prioridad Estratégica (Cierre Óptimo)</div>
              </div>

              {/* Quadrant 3: Low Prob / Low Risk */}
              <div
                className={`relative rounded-xl p-4 border transition-all flex flex-col justify-between min-h-[130px] ${
                  !isHighProb && !isHighRisk
                    ? 'bg-amber-950/90 border-amber-400 shadow-lg ring-2 ring-amber-400/50'
                    : 'bg-slate-800/60 border-slate-700/80 opacity-75'
                }`}
              >
                {!isHighProb && !isHighRisk && (
                  <span className="absolute -top-2.5 -right-2.5 bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    Posición Actual
                  </span>
                )}
                <div>
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">Cuadrante III</div>
                  <div className="text-xs font-bold text-white mt-1">Bajo Riesgo / Baja Probabilidad</div>
                </div>
                <div className="text-[11px] text-slate-300 mt-2">Zona Marginal (Condicional)</div>
              </div>
            </div>
          </div>

          {/* X-Axis Label */}
          <div className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-4">
            ← Probabilidad de Éxito (Baja &lt; 50% vs Alta ≥ 50%) →
          </div>
        </div>

        {/* Dynamic Analysis & Recommendation Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-5 rounded-2xl border-2 ${quadrantColor} space-y-3 shadow-xs`}>
            <div className="flex items-start gap-2.5">
              {badgeIcon}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base leading-tight">
                  {quadrantTitle}
                </h4>
                <div className="text-xs font-semibold mt-1 opacity-80 flex items-center gap-2">
                  <span>Éxito: {totalProb}%</span>
                  <span>•</span>
                  <span>Riesgo: {(riskRatio * 100).toFixed(1)}% del valor base</span>
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90 pt-2 border-t border-current/10 font-medium">
              {quadrantDesc}
            </p>
          </div>

          {/* Metric Summary Chips */}
          <div className="grid grid-cols-2 gap-3 text-xs font-medium">
            <div className="bg-slate-50 border border-slate-300 p-3 rounded-xl">
              <div className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Estado Probabilidad</div>
              <div className="text-sm font-extrabold text-[#0f172a] mt-0.5">
                {isHighProb ? 'Alta (≥ 50%)' : 'Baja (< 50%)'}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-300 p-3 rounded-xl">
              <div className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Severidad de Riesgo</div>
              <div className="text-sm font-extrabold text-[#0f172a] mt-0.5">
                {isHighRisk ? 'Alto (≥ 15% / Exposición)' : 'Bajo (< 15% / Controlado)'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
