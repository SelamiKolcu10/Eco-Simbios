import React from 'react';
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", iconBg)}>
                    <span className={iconColor}>{icon}</span>
                </div>
                <div className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-1", changeColor)}>
                    <ArrowUpRight className="h-4 w-4" />
                    {change}
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</span>
                    <span className="text-sm font-medium text-slate-500">{unit}</span>
                </div>
            </div>
        </div>
    );
}

export default StatCard;
