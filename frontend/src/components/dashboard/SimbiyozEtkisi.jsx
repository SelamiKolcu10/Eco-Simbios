import React from 'react';
import { Leaf, Recycle, Home } from "lucide-react";
import { useCountUp } from './hooks/useCountUp';

function SimbiyozEtkisi() {
    const co2Counter = useCountUp(500000, 2200);
    const rawCounter = useCountUp(750000, 2400);

    return (
        <div className="max-w-4xl mb-16" ref={co2Counter.ref}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 tracking-[0.2em] mb-8 uppercase">Simbiyoz Etkisi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm">
                                <Leaf className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-3xl md:text-4xl font-extrabold text-slate-800 tabular-nums tracking-tight">
                                    +{co2Counter.count.toLocaleString()}
                                    <span className="text-base font-semibold text-slate-400 ml-1.5">Ton/Yıl</span>
                                </p>
                                <p className="text-sm font-semibold text-emerald-600 mt-0.5">CO₂ Tasarrufu</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-emerald-50/60 rounded-xl px-4 py-3 border border-emerald-100/60">
                            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-100 text-emerald-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M16 14v.2A3 3 0 0 1 14.9 20H11a3 3 0 0 1-1-5.8V14a3 3 0 0 1 6 0Z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-emerald-800">25 Milyon Ağaç</p>
                                <p className="text-xs text-emerald-600/80">kurtarılmasına eşdeğer etki</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5 md:border-l md:border-slate-100 md:pl-10" ref={rawCounter.ref}>
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
                                <Recycle className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-3xl md:text-4xl font-extrabold text-slate-800 tabular-nums tracking-tight">
                                    +{rawCounter.count.toLocaleString()}
                                    <span className="text-base font-semibold text-slate-400 ml-1.5">Ton/Yıl</span>
                                </p>
                                <p className="text-sm font-semibold text-blue-600 mt-0.5">Hammadde Tasarrufu</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50/60 rounded-xl px-4 py-3 border border-blue-100/60">
                            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-blue-100 text-blue-700">
                                <Home className="h-[18px] w-[18px]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-blue-800">150.000 Evin</p>
                                <p className="text-xs text-blue-600/80">yıllık enerji ihtiyacına eşdeğer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SimbiyozEtkisi;
