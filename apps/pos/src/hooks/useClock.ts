import { useEffect, useState } from 'react';

const formatTime = (date: Date) => date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false });
const formatDate = (date: Date) => {
  const label = date.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });
  return label.charAt(0).toUpperCase() + label.slice(1);
};

/** Wall clock for the register chrome; empty until mounted so server and client markup match. */
export const useClock = () => {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const interval = setInterval(tick, 15_000);
    return () => clearInterval(interval);
  }, []);
  return { time: now ? formatTime(now) : '--:--', date: now ? formatDate(now) : '' };
};
