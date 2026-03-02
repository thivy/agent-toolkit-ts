"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteTodo } from "@/store/use-todo-store";
import type { Todo } from "@/features/todo/todo-types";

interface TodoDeleteDialogProps {
  todo: Todo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TodoDeleteDialog({ todo, open, onOpenChange }: TodoDeleteDialogProps) {
  function handleDelete() {
    deleteTodo(todo.id);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogTitle>Delete task</DialogTitle>
        <DialogDescription className="mt-2">
          Delete &ldquo;{todo.title}&rdquo;? This action cannot be undone.
        </DialogDescription>
        <div className="mt-6 flex justify-end gap-3">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
