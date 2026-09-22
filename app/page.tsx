import Link from "next/link";
import { Activity, ArrowUpRight, BookOpen, CheckSquare2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { TaskSummary } from "@/components/task-summary";

const modules = [
  { href: "/saude", title: "Saúde", Icon: Activity, description: "Treino, alimentação e sono.", detail: "Aguardando configuração" },
  { href: "/tarefas", title: "Tarefas", Icon: CheckSquare2, description: "Quadro de atividades pessoais.", detail: "Protótipo local disponível" },
  { href: "/estudos", title: "Estudos", Icon: BookOpen, description: "Sessões de estudo e desempenho.", detail: "Aguardando configuração" },
];

export default function HomePage() {
  return (
    <>
      <SectionHeading eyebrow="Seu painel" title="Visão geral" description="Uma única porta de entrada para sua rotina. Só entram funcionalidades que realmente fizerem sentido." />
      <TaskSummary />
      <h2 className="mb-4 mt-9 text-lg font-semibold">Áreas do LifeOS</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map(({ href, title, Icon, description, detail }) => (
          <Link key={href} href={href} className="group rounded-xl focus-visible:outline-offset-4">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary"><Icon aria-hidden="true" className="h-5 w-5" /></span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                <p className="mt-5 text-xs font-medium text-primary">{detail}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <p className="mt-7 rounded-lg border border-border bg-white p-4 text-sm leading-6 text-muted-foreground">
        Versão inicial: as tarefas ficam somente no navegador usado para registrá-las. Não insira dados sensíveis; não há conta, backup nem sincronização entre dispositivos.
      </p>
    </>
  );
}
