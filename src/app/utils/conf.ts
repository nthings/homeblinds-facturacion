export const conf = {
    units: [
        { key: 'EA', description: 'PIEZA' },
        { key: 'MTR', description: 'METRO' },
        { key: 'LM', description: 'METRO LINEAL' },
        { key: 'MTK', description: 'METRO CUADRADO' }
    ],
    product_keys: [
        { key: '52131600', description: 'Persianas' },
        { key: '52131601', description: 'Persianas venecianas' },
        { key: '52131602', description: 'Persianas enrollables' },
        { key: '52131604', description: 'Persianas verticales' },
        { key: '72153608', description: 'Servicio de instalación de cortinas o persianas' },
        { key: '76111504', description: 'Servicios de limpieza de ventanas o persianas' }
    ],
    formasdepago: [
        { code: '01', description: 'Efectivo' },
        { code: '02', description: 'Cheque nominativo' },
        { code: '03', description: 'Transferencia electrónica de fondos' },
        { code: '04', description: 'Tarjeta de crédito' },
        { code: '05', description: 'Monedero electrónico' },
        { code: '06', description: 'Dinero electrónico' },
        { code: '08', description: 'Vales de despensa' },
        { code: '12', description: 'Dación en pago' },
        { code: '13', description: 'Pago por subrogación' },
        { code: '14', description: 'Pago por consignación' },
        { code: '15', description: 'Condonación' },
        { code: '17', description: 'Compensación' },
        { code: '23', description: 'Novación' },
        { code: '24', description: 'Confusión' },
        { code: '25', description: 'Remisión de deuda' },
        { code: '26', description: 'Prescripción o caducidad' },
        { code: '27', description: 'A satisfacción del acreedor' },
        { code: '28', description: 'Tarjeta de débito' },
        { code: '29', description: 'Tarjeta de servicios' },
        { code: '99', description: 'Por definir' },
    ],
    usos: [
        { code: 'G01', description: 'Adquisición de mercancias' },
        { code: 'G02', description: 'Devoluciones, descuentos o bonificaciones' },
        { code: 'G03', description: 'Gastos en general' },
        { code: 'I01', description: 'Construcciones' },
        { code: 'I02', description: 'Mobilario y equipo de oficina por inversiones' },
        { code: 'I03', description: 'Equipo de transporte' },
        { code: 'I04', description: 'Equipo de computo y accesorios' },
        { code: 'I05', description: 'Dados, troqueles, moldes, matrices y herramental' },
        { code: 'I06', description: 'Comunicaciones telefónicas' },
        { code: 'I07', description: 'Comunicaciones satelitales' },
        { code: 'I08', description: 'Otra maquinaria y equipo' },
        { code: 'D01', description: 'Honorarios médicos, dentales y gastos hospitalarios' },
        { code: 'D02', description: 'Gastos médicos por incapacidad o discapacidad' },
        { code: 'D03', description: 'Gastos funerales' },
        { code: 'D04', description: 'Donativos' },
        { code: 'D05', description: 'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)' },
        { code: 'D06', description: 'Aportaciones voluntarias al SAR' },
        { code: 'D07', description: 'Primas por seguros de gastos médicos' },
        { code: 'D08', description: 'Gastos de transportación escolar obligatoria' },
        { code: 'D09', description: 'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones' },
        { code: 'D10', description: 'Pagos por servicios educativos (colegiaturas)' },
        { code: 'P01', description: 'Por definir' },
    ],
    tax_systems: [
        { code: "601", description: "General de Ley Personas Morales" }, 
        { code: "603", description: "Personas Morales con Fines no Lucrativos" }, 
        { code: "605", description: "Sueldos y Salarios e Ingresos Asimilados a Salarios" }, 
        { code: "606", description: "Arrendamiento" }, 
        { code: "607", description: "Régimen de Enajenación o Adquisición de Bienes" }, 
        { code: "608", description: "Demás ingresos" }, 
        { code: "609", description: "Consolidación" }, 
        { code: "610", description: "Residentes en el Extranjero sin Establecimiento Permanente en México" }, 
        { code: "611", description: "Ingresos por Dividendos (socios y accionistas)" }, 
        { code: "612", description: "Personas Físicas con Actividades Empresariales y Profesionales" }, 
        { code: "614", description: "Ingresos por intereses" }, 
        { code: "615", description: "Régimen de los ingresos por obtención de premios" }, 
        { code: "616", description: "Sin obligaciones fiscales" }, 
        { code: "620", description: "Sociedades Cooperativas de Producción que optan por diferir sus ingresos" }, 
        { code: "621", description: "Incorporación Fiscal" }, 
        { code: "622", description: "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras" }, 
        { code: "623", description: "Opcional para Grupos de Sociedades" }, 
        { code: "624", description: "Coordinados" }, 
        { code: "625", description: "Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas" }, 
        { code: "626", description: "Régimen Simplificado de Confianza" }, 
        { code: "628", description: "Hidrocarburos" }, 
        { code: "629", description: "De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales" }, 
        { code: "630", description: "Enajenación de acciones en bolsa de valores" }
    ],
    invoiceCancelationReasons: [
        { code: "01", description: "Comprobante emitido con errores con relación" },
        { code: "02", description: "Comprobante emitido con errores sin relación" },
        { code: "03", description: "No se llevó a cabo la operación" },
        { code: "04", description: "Operación nominativa relacionada en la factura global" },
    ],
    payment_methods: [
        { code: "PUE", description: "Pago en Una sola Exhibición" },
        { code: "PPD", description: "Pago en Parcialidades o Diferido" },
    ]
};
