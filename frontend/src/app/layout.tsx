import type { Metadata } from "next";

import "./globals.scss";
import { ThemeProvider } from "@/providers/theme-provider";
import { AppProvider } from "@/providers/app-provider";
import { AuthProvider } from "@/providers/auth-provider";

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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AppProvider>
            <AuthProvider>{children}</AuthProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
