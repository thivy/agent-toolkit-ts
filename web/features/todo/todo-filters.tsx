"use client";

import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTodoStore, setFilter } from "@/store/use-todo-store";

export function TodoFilters() {
  const filter = useTodoStore((s) => s.filter);
  const todos = useTodoStore((s) => s.todos);

  const totalCount = todos.length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <Tabs value={filter} onValueChange={(val) => setFilter(val as typeof filter)}>
      <TabsList>
        <TabsTab value="all">
          All
          {totalCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 rounded-full px-1.5 text-xs">
              {totalCount}
            </Badge>
          )}
        </TabsTab>
        <TabsTab value="active">
          Active
          {activeCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 rounded-full px-1.5 text-xs">
              {activeCount}
            </Badge>
          )}
        </TabsTab>
        <TabsTab value="completed">
          Completed
          {completedCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 rounded-full px-1.5 text-xs">
              {completedCount}
            </Badge>
          )}
        </TabsTab>
      </TabsList>
    </Tabs>
  );
}
