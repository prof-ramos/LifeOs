import { taskStatuses, type Task } from "./types";

export const TASKS_STORAGE_KEY = "lifeos.tasks.v1";
export const TASKS_CHANGED_EVENT = "lifeos:tasks-changed";
const MAX_TASKS = 500;

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") return false;
  const task = value as Record<string, unknown>;
  return typeof task.id === "string" && task.id.length > 0 &&
    typeof task.title === "string" && task.title.trim().length > 0 &&
    task.title.length <= 120 &&
    typeof task.createdAt === "string" && !Number.isNaN(Date.parse(task.createdAt)) &&
    taskStatuses.includes(task.status as Task["status"]);
}

export function readTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) return [];
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter(isTask).slice(0, MAX_TASKS);
  } catch {
    return [];
  }
}

export function writeTasks(tasks: Task[]): boolean {
  if (typeof window === "undefined" || tasks.length > MAX_TASKS) return false;
  try {
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    window.dispatchEvent(new Event(TASKS_CHANGED_EVENT));
    return true;
  } catch {
    return false;
  }
}
