import { PresetScenario } from '../types';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'proveedor-saas',
    name: 'Contrato de Proveedor Tech',
    tagline: 'Comprador corporativo renovando licencias',
    probFactors: {
      poder: 40,   // La otra parte lo necesita más
      tipo: 15,    // Comercial (flexibilidad alta)
      cultura: 15, // Alta afinidad
      plazos: 15,  // Sin presión de tiempo
      mercado: 15, // Mercado predecible y competitivo
    },
    reservationPoint: {
      rol: 'comprador',
      base: 15000,
      transicion: 1200,
      riesgo: 800,
    },
  },
  {
    id: 'negociacion-salarial',
    name: 'Negociación Salarial / Honorarios',
    tagline: 'Profesional valorando nueva oferta vs trabajo actual',
    probFactors: {
      poder: 20,   // Necesidad equilibrada
      tipo: 15,    // Comercial / Profesional
      cultura: 15, // Alta afinidad
      plazos: 5,   // Presión moderada
      mercado: 5,  // Volatilidad moderada
    },
    reservationPoint: {
      rol: 'vendedor', // El candidato vende su tiempo/talento
      base: 65000,
      transicion: 3500, // Costo de cambio, seguro, curva de aprendizaje
      riesgo: 2500,     // Riesgo de estabilidad o ambiente
    },
  },
  {
    id: 'venta-inmueble',
    name: 'Venta de Inmueble / Activo',
    tagline: 'Propietario vendiendo con oferta alternativa en mano',
    probFactors: {
      poder: 20,   // Necesidad equilibrada
      tipo: 15,    // Comercial
      cultura: 5,  // Afinidad media
      plazos: -10, // Presión de tiempo
      mercado: 5,  // Mercado con cierta variación
    },
    reservationPoint: {
      rol: 'vendedor',
      base: 180000,
      transicion: 6500, // Gastos de mudanza, notariales, comisiones
      riesgo: 4000,     // Riesgo de demora o caída de compradores
    },
  },
  {
    id: 'adquisicion-equipo',
    name: 'Compra de Maquinaria / Equipamiento',
    tagline: 'Comprador buscando proveedor para flota industrial',
    probFactors: {
      poder: 20,
      tipo: 15,
      cultura: 15,
      plazos: 15,
      mercado: 15,
    },
    reservationPoint: {
      rol: 'comprador',
      base: 10000,
      transicion: 800,
      riesgo: 500,
    },
  },
];
