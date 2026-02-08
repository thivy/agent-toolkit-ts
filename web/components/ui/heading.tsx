import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/components/lib/utils";

const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    variant: {
      h1: "text-4xl font-semibold lg:text-5xl",
      h2: "pb-2 text-3xl font-semibold first:mt-0",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headingVariants>;

function Heading({ className, variant = "h2", ...props }: HeadingProps) {
  const Tag = variant ?? "h2";

  return (
    <Tag data-slot="heading" className={cn(headingVariants({ variant, className }))} {...props} />
  );
}

export { Heading, headingVariants };
