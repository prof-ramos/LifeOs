import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeOS | Dashboard pessoal",
  description: "Acompanhe suas tarefas, saúde e estudos em um único lugar.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
