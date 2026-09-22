import { Activity } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export default function SaudePage() {
  return (
    <>
      <SectionHeading eyebrow="Módulo planejado" title="Saúde" description="Treino, alimentação e sono serão incorporados gradualmente, sem criar registros fictícios." />
      <Card><CardContent className="flex items-start gap-4">
        <Activity aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />
        <div><h2 className="font-semibold">Ainda não configurado</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Nenhum dado de saúde é coletado ou armazenado nesta versão.</p>
        </div>
      </CardContent></Card>
    </>
  );
}
