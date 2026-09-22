import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { CurrencyCode, NegotiationRole } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ZopaVisualizerProps {
  userRole: NegotiationRole;
  userPR: number;
  currency: CurrencyCode;
}

export const ZopaVisualizer: React.FC<ZopaVisualizerProps> = ({
  userRole,
  userPR,
  currency,
}) => {
  const isComprador = userRole === 'comprador';

  // Counterpart estimated PR
  // If user is buyer (their ceiling), counterpart is seller (their floor)
  // Default estimate is slightly lower or higher
  const defaultCounterpart = isComprador
    ? Math.round(userPR * 0.85)
    : Math.round(userPR * 1.15);

  const [counterpartPR, setCounterpartPR] = useState<number>(defaultCounterpart);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ZOPA Calculation:
  // Buyer Maximum (Buyer PR) vs Seller Minimum (Seller PR)
  const buyerCeiling = isComprador ? userPR : counterpartPR;
  const sellerFloor = isComprador ? counterpartPR : userPR;

  const zopaRange = buyerCeiling - sellerFloor;
  const hasZopa = zopaRange >= 0;

  return (
    <div id="zopa-section" className="w-full max-w-5xl mx-auto mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        id="zopa-toggle-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left bg-slate-50/60 hover:bg-slate-50 transition cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Simulador ZOPA (Zona de Posible Acuerdo)
            </h3>
            <p className="text-xs text-slate-500">
              Cruza tu Punto de Reserva con el estimado de la contraparte para verificar si existe margen de acuerdo.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${hasZopa ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
            {hasZopa ? 'ZOPA Positiva' : 'Sin Acuerdo (Gap)'}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {isOpen ? 'Ocultar' : 'Expandir'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="p-6 border-t border-slate-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Input for Counterpart PR */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label htmlFor="counterpart-pr-input" className="text-xs font-semibold text-slate-700 block mb-1">
                {isComprador
                  ? 'Piso Estimado del Vendedor (Mínimo que aceptaría)'
                  : 'Techo Estimado del Comprador (Máximo que pagaría)'}
              </label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  id="counterpart-pr-input"
                  type="number"
                  min="0"
                  step="100"
                  value={counterpartPR}
                  onChange={(e) => setCounterpartPR(parseFloat(e.target.value) || 0)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 focus:border-indigo-500 outline-none"
                />
                <span className="text-xs font-semibold text-slate-500">{currency}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Estima este valor investigando los costos, alternativas y presiones de la otra parte.
              </p>
            </div>

            {/* Diagnostic Box */}
            <div className={`p-4 rounded-xl border ${hasZopa ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-rose-50/70 border-rose-200 text-rose-950'}`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {hasZopa ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Existe Zona de Posible Acuerdo (+{formatCurrency(zopaRange, currency)})</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Brecha Negativa de {formatCurrency(Math.abs(zopaRange), currency)}</span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {hasZopa ? (
                  <>
                    El piso del vendedor ({formatCurrency(sellerFloor, currency)}) está por debajo del techo del comprador ({formatCurrency(buyerCeiling, currency)}). Hay un excedente de negociación de <strong>{formatCurrency(zopaRange, currency)}</strong> a repartir.
                  </>
                ) : (
                  <>
                    El piso mínimo del vendedor ({formatCurrency(sellerFloor, currency)}) supera el límite máximo del comprador ({formatCurrency(buyerCeiling, currency)}). No habrá acuerdo racional a menos que una de las partes modifique su BATNA o introduzca nuevas variables de valor.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Visual Bargaining Spectrum */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-slate-600 mb-2 flex justify-between">
              <span>Espectro de Negociación:</span>
              <span>{hasZopa ? 'Espacio de Concesión Viable' : 'Puntos Incompatibles'}</span>
            </div>

            <div className="relative h-10 bg-slate-100 rounded-xl border border-slate-200 flex items-center px-4 overflow-hidden">
              {hasZopa ? (
                <div className="w-full flex items-center justify-between text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Piso Vendedor: <strong>{formatCurrency(sellerFloor, currency)}</strong></span>
                  </div>
                  <div className="px-3 py-1 bg-emerald-200/70 rounded-md font-bold text-emerald-800 text-[11px]">
                    ZOPA: {formatCurrency(zopaRange, currency)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span>Techo Comprador: <strong>{formatCurrency(buyerCeiling, currency)}</strong></span>
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-center justify-between text-xs font-medium text-rose-800">
                  <div>Techo Comprador: <strong>{formatCurrency(buyerCeiling, currency)}</strong></div>
                  <div className="px-2 py-0.5 bg-rose-200 rounded text-[11px] font-bold">
                    Diferencia: {formatCurrency(Math.abs(zopaRange), currency)}
                  </div>
                  <div>Piso Vendedor: <strong>{formatCurrency(sellerFloor, currency)}</strong></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
