"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, ListTodo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { readTasks, TASKS_CHANGED_EVENT, TASKS_STORAGE_KEY } from "@/modules/tasks/local-repository";
import type { Task } from "@/modules/tasks/types";

export function TaskSummary() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  useEffect(() => {
    const update = () => setTasks(readTasks());
    const onStorage = (event: StorageEvent) => {
      if (event.key === TASKS_STORAGE_KEY || event.key === null) update();
    };
    update();
    window.addEventListener(TASKS_CHANGED_EVENT, update);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(TASKS_CHANGED_EVENT, update);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const cards = [
    { label: "Tarefas cadastradas", value: tasks?.length, Icon: ListTodo },
    { label: "Em andamento", value: tasks?.filter((task) => task.status === "doing").length, Icon: Clock3 },
    { label: "Concluídas", value: tasks?.filter((task) => task.status === "done").length, Icon: CheckCircle2 },
  ];
  return (
    <section aria-label="Resumo das tarefas" className="grid gap-4 sm:grid-cols-3">
      {cards.map(({ label, value, Icon }) => (
        <Card key={label}>
          <CardContent className="flex items-center gap-3">
            <span className="rounded-lg bg-muted p-3 text-primary"><Icon aria-hidden="true" className="h-5 w-5" /></span>
            <div><p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">{value ?? "…"}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
