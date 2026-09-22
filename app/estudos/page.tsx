import { BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export default function EstudosPage() {
  return (
    <>
      <SectionHeading eyebrow="Módulo planejado" title="Estudos" description="Planejamento, sessões de estudo, questões e evolução serão implementados quando houver um fluxo definido." />
      <Card><CardContent className="flex items-start gap-4">
        <BookOpen aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />
        <div><h2 className="font-semibold">Ainda não configurado</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Nenhuma estatística é exibida antes de existir uma fonte real de dados.</p>
        </div>
      </CardContent></Card>
    </>
  );
}
