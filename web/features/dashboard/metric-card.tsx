import { cn } from "@/components/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import type { MetricCardData } from "@/features/dashboard/dashboard-data"

export function MetricCard({
  data,
  className,
}: {
  data: MetricCardData
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-background p-4",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{data.title}</span>
        <HugeiconsIcon
          icon={InformationCircleIcon}
          className="size-4 text-muted-foreground"
        />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">
          {data.value}
          {data.unit && (
            <span className="ml-1 text-2xl font-bold">{data.unit}</span>
          )}
        </span>
        {data.status && (
          <span className={cn("text-sm font-medium", data.statusColor)}>
            {data.status}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 text-xs">
        <span className="font-medium text-emerald-600">{data.change}</span>
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          className="size-3 text-emerald-600"
        />
        <span className="text-muted-foreground">{data.period}</span>
      </div>
      <div className="text-xs font-medium text-muted-foreground">
        {data.spaces}
      </div>
    </div>
  )
}
