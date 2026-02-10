import { summaryCards } from "@/features/dashboard/dashboard-data"
import { MetricCard } from "@/features/dashboard/metric-card"

export function AirQualitySummary() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Air Quality History</h3>
          <p className="text-sm text-muted-foreground">Last 12 hours</p>
        </div>
        <select className="rounded-md border border-border bg-background px-3 py-1.5 text-sm">
          <option>CO2</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {summaryCards.map((card, index) => (
          <MetricCard key={index} data={card} />
        ))}
      </div>
    </div>
  )
}
