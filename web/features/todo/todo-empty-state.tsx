"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import type { TodoFilter } from "@/features/todo/todo-types";

interface TodoEmptyStateProps {
  filter: TodoFilter;
  totalCount: number;
  onAddClick: () => void;
}

export function TodoEmptyState({ filter, totalCount, onAddClick }: TodoEmptyStateProps) {
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <Heading variant="h3" className="text-muted-foreground font-normal">
          No tasks yet
        </Heading>
        <p className="text-sm text-muted-foreground">Add your first task to get started.</p>
        <Button onClick={onAddClick}>Add your first task</Button>
      </div>
    );
  }

  if (filter === "active") {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <Heading variant="h3" className="text-muted-foreground font-normal">
          All tasks done!
        </Heading>
        <p className="text-sm text-muted-foreground">
          You&apos;ve completed everything. Great work!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center">
      <Heading variant="h3" className="text-muted-foreground font-normal">
        No completed tasks yet
      </Heading>
      <p className="text-sm text-muted-foreground">Complete a task to see it here.</p>
    </div>
  );
}
