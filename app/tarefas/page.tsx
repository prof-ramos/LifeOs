import { SectionHeading } from "@/components/section-heading";
import { TaskBoard } from "@/components/task-board";

export default function TasksPage() {
  return (
    <>
      <SectionHeading eyebrow="Módulo inicial" title="Tarefas pessoais" description="Um quadro Kanban simples, inspirado na experiência de uso do Kan. Seus dados ficam somente neste navegador durante o protótipo." />
      <TaskBoard />
    </>
  );
}
