# Charts - Radar

Source: https://ui.shadcn.com/charts/radar#charts
Chart docs: https://ui.shadcn.com/docs/components/base/chart

Requirements (from chart docs)

- Install: shadcn@latest add chart
- Use Recharts primitives with the chart helpers from @/components/ui/chart.
- Wrap charts with ChartContainer and set a min-h-[VALUE] class so they are responsive.
- Define a ChartConfig with labels and colors, then reference colors with var(--color-KEY).
- Add ChartTooltip or ChartLegend only when needed.

Examples on the page

- Radar Chart
- Radar Chart - Dots
- Radar Chart - Lines Only
- Radar Chart - Custom Label
- Radar Chart - Grid Custom
- Radar Chart - Grid None
- Radar Chart - Grid Circle
- Radar Chart - Grid Circle - No lines
- Radar Chart - Grid Circle Filled
- Radar Chart - Grid Filled
- Radar Chart - Multiple
- Radar Chart - Legend

Shared setup

```tsx
const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;
```

Example: Radar Chart

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <RadarChart data={chartData} outerRadius={80} accessibilityLayer>
    <PolarGrid />
    <PolarAngleAxis dataKey="month" />
    <Radar
      dataKey="desktop"
      fill="var(--color-desktop)"
      stroke="var(--color-desktop)"
      fillOpacity={0.3}
    />
  </RadarChart>
</ChartContainer>
```

Example: Radar Chart - Multiple

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <RadarChart data={chartData} outerRadius={80} accessibilityLayer>
    <PolarGrid />
    <PolarAngleAxis dataKey="month" />
    <ChartLegend content={<ChartLegendContent />} />
    <Radar
      dataKey="desktop"
      fill="var(--color-desktop)"
      stroke="var(--color-desktop)"
      fillOpacity={0.3}
    />
    <Radar
      dataKey="mobile"
      fill="var(--color-mobile)"
      stroke="var(--color-mobile)"
      fillOpacity={0.25}
    />
  </RadarChart>
</ChartContainer>
```

Example: Radar Chart - Grid Circle

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <RadarChart data={chartData} outerRadius={80} accessibilityLayer>
    <PolarGrid gridType="circle" />
    <PolarAngleAxis dataKey="month" />
    <Radar
      dataKey="desktop"
      fill="var(--color-desktop)"
      stroke="var(--color-desktop)"
      fillOpacity={0.3}
    />
  </RadarChart>
</ChartContainer>
```
