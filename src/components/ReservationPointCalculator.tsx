import React from 'react';
import { ArrowDownRight, ArrowUpRight, Info, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { CurrencyCode, NegotiationRole, ReservationPointState } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ReservationPointCalculatorProps {
  state: ReservationPointState;
  currency: CurrencyCode;
  onChange: (state: ReservationPointState) => void;
}

export const ReservationPointCalculator: React.FC<ReservationPointCalculatorProps> = ({
  state,
  currency,
  onChange,
}) => {
  const isComprador = state.rol === 'comprador';

  const updateField = (field: keyof ReservationPointState, value: any) => {
    onChange({
      ...state,
      [field]: value,
    });
  };

  const base = Math.max(0, state.base || 0);
  const transicion = Math.max(0, state.transicion || 0);
  const riesgo = Math.max(0, state.riesgo || 0);

  // Comprador: PR = Base + Transición + Riesgo
  // Vendedor: PR = Base - Transición - Riesgo
  const prTotal = isComprador
    ? base + transicion + riesgo
    : Math.max(0, base - transicion - riesgo);

  const formattedBase = formatCurrency(base, currency);
  const formattedTrans = formatCurrency(transicion, currency);
  const formattedRiesgo = formatCurrency(riesgo, currency);
  const formattedPR = formatCurrency(prTotal, currency);

  const formulaText = isComprador
    ? `Desglose: ${formattedBase} (Base) + ${formattedTrans} (Transición) + ${formattedRiesgo} (Riesgo)`
    : `Desglose: ${formattedBase} (Base) - ${formattedTrans} (Transición) - ${formattedRiesgo} (Riesgo)`;

  const labelText = isComprador
    ? 'Límite Máximo a Pagar (No pagues más de esto):'
    : 'Límite Mínimo a Aceptar (No aceptes menos de esto):';

  return (
    <div
      id="card-punto-reserva"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 transition-all hover:shadow-md border-t-4 border-t-emerald-500 flex flex-col justify-between"
    >
      <div>
        {/* Title */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 id="title-pr" className="text-xl font-bold text-slate-800 tracking-tight">
              Cálculo del Punto de Reserva (PR)
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Límite de Salida (Walk-Away)
          </span>
        </div>

        {/* Inputs */}
        <form id="calc-pr" className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Role selector */}
          <div>
            <label htmlFor="rol-pr" className="text-xs font-semibold text-slate-700 block">
              Tu Rol en la Negociación
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <button
                type="button"
                id="role-btn-comprador"
                onClick={() => updateField('rol', 'comprador')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  isComprador
                    ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ArrowDownRight className="w-3.5 h-3.5 text-blue-600" />
                <span>Comprador (Techo)</span>
              </button>

              <button
                type="button"
                id="role-btn-vendedor"
                onClick={() => updateField('rol', 'vendedor')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  !isComprador
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                <span>Vendedor (Piso)</span>
              </button>
            </div>

            {/* Hidden native select for compatibility with tests / original HTML ids */}
            <select
              id="rol-pr"
              className="pr-input sr-only"
              value={state.rol}
              onChange={(e) => updateField('rol', e.target.value as NegotiationRole)}
            >
              <option value="comprador">Comprador (Busco pagar menos)</option>
              <option value="vendedor">Vendedor (Busco cobrar más)</option>
            </select>
          </div>

          {/* Base BATNA */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="base-pr" className="text-xs font-semibold text-slate-700">
                Valor Base de tu BATNA ({currency})
              </label>
              <span className="text-[11px] text-slate-500 font-normal">
                Tu mejor alternativa fuera de esta mesa
              </span>
            </div>
            <div className="relative mt-1.5">
              <input
                type="number"
                id="base-pr"
                className="pr-input w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                value={state.base}
                min="0"
                step="100"
                onChange={(e) => updateField('base', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Costos de Transición */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="transicion-pr" className="text-xs font-semibold text-slate-700">
                Costos de Transición ({currency})
              </label>
              <span className="text-[11px] text-slate-500 font-normal">
                Penalidades, adaptación, tiempo
              </span>
            </div>
            <input
              type="number"
              id="transicion-pr"
              className="pr-input mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              value={state.transicion}
              min="0"
              step="50"
              onChange={(e) => updateField('transicion', parseFloat(e.target.value) || 0)}
            />
          </div>

          {/* Valor Monetario del Riesgo */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="riesgo-pr" className="text-xs font-semibold text-slate-700">
                Valor Monetario del Riesgo ({currency})
              </label>
              <span className="text-[11px] text-slate-500 font-normal">
                Impacto por demoras, peor calidad
              </span>
            </div>
            <input
              type="number"
              id="riesgo-pr"
              className="pr-input mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              value={state.riesgo}
              min="0"
              step="50"
              onChange={(e) => updateField('riesgo', parseFloat(e.target.value) || 0)}
            />
          </div>
        </form>
      </div>

      {/* Result Section */}
      <div className="result-pr mt-6 pt-5 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-center">
          <div
            id="pr-label"
            className="text-xs font-semibold text-slate-600 uppercase tracking-wider"
          >
            {labelText}
          </div>

          <div
            id="display-pr"
            className="pr-amount text-4xl sm:text-5xl font-extrabold text-slate-900 my-2 tracking-tight"
          >
            {formattedPR}
          </div>

          <div
            id="formula-pr"
            className="pr-formula text-xs sm:text-sm text-slate-600 bg-white py-1.5 px-3 rounded-lg border border-slate-200 inline-block font-mono"
          >
            {formulaText}
          </div>
        </div>

        {/* Rule of thumb advice */}
        <div className="mt-3 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2 text-left">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Regla de Oro:</strong>{' '}
            {isComprador ? (
              <span>
                Cualquier oferta del vendedor por encima de <strong>{formattedPR}</strong> destruye valor. En ese caso, retírate y ejecuta tu BATNA.
              </span>
            ) : (
              <span>
                Cualquier oferta del comprador por debajo de <strong>{formattedPR}</strong> te deja en peor posición que tu alternativa. Nunca aceptes por debajo de este piso.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
