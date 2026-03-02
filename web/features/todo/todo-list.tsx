"use client";

import { useTodoStore, useFilteredTodos } from "@/store/use-todo-store";
import { TodoEmptyState } from "@/features/todo/todo-empty-state";
import { TodoItem } from "@/features/todo/todo-item";

interface TodoListProps {
  onAddClick: () => void;
}

export function TodoList({ onAddClick }: TodoListProps) {
  const filter = useTodoStore((s) => s.filter);
  const totalCount = useTodoStore((s) => s.todos.length);
  const todos = useFilteredTodos();

  if (todos.length === 0) {
    return <TodoEmptyState filter={filter} totalCount={totalCount} onAddClick={onAddClick} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
