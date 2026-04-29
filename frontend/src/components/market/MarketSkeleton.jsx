import React from 'react';

export default function MarketSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full animate-pulse">
            {/* Image Placeholder */}
            <div className="relative h-48 w-full shrink-0 bg-slate-200">
                {/* Top Left Tags Placeholder */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <div className="h-6 w-16 bg-slate-300 rounded-full"></div>
                    <div className="h-6 w-20 bg-slate-300 rounded-full"></div>
                </div>

                {/* Top Right Heart Placeholder */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-300"></div>
            </div>

            {/* Content Section Placeholder */}
            <div className="p-5 flex flex-col flex-1">
                
                {/* Header Row Placeholder */}
                <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="h-5 bg-slate-300 rounded w-1/2"></div>
                    <div className="h-5 bg-slate-300 rounded w-1/4"></div>
                </div>
                
                {/* Source Company Placeholder */}
                <div className="h-3 bg-slate-200 rounded w-1/3 mb-4"></div>

                {/* Meta Icons Row Placeholder */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-3 bg-slate-200 rounded w-12"></div>
                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                    {/* Action Buttons Placeholder */}
                    <div className="h-10 bg-slate-200 rounded-lg w-full"></div>
                    <div className="h-10 bg-slate-300 rounded-lg w-full"></div>
                </div>
            </div>
        </div>
    );
}
