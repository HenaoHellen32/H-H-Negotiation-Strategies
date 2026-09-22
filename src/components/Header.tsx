import React from 'react';
import { Sparkles, RotateCcw, Copy, Check, DollarSign } from 'lucide-react';
import { CurrencyCode, PresetScenario } from '../types';
import { PRESET_SCENARIOS } from '../data/presets';
import { CURRENCIES } from '../utils/formatters';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onSelectPreset: (preset: PresetScenario) => void;
  onReset: () => void;
  onCopyReport: () => void;
  hasCopied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  onSelectPreset,
  onReset,
  onCopyReport,
  hasCopied,
}) => {
  return (
    <header id="main-header" className="w-full max-w-5xl mx-auto mb-8">
      {/* Title & Tagline */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Framework de Negociación Harvard & BATNA</span>
        </div>
        <h1 id="header-title" className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Suite de Estrategia de Negociación
        </h1>
        <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Evalúa la viabilidad estructural de tu acuerdo y calcula matemáticamente tu Punto de Reserva (PR) para saber con certeza cuándo cerrar y cuándo levantarte de la mesa.
        </p>
      </div>

      {/* Control bar: Presets, Currency, and Actions */}
      <div id="header-controls" className="bg-white rounded-xl border border-slate-200 shadow-sm p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Preset scenarios */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
            Plantillas:
          </span>
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              id={`preset-btn-${preset.id}`}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-slate-700 transition cursor-pointer"
              title={preset.tagline}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Currency and Utility Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Currency Selector */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <DollarSign className="w-3.5 h-3.5 text-slate-500 mr-1" />
            <select
              id="currency-selector"
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-transparent text-xs font-medium text-slate-700 outline-none cursor-pointer"
            >
              {Object.values(CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} ({curr.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Copy Report */}
          <button
            id="copy-report-btn"
            type="button"
            onClick={onCopyReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm cursor-pointer"
            title="Copiar diagnóstico para reunión"
          >
            {hasCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white" />
                <span>Copiar Diagnóstico</span>
              </>
            )}
          </button>

          {/* Reset */}
          <button
            id="reset-btn"
            type="button"
            onClick={onReset}
            className="inline-flex items-center p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            title="Restablecer valores por defecto"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
