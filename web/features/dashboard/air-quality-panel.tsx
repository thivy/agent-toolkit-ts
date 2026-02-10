import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { metricCards } from "@/features/dashboard/dashboard-data"
import { MetricCard } from "@/features/dashboard/metric-card"
import { PmvGaugeCard } from "@/features/dashboard/pmv-gauge-card"

export function AirQualityPanel() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1 text-muted-foreground">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="4" cy="4" r="1.5" />
              <circle cx="4" cy="8" r="1.5" />
              <circle cx="4" cy="12" r="1.5" />
              <circle cx="8" cy="4" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="8" cy="12" r="1.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold">Air Quality History</h3>
            <p className="text-sm text-muted-foreground">Last 12 hours</p>
          </div>
        </div>
        <select className="rounded-md border border-border bg-background px-3 py-1.5 text-sm">
          <option>CO2</option>
        </select>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.slice(0, 3).map((card, index) => (
          <MetricCard key={index} data={card} />
        ))}
        <PmvGaugeCard />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <button className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
          <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />
          Learn more
        </button>
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4h12M4 4V2h8v2M5 7v5M8 7v5M11 7v5M3 4v9a1 1 0 001 1h8a1 1 0 001-1V4" />
          </svg>
          Go to the panel
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
        </button>
      </div>
    </div>
  )
}
