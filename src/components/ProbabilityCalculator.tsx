import React from 'react';
import { TrendingUp, ShieldAlert, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { ProbabilityFactors } from '../types';

interface ProbabilityCalculatorProps {
  factors: ProbabilityFactors;
  onChange: (factors: ProbabilityFactors) => void;
}

export const ProbabilityCalculator: React.FC<ProbabilityCalculatorProps> = ({
  factors,
  onChange,
}) => {
  const updateField = (field: keyof ProbabilityFactors, value: number) => {
    onChange({
      ...factors,
      [field]: value,
    });
  };

  // Calculation: sum clamped between 0 and 100
  const rawTotal =
    factors.poder +
    factors.tipo +
    factors.cultura +
    factors.plazos +
    factors.mercado;

  const total = Math.max(0, Math.min(100, rawTotal));

  let statusConfig = {
    badge: 'Condiciones óptimas',
    insight: 'Alta probabilidad. Tienes influencia estructural para cerrar un trato favorable.',
    barBg: 'bg-emerald-500',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: CheckCircle2,
  };

  if (total < 40) {
    statusConfig = {
      badge: 'Alerta de riesgo alto',
      insight: 'Baja probabilidad. Considera retirarte o mejorar tu BATNA antes de seguir.',
      barBg: 'bg-rose-500',
      textColor: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      icon: ShieldAlert,
    };
  } else if (total < 70) {
    statusConfig = {
      badge: 'Escenario balanceado',
      insight: 'Probabilidad moderada. El éxito dependerá de tus concesiones y manejo de expectativas.',
      barBg: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: AlertCircle,
    };
  }

  const StatusIcon = statusConfig.icon;

  return (
    <div
      id="card-probabilidad"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 transition-all hover:shadow-md border-t-4 border-t-blue-500 flex flex-col justify-between"
    >
      <div>
        {/* Title */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 id="title-prob" className="text-xl font-bold text-slate-800 tracking-tight">
              Probabilidad de Éxito
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Ponderación Estructural
          </span>
        </div>

        {/* Inputs */}
        <form id="calc-prob" className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Factor 1: Poder / BATNA */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="poder" className="text-xs font-semibold text-slate-700">
                Quién necesita más el acuerdo (BATNA)
              </label>
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${factors.poder === 40 ? 'bg-emerald-100 text-emerald-800' : factors.poder === 20 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'}`}>
                {factors.poder >= 0 ? `+${factors.poder}%` : `${factors.poder}%`}
              </span>
            </div>
            <select
              id="poder"
              value={factors.poder}
              onChange={(e) => updateField('poder', parseInt(e.target.value, 10))}
              className="prob-input mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            >
              <option value="40">La otra parte lo necesita más (+40%)</option>
              <option value="20">Necesidad equilibrada (+20%)</option>
              <option value="0">Yo lo necesito más (+0%)</option>
            </select>
          </div>

          {/* Factor 2: Tipo de Negociación */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="tipo" className="text-xs font-semibold text-slate-700">
                Tipo de Negociación
              </label>
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${factors.tipo === 15 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                +{factors.tipo}%
              </span>
            </div>
            <select
              id="tipo"
              value={factors.tipo}
              onChange={(e) => updateField('tipo', parseInt(e.target.value, 10))}
              className="prob-input mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            >
              <option value="15">Comercial (Alta flexibilidad) (+15%)</option>
              <option value="10">Social (Complejidad media) (+10%)</option>
              <option value="5">Político (Alta rigidez) (+5%)</option>
            </select>
          </div>

          {/* Factor 3: Afinidad Cultural */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="cultura" className="text-xs font-semibold text-slate-700">
                Afinidad Cultural / Edad
              </label>
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${factors.cultura === 15 ? 'bg-emerald-100 text-emerald-800' : factors.cultura === 5 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'}`}>
                +{factors.cultura}%
              </span>
            </div>
            <select
              id="cultura"
              value={factors.cultura}
              onChange={(e) => updateField('cultura', parseInt(e.target.value, 10))}
              className="prob-input mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            >
              <option value="15">Alta (Similitudes fuertes) (+15%)</option>
              <option value="5">Media (Diferencias manejables) (+5%)</option>
              <option value="0">Baja (Brecha amplia) (+0%)</option>
            </select>
          </div>

          {/* Factor 4: Presión de Plazos */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="plazos" className="text-xs font-semibold text-slate-700">
                Presión de Plazos
              </label>
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${factors.plazos === 15 ? 'bg-emerald-100 text-emerald-800' : factors.plazos === 5 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                {factors.plazos >= 0 ? `+${factors.plazos}%` : `${factors.plazos}%`}
              </span>
            </div>
            <select
              id="plazos"
              value={factors.plazos}
              onChange={(e) => updateField('plazos', parseInt(e.target.value, 10))}
              className="prob-input mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            >
              <option value="15">Sin presión de tiempo (+15%)</option>
              <option value="5">Presión moderada (+5%)</option>
              <option value="-10">Tengo el tiempo en contra (-10%)</option>
            </select>
          </div>

          {/* Factor 5: Condiciones del Mercado */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="mercado" className="text-xs font-semibold text-slate-700">
                Condiciones del Mercado
              </label>
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${factors.mercado === 15 ? 'bg-emerald-100 text-emerald-800' : factors.mercado === 5 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                {factors.mercado >= 0 ? `+${factors.mercado}%` : `${factors.mercado}%`}
              </span>
            </div>
            <select
              id="mercado"
              value={factors.mercado}
              onChange={(e) => updateField('mercado', parseInt(e.target.value, 10))}
              className="prob-input mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            >
              <option value="15">Estables y predecibles (+15%)</option>
              <option value="5">Volatilidad moderada (+5%)</option>
              <option value="-5">Cambiantes / Riesgo alto (-5%)</option>
            </select>
          </div>
        </form>
      </div>

      {/* Result Section */}
      <div className="result-prob mt-6 pt-5 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Pronóstico de Cierre
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.textColor}`}>
            {statusConfig.badge}
          </span>
        </div>

        {/* Large Score Display */}
        <div className="flex items-baseline justify-center gap-2">
          <div id="display-prob" className="score text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            {total}%
          </div>
          <span className="text-sm font-semibold text-slate-500">éxito estimado</span>
        </div>

        {/* Progress Bar */}
        <div className="progress w-full bg-slate-100 h-4 rounded-full overflow-hidden mt-4 p-0.5 border border-slate-200/60 shadow-inner">
          <div
            id="bar-prob"
            className={`bar h-full rounded-full transition-all duration-500 ${statusConfig.barBg}`}
            style={{ width: `${total}%` }}
          />
        </div>

        {/* Tactical Insight */}
        <div
          id="insight-prob"
          className={`insight mt-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm text-left leading-relaxed ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.textColor}`}
        >
          <StatusIcon className="w-4 h-4 shrink-0 mt-0.5" />
          <div>{statusConfig.insight}</div>
        </div>
      </div>
    </div>
  );
};
