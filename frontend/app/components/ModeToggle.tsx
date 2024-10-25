"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <SidebarMenuButton onClick={toggleTheme} size="sm">
      {theme === "dark" ? <Sun /> : <Moon />}
      <span>Toggle theme</span>
    </SidebarMenuButton>
  );
}
