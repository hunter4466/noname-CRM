import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { AppShell } from '@/components/AppShell/AppShell';
import { getSession } from '@/server/auth/getSession';
import { Route } from '@/types/Route';

const ConsoleLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();
  if (!session) {
    redirect(Route.Login);
  }
  return <AppShell user={session}>{children}</AppShell>;
};

export default ConsoleLayout;
