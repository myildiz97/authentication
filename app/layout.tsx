import * as React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/providers/auth-provider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Authenticating with Auth.js',
  description: 'Learn how to authenticate with NextAuth.js',
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
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
