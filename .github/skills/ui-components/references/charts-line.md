# Charts - Line

Source: https://ui.shadcn.com/charts/line#charts
Chart docs: https://ui.shadcn.com/docs/components/base/chart

Requirements (from chart docs)

- Install: shadcn@latest add chart
- Use Recharts primitives with the chart helpers from @/components/ui/chart.
- Wrap charts with ChartContainer and set a min-h-[VALUE] class so they are responsive.
- Define a ChartConfig with labels and colors, then reference colors with var(--color-KEY).
- Add ChartTooltip or ChartLegend only when needed.

Examples on the page

- Line Chart - Interactive
- Line Chart
- Line Chart - Linear
- Line Chart - Step
- Line Chart - Multiple
- Line Chart - Dots
- Line Chart - Custom Dots
- Line Chart - Dots Colors
- Line Chart - Label
- Line Chart - Custom Label

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

Example: Line Chart - Interactive

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <LineChart data={chartData} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line
      dataKey="desktop"
      type="monotone"
      stroke="var(--color-desktop)"
      strokeWidth={2}
      dot={false}
    />
    <Line
      dataKey="mobile"
      type="monotone"
      stroke="var(--color-mobile)"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ChartContainer>
```

Example: Line Chart - Step

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <LineChart data={chartData} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <Line dataKey="desktop" type="step" stroke="var(--color-desktop)" strokeWidth={2} dot />
  </LineChart>
</ChartContainer>
```

Example: Line Chart - Multiple

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <LineChart data={chartData} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartLegend content={<ChartLegendContent />} />
    <Line
      dataKey="desktop"
      type="monotone"
      stroke="var(--color-desktop)"
      strokeWidth={2}
      dot={false}
    />
    <Line
      dataKey="mobile"
      type="monotone"
      stroke="var(--color-mobile)"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ChartContainer>
```
