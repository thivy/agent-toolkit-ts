import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/components/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary ring-primary/20",
        secondary: "bg-secondary text-secondary-foreground ring-secondary/30",
        destructive: "bg-destructive/10 text-destructive ring-destructive/20",
        outline: "bg-background text-foreground ring-border",
        low: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
        medium:
          "bg-blue-100 text-blue-700 ring-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:ring-blue-700",
        high: "bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:ring-amber-700",
        urgent:
          "bg-red-100 text-red-700 ring-red-200 dark:bg-red-900 dark:text-red-300 dark:ring-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
