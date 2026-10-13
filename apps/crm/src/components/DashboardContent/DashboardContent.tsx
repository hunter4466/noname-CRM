import type { DashboardResponse } from '@noname/types';
import { KpiGrid } from '../KpiGrid/KpiGrid';
import { SalesByHourCard } from '../SalesByHourCard/SalesByHourCard';
import { SetupProgressCard } from '../SetupProgressCard/SetupProgressCard';
import { SunatSummaryCard } from '../SunatSummaryCard/SunatSummaryCard';
import { TerminalsCard } from '../TerminalsCard/TerminalsCard';
import { TopProductsCard } from '../TopProductsCard/TopProductsCard';
import styles from './DashboardContent.module.css';

export interface DashboardContentProps {
  dashboard: DashboardResponse;
}

export const DashboardContent = ({ dashboard }: DashboardContentProps) => (
  <>
    <SetupProgressCard steps={dashboard.setupSteps} />
    <KpiGrid kpis={dashboard.kpis} />
    <div className={styles.row}>
      <div className={styles.wide}>
        <SalesByHourCard hourlySales={dashboard.hourlySales} peakLabel={dashboard.peakLabel} />
      </div>
      <div className={styles.narrow}>
        <SunatSummaryCard sunat={dashboard.sunat} />
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.wide}>
        <TerminalsCard terminals={dashboard.terminals} />
      </div>
      <div className={styles.narrow}>
        <TopProductsCard products={dashboard.topProducts} />
      </div>
    </div>
  </>
);
