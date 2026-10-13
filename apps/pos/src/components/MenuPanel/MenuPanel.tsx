'use client';

import type { MenuItem, MenuResponse } from '@noname/types';
import { useState } from 'react';
import { MenuFilter } from '@/types/MenuFilter';
import { CategoryRail } from '../CategoryRail/CategoryRail';
import { MenuTile } from '../MenuTile/MenuTile';
import styles from './MenuPanel.module.css';

export interface MenuPanelProps {
  menu: MenuResponse;
  onPick: (item: MenuItem) => void;
}

export const MenuPanel = ({ menu, onPick }: MenuPanelProps) => {
  const [categoryId, setCategoryId] = useState<string>(MenuFilter.All);
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const items = menu.items.filter(
    (item) => (categoryId === MenuFilter.All || item.categoryId === categoryId) && (!query || item.name.toLowerCase().includes(query)),
  );
  return (
    <>
      <CategoryRail categories={menu.categories} items={menu.items} selectedId={categoryId} onSelect={setCategoryId} />
      <section className={styles.menu} aria-label="Productos">
        <div className={styles.top}>
          <input
            type="search"
            className={styles.search}
            aria-label="Buscar productos"
            placeholder="Buscar o escanear código de barras"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="button" className={styles.tickets} disabled title="Próximamente">
            Tickets abiertos <b>{menu.openTicketCount}</b>
          </button>
        </div>
        <div className={styles.grid}>
          {items.map((item) => (
            <MenuTile key={item.id} item={item} onPick={() => onPick(item)} />
          ))}
        </div>
      </section>
    </>
  );
};
