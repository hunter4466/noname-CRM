import '@noname/ui/tokens.css';
import '@noname/ui/base.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { connection } from 'next/server';
import type { ReactNode } from 'react';
import { PublicConfigProvider } from '@/components/PublicConfigProvider/PublicConfigProvider';
import { QueryProvider } from '@/components/QueryProvider/QueryProvider';
import { getPublicConfig } from '@/server/publicConfig';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: { default: 'CRM POS', template: '%s · CRM POS' },
  description: 'Caja de punto de venta para web y tablet.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 1 };

const RootLayout = async ({ children }: { children: ReactNode }) => {
  // Render per request so runtime env (CRM_URL, POS_URL) is read on Cloud Run, not frozen at build time.
  await connection();
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <PublicConfigProvider config={getPublicConfig()}>
          <QueryProvider>{children}</QueryProvider>
        </PublicConfigProvider>
      </body>
    </html>
  );
};

export default RootLayout;
