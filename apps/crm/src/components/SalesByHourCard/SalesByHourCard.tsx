import type { HourlySale } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Card, CardBody, CardHeader } from '@noname/ui';
import styles from './SalesByHourCard.module.css';

const CHART_HEIGHT = 220;
const BAR_GAP = 8;
const BAR_WIDTH = 40;

export interface SalesByHourCardProps {
  hourlySales: HourlySale[];
  peakLabel: string;
}

export const SalesByHourCard = ({ hourlySales, peakLabel }: SalesByHourCardProps) => {
  const maxAmount = Math.max(1, ...hourlySales.map((sale) => sale.amount));
  const peakHour = hourlySales.find((sale) => sale.amount === maxAmount)?.hour;
  const chartWidth = hourlySales.length * (BAR_WIDTH + BAR_GAP);
  return (
    <Card>
      <CardHeader title="Sales by hour" actions={<span className="hint">{peakLabel}</span>} />
      <CardBody>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT + 20}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Sales by hour"
        >
          {hourlySales.map((sale, index) => {
            const barHeight = (sale.amount / maxAmount) * CHART_HEIGHT;
            const barClass = sale.isForecast ? styles.forecast : sale.hour === peakHour ? styles.peak : styles.bar;
            return (
              <g key={sale.hour}>
                <title>{`${sale.hour}:00 · ${formatMoney(sale.amount)}`}</title>
                <rect
                  className={barClass}
                  x={index * (BAR_WIDTH + BAR_GAP)}
                  y={CHART_HEIGHT - barHeight}
                  width={BAR_WIDTH}
                  height={barHeight}
                  rx={4}
                />
                <text className={styles.hour} x={index * (BAR_WIDTH + BAR_GAP) + BAR_WIDTH / 2} y={CHART_HEIGHT + 16}>
                  {sale.hour}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="hint">Lighter bars: hours still in progress or forecast from last 4 Saturdays.</div>
      </CardBody>
    </Card>
  );
};
