import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import type { CreateTodoInput, Todo, TodoFilter } from "@/features/todo/todo-types";

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  schemaVersion: number;
}

export const useTodoStore = create<TodoState>()(
  persist((): TodoState => ({ todos: [], filter: "all", schemaVersion: 1 }), {
    name: "todo-store",
    version: 1,
  }),
);

export const addTodo = (input: CreateTodoInput) => {
  useTodoStore.setState((state) => ({
    todos: [
      {
        id: crypto.randomUUID(),
        title: input.title,
        description: input.description ?? "",
        priority: input.priority,
        dueDate: input.dueDate ?? null,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...state.todos,
    ],
  }));
};

export const updateTodo = (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => {
  useTodoStore.setState((state) => ({
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
  }));
};

export const deleteTodo = (id: string) => {
  useTodoStore.setState((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  }));
};

export const toggleTodo = (id: string) => {
  useTodoStore.setState((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  }));
};

export const setFilter = (filter: TodoFilter) => {
  useTodoStore.setState({ filter });
};

export function useFilteredTodos(): Todo[] {
  const { todos, filter } = useTodoStore(useShallow((s) => ({ todos: s.todos, filter: s.filter })));

  const filtered = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return filtered.slice().sort((a, b) => {
    if (a.dueDate === null && b.dueDate === null) return 0;
    if (a.dueDate === null) return 1;
    if (b.dueDate === null) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  });
}

export function useTodoById(id: string): Todo | undefined {
  return useTodoStore((s) => s.todos.find((t) => t.id === id));
}
