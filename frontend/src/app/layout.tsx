import type { Metadata } from "next";

import "./globals.scss";

import { AppProvider } from "@/providers/app-provider";

export const metadata: Metadata = {
  title: "CCP",
  description: "Centro de Controle Pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}