"use client"

import * as React from "react"
import { cn } from "@/components/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  CommandIcon,
  DashboardSquare01Icon,
  Building03Icon,
  ComputerCheckIcon,
  User02Icon,
  Alert01Icon,
  ComputerDesk01Icon,
  Settings02Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowRight01Icon,
  Activity01Icon,
} from "@hugeicons/core-free-icons"
import {
  sidebarNavItems,
  sidebarSettingsItems,
  currentUser,
} from "@/features/dashboard/dashboard-data"

const iconMap: Record<string, typeof DashboardSquare01Icon> = {
  DashboardSquare01Icon,
  Building03Icon,
  ComputerCheckIcon,
  User02Icon,
  Alert01Icon,
  ComputerDesk01Icon,
}

export function DashboardSidebar() {
  const [settingsOpen, setSettingsOpen] = React.useState(true)
  const [appsOpen, setAppsOpen] = React.useState(false)

  return (
    <aside className="flex h-screen w-[240px] flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4L8 1L14 4L8 7L2 4Z" fill="currentColor" />
            <path d="M2 8L8 5L14 8L8 11L2 8Z" fill="currentColor" opacity="0.6" />
            <path d="M2 12L8 9L14 12L8 15L2 12Z" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Kaiterra</span>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            Company ABC
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
          <HugeiconsIcon icon={Search01Icon} className="size-4" />
          <span className="flex-1 text-left text-sm">Search</span>
          <kbd className="pointer-events-none flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            <HugeiconsIcon icon={CommandIcon} className="size-2.5" />K
          </kbd>
        </Button>
      </div>

      {/* Activity */}
      <div className="px-3 py-1">
        <button className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent">
          <HugeiconsIcon icon={Activity01Icon} className="size-4" />
          <span className="flex-1 text-left">Activity</span>
          <span className="flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
            2
          </span>
        </button>
      </div>

      <Separator className="mx-3 my-1" />

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-1">
        <div className="flex flex-col gap-0.5">
          {sidebarNavItems.map((item) => {
            const IconComponent = iconMap[item.icon]
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent",
                  item.label === "Dashboard" && "bg-sidebar-accent font-medium"
                )}
              >
                {IconComponent && (
                  <HugeiconsIcon icon={IconComponent} className="size-4" />
                )}
                {item.label}
              </a>
            )
          })}
        </div>

        <Separator className="my-2" />

        {/* Settings */}
        <div>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-sidebar-accent"
          >
            <HugeiconsIcon icon={Settings02Icon} className="size-4" />
            <span className="flex-1 text-left">Settings</span>
            <HugeiconsIcon
              icon={settingsOpen ? ArrowUp01Icon : ArrowDown01Icon}
              className="size-4"
            />
          </button>
          {settingsOpen && (
            <div className="ml-4 flex flex-col gap-0.5 py-1">
              {sidebarSettingsItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-2 py-1.5 pl-5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Apps & Integrations */}
        <div>
          <button
            onClick={() => setAppsOpen(!appsOpen)}
            className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-sidebar-accent"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
              <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="flex-1 text-left">Apps &amp; Integrations</span>
            <HugeiconsIcon
              icon={appsOpen ? ArrowUp01Icon : ArrowDown01Icon}
              className="size-4"
            />
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <Separator className="mx-3" />
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar className="size-8">
          <AvatarFallback className="bg-amber-100 text-amber-800 text-xs">
            {currentUser.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col overflow-hidden">
          <span className="truncate text-sm font-medium">{currentUser.name}</span>
          <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
        </div>
        <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 text-muted-foreground" />
      </div>
    </aside>
  )
}
