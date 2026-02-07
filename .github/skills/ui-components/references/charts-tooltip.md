# Charts - Tooltip

Source: https://ui.shadcn.com/charts/tooltip#charts
Chart docs: https://ui.shadcn.com/docs/components/base/chart

Requirements (from chart docs)

- Install: shadcn@latest add chart
- Use Recharts primitives with the chart helpers from @/components/ui/chart.
- Wrap charts with ChartContainer and set a min-h-[VALUE] class so they are responsive.
- Define a ChartConfig with labels and colors, then reference colors with var(--color-KEY).
- Add ChartTooltip or ChartLegend only when needed.

Examples on the page

- Tooltip - Default
- Tooltip - Line Indicator
- Tooltip - No Indicator
- Tooltip - Custom Label
- Tooltip - Label Formatter
- Tooltip - No Label
- Tooltip - Formatter
- Tooltip - Icons
- Tooltip - Advanced

Shared setup

```tsx
const chartData = [
  { day: "Mon", running: 380, swimming: 420 },
  { day: "Tue", running: 260, swimming: 310 },
  { day: "Wed", running: 320, swimming: 380 },
  { day: "Thu", running: 410, swimming: 460 },
  { day: "Fri", running: 290, swimming: 330 },
];

const chartConfig = {
  running: { label: "Running", color: "var(--chart-1)" },
  swimming: { label: "Swimming", color: "var(--chart-2)" },
} satisfies ChartConfig;
```

Example: Tooltip - Default

```tsx
<ChartTooltip content={<ChartTooltipContent />} />
```

Example: Tooltip - Line Indicator

```tsx
<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
```

Example: Tooltip - No Indicator

```tsx
<ChartTooltip content={<ChartTooltipContent hideIndicator />} />
```

Example: Tooltip - Custom Label

```tsx
<ChartTooltip content={<ChartTooltipContent labelKey="running" />} />
```

Example: Tooltip - Label Formatter

```tsx
<ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => `Day: ${label}`} />} />
```

Example: Tooltip - No Label

```tsx
<ChartTooltip content={<ChartTooltipContent hideLabel />} />
```

Example: Tooltip - Formatter

```tsx
<ChartTooltip
  content={
    <ChartTooltipContent
      formatter={(value, name) => [
        `${value} kcal`,
        chartConfig[name as "running" | "swimming"].label,
      ]}
    />
  }
/>
```

Example: Tooltip - Icons

```tsx
<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
```

Example: Tooltip - Advanced

```tsx
<ChartTooltip
  content={
    <ChartTooltipContent
      indicator="line"
      formatter={(value) => `${value} kcal`}
      labelFormatter={() => "Total"}
    />
  }
/>
```
