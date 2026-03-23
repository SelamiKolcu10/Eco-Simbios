import { useState, useEffect } from "react"
import { cn } from "../../lib/utils"
import {
    LayoutDashboard,
    Store,
    Map,
    Heart,
    BookOpen,
    Compass,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Leaf,
    Sun,
    Moon
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const navItems = [
    {
        id: "dashboard",
        label: "Endüstriyel Simbiyoz",
        icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
        id: "market",
        label: "Simbiyoz Pazarı",
        icon: <Store className="h-5 w-5" />,
        badge: "YENİ",
    },
    {
        id: "map",
        label: "Canlı Harita",
        icon: <Map className="h-5 w-5" />,
    },
    {
        id: "social",
        label: "Sosyal Etki",
        icon: <Heart className="h-5 w-5" />,
    }
]

export function Sidebar({ activeSection, onNavigate, onLogout }) {
    const [collapsed, setCollapsed] = useState(false)
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Check for saved user preference or system preference
        const isDarkMode = localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        setIsDark(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [])

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={cn(
                    "relative flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out border-r border-sidebar-border z-20 shrink-0",
                    collapsed ? "w-20" : "w-72"
                )}
            >
                {/* Toggle Button - always visible on the edge */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-7 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                    {collapsed ? (
                        <ChevronRight className="h-3.5 w-3.5" />
                    ) : (
                        <ChevronLeft className="h-3.5 w-3.5" />
                    )}
                </button>

                {/* Header */}
                <div className="flex items-center justify-between p-6 h-28 shrink-0 relative">
                    <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
                        <div className="flex shrink-0 h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
                            <Leaf className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-xl md:text-2xl font-black tracking-tight text-sidebar-foreground truncate pr-2">
                                    Eko-<span className="text-primary">Simbiyoz</span>
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* Dark Mode Toggle */}
                    {!collapsed && (
                        <button
                            onClick={toggleTheme}
                            className="absolute right-4 top-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDark ? <Sun className="h-4 w-4 text-orange-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 mt-2 overflow-y-auto">
                    {!collapsed && (
                        <span className="mb-3 block px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                            Ana Modüller
                        </span>
                    )}
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <Tooltip key={item.id}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => onNavigate(item.id)}
                                        className={cn(
                                            "w-full group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                                            collapsed && "justify-center px-0"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors shrink-0",
                                                isActive
                                                    ? "bg-primary-foreground/20"
                                                    : "bg-sidebar-accent group-hover:bg-sidebar-border"
                                            )}
                                        >
                                            {item.icon}
                                        </span>
                                        {!collapsed && (
                                            <>
                                                <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                                                {item.badge && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-primary/20 text-primary-foreground border-none text-[10px] font-bold px-2 py-0.5 ml-1"
                                                    >
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                                {isActive && (
                                                    <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse ml-2" />
                                                )}
                                            </>
                                        )}
                                    </button>
                                </TooltipTrigger>
                                {collapsed && (
                                    <TooltipContent side="right" className="flex items-center gap-2 z-50">
                                        {item.label}
                                        {item.badge && (
                                            <Badge variant="secondary" className="text-[10px] bg-primary/20 text-primary">
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        );
                    })}
                </nav>

                {/* Status */}
                <div className={cn("mx-3 mb-4 mt-auto", collapsed ? "px-0" : "px-3")}>
                    <div
                        className={cn(
                            "flex items-center gap-2 rounded-xl bg-sidebar-accent/50 px-4 py-3 shrink-0",
                            collapsed && "justify-center px-2"
                        )}
                    >
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                        </span>
                        {!collapsed && (
                            <span className="text-xs font-medium text-sidebar-foreground/70 whitespace-nowrap">
                                Tüm sistemler çevrimiçi
                            </span>
                        )}
                    </div>
                </div>

                {/* User */}
                <div
                    className={cn(
                        "border-t border-sidebar-border p-4 shrink-0",
                        collapsed ? "flex justify-center" : ""
                    )}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className={cn(
                                    "flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-sidebar-accent cursor-pointer",
                                    collapsed && "justify-center p-2"
                                )}
                            >
                                <Avatar className="h-10 w-10 ring-2 ring-primary/20 shrink-0">
                                    <AvatarImage src="https://ui-avatars.com/api/?name=Borusan+User&background=10b981&color=fff" />
                                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                        AU
                                    </AvatarFallback>
                                </Avatar>
                                {!collapsed && (
                                    <div className="flex-1 overflow-hidden">
                                        <p className="truncate text-sm font-semibold text-sidebar-foreground">
                                            Yönetici Kullanıcı
                                        </p>
                                        <p className="truncate text-xs text-sidebar-foreground/50">
                                            Yönetici Paneli
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TooltipTrigger>
                        {collapsed && (
                            <TooltipContent side="right" className="z-50">
                                <p className="font-semibold">Yönetici Kullanıcı</p>
                                <p className="text-xs text-muted-foreground mb-2">Yönetici Paneli</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </div>
            </aside>
        </TooltipProvider>
    )
}
