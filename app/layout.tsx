import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { TransactionsContextProvider } from '@/context/TransactionsContextProvider';
import { Notifications } from '@mantine/notifications';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Profit Pulse',
  description:
    'Tracking sales and expenses to monitor the financial health of your business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>

      <body className={inter.className}>
        <TransactionsContextProvider>
          <MantineProvider>
            <Notifications position="top-center" />
            {children}
          </MantineProvider>
        </TransactionsContextProvider>
      </body>
    </html>
  );
}
