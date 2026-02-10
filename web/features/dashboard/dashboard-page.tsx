"use client"

import { DashboardSidebar } from "@/features/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/features/dashboard/dashboard-header"
import { TimeRangeTabs } from "@/features/dashboard/time-range-tabs"
import { AirQualityPanel } from "@/features/dashboard/air-quality-panel"
import { AirQualityChart } from "@/features/dashboard/air-quality-chart"
import { AirQualitySummary } from "@/features/dashboard/air-quality-summary"

export function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col gap-6">
            <DashboardHeader />
            <TimeRangeTabs />
            <AirQualityPanel />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AirQualityChart />
              <AirQualitySummary />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
