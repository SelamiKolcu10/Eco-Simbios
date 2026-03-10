"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutGrid,
  Store,
  Map,
  Heart,
  BookOpen,
  Compass,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  active?: boolean
  badge?: string
}

const navItems: NavItem[] = [
  {
    label: "Kontrol Paneli",
    icon: <LayoutGrid className="h-5 w-5" />,
    href: "/dashboard",
    active: true,
  },
  {
    label: "Simbiyoz Pazarı",
    icon: <Store className="h-5 w-5" />,
    href: "/marketplace",
    badge: "YENİ",
  },
  {
    label: "Canlı Harita",
    icon: <Map className="h-5 w-5" />,
    href: "/map",
  },
  {
    label: "Sosyal Etki",
    icon: <Heart className="h-5 w-5" />,
    href: "/social-impact",
  },
  {
    label: "Karbon Defteri",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/carbon-ledger",
  },
  {
    label: "Saha",
    icon: <Compass className="h-5 w-5" />,
    href: "/field",
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-72"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                  Eko-
                  <span className="text-primary">Simbiyoz</span>
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground transition-colors hover:bg-sidebar-border",
              collapsed && "absolute -right-4 top-8 z-10 bg-primary text-primary-foreground shadow-lg hover:bg-accent"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {!collapsed && (
            <span className="mb-3 block px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              Ana Modüller
            </span>
          )}
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                    item.active
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                      item.active
                        ? "bg-primary-foreground/20"
                        : "bg-sidebar-accent group-hover:bg-sidebar-border"
                    )}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {item.active && (
                        <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                      )}
                    </>
                  )}
                </a>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="flex items-center gap-2">
                  {item.label}
                  {item.badge && (
                    <Badge variant="secondary" className="text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        {/* Status */}
        <div className={cn("mx-3 mb-4", collapsed ? "px-0" : "px-3")}>
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl bg-sidebar-accent/50 px-4 py-3",
              collapsed && "justify-center px-2"
            )}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            {!collapsed && (
              <span className="text-xs font-medium text-sidebar-foreground/70">
                Tüm sistemler çevrimiçi
              </span>
            )}
          </div>
        </div>

        {/* User */}
        <div
          className={cn(
            "border-t border-sidebar-border p-4",
            collapsed ? "flex justify-center" : ""
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-sidebar-accent",
                  collapsed && "justify-center p-2"
                )}
              >
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    AU
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-semibold text-sidebar-foreground">
                        Yönetici Kullanıcı
                      </p>
                      <p className="truncate text-xs text-sidebar-foreground/50">
                        Yönetici Paneli
                      </p>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/50 transition-colors hover:bg-sidebar-border hover:text-sidebar-foreground">
                      <LogOut className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p className="font-semibold">Yönetici Kullanıcı</p>
                <p className="text-xs text-muted-foreground">Yönetici Paneli</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  )
}
