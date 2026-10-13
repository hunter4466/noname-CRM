'use client';

import { classNames } from '@noname/ui';
import { IconChevronDown, IconTerminal } from '@noname/ui/icons';
import { Fragment, useState } from 'react';
import { posModuleNav } from '@/lib/navigation';
import { SidebarLink } from '../SidebarLink/SidebarLink';
import styles from './SidebarModuleGroup.module.css';

export const SidebarModuleGroup = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls="pos-module-nav"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconTerminal />
        Punto de Venta
        <IconChevronDown size={16} className={classNames(styles.chevron, !isOpen && styles.closed)} />
      </button>
      {isOpen && (
        <div className={styles.nested} id="pos-module-nav">
          {posModuleNav.map((item) => (
            <Fragment key={item.key}>
              {item.section && <div className={styles.section}>{item.section}</div>}
              <SidebarLink item={item} nested />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};
