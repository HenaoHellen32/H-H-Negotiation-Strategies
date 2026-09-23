/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProbabilityCalculator } from './components/ProbabilityCalculator';
import { ReservationPointCalculator } from './components/ReservationPointCalculator';
import { ZopaVisualizer } from './components/ZopaVisualizer';
import { CountryComparisonTool } from './components/CountryComparisonTool';
import { RiskProbabilityMatrix } from './components/RiskProbabilityMatrix';
import { CurrencyCode, PresetScenario, ProbabilityFactors, ReservationPointState } from './types';
import { formatCurrency } from './utils/formatters';
import { BookOpen, CheckCircle, ExternalLink, Globe, Sliders, ShieldCheck, Building2 } from 'lucide-react';

const DEFAULT_FACTORS: ProbabilityFactors = {
  poder: 20,
  tipo: 15,
  cultura: 15,
  plazos: 15,
  mercado: 15,
};

const DEFAULT_PR: ReservationPointState = {
  rol: 'comprador',
  base: 10000,
  transicion: 800,
  riesgo: 500,
};

type ActiveViewTab = 'harvard' | 'comparador';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveViewTab>('comparador');
  const [factors, setFactors] = useState<ProbabilityFactors>(DEFAULT_FACTORS);
  const [reservationPoint, setReservationPoint] = useState<ReservationPointState>(DEFAULT_PR);
  const [activePreset, setActivePreset] = useState<PresetScenario | null>(null);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const handleSelectPreset = (preset: PresetScenario) => {
    setActivePreset(preset);
    setFactors(preset.probFactors);
    setReservationPoint(preset.reservationPoint);
  };

  const handleReset = () => {
    setActivePreset(null);
    setFactors(DEFAULT_FACTORS);
    setReservationPoint(DEFAULT_PR);
    setCurrency('USD');
  };

  // Calculations for summary report
  const rawProb =
    factors.poder +
    factors.tipo +
    factors.cultura +
    factors.plazos +
    factors.mercado;
  const totalProb = Math.max(0, Math.min(100, rawProb));

  const isComprador = reservationPoint.rol === 'comprador';
  const prTotal = isComprador
    ? (reservationPoint.base || 0) + (reservationPoint.transicion || 0) + (reservationPoint.riesgo || 0)
    : Math.max(0, (reservationPoint.base || 0) - (reservationPoint.transicion || 0) - (reservationPoint.riesgo || 0));

  const handleCopyReport = () => {
    const probLabel =
      totalProb >= 70
        ? 'Alta (Ventaja estructural)'
        : totalProb >= 40
        ? 'Moderada (Dependiente de concesiones)'
        : 'Baja (Riesgo alto / Mejorar BATNA)';

    const prLabel = isComprador
      ? `Límite Máximo a Pagar: ${formatCurrency(prTotal, currency)}`
      : `Límite Mínimo a Aceptar: ${formatCurrency(prTotal, currency)}`;

    const memo = `================================================
MEMORANDO DE ESTRATEGIA DE NEGOCIACIÓN
================================================
1. PROBABILIDAD DE ÉXITO: ${totalProb}% [${probLabel}]
- Factor BATNA / Necesidad: ${factors.poder >= 0 ? `+${factors.poder}%` : `${factors.poder}%`}
- Tipo de Negociación: +${factors.tipo}%
- Afinidad Cultural: +${factors.cultura}%
- Presión de Plazos: ${factors.plazos >= 0 ? `+${factors.plazos}%` : `${factors.plazos}%`}
- Condiciones de Mercado: ${factors.mercado >= 0 ? `+${factors.mercado}%` : `${factors.mercado}%`}

2. PUNTO DE RESERVA (PR):
- Rol: ${isComprador ? 'Comprador (Buscando pagar menos)' : 'Vendedor (Buscando cobrar más)'}
- Valor Base del BATNA: ${formatCurrency(reservationPoint.base, currency)}
- Costos de Transición: ${formatCurrency(reservationPoint.transicion, currency)}
- Valor Monetario del Riesgo: ${formatCurrency(reservationPoint.riesgo, currency)}
- ${prLabel}

REGLA DE SALIDA (WALK-AWAY):
${
  isComprador
    ? `No cerrar ningún trato por encima de ${formatCurrency(prTotal, currency)}. Si la contraparte exige más, retirarse y ejecutar el BATNA.`
    : `No cerrar ningún trato por debajo de ${formatCurrency(prTotal, currency)}. Si la contraparte ofrece menos, retirarse y ejecutar el BATNA.`
}
================================================`;

    navigator.clipboard.writeText(memo);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  return (
    <div id="corporate-portal" className="min-h-screen bg-slate-100/80 text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Institutional Corporate Top Navbar */}
      <nav id="corporate-navbar" className="w-full bg-[#0f172a] text-slate-200 border-b border-slate-800 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-xs ring-1 ring-blue-400/40">
              NS
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                NEGOCIA STRATEGY <span className="text-blue-400 font-semibold text-xs tracking-wider">PORTAL</span>
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:block font-medium tracking-wide">
                División de Inteligencia Estratégica y Resolución de Disputas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 text-xs">
            <div className="hidden md:flex items-center gap-4 text-slate-300 font-medium">
              <span className="hover:text-white transition flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Seguridad Ejecutiva
              </span>
              <span className="hover:text-white transition flex items-center gap-1 text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                Comités M&amp;A / B2B
              </span>
            </div>

            <div className="flex items-center gap-2 border-l border-slate-700/80 pl-3 sm:pl-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                SSL 256-Bit • Activo
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Body with Corporate Spacing */}
      <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-6">
        {/* Header with Navigation & Presets */}
        <Header
          currentCurrency={currency}
          onCurrencyChange={setCurrency}
          onSelectPreset={handleSelectPreset}
          onReset={handleReset}
          onCopyReport={handleCopyReport}
          hasCopied={hasCopied}
        />

        {/* Corporate Segmented Navigation Tabs */}
        <div className="w-full max-w-5xl mx-auto mb-6">
          <div className="bg-slate-200/90 p-1.5 rounded-xl border border-slate-300 shadow-inner flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
            <button
              type="button"
              id="tab-comparador-paises"
              onClick={() => setActiveTab('comparador')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'comparador'
                  ? 'bg-[#0f172a] text-white shadow-sm border border-[#0f172a]'
                  : 'text-slate-700 hover:text-[#0f172a] hover:bg-slate-300/70'
              }`}
            >
              <Globe className={`w-4 h-4 ${activeTab === 'comparador' ? 'text-blue-300' : 'text-[#1e3a8a]'}`} />
              <span>Comparador Internacional entre Países</span>
              <span
                className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                  activeTab === 'comparador'
                    ? 'bg-[#1e293b] text-blue-200 border border-slate-700'
                    : 'bg-slate-300 text-slate-700'
                }`}
              >
                Multivariable
              </span>
            </button>

            <button
              type="button"
              id="tab-modelo-harvard"
              onClick={() => setActiveTab('harvard')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'harvard'
                  ? 'bg-[#0f172a] text-white shadow-sm border border-[#0f172a]'
                  : 'text-slate-700 hover:text-[#0f172a] hover:bg-slate-300/70'
              }`}
            >
              <Sliders className={`w-4 h-4 ${activeTab === 'harvard' ? 'text-blue-300' : 'text-[#1e3a8a]'}`} />
              <span className="bg-[#5c7a84] text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                Modelo Harvard &amp; ZOPA (BATNA y Punto de Reserva)
              </span>
            </button>
          </div>
        </div>

        {activeTab === 'comparador' ? (
          /* International Country Comparison View */
          <main className="w-full max-w-5xl mx-auto">
            <CountryComparisonTool
              currentCurrency={currency}
              onCurrencyChange={setCurrency}
            />
          </main>
        ) : (
          /* Original Harvard & ZOPA View */
          <>
            <main className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              <ProbabilityCalculator
                factors={factors}
                onChange={setFactors}
              />

              <ReservationPointCalculator
                state={reservationPoint}
                currency={currency}
                activePreset={activePreset}
                onCurrencyChange={setCurrency}
                onChange={setReservationPoint}
              />
            </main>

            {/* Collapsible ZOPA Simulator */}
            <ZopaVisualizer
              userRole={reservationPoint.rol}
              userPR={prTotal}
              currency={currency}
            />

            {/* Visual 2x2 Risk-Probability Matrix Component */}
            <RiskProbabilityMatrix
              totalProb={totalProb}
              riskAmount={reservationPoint.riesgo}
              baseValue={reservationPoint.base}
              currency={currency}
            />
          </>
        )}
      </div>

      {/* Corporate Educational & Compliance Footer */}
      <footer id="main-footer" className="w-full border-t border-slate-200/90 bg-white mt-16 pt-10 pb-8 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-100 text-left">
            <div>
              <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Marco Metodológico</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Basado en los principios del Program on Negotiation (PON) de Harvard Law School (Fisher, Ury &amp; Patton), teoría de juegos y modelos interculturales de Hofstede.
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Uso Directivo y Confidencial</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Los cálculos y memorandos generados son para uso exclusivo de comités de negociación, directores de compras, equipos legales y juntas directivas.
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-700" />
                <span>Normas de Gobernanza</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Diseñado para mitigar asimetrías de información, prevenir cierres precipitados bajo presión y blindar puntos de salida racionales (Walk-Away Price).
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-slate-400">
            <div>
              © {new Date().getFullYear()} NEGOCIA STRATEGY GROUP • Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-4">
              <span>BATNA Analytics</span>
              <span>•</span>
              <span>ZOPA Engine</span>
              <span>•</span>
              <span>Global Protocol</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
