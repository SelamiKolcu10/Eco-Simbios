import React, { useState } from 'react';
import {
    Leaf,
    Zap,
    Droplets,
    TrendingUp,
    ArrowUpRight,
    Sparkles,
    AlertTriangle,
    Flame,
    ChevronDown
} from "lucide-react";
import { cn } from "../../lib/utils";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell,
} from "recharts";

const weeklyData = [
    { day: "Pzt", value: 35 },
    { day: "Sal", value: 55 },
    { day: "Çar", value: 85 },
    { day: "Per", value: 70 },
    { day: "Cum", value: 45 },
    { day: "Cmt", value: 65 },
    { day: "Paz", value: 50 },
];

const aiRecommendations = [
    {
        icon: <Sparkles className="h-4 w-4" />,
        title: "Isıtmayı Optimize Etmek",
        description: "Sistem 3'teki fan hızı %15 düşürülebilir. Tahmini kazanç: 450 kWh.",
        type: "optimization",
    },
    {
        icon: <AlertTriangle className="h-4 w-4" />,
        title: "Filtreleme Gerekiyor",
        description: "Filtre performansı düşüyor. 48 saat içinde kontrol edilmelidir.",
        type: "warning",
    },
    {
        icon: <Flame className="h-4 w-4" />,
        title: "Atık Isı Fırsatı",
        description: "Fırın 2'den çıkan ısı idari bina ısıtmasına yönlendirilebilir.",
        type: "opportunity",
    },
];

function StatCard({
    icon,
    iconBg,
    iconColor,
    title,
    value,
    unit,
    change,
    changeColor,
}) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-start justify-between relative z-10">
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", iconBg)}>
                    <span className={iconColor}>{icon}</span>
                </div>
                <div className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full", changeColor, "bg-background/50 backdrop-blur-sm")}>
                    <ArrowUpRight className="h-3 w-3" />
                    {change}
                </div>
            </div>
            <div className="mt-4 relative z-10">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <div className="mt-1 flex items-baseline gap-1 flex-wrap">
                    <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
                    <span className="text-sm font-medium text-muted-foreground">{unit}</span>
                </div>
            </div>
        </div>
    );
}

const Dashboard = ({ kpiBonus }) => {
    const [selectedPeriod, setSelectedPeriod] = useState("Bu Hafta");

    // Dynamic calculations based on matches
    const baseCarbon = 1245;
    const baseCost = 24.5; // in K

    const totalCarbon = (baseCarbon + (kpiBonus?.carbon || 0)).toLocaleString(undefined, { maximumFractionDigits: 1 });
    const totalCost = (baseCost + ((kpiBonus?.earnings || 0) / 1000)).toLocaleString(undefined, { maximumFractionDigits: 1 }) + 'K';

    return (
        <div className="animate-in fade-in zoom-in-95 duration-500">
            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<Leaf className="h-5 w-5" />}
                    iconBg="bg-primary/10"
                    iconColor="text-primary"
                    title="Karbon Tasarrufu"
                    value={totalCarbon}
                    unit="kg"
                    change={kpiBonus?.carbon ? "+AI Bonus" : "+12%"}
                    changeColor="text-primary bg-primary/10"
                />
                <StatCard
                    icon={<Zap className="h-5 w-5" />}
                    iconBg="bg-amber-500/10"
                    iconColor="text-amber-500"
                    title="Enerji Kazanımı"
                    value="3,200"
                    unit="kWh"
                    change="+%6"
                    changeColor="text-amber-500 bg-amber-500/10"
                />
                <StatCard
                    icon={<Droplets className="h-5 w-5" />}
                    iconBg="bg-blue-500/10"
                    iconColor="text-blue-500"
                    title="Su Geri Dönüşümü"
                    value="24.5"
                    unit="m³"
                    change="+%5"
                    changeColor="text-blue-500 bg-blue-500/10"
                />
                <StatCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    iconBg="bg-violet-500/10"
                    iconColor="text-violet-500"
                    title="Tahmini Kazanç"
                    value={`₺${totalCost}`}
                    unit=""
                    change={kpiBonus?.earnings ? "+AI Bonus" : "+18%"}
                    changeColor="text-violet-500 bg-violet-500/10"
                />
            </div>

            {/* Charts Row */}
            <div className="mt-8 grid gap-6 lg:grid-cols-5">
                {/* Emission Chart */}
                <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-3">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">
                            Emisyon Analizi
                        </h2>
                        <button className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            {selectedPeriod}
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData} barCategoryGap="20%">
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                                />
                                <YAxis hide />
                                <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                                    {weeklyData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                index === 2
                                                    ? "hsl(var(--primary))"
                                                    : "hsl(var(--primary) / 0.2)"
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2 flex flex-col">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">
                            AI Önerileri
                        </h2>
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                        </span>
                    </div>
                    <div className="space-y-4 flex-1">
                        {aiRecommendations.map((rec, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer rounded-xl border border-border bg-muted/30 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
                                            rec.type === "optimization" && "bg-primary/10 text-primary",
                                            rec.type === "warning" && "bg-amber-500/10 text-amber-500",
                                            rec.type === "opportunity" && "bg-blue-500/10 text-blue-500"
                                        )}
                                    >
                                        {rec.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                            {rec.title}
                                        </h3>
                                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                            {rec.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
                        Tüm Raporu Görüntüle
                        <ArrowUpRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
