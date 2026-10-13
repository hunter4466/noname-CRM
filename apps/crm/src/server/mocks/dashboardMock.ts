import { SunatDocumentStatus, type DashboardResponse } from '@noname/types';

const hourlyAmounts = [120, 210, 180, 335, 690, 820, 560, 240, 180, 220, 360, 515, 470, 290, 105];

export const createDashboardMock = (): Omit<DashboardResponse, 'terminals'> => ({
  dateLabel: 'Hoy, sábado 3 oct. · todos los locales · actualizado en vivo desde cada caja.',
  setupSteps: [
    { label: 'Productos', isDone: true },
    { label: 'Locales', isDone: true },
    { label: 'Cajas POS', isDone: true },
    { label: 'Impresoras vinculadas', isDone: true },
    { label: 'Certificado SUNAT', isDone: false },
  ],
  kpis: [
    { label: 'Ventas netas', value: 'S/ 5,310.40', delta: '+12.4%', deltaIsPositive: true, hint: 'vs. el sábado pasado' },
    { label: 'Pedidos', value: '204', delta: '+18', deltaIsPositive: true, hint: 'vs. el sábado pasado' },
    { label: 'Ticket promedio', value: 'S/ 26.03', delta: '−1.2%', deltaIsPositive: false, hint: 'vs. el sábado pasado' },
    { label: 'IGV recaudado', value: 'S/ 810.06', delta: null, deltaIsPositive: true, hint: 'Incluido en las ventas netas' },
  ],
  hourlySales: hourlyAmounts.map((amount, index) => ({ hour: 8 + index, amount, isForecast: index >= 13 })),
  peakLabel: 'Pico 13:00 · S/ 820',
  sunat: {
    accepted: 198,
    pending: 5,
    rejected: 1,
    alerts: [
      {
        status: SunatDocumentStatus.Rejected,
        title: 'F001-00000412',
        detail: 'El RUC del cliente no está activo · vuelve a emitir como boleta o corrige el RUC',
        isMonospace: true,
      },
      {
        status: SunatDocumentStatus.Queued,
        title: 'Resumen diario de boletas',
        detail: 'Se envía automáticamente a las 23:00',
        isMonospace: false,
      },
    ],
  },
  topProducts: [
    { rank: 1, name: 'Lomo saltado', soldLabel: '38 vendidos', revenue: 1330 },
    { rank: 2, name: 'Hamburguesa clásica', soldLabel: '31 vendidos', revenue: 899 },
    { rank: 3, name: 'Ensalada César', soldLabel: '27 vendidos', revenue: 648 },
    { rank: 4, name: 'Chicha morada 500 ml', soldLabel: '64 vendidos', revenue: 384 },
    { rank: 5, name: 'Cremas extra', soldLabel: 'modificador · 71', revenue: 142 },
  ],
});
