"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComputerIcon, MoonIcon, PaintBoardIcon, SunIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type ThemeValue = "light" | "dark" | "system";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const value = (mounted ? (theme ?? "system") : "system") as ThemeValue;

  const triggerIcon = React.useMemo(() => {
    if (!mounted) return PaintBoardIcon;
    if (resolvedTheme === "dark") return MoonIcon;
    if (resolvedTheme === "light") return SunIcon;
    return PaintBoardIcon;
  }, [mounted, resolvedTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
        <HugeiconsIcon icon={triggerIcon} strokeWidth={2} />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(nextValue) => {
              setTheme(nextValue);
            }}
          >
            <DropdownMenuRadioItem value="light">
              <HugeiconsIcon icon={SunIcon} strokeWidth={2} />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <HugeiconsIcon icon={MoonIcon} strokeWidth={2} />
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
