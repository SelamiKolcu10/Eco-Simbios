import React from 'react';
import { ArrowUpRight, Leaf, Zap, Droplets, Wallet, Sparkles } from 'lucide-react';

const KPICard = ({ title, value, unit, trend, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        {/* Arkaplan Dekoru */}
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 transition-transform group-hover:scale-150 ${bgClass}`}></div>

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${bgClass} ${colorClass}`}>
                    <ArrowUpRight size={14} className="mr-1" />
                    {trend}
                </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <div className="flex items-baseline mt-1 flex-wrap">
                <span className="text-3xl font-bold text-slate-800">{value}</span>
                <span className="ml-1 text-gray-400 font-medium">{unit}</span>
            </div>
        </div>
    </div>
);

const SuggestionItem = ({ title, desc, type }) => (
    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-emerald-200 hover:shadow-sm cursor-pointer transition-all group">
        <div className="flex items-center mb-2">
            <div className={`mr-2 p-1.5 rounded-lg ${type === 'alert' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                {type === 'alert' ? <Zap size={14} /> : <Sparkles size={14} />}
            </div>
            <h4 className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">{title}</h4>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed ml-8">{desc}</p>
    </div>
);

const Dashboard = ({ kpiBonus }) => {
    // Dynamic calculations based on matches
    const baseCarbon = 1245;
    const baseCost = 24.5; // in K

    const totalCarbon = (baseCarbon + (kpiBonus?.carbon || 0)).toLocaleString(undefined, { maximumFractionDigits: 1 });
    const totalCost = (baseCost + ((kpiBonus?.earnings || 0) / 1000)).toLocaleString(undefined, { maximumFractionDigits: 1 }) + 'K';

    return (
        <>
            {/* ─── KPI CARDS ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard
                    title="Karbon Tasarrufu"
                    value={totalCarbon}
                    unit="kg"
                    trend={kpiBonus?.carbon ? "+AI Bonus" : "+12%"}
                    icon={Leaf}
                    colorClass="text-emerald-600"
                    bgClass="bg-emerald-50"
                />
                <KPICard
                    title="Enerji Kazanımı"
                    value="3,200"
                    unit="kWh"
                    trend="+8%"
                    icon={Zap}
                    colorClass="text-amber-500"
                    bgClass="bg-amber-50"
                />
                <KPICard
                    title="Su Geri Dönüşümü"
                    value="24.5"
                    unit="m³"
                    trend="+5%"
                    icon={Droplets}
                    colorClass="text-blue-500"
                    bgClass="bg-blue-50"
                />
                <KPICard
                    title="Tahmini Kazanç"
                    value={`₺${totalCost}`}
                    unit=""
                    trend={kpiBonus?.earnings ? "+AI Bonus" : "+18%"}
                    icon={Wallet}
                    colorClass="text-violet-500"
                    bgClass="bg-violet-50"
                />
            </div>

            {/* ─── GRID LAYOUT ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* SOL: GRAFİK ALANI */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Emisyon Analizi</h3>
                        <select className="bg-gray-50 border-none text-sm text-gray-600 rounded-lg py-2 px-3 outline-none cursor-pointer hover:bg-gray-100 transition">
                            <option>Bu Hafta</option>
                            <option>Bu Ay</option>
                        </select>
                    </div>

                    {/* Grafik Placeholder */}
                    <div className="h-64 w-full bg-gray-50 rounded-xl flex items-end justify-between px-6 pb-0 pt-10 gap-4 overflow-hidden relative">
                        {/* Temsili Barlar */}
                        {[40, 65, 45, 90, 55, 70, 60].map((h, i) => (
                            <div key={i} className="w-full bg-emerald-100 rounded-t-lg relative group transition-all duration-500 hover:bg-emerald-400 cursor-pointer" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h * 10} kg
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-2 text-xs text-gray-400 font-medium">
                        <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
                    </div>
                </div>

                {/* SAĞ: AI ÖNERİLERİ */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800">AI Önerileri</h3>
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                    </div>

                    <div className="space-y-4 flex-1">
                        <SuggestionItem
                            type="info"
                            title="Soğutma Optimizasyonu"
                            desc="Sistem 3'teki fan hızı %15 düşürülebilir. Tahmini kazanç: 450 kWh."
                        />
                        <SuggestionItem
                            type="alert"
                            title="Filtre Bakımı Gerekiyor"
                            desc="Filtre performansı düşüyor. 48 saat içinde kontrol edilmeli."
                        />
                        <SuggestionItem
                            type="info"
                            title="Atık Isı Fırsatı"
                            desc="Fırın 2'den çıkan ısı idari bina ısıtmasına yönlendirilebilir."
                        />
                    </div>

                    <button className="w-full mt-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition-colors">
                        Tüm Raporu Görüntüle
                    </button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
