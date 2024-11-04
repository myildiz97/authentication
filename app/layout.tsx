import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from '@/components/providers/auth-provider';

export const metadata: Metadata = {
  title: "Authenticating with Auth.js",
  description: "Learn how to authenticate with Auth.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`antialiased`}
        >
            <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
