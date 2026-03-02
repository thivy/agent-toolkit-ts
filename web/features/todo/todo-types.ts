import { z } from "zod";

export type Priority = "low" | "medium" | "high" | "urgent";

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string | null;
  completed: boolean;
  createdAt: string;
}

export type TodoFilter = "all" | "active" | "completed";

export const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> = {
  low: {
    label: "Low",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  medium: {
    label: "Medium",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  high: {
    label: "High",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
  urgent: {
    label: "Urgent",
    className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
};

export type CreateTodoInput = {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string | null;
};

export const todoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  dueDate: z.string().optional().nullable(),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;
