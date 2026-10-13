import { useEffect, useState } from 'react';

const formatTime = (date: Date) => date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false });
const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

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
