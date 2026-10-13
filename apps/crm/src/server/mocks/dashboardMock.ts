import { SunatDocumentStatus, type DashboardResponse } from '@noname/types';

const hourlyAmounts = [120, 210, 180, 335, 690, 820, 560, 240, 180, 220, 360, 515, 470, 290, 105];

export const createDashboardMock = (): Omit<DashboardResponse, 'terminals'> => ({
  dateLabel: 'Today, Saturday 3 Oct · all locations · refreshed live from every terminal.',
  setupSteps: [
    { label: 'Products', isDone: true },
    { label: 'Locations', isDone: true },
    { label: 'POS terminals', isDone: true },
    { label: 'Printers paired', isDone: true },
    { label: 'SUNAT certificate', isDone: false },
  ],
  kpis: [
    { label: 'Net sales', value: 'S/ 5,310.40', delta: '+12.4%', deltaIsPositive: true, hint: 'vs last Saturday' },
    { label: 'Orders', value: '204', delta: '+18', deltaIsPositive: true, hint: 'vs last Saturday' },
    { label: 'Average ticket', value: 'S/ 26.03', delta: '−1.2%', deltaIsPositive: false, hint: 'vs last Saturday' },
    { label: 'IGV collected', value: 'S/ 810.06', delta: null, deltaIsPositive: true, hint: 'Included in net sales' },
  ],
  hourlySales: hourlyAmounts.map((amount, index) => ({ hour: 8 + index, amount, isForecast: index >= 13 })),
  peakLabel: 'Peak 13:00 · S/ 820',
  sunat: {
    accepted: 198,
    pending: 5,
    rejected: 1,
    alerts: [
      {
        status: SunatDocumentStatus.Rejected,
        title: 'F001-00000412',
        detail: 'Customer RUC is not active · re-issue as boleta or correct RUC',
        isMonospace: true,
      },
      {
        status: SunatDocumentStatus.Queued,
        title: 'Resumen diario of boletas',
        detail: 'Sends automatically at 23:00',
        isMonospace: false,
      },
    ],
  },
  topProducts: [
    { rank: 1, name: 'Lomo saltado', soldLabel: '38 sold', revenue: 1330 },
    { rank: 2, name: 'Classic burger', soldLabel: '31 sold', revenue: 899 },
    { rank: 3, name: 'Caesar salad', soldLabel: '27 sold', revenue: 648 },
    { rank: 4, name: 'Chicha morada 500 ml', soldLabel: '64 sold', revenue: 384 },
    { rank: 5, name: 'Extra cremas', soldLabel: 'modifier · 71', revenue: 142 },
  ],
});
