# Charts - Pie

Source: https://ui.shadcn.com/charts/pie#charts
Chart docs: https://ui.shadcn.com/docs/components/base/chart

Requirements (from chart docs)

- Install: shadcn@latest add chart
- Use Recharts primitives with the chart helpers from @/components/ui/chart.
- Wrap charts with ChartContainer and set a min-h-[VALUE] class so they are responsive.
- Define a ChartConfig with labels and colors, then reference colors with var(--color-KEY).
- Add ChartTooltip or ChartLegend only when needed.

Examples on the page

- Pie Chart
- Pie Chart - Separator None
- Pie Chart - Label
- Pie Chart - Custom Label
- Pie Chart - Label List
- Pie Chart - Legend
- Pie Chart - Donut
- Pie Chart - Donut Active
- Pie Chart - Donut with Text
- Pie Chart - Stacked
- Pie Chart - Interactive

Shared setup

```tsx
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;
```

Example: Pie Chart

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <PieChart>
    <ChartTooltip content={<ChartTooltipContent nameKey="browser" />} />
    <Pie data={chartData} dataKey="visitors" nameKey="browser" stroke="var(--background)" />
  </PieChart>
</ChartContainer>
```

Example: Pie Chart - Donut

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <PieChart>
    <Pie
      data={chartData}
      dataKey="visitors"
      nameKey="browser"
      innerRadius={60}
      stroke="var(--background)"
    />
  </PieChart>
</ChartContainer>
```

Example: Pie Chart - Legend

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <PieChart>
    <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
    <Pie data={chartData} dataKey="visitors" nameKey="browser" stroke="var(--background)" />
  </PieChart>
</ChartContainer>
```
