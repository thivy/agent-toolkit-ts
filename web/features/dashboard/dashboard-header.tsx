import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Share01Icon,
  StarIcon,
  ArrowDown01Icon,
  LockedIcon,
} from "@hugeicons/core-free-icons"
import { dashboardMeta } from "@/features/dashboard/dashboard-data"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button className="rounded-md p-1 hover:bg-muted">
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          </button>
          <span className="font-medium text-foreground">Dashboard</span>
          <HugeiconsIcon icon={LockedIcon} className="size-3.5" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Add a panel
          </Button>
          <Button size="sm">Create a dashboard</Button>
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={StarIcon} className="size-5 fill-amber-400 text-amber-400" />
          <h1 className="text-xl font-semibold">{dashboardMeta.title}</h1>
          <button className="rounded p-0.5 hover:bg-muted">
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Created by</span>
          <Avatar className="size-5">
            <AvatarFallback className="bg-orange-200 text-orange-800 text-[10px]">
              B
            </AvatarFallback>
          </Avatar>
          <span>{dashboardMeta.createdBy}, {dashboardMeta.createdDate}</span>
          <span>•</span>
          <span>Last updated {dashboardMeta.lastUpdated}</span>
        </div>
      </div>

      {/* Actions & Time range */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button className="flex items-center gap-1.5 hover:text-foreground">
            <HugeiconsIcon icon={Share01Icon} className="size-4" />
            Share
          </button>
          <button className="flex items-center gap-1.5 hover:text-foreground">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 2v3M12 2v3M2 7h12M3 4h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" />
            </svg>
            Export
          </button>
        </div>
      </div>
    </div>
  )
}
