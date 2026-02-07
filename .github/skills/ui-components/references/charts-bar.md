# Charts - Bar

Source: https://ui.shadcn.com/charts/bar#charts
Chart docs: https://ui.shadcn.com/docs/components/base/chart

Requirements (from chart docs)

- Install: shadcn@latest add chart
- Use Recharts primitives with the chart helpers from @/components/ui/chart.
- Wrap charts with ChartContainer and set a min-h-[VALUE] class so they are responsive.
- Define a ChartConfig with labels and colors, then reference colors with var(--color-KEY).
- Add ChartTooltip or ChartLegend only when needed.

Examples on the page

- Bar Chart - Interactive
- Bar Chart
- Bar Chart - Horizontal
- Bar Chart - Multiple
- Bar Chart - Stacked + Legend
- Bar Chart - Label
- Bar Chart - Custom Label
- Bar Chart - Mixed
- Bar Chart - Active
- Bar Chart - Negative

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

Example: Bar Chart - Interactive

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart data={chartData} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

Example: Bar Chart - Horizontal

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart data={chartData} layout="vertical" accessibilityLayer>
    <CartesianGrid horizontal={false} />
    <XAxis type="number" tickLine={false} axisLine={false} />
    <YAxis type="category" dataKey="month" tickLine={false} axisLine={false} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
  </BarChart>
</ChartContainer>
```

Example: Bar Chart - Stacked + Legend

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart data={chartData} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```
