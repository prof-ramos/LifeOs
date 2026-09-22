"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BookOpen, CheckSquare2, LayoutDashboard } from "lucide-react";

const items = [
  { href: "/", label: "Visão geral", Icon: LayoutDashboard },
  { href: "/tarefas", label: "Tarefas", Icon: CheckSquare2 },
  { href: "/saude", label: "Saúde", Icon: Activity },
  { href: "/estudos", label: "Estudos", Icon: BookOpen },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="border-b border-border bg-white px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold text-foreground" aria-label="LifeOS: início">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-black text-white">L</span>
          <span>LifeOS <span className="block text-xs font-normal text-muted-foreground">Seu espaço pessoal</span></span>
        </Link>
        <nav aria-label="Navegação principal" className="mt-5 flex flex-wrap gap-2 lg:mt-10 lg:flex-col">
          {items.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <Icon aria-hidden="true" className="h-4 w-4" />{label}
              </Link>
            );
          })}
        </nav>
        <p className="mt-8 hidden text-xs leading-5 text-muted-foreground lg:block">
          Protótipo pessoal. Sem login, sincronização ou banco de dados nesta etapa.
        </p>
      </aside>
      <div className="min-w-0">
        <header className="border-b border-border bg-white px-4 py-4 sm:px-8">
          <span className="text-sm font-medium text-foreground">LifeOS</span>
          <span className="ml-2 text-sm text-muted-foreground">/ {items.find((item) => item.href === pathname)?.label ?? "Painel"}</span>
        </header>
        <main id="conteudo" className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-8 sm:py-10">{children}</main>
        <footer className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted-foreground sm:px-8">
          Interface com componentes do <a className="underline" href="https://shadcndashboard.dev/" target="_blank" rel="noopener noreferrer">Shadcn Dashboard</a>.
        </footer>
      </div>
    </div>
  );
}
