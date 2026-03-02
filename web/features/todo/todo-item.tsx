"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleTodo } from "@/store/use-todo-store";
import { PRIORITY_CONFIG, type Todo } from "@/features/todo/todo-types";
import { TodoDeleteDialog } from "@/features/todo/todo-delete-dialog";
import { TodoForm } from "@/features/todo/todo-form";

interface TodoItemProps {
  todo: Todo;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function TodoItem({ todo }: TodoItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const priorityConfig = PRIORITY_CONFIG[todo.priority];

  return (
    <>
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex items-start gap-3 sm:flex-1">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => toggleTodo(todo.id)}
            aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
            className="mt-0.5 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p
              className={
                todo.completed
                  ? "line-through text-muted-foreground text-sm font-medium"
                  : "text-sm font-medium"
              }
            >
              {todo.title}
            </p>
            {todo.description && (
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                {todo.description}
              </p>
            )}
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <Badge variant={todo.priority}>{priorityConfig.label}</Badge>
              {todo.dueDate && (
                <span className="text-xs text-muted-foreground">{formatDate(todo.dueDate)}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setEditOpen(true)}
            aria-label={`Edit task: ${todo.title}`}
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setDeleteOpen(true)}
            aria-label={`Delete task: ${todo.title}`}
          >
            <svg
              className="size-4 text-destructive"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </Button>
        </div>
      </div>

      <TodoForm mode="edit" todo={todo} open={editOpen} onOpenChange={setEditOpen} />
      <TodoDeleteDialog todo={todo} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
}
