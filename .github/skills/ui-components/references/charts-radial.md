# Charts - Radial

Source: https://ui.shadcn.com/charts/radial#charts
Chart docs: https://ui.shadcn.com/docs/components/base/chart

Requirements (from chart docs)

- Install: shadcn@latest add chart
- Use Recharts primitives with the chart helpers from @/components/ui/chart.
- Wrap charts with ChartContainer and set a min-h-[VALUE] class so they are responsive.
- Define a ChartConfig with labels and colors, then reference colors with var(--color-KEY).
- Add ChartTooltip or ChartLegend only when needed.

Examples on the page

- Radial Chart
- Radial Chart - Label
- Radial Chart - Grid
- Radial Chart - Text
- Radial Chart - Shape
- Radial Chart - Stacked

Shared setup

```tsx
const chartData = [
  { name: "desktop", visitors: 1260, fill: "var(--color-desktop)" },
  { name: "mobile", visitors: 940, fill: "var(--color-mobile)" },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;
```

Example: Radial Chart

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <RadialBarChart
    data={chartData}
    innerRadius={40}
    outerRadius={120}
    startAngle={90}
    endAngle={-270}
  >
    <PolarRadiusAxis tick={false} axisLine={false} />
    <RadialBar dataKey="visitors" background cornerRadius={8} />
  </RadialBarChart>
</ChartContainer>
```

Example: Radial Chart - Label

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <RadialBarChart data={chartData} innerRadius={40} outerRadius={120}>
    <PolarRadiusAxis tick={false} axisLine={false} />
    <RadialBar dataKey="visitors" label={{ position: "insideStart", fill: "var(--foreground)" }} />
  </RadialBarChart>
</ChartContainer>
```

Example: Radial Chart - Stacked

```tsx
<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <RadialBarChart data={chartData} innerRadius={40} outerRadius={120}>
    <PolarRadiusAxis tick={false} axisLine={false} />
    <RadialBar dataKey="visitors" stackId="a" cornerRadius={8} />
  </RadialBarChart>
</ChartContainer>
```
