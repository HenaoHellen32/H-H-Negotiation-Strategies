/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProbabilityCalculator } from './components/ProbabilityCalculator';
import { ReservationPointCalculator } from './components/ReservationPointCalculator';
import { ZopaVisualizer } from './components/ZopaVisualizer';
import { CurrencyCode, PresetScenario, ProbabilityFactors, ReservationPointState } from './types';
import { formatCurrency } from './utils/formatters';
import { BookOpen, CheckCircle, ExternalLink } from 'lucide-react';

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

export default function App() {
  const [factors, setFactors] = useState<ProbabilityFactors>(DEFAULT_FACTORS);
  const [reservationPoint, setReservationPoint] = useState<ReservationPointState>(DEFAULT_PR);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const handleSelectPreset = (preset: PresetScenario) => {
    setFactors(preset.probFactors);
    setReservationPoint(preset.reservationPoint);
  };

  const handleReset = () => {
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
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header with Navigation & Presets */}
      <Header
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onCopyReport={handleCopyReport}
        hasCopied={hasCopied}
      />

      {/* Main Container with 2 Core Calculators */}
      <main className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        <ProbabilityCalculator
          factors={factors}
          onChange={setFactors}
        />

        <ReservationPointCalculator
          state={reservationPoint}
          currency={currency}
          onChange={setReservationPoint}
        />
      </main>

      {/* Collapsible ZOPA Simulator */}
      <ZopaVisualizer
        userRole={reservationPoint.rol}
        userPR={prTotal}
        currency={currency}
      />

      {/* Educational Footer with Methodological Reference */}
      <footer id="main-footer" className="max-w-5xl mx-auto mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>Modelo Harvard de Negociación (Fisher, Ury & Patton)</span>
          </div>
          <span>•</span>
          <span>BATNA: Mejor Alternativa a un Acuerdo Negociado</span>
          <span>•</span>
          <span>PR: Punto de Salida Racional</span>
        </div>
        <p className="text-slate-400">
          © {new Date().getFullYear()} Suite de Estrategia de Negociación. Diseñado para preparación ejecutiva y toma de decisiones objetiva.
        </p>
      </footer>
    </div>
  );
}
