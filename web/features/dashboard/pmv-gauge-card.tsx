import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

export function PmvGaugeCard() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">PMV</span>
        <HugeiconsIcon
          icon={InformationCircleIcon}
          className="size-4 text-muted-foreground"
        />
      </div>
      {/* Gauge visualization */}
      <div className="flex items-center justify-center py-1">
        <div className="relative">
          <svg width="120" height="70" viewBox="0 0 120 70">
            {/* Background arc segments */}
            <path
              d="M 10 65 A 50 50 0 0 1 35 18"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 37 16 A 50 50 0 0 1 60 7"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 62 7 A 50 50 0 0 1 83 16"
              fill="none"
              stroke="#34d399"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 85 18 A 50 50 0 0 1 110 65"
              fill="none"
              stroke="#f97316"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Needle indicator - pointing to "too cold" area */}
            <line
              x1="60"
              y1="65"
              x2="25"
              y2="30"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="60" cy="65" r="3" fill="#1e293b" />
          </svg>
          <div className="absolute inset-x-0 -bottom-1 text-center">
            <span className="text-lg font-bold">-2.8</span>
          </div>
        </div>
      </div>
      <div className="text-center text-xs font-medium text-sky-500">Too cold</div>
      <div className="flex items-center gap-1 text-xs">
        <span className="font-medium text-emerald-600">+10%</span>
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          className="size-3 text-emerald-600"
        />
        <span className="text-muted-foreground">in last 12 hours</span>
      </div>
      <div className="text-xs font-medium text-muted-foreground">
        3 of 3 spaces
      </div>
    </div>
  )
}
