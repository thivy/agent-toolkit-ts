"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { TodoFilters } from "@/features/todo/todo-filters";
import { TodoForm } from "@/features/todo/todo-form";
import { TodoList } from "@/features/todo/todo-list";

export const TodoPage = () => {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Heading variant="h1">Tasks</Heading>
        <Button onClick={() => setAddOpen(true)}>Add Task</Button>
      </div>
      <div className="mb-4">
        <TodoFilters />
      </div>
      <TodoList onAddClick={() => setAddOpen(true)} />
      <TodoForm mode="add" open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
};
