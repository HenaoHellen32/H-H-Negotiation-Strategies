import { CountryProfile } from '../types';

export const COUNTRIES: CountryProfile[] = [
  {
    id: 'US',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    region: 'Norteamérica',
    communicationStyle: 'directa',
    communicationLabel: 'Directa y Explícita (Bajo Contexto)',
    communicationDesc: 'Va directo al grano. "El tiempo es dinero". Se espera franqueza, datos concretos y claridad en los objetivos sin rodeos.',
    trustBasis: 'tarea',
    trustLabel: 'Basada en la Tarea y Legalidad',
    trustDesc: 'La confianza se construye con competencia técnica, cumplimiento de plazos y contratos blindados. Pocas reuniones sociales previas requeridas.',
    hierarchyStyle: 'egalitaria',
    hierarchyLabel: 'Egalitaria y Pragmática',
    bargainingNorm: 'moderado',
    bargainingMarginPercent: 10,
    bargainingDesc: 'Esperan propuestas iniciales realistas. El regateo excesivo puede verse como falta de seriedad o pérdida de tiempo.',
    timeOrientation: 'monocronico',
    timeLabel: 'Monocrónico (Puntualidad Absoluta)',
    paceOfNegotiation: 'rapido',
    paceLabel: 'Rápido y Orientado al Cierre',
    keyTactics: [
      'Presentar datos financieros y ROI en los primeros 10 minutos.',
      'Llegar con un borrador de términos (Term Sheet) claro.',
      'Separar el problema personal de los intereses del negocio.'
    ],
    taboos: [
      'Llegar tarde o improvisar cifras.',
      'Hacer promesas verbales sin respaldo contractual.',
      'Reabrir puntos ya acordados sin justificación económica.'
    ],
    roleBehavior: {
      comercial: 'Foco total en márgenes netos, escalabilidad, SLAs y penalizaciones por incumplimiento.',
      politico: 'Enfoque en pragmatismo de poder, resultados medibles y comunicación ante medios.',
      social: 'Orientación a responsabilidad corporativa (ESG), impacto comunitario cuantificable y cumplimiento legal estricto.',
      gubernamental: 'Licitaciones altamente reglamentadas, auditoría transparente y cumplimiento anticorrupción (FCPA).'
    }
  },
  {
    id: 'DE',
    name: 'Alemania',
    flag: '🇩🇪',
    region: 'Europa',
    communicationStyle: 'formal_analitica',
    communicationLabel: 'Analítica, Sistemática y Rigurosa',
    communicationDesc: 'Comunicación meticulosa, estructurada y sin adornos. Toda afirmación debe sustentarse en fichas técnicas y normativas.',
    trustBasis: 'institucional',
    trustLabel: 'Basada en Procesos y Certificaciones',
    trustDesc: 'La credibilidad proviene de certificaciones de calidad (ISO, DIN), solidez financiera y preparación técnica exhaustiva.',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Estructurada por Experticia',
    bargainingNorm: 'bajo',
    bargainingMarginPercent: 5,
    bargainingDesc: 'Muy poco margen de regateo. Si inflas el precio inicial para luego conceder grandes descuentos, perderás credibilidad técnica.',
    timeOrientation: 'monocronico',
    timeLabel: 'Monocrónico Riguroso (Planificación Estricta)',
    paceOfNegotiation: 'deliberativo',
    paceLabel: 'Metódico y Deliberativo',
    keyTactics: [
      'Presentar especificaciones técnicas completas y planes de contingencia.',
      'Respetar minuciosamente la agenda de la reunión punto por punto.',
      'No presionar por un cierre apresurado; requieren tiempo para análisis interno.'
    ],
    taboos: [
      'Tacticas emocionales o apelaciones a la amistad.',
      'Imprecisiones en plazos de entrega o garantías.',
      'Cambiar a los miembros del equipo negociador sin aviso previo.'
    ],
    roleBehavior: {
      comercial: 'Prioridad en calidad de ingeniería, durabilidad, cumplimiento normativo y estabilidad a largo plazo.',
      politico: 'Apego riguroso al derecho internacional, consensos colegiados y marcos institucionales de la UE.',
      social: 'Diálogo tripartito estructurado, respeto profundo a comités de empresa y representación laboral (Mitbestimmung).',
      gubernamental: 'Procedimientos formales exhaustivos, cero tolerancia a desviaciones presupuestarias.'
    }
  },
  {
    id: 'JP',
    name: 'Japón',
    flag: '🇯🇵',
    region: 'Asia-Pacífico',
    communicationStyle: 'indirecta',
    communicationLabel: 'Indirecta, Armoniosa y de Alto Contexto',
    communicationDesc: 'El concepto de "Wa" (armonía) es primordial. Nunca dirán un "No" rotundo; dirán "es muy difícil" o guardarán silencio.',
    trustBasis: 'relacion',
    trustLabel: 'Basada en el Compromiso y Reputación Mutua',
    trustDesc: 'Requiere tiempo para conocer la empresa y sus líderes. Se busca una relación para décadas, no una transacción aislada.',
    hierarchyStyle: 'consensual',
    hierarchyLabel: 'Jerárquica con Consenso Interno (Ringi)',
    bargainingNorm: 'bajo',
    bargainingMarginPercent: 8,
    bargainingDesc: 'El regateo agresivo genera desconfianza. Valoran precios transparentes y concesiones enfocadas en servicio y lealtad.',
    timeOrientation: 'policronico',
    timeLabel: 'Visión Plurianual y Procesos Pacientes',
    paceOfNegotiation: 'deliberativo',
    paceLabel: 'Pausado (Búsqueda de Consenso Colegiado)',
    keyTactics: [
      'Invertir en cenas de protocolo (Nemawashi) para crear sintonía personal fuera de la sala.',
      'Llevar propuestas impresas con cuidado y respetar la jerarquía de asientos.',
      'Tolerar los silencios reflexivos como señal de respeto y análisis profundo.'
    ],
    taboos: [
      'Hacer perder la reputación pública ("Face") o avergonzar al interlocutor.',
      'Presionar por una respuesta inmediata en la misma sesión.',
      'Tener un lenguaje corporal excesivamente expresivo o agresivo.'
    ],
    roleBehavior: {
      comercial: 'Enfoque en calidad de defecto cero (Kaizen), relaciones de cadena de suministro seguras y lealtad mutua.',
      politico: 'Diplomacia silenciosa, preservación de alianzas estratégicas y estabilidad regional.',
      social: 'Consenso comunitario, honor corporativo y protección de la armonía colectiva.',
      gubernamental: 'Articulación estrecha entre ministerios (METI) y sectores empresariales consolidados (Keiretsu).'
    }
  },
  {
    id: 'CN',
    name: 'China',
    flag: '🇨🇳',
    region: 'Asia-Pacífico',
    communicationStyle: 'contextual_alta',
    communicationLabel: 'Estratégica y de Alto Contexto (Guanxi)',
    communicationDesc: 'La negociación es un proceso continuo que nunca termina con la firma del contrato. Importancia del respeto y la dignidad mutua (Mianzi).',
    trustBasis: 'relacion',
    trustLabel: 'Redes de Confianza Personal (Guanxi)',
    trustDesc: 'Sin relación previa ni conexión personal es casi imposible cerrar tratos favorables. Los banquetes y la interacción social son esenciales.',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Jerárquica Centralizada (Líder Supremo)',
    bargainingNorm: 'alto',
    bargainingMarginPercent: 25,
    bargainingDesc: 'Esperan un regateo prolongado. La primera oferta suele estar significativamente inflada para permitir múltiples rondas de concesión.',
    timeOrientation: 'policronico',
    timeLabel: 'Estratégico a Largo Plazo con Tácticas de Espera',
    paceOfNegotiation: 'deliberativo',
    paceLabel: 'Pausado Inicialmente, Veloz al Decidir',
    keyTactics: [
      'Dejar margen amplio (20-30%) para concesiones progresivas.',
      'Construir relación social (Guanxi) antes de hablar de cláusulas complejas.',
      'Identificar al tomador de decisiones real, que a menudo guarda silencio en la mesa.'
    ],
    taboos: [
      'Hacer enojar al líder o evidenciar un error frente a sus subordinados.',
      'Mostrar impaciencia o poner ultimátums de fecha límite (lo usarán en tu contra).',
      'Asumir que el contrato firmado es inmodificable si las condiciones de mercado cambian.'
    ],
    roleBehavior: {
      comercial: 'Gran atención a economías de escala masivas, precios unitarios agresivos y flexibilidad en especificaciones.',
      politico: 'Alineación obligada con las metas quinquenales del Estado y defensa de intereses estratégicos nacionales.',
      social: 'Cohesión comunitaria orientada a la estabilidad socioeconómica y prosperidad compartida.',
      gubernamental: 'Intervención de entidades estatales (SASAC), aprobaciones regulatorias centralizadas.'
    }
  },
  {
    id: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    region: 'Latinoamérica',
    communicationStyle: 'indirecta',
    communicationLabel: 'Cordial, Relacional y Diplomática',
    communicationDesc: 'Trato amable y deferente. La empatía personal y la cortesía verbal ("hacer sentir cómodo al otro") son la antesala obligada del negocio.',
    trustBasis: 'relacion',
    trustLabel: 'Confianza y Calidez Humana',
    trustDesc: 'Se negocia entre personas antes que entre empresas. Requiere charlas informales previas (familia, cultura, ciudad).',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Respeto al Estatus y Jerarquía',
    bargainingNorm: 'alto',
    bargainingMarginPercent: 18,
    bargainingDesc: 'Existe una expectativa natural de "rebaja" o concesión de cortesía. Presentar una cifra fija no negociable puede percibirse como inflexibilidad.',
    timeOrientation: 'policronico',
    timeLabel: 'Tiempo Flexible y Relacional',
    paceOfNegotiation: 'moderado',
    paceLabel: 'Moderado con Múltiples Rondas de Ajuste',
    keyTactics: [
      'Dedicar los primeros 15 minutos a socializar y generar sintonía.',
      'Incluir un margen de descuento para ofrecer un beneficio final al decisor.',
      'Confirmar acuerdos verbales siempre con un resumen cordial por escrito.'
    ],
    taboos: [
      'Ir de inmediato a los números duros sin saludar cordialmente.',
      'Ser percibido como prepotente o arrogante.',
      'Mostrar desconfianza abierta sobre la palabra del interlocutor.'
    ],
    roleBehavior: {
      comercial: 'Importancia de condiciones de pago diferidas (60-90 días), servicio postventa cercano y soporte continuo.',
      politico: 'Búsqueda de equilibrios regionales, articulación de consensos y consideraciones de opinión pública.',
      social: 'Enfoque en concertación, comités de diálogo social, impacto en empleo local y paz territorial.',
      gubernamental: 'Ley de contratación pública estricta (Ley 80), pliegos tipo y vigilancia de entes de control.'
    }
  },
  {
    id: 'MX',
    name: 'México',
    flag: '🇲🇽',
    region: 'Latinoamérica',
    communicationStyle: 'indirecta',
    communicationLabel: 'Cálida, Expresiva y de Alto Contexto',
    communicationDesc: 'Se evita la confrontación directa. La diplomacia interpersonal y el respeto al interlocutor ("quedar bien") marcan el tono.',
    trustBasis: 'relacion',
    trustLabel: 'Lealtad Personal y Complicidad Profesional',
    trustDesc: 'La confianza se consolida compartiendo alimentos (comidas de negocios de 2 a 3 horas) y conociendo al equipo humano.',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Presidencialista y Vertical',
    bargainingNorm: 'alto',
    bargainingMarginPercent: 20,
    bargainingDesc: 'El regateo es habitual y se espera flexibilidad. Una postura rígida de precio único es vista como fría o poco colaborativa.',
    timeOrientation: 'policronico',
    timeLabel: 'Policrónico (Horarios elásticos y prioridad a la relación)',
    paceOfNegotiation: 'moderado',
    paceLabel: 'Moderado (Decisiones finales en alta dirección)',
    keyTactics: [
      'Aceptar almuerzos de trabajo como parte integral de la negociación.',
      'Manejar objeciones con tacto, sin acusaciones directas.',
      'Ofrecer valores agregados (capacitación, exclusividad territorial, soporte).'
    ],
    taboos: [
      'Descalificar abiertamente una contrapropuesta frente a otros colegas.',
      'Apresurar el cierre en la primera reunión formal.',
      'Ignorar al director general o saltarse la línea de mando formal.'
    ],
    roleBehavior: {
      comercial: 'Sensibilidad a precios competitivos, líneas de crédito comercial y cercanía con la dirección de compras.',
      politico: 'Sensibilidad a soberanía nacional, legitimidad ante la base electoral y narrativas de beneficio social.',
      social: 'Concertación con sindicatos tradicionales, atención al impacto laboral y arraigo comunitario.',
      gubernamental: 'Procesos de compra pública regulados por CompraNet, auditoría exhaustiva y factores de contenido nacional.'
    }
  },
  {
    id: 'BR',
    name: 'Brasil',
    flag: '🇧🇷',
    region: 'Latinoamérica',
    communicationStyle: 'contextual_alta',
    communicationLabel: 'Entusiasta, Expresiva y Creativa',
    communicationDesc: 'Muy relacional. Conocido por el "Jeitinho" (habilidad para hallar soluciones creativas e informales ante trabas burocráticas).',
    trustBasis: 'relacion',
    trustLabel: 'Química Humana y Presencia Física',
    trustDesc: 'Difícil negociar a distancia; la presencia cara a cara es fundamental. La afinidad emocional y la simpatía abren puertas.',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Vertical con Centralización de Mando',
    bargainingNorm: 'alto',
    bargainingMarginPercent: 22,
    bargainingDesc: 'Esperan márgenes sustanciales de regateo y flexibilidad en plazos de financiamiento debido al "Custo Brasil" (complejidad tributaria).',
    timeOrientation: 'policronico',
    timeLabel: 'Flexible con Énfasis en el Momento Presente',
    paceOfNegotiation: 'moderado',
    paceLabel: 'Pausado por Trámites Regulatorios',
    keyTactics: [
      'Negociar en persona siempre que sea posible.',
      'Tener asesores legales y contables locales para resolver el laberinto fiscal brasileño.',
      'Construir empatía demostrando interés genuino en la cultura y economía del país.'
    ],
    taboos: [
      'Confundir el idioma portugués con el español.',
      'Subestimar la complejidad arancelaria y fiscal (ICMS, IPI, PIS/COFINS).',
      'Mostrar frialdad o distanciamiento en las reuniones sociales.'
    ],
    roleBehavior: {
      comercial: 'Foco en modelos de financiamiento a largo plazo y adaptabilidad a las fluctuaciones del Real (BRL).',
      politico: 'Negociaciones de coalición parlamentaria, juego de pesos y contrapesos entre estados federados.',
      social: 'Fuerte movilización sindical en sectores industriales, preservación ambiental y comunidades tradicionales.',
      gubernamental: 'Licitaciones públicas masivas con normas de contenido local (Petrobras, infraestructura).'
    }
  },
  {
    id: 'GB',
    name: 'Reino Unido',
    flag: '🇬🇧',
    region: 'Europa',
    communicationStyle: 'indirecta',
    communicationLabel: 'Diplomática, Sutil y de Eufemismos',
    communicationDesc: 'Uso frecuente del "understatement" (subestimación educada) e ironía sutil. Un "That is an interesting proposal" a menudo significa "No estamos de acuerdo".',
    trustBasis: 'institucional',
    trustLabel: 'Reputación Corporativa y Cumplimiento',
    trustDesc: 'Combinación de profesionalismo impecable, historial de solvencia y un tono cortés pero reservado.',
    hierarchyStyle: 'egalitaria',
    hierarchyLabel: 'Colegiada y Respetuosa del Protocolo',
    bargainingNorm: 'moderado',
    bargainingMarginPercent: 12,
    bargainingDesc: 'Se espera un intercambio razonable de concesiones con justificación comercial clara; el dramatismo no es bien recibido.',
    timeOrientation: 'monocronico',
    timeLabel: 'Puntualidad y Respeto a Agendas',
    paceOfNegotiation: 'moderado',
    paceLabel: 'Estructurado y Medido',
    keyTactics: [
      'Decodificar eufemismos británicos con cautela.',
      'Mantener un tono sobrio, profesional y con humor inteligente moderado.',
      'Presentar análisis de riesgos comerciales y cláusulas de jurisdicción internacional claras.'
    ],
    taboos: [
      'Agresividad en ventas o técnicas de presión al estilo "último minuto".',
      'Ostentación o lenguaje excesivamente autocomplaciente.',
      'Interrumpir a la contraparte mientras expone su postura.'
    ],
    roleBehavior: {
      comercial: 'Gobernanza corporativa impecable, gestión prudente de liquidez y marcos de Common Law.',
      politico: 'Negociaciones parlamentarias complejas, defensa de la reputación institucional y balances diplomáticos.',
      social: 'Negociación laboral dentro de marcos contractuales claros y criterios ESG transparentes.',
      gubernamental: 'Crown Commercial Service, rigurosos procesos de valor por dinero (Value for Money).'
    }
  },
  {
    id: 'FR',
    name: 'Francia',
    flag: '🇫🇷',
    region: 'Europa',
    communicationStyle: 'formal_analitica',
    communicationLabel: 'Intelectual, Crítica y Rigurosa',
    communicationDesc: 'Disfrutan del debate dialéctico (tesis, antítesis, síntesis). Cuestionar argumentos enérgicamente es visto como señal de inteligencia e interés.',
    trustBasis: 'institucional',
    trustLabel: 'Rigor Lógico y Competencia Intelectual',
    trustDesc: 'Se gana la confianza demostrando un dominio conceptual impecable, coherencia lógica y respeto por la cultura francesa.',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Jerárquica con Formación de Élite (Grandes Écoles)',
    bargainingNorm: 'moderado',
    bargainingMarginPercent: 14,
    bargainingDesc: 'Las concesiones deben ganarse mediante deducción lógica y valor agregado, no mediante regateo informal.',
    timeOrientation: 'monocronico',
    timeLabel: 'Planificado pero abierto a discusiones extensas',
    paceOfNegotiation: 'deliberativo',
    paceLabel: 'Deliberativo y Analítico',
    keyTactics: [
      'Preparar argumentos estructurados con lógica cartesiana.',
      'No tomar las críticas directas a tu propuesta como un ataque personal.',
      'Procurar traducir resúmenes ejecutivos al francés o contar con un interlocutor bilingüe.'
    ],
    taboos: [
      'Proponer modelos ultra-simplificados sin base teórica sólida.',
      'Ignorar el protocolo formal de títulos y jerarquías en la presentación.',
      'Mostrar prisa en los almuerzos de negocios (son espacios de reflexión).'
    ],
    roleBehavior: {
      comercial: 'Protección de marcas, diseño sofisticado, propiedad intelectual y contratos detallados bajo Código Civil.',
      politico: 'Defensa de la soberanía estratégica europea, multilateralismo y liderazgo cultural.',
      social: 'Sindicatos altamente organizados, movilizaciones sectoriales y fuerte protección al derecho laboral.',
      gubernamental: 'Fuerte presencia del Estado en sectores estratégicos (energía, transporte, defensa).'
    }
  },
  {
    id: 'AE',
    name: 'Emiratos Árabes Unidos',
    flag: '🇦🇪',
    region: 'Medio Oriente',
    communicationStyle: 'contextual_alta',
    communicationLabel: 'Hospitalaria, Respetuosa y de Honor',
    communicationDesc: 'La hospitalidad árabe es legendaria. El honor, la generosidad y el estatus personal juegan un papel decisivo en la mesa.',
    trustBasis: 'relacion',
    trustLabel: 'Confianza y Lealtad Personal',
    trustDesc: 'Los negocios se hacen con personas en las que se confía ciegamente. Las reuniones presenciales y los gestos de respeto son insustituibles.',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Monárquica y de Liderazgo Familiar/Empresarial',
    bargainingNorm: 'alto',
    bargainingMarginPercent: 25,
    bargainingDesc: 'El regateo es un ritual milenario de respeto mutuo. La primera oferta de la contraparte siempre contempla margen sustancial.',
    timeOrientation: 'policronico',
    timeLabel: 'Insha\'Allah (Paciencia y Voluntad Divina)',
    paceOfNegotiation: 'deliberativo',
    paceLabel: 'Pausado al Inicio, Rápido tras el Visto Bueno Real',
    keyTactics: [
      'Aceptar siempre el café árabe (Gahwa) y dátiles ofrecidos como señal de cortesía.',
      'Demostrar admiración sincera por el desarrollo y visión del país.',
      'Dejar margen generoso para que la contraparte sienta que obtuvo una victoria de prestigio.'
    ],
    taboos: [
      'Apuntar las suelas de los zapatos hacia otra persona.',
      'Utilizar la mano izquierda para entregar documentos o comer.',
      'Presionar agresivamente por plazos durante festividades religiosas (como Ramadán).'
    ],
    roleBehavior: {
      comercial: 'Atracción por megaproyectos, tecnología de punta, marcas de clase mundial y solidez patrimonial.',
      politico: 'Diplomacia de mediación regional, alianzas de seguridad y visión geoestratégica a 50 años.',
      social: 'Bienestar de ciudadanos emiratíes (Emiratisation), respeto estricto a las normas morales y religiosas islámicas.',
      gubernamental: 'Fondos soberanos (ADIA, Mubadala), decisiones centralizadas en jeques y directores generales.'
    }
  },
  {
    id: 'IN',
    name: 'India',
    flag: '🇮🇳',
    region: 'Asia-Pacífico',
    communicationStyle: 'contextual_alta',
    communicationLabel: 'Expresiva, Polifacética y Persuasiva',
    communicationDesc: 'Negociadores hábiles y dialécticos. El movimiento de cabeza característico denota comprensión y atención, no necesariamente aprobación.',
    trustBasis: 'relacion',
    trustLabel: 'Relación Personal y Conexión Emocional',
    trustDesc: 'Requiere construir sintonía interpersonal profunda. Valoran conocer los valores familiares y éticos del socio.',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Jerárquica Estricta (Respeto a Mayores)',
    bargainingNorm: 'alto',
    bargainingMarginPercent: 30,
    bargainingDesc: 'Cultura de regateo intensivo. Esperan que cada punto del contrato sea discutido y concedido gradualmente con perseverancia.',
    timeOrientation: 'policronico',
    timeLabel: 'Tiempo Cíclico y Flexible (Jugaad)',
    paceOfNegotiation: 'deliberativo',
    paceLabel: 'Largo con Múltiples Rondas de Aprobación',
    keyTactics: [
      'No aceptar nunca la primera oferta ni mostrar frustración por el regateo.',
      'Estar preparado para múltiples reuniones y cambios de agenda.',
      'Ofrecer alternativas modulares de precios para diferentes volúmenes.'
    ],
    taboos: [
      'Negarse a compartir té (Chai) o refrigerios ofrecidos.',
      'Perder la paciencia o elevar la voz en la sala.',
      'Forzar una firma cuando falta la bendición del líder senior de la empresa.'
    ],
    roleBehavior: {
      comercial: 'Alta sensibilidad al costo por unidad, competitividad feroz y demanda de financiamiento flexible.',
      politico: 'Defensa de la soberanía estratégica, no alineamiento histórico y protección a la industria local.',
      social: 'Manejo de diversidad cultural/lingüística inmensa, relaciones laborales complejas y sensibilidades comunitarias.',
      gubernamental: 'Burocracia pública extensa, aprobaciones en múltiples ministerios y normativas de licitación estrictas.'
    }
  },
  {
    id: 'ES',
    name: 'España',
    flag: '🇪🇸',
    region: 'Europa',
    communicationStyle: 'contextual_alta',
    communicationLabel: 'Cercana, Apasionada y Relacional',
    communicationDesc: 'Conversaciones vivas y expresivas. Se debate con pasión sin que signifique enfado. Las relaciones personales suavizan fricciones.',
    trustBasis: 'relacion',
    trustLabel: 'Confianza Personal y Red de Contactos',
    trustDesc: 'El "feeling" o sintonía interpersonal entre los equipos negociadores facilita enormemente la flexibilidad contractual.',
    hierarchyStyle: 'jerarquica',
    hierarchyLabel: 'Jerárquica pero Accesible en el Trato',
    bargainingNorm: 'moderado',
    bargainingMarginPercent: 15,
    bargainingDesc: 'Esperan margen de maniobra razonable. El "café" o la comida de negocios después de la reunión es donde se fraguan los verdaderos acuerdos.',
    timeOrientation: 'policronico',
    timeLabel: 'Flexible y Adaptable',
    paceOfNegotiation: 'moderado',
    paceLabel: 'Moderado con Discusión Abierta',
    keyTactics: [
      'Cultivar la relación social fuera del despacho (comidas de trabajo).',
      'Mostrar flexibilidad ante imprevistos.',
      'Formalizar acuerdos con claridad técnica adaptada al marco jurídico de la Unión Europea.'
    ],
    taboos: [
      'Ser frío, distante o inflexible con los horarios de comidas.',
      'Menospreciar la capacidad técnica de la empresa local.',
      'Tocar temas políticos o territoriales sensibles de manera superficial.'
    ],
    roleBehavior: {
      comercial: 'Equilibrio entre coste y calidad europea, servicio cercano y cumplimiento de normativas comunitarias.',
      politico: 'Pactos parlamentarios entre fuerzas diversas, diálogo con autonomías y representación europea.',
      social: 'Negociación colectiva con sindicatos mayoritarios (CCOO, UGT) y diálogo social tripartito.',
      gubernamental: 'Ley de Contratos del Sector Público, plataformas de contratación electrónica transparentes.'
    }
  }
];

