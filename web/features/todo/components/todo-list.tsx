import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/components/lib/utils";

import type { Todo } from "@/features/todo/todo-page";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <Card>
      <CardContent className="py-2">
        <ul className="divide-y divide-border">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-3 py-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="size-4 shrink-0 cursor-pointer accent-primary"
                aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
              />
              <span
                className={cn(
                  "flex-1 text-sm",
                  todo.completed && "text-muted-foreground line-through",
                )}
              >
                {todo.text}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete "${todo.text}"`}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
