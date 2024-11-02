import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from './Providers';

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
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}