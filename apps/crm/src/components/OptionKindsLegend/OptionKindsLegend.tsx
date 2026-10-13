import { Card, classNames } from '@noname/ui';
import { IconBox, IconLayers, IconLink } from '@noname/ui/icons';
import styles from './OptionKindsLegend.module.css';

const kinds = [
  {
    icon: IconLayers,
    title: 'Opción simple',
    detail: 'Nombre + cambio de precio. "Ranch", "Queso extra +3.00".',
    toneClass: styles.neutral,
  },
  {
    icon: IconLink,
    title: 'Producto vinculado',
    detail: 'La opción es un producto real: el stock, los agotados y los reportes de ventas se mantienen correctos.',
    toneClass: styles.blue,
  },
  {
    icon: IconBox,
    title: 'Grupo anidado',
    detail: 'Elegir una opción abre otra pregunta: bebida → hielo; combo → acompañamiento.',
    toneClass: styles.teal,
  },
];

export const OptionKindsLegend = () => (
  <Card ariaLabel="Tipos de opciones" className={styles.legend}>
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
