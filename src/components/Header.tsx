import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  Layers,
  Coins,
  ShieldCheck,
  Building2,
  TrendingUp,
  Globe2,
  Award
} from 'lucide-react';
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
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPresetId(val);
    const found = PRESET_SCENARIOS.find((p) => p.id === val);
    if (found) {
      onSelectPreset(found);
    }
  };

  const handleResetClick = () => {
    setSelectedPresetId('');
    onReset();
  };

  const categories = Array.from(
    new Set(PRESET_SCENARIOS.map((p) => p.category || 'General'))
  );

  return (
    <header id="main-header" className="w-full max-w-5xl mx-auto mb-8 space-y-6">
      {/* Corporate Top Announcement / Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-700 tracking-tight">
            PLATAFORMA DIRECTIVA DE NEGOCIACIÓN ESTRATÉGICA
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-slate-500">
            Metodología Harvard PON &amp; Modelos Transculturales
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 font-medium ml-auto">
          <div className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            <span>Entorno Seguro &amp; Confidencial</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden md:inline">
            v3.4 Enterprise
          </span>
        </div>
      </div>

      {/* Corporate Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-50/90 text-slate-800 shadow-xs border-2 border-slate-200/90 p-6 sm:p-7">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f172a] border border-slate-800 text-slate-200 text-xs font-bold tracking-wide uppercase">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              Inteligencia &amp; Consultoría Corporativa
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-800 text-xs font-semibold">
              <Award className="w-3 h-3 text-amber-600" />
              Estándar Internacional
            </span>
          </div>

          <h1 id="header-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight">
            Suite Corporativa de Estrategia de Negociación
          </h1>
          <p className="mt-2 text-slate-600 max-w-3xl text-xs sm:text-sm lg:text-base leading-relaxed font-normal">
            Herramienta ejecutiva para modelar la viabilidad de acuerdos, calcular matemáticamente el Punto de Reserva (PR), proyectar excedentes ZOPA y comparar negociaciones entre países evaluando factores generacionales, geopolíticos y volatilidad de mercado.
          </p>

          {/* Corporate KPI / Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-300/80">
            <div className="bg-white hover:bg-slate-100/80 transition-colors p-3 rounded-xl border border-slate-300/90 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#1e3a8a]" />
                Escenarios B2B
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0f172a] mt-0.5">70 Modelos</div>
              <div className="text-[10px] text-slate-500">M&amp;A, TI, Suministros</div>
            </div>

            <div className="bg-white hover:bg-slate-100/80 transition-colors p-3 rounded-xl border border-slate-300/90 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-[#1e3a8a]" />
                Países &amp; Culturas
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0f172a] mt-0.5">12 Potencias</div>
              <div className="text-[10px] text-slate-500">Américas, Europa, Asia</div>
            </div>

            <div className="bg-white hover:bg-slate-100/80 transition-colors p-3 rounded-xl border border-slate-300/90 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#1e3a8a]" />
                Mercado Dinámico
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0f172a] mt-0.5">5 Contingencias</div>
              <div className="text-[10px] text-slate-500">Inflación, Forex, Escasez</div>
            </div>

            <div className="bg-white hover:bg-slate-100/80 transition-colors p-3 rounded-xl border border-slate-300/90 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1e3a8a]" />
                Metodología
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0f172a] mt-0.5">Harvard PON</div>
              <div className="text-[10px] text-slate-500">BATNA &amp; ZOPA Formal</div>
            </div>
          </div>
        </div>

        {/* Subtle decorative background watermark */}
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-slate-900">
          <Building2 className="w-72 h-72" />
        </div>
      </div>

      {/* Executive Control bar: Presets, Currency, and Actions */}
      <div id="header-controls" className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-xs p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Preset scenarios dropdown */}
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
          <label htmlFor="preset-select" className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
            <Layers className="w-4 h-4 text-[#1e3a8a]" />
            <span>Matriz Contractual:</span>
            <span className="bg-slate-200 text-[#0f172a] border border-slate-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
              70
            </span>
          </label>
          <div className="relative flex-1 min-w-[240px] sm:min-w-[340px] md:min-w-[420px]">
            <select
              id="preset-select"
              value={selectedPresetId}
              onChange={handlePresetChange}
              className="w-full text-xs sm:text-sm font-semibold pl-3 pr-8 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-white focus:bg-white text-slate-800 hover:border-[#0f172a] focus:border-[#0f172a] focus:ring-2 focus:ring-slate-200 outline-none transition cursor-pointer appearance-none shadow-xs truncate"
            >
              <option value="">Seleccionar escenario empresarial (70 plantillas preconfiguradas)...</option>
              {categories.map((cat) => (
                <optgroup key={cat} label={`── ${cat} (${PRESET_SCENARIOS.filter((p) => (p.category || 'General') === cat).length}) ──`} className="font-bold text-slate-900 bg-slate-100">
                  {PRESET_SCENARIOS.filter((p) => (p.category || 'General') === cat).map((preset) => (
                    <option key={preset.id} value={preset.id} className="font-medium text-slate-700 bg-white">
                      {preset.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Currency and Utility Actions */}
        <div className="flex items-center gap-2.5 ml-auto flex-wrap sm:flex-nowrap">
          {/* Currency Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 shadow-2xs">
            <Coins className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <label htmlFor="currency-selector" className="text-[11px] font-bold text-slate-600 uppercase tracking-wide whitespace-nowrap">
              Moneda:
            </label>
            <select
              id="currency-selector"
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-transparent text-xs font-extrabold text-[#0f172a] outline-none cursor-pointer pr-1"
            >
              {Object.values(CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Copy Report */}
          <button
            id="copy-report-btn"
            type="button"
            onClick={onCopyReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white transition shadow-sm cursor-pointer"
            title="Copiar diagnóstico para reunión de comité directivo"
          >
            {hasCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>¡Informe Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white" />
                <span>Copiar Memorando Ejecutivo</span>
              </>
            )}
          </button>

          {/* Reset */}
          <button
            id="reset-btn"
            type="button"
            onClick={handleResetClick}
            className="inline-flex items-center p-2 rounded-xl text-slate-500 hover:text-[#0f172a] hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-200"
            title="Restablecer valores originales"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

