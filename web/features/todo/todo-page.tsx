"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

import { TodoEmpty } from "@/features/todo/components/todo-empty";
import { TodoInput } from "@/features/todo/components/todo-input";
import { TodoList } from "@/features/todo/components/todo-list";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 flex flex-col gap-6">
      <Heading variant="h1">Todos</Heading>
      <Card>
        <CardHeader>
          <CardTitle>Add a todo</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoInput onAdd={addTodo} />
        </CardContent>
      </Card>
      {todos.length === 0 ? (
        <TodoEmpty />
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}
    </div>
  );
};
