# Suite de Estrategia de Negociación (H-H Negotiation Strategies)

Una aplicación web analítica e interactiva diseñada para la preparación estratégica de negociaciones basadas en el **Modelo de Negociación de Harvard** (*Fisher, Ury & Patton*), el análisis de **BATNA** (*Best Alternative to a Negotiated Agreement*), el cálculo matemático del **Punto de Reserva (PR)** y la simulación visual de la **ZOPA** (*Zone of Possible Agreement*).

---

## 🎯 Módulos Principales

### 1. Calculadora de Probabilidad de Éxito
Evalúa la viabilidad estructural y el equilibrio de poder de la mesa de negociación a través de 5 factores ponderados:
- **Balance de Poder / BATNA**: Quién depende más del acuerdo (+40%, +20%, +0%).
- **Tipo de Negociación**: Comercial (alta flexibilidad), Social (media) o Política (alta rigidez).
- **Afinidad Cultural y Generacional**: Similitudes y canales de empatía (+15%, +5%, +0%).
- **Presión de Plazos**: Disponibilidad de tiempo vs. urgencia del reloj (+15%, +5%, -10%).
- **Condiciones de Mercado**: Predictibilidad y oferta alternativa (+15%, +5%, -5%).

Incluye diagnóstico táctico automático según el resultado obtenido:
- **$\ge 70\%$ (Óptima / Fuerte influencia)**: Recomendaciones para maximizar valor y liderar la propuesta.
- **$40\% - 69\%$ (Moderada / Equilibrada)**: Estrategia de concesiones condicionales y ampliación de variables.
- **$< 40\%$ (Alerta de Riesgo)**: Advertencia de desbalance estructural; recomendación de fortalecer el BATNA antes de negociar.

---

### 2. Cálculo del Punto de Reserva (PR)
Calcula con precisión matemática el valor mínimo o máximo racional para evitar cerrar acuerdos desfavorables:

- **Rol Comprador (Techo Máximo a Pagar)**:
  $$\text{PR}_{\text{Comprador}} = \text{Base BATNA} + \text{Costos de Transición} + \text{Valor del Riesgo}$$
  *Regla:* Si la oferta de la contraparte supera este límite, resulta más rentable retirarse y ejecutar la alternativa (BATNA).

- **Rol Vendedor (Piso Mínimo a Aceptar)**:
  $$\text{PR}_{\text{Vendedor}} = \text{Base BATNA} - \text{Costos de Transición} - \text{Valor del Riesgo}$$
  *Regla:* Si la oferta de la contraparte está por debajo de este límite, destruye valor frente a la alternativa disponible.

---

### 3. Simulador ZOPA (Zona de Posible Acuerdo)
Permite contrastar tu Punto de Reserva con el límite estimado de la contraparte:
- **ZOPA Positiva**: Detecta el excedente de negociación a distribuir.
- **ZOPA Negativa (Brecha)**: Identifica cuándo las posiciones son incompatibles en las condiciones actuales.

---

### 4. Utilidades Ejecutivas
- **Escenarios Preconfigurados**: Plantillas para *Contrato SaaS*, *Negociación Salarial*, *Venta Inmobiliaria* y *Adquisición de Equipos*.
- **Soporte Multidivisa**: USD (\$), EUR (€), MXN (\$), COP (\$).
- **Copia de Memorando**: Exporta en un solo clic un reporte estructurado para reuniones y comités de decisión.

---

## 🚀 Tecnologías

- **Framework**: [React 19](https://react.dev/) con [Vite](https://vitejs.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Animaciones**: [Motion](https://motion.dev/)

---

## 🛠️ Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/HenaoHellen32/H-H-Negotiation-Strategies.git

# 2. Entrar al directorio
cd H-H-Negotiation-Strategies

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Construcción para Producción
```bash
npm run build
```

---

## 📚 Referencia Teórica
- Fisher, R., Ury, W. L., & Patton, B. (2011). *Getting to Yes: Negotiating Agreement Without Giving In*. Penguin.
- Harvard Program on Negotiation (PON). *BATNA: Best Alternative to a Negotiated Agreement*.
