export const taskStatuses = ["todo", "doing", "done"] as const;
export type TaskStatus = (typeof taskStatuses)[number];

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}
