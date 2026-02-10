"use client"

import * as React from "react"
import { cn } from "@/components/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { FilterHorizontalIcon } from "@hugeicons/core-free-icons"
import { timeRangeOptions } from "@/features/dashboard/dashboard-data"

export function TimeRangeTabs() {
  const [selected, setSelected] = React.useState("12 hour")

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted p-0.5">
        {timeRangeOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              selected === option
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option}
          </button>
        ))}
      </div>
      <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
        <HugeiconsIcon icon={FilterHorizontalIcon} className="size-4" />
        Filter
      </button>
    </div>
  )
}
