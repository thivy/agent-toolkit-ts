import type { ChartConfig } from "@/components/ui/chart"

export const sidebarNavItems = [
  { label: "Dashboard", icon: "DashboardSquare01Icon", href: "#" },
  { label: "Buildings and spaces", icon: "Building03Icon", href: "#" },
  { label: "Devices", icon: "ComputerCheckIcon", href: "#" },
  { label: "Users", icon: "User02Icon", href: "#" },
  { label: "Alerts", icon: "Alert01Icon", href: "#" },
  { label: "Kiosk", icon: "ComputerDesk01Icon", href: "#" },
] as const

export const sidebarSettingsItems = [
  { label: "Preferences", href: "#" },
  { label: "API keys", href: "#" },
  { label: "SSO", href: "#" },
] as const

export const timeRangeOptions = [
  "1 hours",
  "12 hour",
  "24 hours",
  "7 days",
  "30 days",
  "Default",
  "Custom",
] as const

export type MetricCardData = {
  title: string
  value: string
  unit?: string
  status?: string
  statusColor?: string
  change: string
  changeDirection: "up" | "down"
  period: string
  spaces: string
}

export const metricCards: MetricCardData[] = [
  {
    title: "Percent time CO2 goal met",
    value: "100",
    unit: "%",
    change: "+10%",
    changeDirection: "up",
    period: "in last 12 hours",
    spaces: "3 of 3 spaces",
  },
  {
    title: "Temp.",
    value: "20.5",
    unit: "°C",
    status: "Good",
    statusColor: "text-emerald-500",
    change: "+20%",
    changeDirection: "up",
    period: "in last 12 hours",
    spaces: "3 of 3 spaces",
  },
  {
    title: "Percent time CO2 goal met",
    value: "100",
    unit: "%",
    change: "+10%",
    changeDirection: "up",
    period: "in last 12 hours",
    spaces: "3 of 3 spaces",
  },
  {
    title: "PMV",
    value: "-2.8",
    status: "Too cold",
    statusColor: "text-sky-500",
    change: "+10%",
    changeDirection: "up",
    period: "in last 12 hours",
    spaces: "3 of 3 spaces",
  },
]

export const airQualityChartData = [
  { time: "00:00", co2: 498 },
  { time: "01:00", co2: 502 },
  { time: "02:00", co2: 510 },
  { time: "03:00", co2: 515 },
  { time: "04:00", co2: 520 },
  { time: "05:00", co2: 535 },
  { time: "06:00", co2: 555 },
  { time: "07:00", co2: 580 },
  { time: "08:00", co2: 600 },
  { time: "09:00", co2: 615 },
  { time: "10:00", co2: 625 },
  { time: "11:00", co2: 640 },
  { time: "12:00", co2: 650 },
]

export const airQualityChartConfig = {
  co2: {
    label: "CO2",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export const summaryCards: MetricCardData[] = [
  {
    title: "Percent time CO2 goal met",
    value: "100",
    unit: "%",
    change: "+10%",
    changeDirection: "up",
    period: "in last 12 hours",
    spaces: "3 of 3 spaces",
  },
  {
    title: "Adequately ventilated spaces",
    value: "100",
    unit: "%",
    change: "+10%",
    changeDirection: "up",
    period: "in last 12 hours",
    spaces: "3 of 3 spaces",
  },
]

export const currentUser = {
  name: "Bill Smith",
  email: "bill.smith@gmail.com",
  initials: "BS",
}

export const dashboardMeta = {
  title: "Dashboard 19/01/2023",
  createdBy: "Ben Smith",
  createdDate: "12/12/2022",
  lastUpdated: "12/12/2022, 13:43",
}
