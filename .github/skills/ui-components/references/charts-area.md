# Charts - Area

Source: https://ui.shadcn.com/charts/area
Chart docs: https://ui.shadcn.com/docs/components/base/chart

Requirements (from chart docs)

- Install: shadcn@latest add chart
- Use Recharts primitives with the chart helpers from @/components/ui/chart.
- Wrap charts with ChartContainer and set a min-h-[VALUE] class so they are responsive.
- Define a ChartConfig with labels and colors, then reference colors with var(--color-KEY).
- Add ChartTooltip or ChartLegend only when needed.

Examples on the page

- Area Chart - Interactive
- Area Chart - Linear
- Area Chart - Step
- Area Chart - Legend
- Area Chart - Stacked
- Area Chart - Stacked Expanded
- Area Chart - Gradient
- Area Chart - Axes
- Area Chart - Icons

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

Example: Area Chart - Interactive

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <AreaChart data={chartData} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area
      dataKey="desktop"
      type="monotone"
      fill="var(--color-desktop)"
      stroke="var(--color-desktop)"
    />
    <Area
      dataKey="mobile"
      type="monotone"
      fill="var(--color-mobile)"
      stroke="var(--color-mobile)"
    />
  </AreaChart>
</ChartContainer>
```

Example: Area Chart - Stacked

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <AreaChart data={chartData} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <Area dataKey="desktop" stackId="a" fill="var(--color-desktop)" stroke="var(--color-desktop)" />
    <Area dataKey="mobile" stackId="a" fill="var(--color-mobile)" stroke="var(--color-mobile)" />
  </AreaChart>
</ChartContainer>
```

Example: Area Chart - Legend

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <AreaChart data={chartData} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartLegend content={<ChartLegendContent />} />
    <Area
      dataKey="desktop"
      type="monotone"
      fill="var(--color-desktop)"
      stroke="var(--color-desktop)"
    />
    <Area
      dataKey="mobile"
      type="monotone"
      fill="var(--color-mobile)"
      stroke="var(--color-mobile)"
    />
  </AreaChart>
</ChartContainer>
```
