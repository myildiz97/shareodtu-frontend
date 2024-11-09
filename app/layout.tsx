import * as React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/providers/auth-provider';
import { Toaster } from 'react-hot-toast';

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
          <main className="w-full min-h-screen flex flex-col items-center justify-center">{children}</main>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
