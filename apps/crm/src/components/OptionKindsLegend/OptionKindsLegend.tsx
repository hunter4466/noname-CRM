import { Card, classNames } from '@noname/ui';
import { IconBox, IconLayers, IconLink } from '@noname/ui/icons';
import styles from './OptionKindsLegend.module.css';

const kinds = [
  { icon: IconLayers, title: 'Simple option', detail: 'Name + price change. "Ranch", "Extra cheese +3.00".', toneClass: styles.neutral },
  {
    icon: IconLink,
    title: 'Linked product',
    detail: 'Option is a real product: stock, out-of-stock and sales reports stay correct.',
    toneClass: styles.blue,
  },
  {
    icon: IconBox,
    title: 'Nested group',
    detail: 'Picking an option asks a follow-up: drink → ice; combo → side.',
    toneClass: styles.teal,
  },
];

export const OptionKindsLegend = () => (
  <Card ariaLabel="Kinds of options" className={styles.legend}>
    {kinds.map(({ icon: Icon, title, detail, toneClass }) => (
      <div key={title} className={styles.kind}>
        <span className={classNames(styles.icon, toneClass)}>
          <Icon />
        </span>
        <div>
          <div className={styles.title}>{title}</div>
          <div className="hint">{detail}</div>
        </div>
      </div>
    ))}
  </Card>
);