export const NATURE_CONFIG = {
  comercial: {
    label: 'Comercial / B2B / Proveedores',
    desc: 'Foco en precio, márgenes, SLAs, volúmenes de entrega y garantías financieras.',
    color: 'emerald',
    icon: 'Briefcase'
  },
  politico: {
    label: 'Político / Diplomático / Multilateral',
    desc: 'Foco en soberanía, legitimidad, opinión pública, tratados y equilibrios de poder.',
    color: 'blue',
    icon: 'Landmark'
  },
  social: {
    label: 'Social / Comunitario / Laboral',
    desc: 'Foco en derechos colectivos, impacto ambiental, concertación sindical y paz social.',
    color: 'amber',
    icon: 'HeartHandshake'
  },
  gubernamental: {
    label: 'Gubernamental / Contratación Pública',
    desc: 'Foco en pliegos técnicos, transparencia, legalidad administrativa y auditoría estatal.',
    color: 'purple',
    icon: 'Building2'
  }
};

export const AGE_GROUP_CONFIG = {
  joven: {
    label: 'Menores de 35 años (Generación Joven / Digital)',
    badge: '< 35 años',
    traits: 'Pragmáticos, ágiles, menor apego a formalismos jerárquicos tradicionales. Prefieren comunicación digital rápida y valoran la sostenibilidad.',
    impactOnHierarchy: 'Tienden a buscar consensos rápidos y canales informales (chat, videollamadas breves).',
    riskTolerance: 'Media-Alta a la innovación, pero impacientes ante demoras burocráticas.'
  },
  intermedio: {
    label: '35 a 52 años (Generación Mid-Career / Consolidada)',
    badge: '35 - 52 años',
    traits: 'Equilibrio entre solidez técnica y ejecución. Orientados a métricas de ROI, gestión de riesgos y equilibrio entre relación y contrato.',
    impactOnHierarchy: 'Respetan los canales corporativos y estructuran agendas con objetivos claros.',
    riskTolerance: 'Calculada. Exigen datos y planes de contingencia.'
  },
  senior: {
    label: 'Mayores de 52 años (Generación Senior / Tradicional)',
    badge: '> 52 años',
    traits: 'Alto respeto al estatus, precedentes históricos y redes de confianza forjadas a lo largo de décadas. Protocolo formal estricto.',
    impactOnHierarchy: 'Imprescindible el trato directo entre iguales jerárquicos (Director a Director / Ministro a Ministro).',
    riskTolerance: 'Prudente y conservadora. Valoran la estabilidad y el honor de la palabra dada.'
  }
};

