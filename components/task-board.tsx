"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { readTasks, writeTasks } from "@/modules/tasks/local-repository";
import { taskStatuses, type Task, type TaskStatus } from "@/modules/tasks/types";

const columns: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "A fazer" },
  { status: "doing", label: "Em andamento" },
  { status: "done", label: "Concluído" },
];

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTasks(readTasks());
    setReady(true);
  }, []);

  function commit(next: Task[]) {
    if (!writeTasks(next)) {
      setError("Não foi possível salvar as tarefas neste navegador. Verifique o armazenamento disponível.");
      return;
    }
    setError("");
    setTasks(next);
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = title.trim();
    if (!normalized || normalized.length > 120) {
      setError("Informe uma tarefa com até 120 caracteres.");
      return;
    }
    if (tasks.length >= 500) {
      setError("Limite local de 500 tarefas atingido.");
      return;
    }
    commit([{ id: crypto.randomUUID(), title: normalized, status: "todo", createdAt: new Date().toISOString() }, ...tasks]);
    setTitle("");
  }

  function changeStatus(id: string, status: TaskStatus) {
    commit(tasks.map((task) => task.id === id ? { ...task, status } : task));
  }

  return (
    <div>
      <form onSubmit={addTask} className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="nova-tarefa" className="mb-1.5 block text-sm font-medium">Nova tarefa</label>
          <input id="nova-tarefa" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120}
            placeholder="O que você precisa fazer?" disabled={!ready} autoComplete="off"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground" />
        </div>
        <button type="submit" disabled={!ready || !title.trim()} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white hover:brightness-110">
          <Plus aria-hidden="true" className="h-4 w-4" /> Adicionar
        </button>
      </form>
      <p className="mb-4 text-xs text-muted-foreground">Protótipo local: alterações não são sincronizadas nem têm backup. Não registre informações sensíveis.</p>
      {error && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="grid items-start gap-4 lg:grid-cols-3">
        {columns.map(({ status, label }) => {
          const group = tasks.filter((task) => task.status === status);
          return (
            <section key={status} aria-label={label} className="rounded-xl border border-border bg-muted/60 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold">{label}</h2>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-muted-foreground">{ready ? group.length : "…"}</span>
              </div>
              <div className="space-y-3">
                {ready && group.length === 0 && <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">Nenhuma tarefa nesta etapa.</p>}
                {group.map((task) => (
                  <Card key={task.id} size="sm">
                    <CardHeader>
                      <CardTitle className="break-words text-sm">{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                      <label htmlFor={`status-${task.id}`} className="sr-only">Etapa de {task.title}</label>
                      <select id={`status-${task.id}`} value={task.status}
                        onChange={(event) => {
                          const next = event.target.value as TaskStatus;
                          if (taskStatuses.includes(next)) changeStatus(task.id, next);
                        }}
                        className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-2 text-xs">
                        {columns.map((column) => <option value={column.status} key={column.status}>{column.label}</option>)}
                      </select>
                      <button type="button" onClick={() => commit(tasks.filter((item) => item.id !== task.id))}
                        aria-label={`Excluir tarefa: ${task.title}`} title="Excluir tarefa"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-red-50 hover:text-red-700">
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
