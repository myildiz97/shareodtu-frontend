import * as React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/providers/auth-provider';
import { Toaster } from 'react-hot-toast';
import Container from '@/components/container/container';
import { SiteHeader } from '@/components/navbar/site-header';
import { NextUIProvider } from '@nextui-org/system';
import { MantineProvider } from '@mantine/core';
// import { Navbar } from '@/components/navbar/navbar';

export const metadata: Metadata = {
  title: 'ShareODTÜ',
  description: 'Share and support among ODTÜ Community',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <NextUIProvider>
            <MantineProvider>
              <Container className="relative flex flex-col mx-auto min-h-screen">
                {/* <SiteHeader /> */}
                {/* <main className="flex flex-1"> */}
                  {children}
                {/* </main> */}
              </Container>
              <Toaster />
            </MantineProvider>
          </NextUIProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