export const MARKET_CONDITIONS_CONFIG = {
  estable: {
    label: 'Mercado Estable y Predecible',
    impact: 'Condiciones de baja incertidumbre. Los plazos y precios acordados pueden mantenerse firmes por periodos prolongados.',
    clauseAdvice: 'Contratos estándar con plazos definidos y revisiones anuales ordinarias.'
  },
  volatil: {
    label: 'Alta Volatilidad Cambiaria y Precios Dinámicos',
    impact: 'Riesgo de fluctuación súbita en costos de insumos y tipo de cambio entre monedas de las partes.',
    clauseAdvice: 'Imprescindible pactar banda cambiaria, indexación de precios o moneda refugio (USD/EUR) con revisión mensual.'
  },
  inflacionario: {
    label: 'Presión Inflacionaria Acentuada',
    impact: 'Erosión acelerada de márgenes comerciales y costos operativos crecientes a lo largo del tiempo.',
    clauseAdvice: 'Incluir cláusulas de ajuste por IPC/inflación y acortar periodos de validez de ofertas comerciales.'
  },
  regulatorio: {
    label: 'Incertidumbre Regulatoria o Arancelaria',
    impact: 'Riesgo de nuevos aranceles, barreras no arancelarias o cambios en legislación laboral/ambiental.',
    clauseAdvice: 'Incorporar cláusula de Hardship (excesiva onerosidad sobrevenida) y distribución compartida de nuevos gravámenes.'
  },
  escasez: {
    label: 'Tensión de Suministro y Cuellos de Botella',
    impact: 'Mercado dominado por proveedores. Tiempos de entrega impredecibles y poder de negociación inclinado hacia quien suministra.',
    clauseAdvice: 'Pactar reservas de capacidad garantizada, penalizaciones bilaterales razonables y planes de contingencia logística.'
  }
};
