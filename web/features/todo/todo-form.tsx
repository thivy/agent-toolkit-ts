"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogPopup, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectOption,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addTodo, updateTodo } from "@/store/use-todo-store";
import { todoFormSchema, type Todo, type TodoFormValues } from "@/features/todo/todo-types";

interface TodoFormProps {
  mode: "add" | "edit";
  todo?: Todo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TodoForm({ mode, todo, open, onOpenChange }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: null,
    },
  });

  const priorityValue = watch("priority");

  useEffect(() => {
    if (open) {
      if (mode === "edit" && todo) {
        reset({
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          dueDate: todo.dueDate ?? "",
        });
      } else {
        reset({ title: "", description: "", priority: "medium", dueDate: "" });
      }
    }
  }, [open, mode, todo, reset]);

  function onSubmit(values: TodoFormValues) {
    if (mode === "add") {
      addTodo({
        title: values.title,
        description: values.description,
        priority: values.priority,
        dueDate: values.dueDate || null,
      });
      reset();
    } else if (mode === "edit" && todo) {
      updateTodo(todo.id, {
        title: values.title,
        description: values.description,
        priority: values.priority,
        dueDate: values.dueDate || null,
      });
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogTitle>{mode === "add" ? "Add Task" : "Edit Task"}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="todo-title">Title</Label>
            <Input
              id="todo-title"
              placeholder="Task title"
              aria-invalid={errors.title ? "true" : undefined}
              aria-describedby={errors.title ? "todo-title-error" : undefined}
              {...register("title")}
            />
            {errors.title && (
              <p id="todo-title-error" className="text-sm text-destructive" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="todo-description">Description</Label>
            <Textarea
              id="todo-description"
              placeholder="Optional description"
              rows={3}
              {...register("description")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="todo-priority">Priority</Label>
            <Select
              value={priorityValue}
              onValueChange={(val) => setValue("priority", val as TodoFormValues["priority"])}
            >
              <SelectTrigger id="todo-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectPopup>
                <SelectOption value="low">Low</SelectOption>
                <SelectOption value="medium">Medium</SelectOption>
                <SelectOption value="high">High</SelectOption>
                <SelectOption value="urgent">Urgent</SelectOption>
              </SelectPopup>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="todo-due-date">Due date</Label>
            <Input id="todo-due-date" type="date" {...register("dueDate")} />
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit">{mode === "add" ? "Add Task" : "Save changes"}</Button>
          </div>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
