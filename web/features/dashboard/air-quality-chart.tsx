"use client"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  airQualityChartData,
  airQualityChartConfig,
} from "@/features/dashboard/dashboard-data"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts"
import { HugeiconsIcon } from "@hugeicons/react"
import { MoreVerticalIcon } from "@hugeicons/core-free-icons"

export function AirQualityChart() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Air Quality History</h3>
          <p className="text-sm text-muted-foreground">Last 12 hours</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-md border border-border bg-background px-3 py-1.5 text-sm">
            <option>CO2</option>
          </select>
          <button className="rounded-md p-1 hover:bg-muted">
            <HugeiconsIcon icon={MoreVerticalIcon} className="size-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <ChartContainer config={airQualityChartConfig} className="min-h-[220px] w-full">
        <LineChart data={airQualityChartData} accessibilityLayer>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={[480, 660]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <ReferenceLine
            y={500}
            stroke="var(--color-muted-foreground)"
            strokeDasharray="3 3"
            label={{ value: "Avg", position: "right", fontSize: 11 }}
          />
          <Line
            dataKey="co2"
            type="monotone"
            stroke="var(--color-co2)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
