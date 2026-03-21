import React, { useState, useEffect, useRef } from 'react';
import DemoSimulatorModal from './DemoSimulatorModal';
import {
    Leaf,
    Zap,
    Droplets,
    TrendingUp,
    ArrowUpRight,
    Sparkles,
    AlertTriangle,
    Flame,
    ChevronDown,
    Play,
    FileText,
    RefreshCw,
    Recycle,
    Trash2,
    ArrowRight,
    Home,
    Factory,
    Sprout,
    Users,
    X,
    Thermometer,
    Droplet,
    Heart
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

// Custom hook: scroll-triggered count-up animation
function useCountUp(target, duration = 2000) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime = null;
        let animationFrame;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutExpo for a snappy feel
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, target, duration]);

    return { count, ref };
}

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

// Simbiyoz Etkisi — animated stats with infographic equivalents
function SimbiyozEtkisi() {
    const co2Counter = useCountUp(500000, 2200);
    const rawCounter = useCountUp(750000, 2400);

    return (
        <div className="max-w-4xl mb-16" ref={co2Counter.ref}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 tracking-[0.2em] mb-8 uppercase">Simbiyoz Etkisi</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* CO₂ Tasarrufu */}
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

                        {/* Infographic equivalent */}
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

                    {/* Hammadde Tasarrufu */}
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

                        {/* Infographic equivalent */}
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

const Dashboard = ({ kpiBonus, onNavigate }) => {
    const [selectedPeriod, setSelectedPeriod] = useState("Bu Hafta");
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showDemoModal, setShowDemoModal] = useState(false);
    const [showEmail, setShowEmail] = useState(false);

    // Dynamic calculations based on matches
    const baseCarbon = 1245;
    const baseCost = 24.5; // in K

    const totalCarbon = (baseCarbon + (kpiBonus?.carbon || 0)).toLocaleString(undefined, { maximumFractionDigits: 1 });
    const totalCost = (baseCost + ((kpiBonus?.earnings || 0) / 1000)).toLocaleString(undefined, { maximumFractionDigits: 1 }) + 'K';

    return (
        <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-7xl mx-auto py-8">

            {/* New Hero Section with Background */}
            <div className="w-full max-w-7xl mx-auto mb-16 rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center bg-slate-900 shadow-xl border border-slate-700/50 p-8 md:p-12 relative z-10">
                {/* Background Image with Dark Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: "url('/images/simbiyoz.png')",
                        backgroundSize: 'cover',
                        filter: 'brightness(0.45) saturate(1.1)'
                    }}
                >
                </div>
                {/* Dark gradient overlay for extra depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/70 z-[1]"></div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-20 px-4">
                    <button
                        onClick={() => setShowVideoModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/50 hover:bg-emerald-800/60 backdrop-blur-sm text-emerald-300 hover:text-emerald-100 text-xs font-semibold border border-emerald-500/30 mb-8 shadow-sm cursor-pointer transition-colors"
                    >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        EĞİTİM MODÜLÜ
                    </button>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-serif drop-shadow-lg">
                        Endüstriyel <span className="text-emerald-400">Simbiyoz</span> Nedir?
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 font-medium leading-relaxed">
                        Endüstriyel atıkları ortak kaynaklara dönüştüren sürdürülebilir üretim ekosistemi.
                    </p>

                    <button
                        onClick={() => onNavigate('discovery')}
                        className="group flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95"
                    >
                        Simbiyozu Keşfet
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            {/* Old Hero Section (now below the new one) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                {/* Left Content */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                        <Leaf className="h-3.5 w-3.5" />
                        DÖNGÜSEL EKONOMİ PORTALI
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1e293b] leading-[1.1]">
                        Atığı Kaynağa<br />
                        Çeviren <span className="text-[#059669]">Sinerji Ağı.</span>
                    </h2>

                    <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                        Sanayi tesisleri arasındaki kaynak akışını yapay zeka destekli
                        bir ağ üzerinden yönetin.Yan ürünleri hammaddeye dönüştüren
                        Atıklarınızı verimlilik ve kârlılık fırsatlarına
                        dijital ekosistemimizle, atık yönetimini optimize ederek
                        öngüsel ekonominin yeni standartlarını belirleyin.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button onClick={() => onNavigate('matchmaking')} className="px-6 py-3 bg-[#1e3a5f] hover:bg-[#152e4d] text-white rounded-lg font-medium transition-colors shadow-sm">
                            Simbiyoz Ağına Katıl
                        </button>
                        <button onClick={() => onNavigate('map')} className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-medium transition-colors shadow-sm">
                            Kaynak Haritasını İncele
                        </button>
                    </div>
                </div>

                {/* Right Interactive/Image Section */}
                <div className="relative w-full aspect-auto md:aspect-video lg:aspect-[1.2] xl:max-h-[500px] flex justify-center items-center px-4 md:px-0">
                    <div className="relative w-full h-full max-h-[460px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-50 flex items-center justify-center group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(5,150,105,0.15)]">
                        <img
                            src="/images/user-provided-hero.png"
                            alt="Endüstriyel Simbiyoz Ağı"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* İçine hafif aydınlatıcı gradient (Siyahlıkları kırmak için) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-white/20 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            {/* Simbiyoz Etkisi Banner — Animated */}
            <SimbiyozEtkisi />

            {/* Dark Green Banner Section */}
            <div className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#0c4e33] py-20 px-4 my-16 bg-[url('/images/banner-bg.png')] bg-cover bg-center bg-no-repeat bg-blend-soft-light shadow-inner">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Endüstriyel Sinerji ile
                        <br />
                        Eko-Simbiyoz Platformu
                    </h2>
                    <p className="text-emerald-50 text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
                        Simbiyoz, endüstriyel tesislerin yan ürünlerini ve atıklarını veri odaklı AI algoritmalarıyla analiz ederek, hammaddeye ihtiyacı olan diğer tesislerle akıllı eşleşmeler sağlar. Bu döngüsel yaklaşım, işletme maliyetlerini optimize eder, çevresel etkiyi azaltır ve sürdürülebilir bir sanayi geleceği için ölçülebilir ekonomik değer yaratır.
                    </p>
                </div>
            </div>

            {/* Simbiyoz Süreci Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center my-24 max-w-6xl mx-auto">
                {/* Text Content */}
                <div className="space-y-6 lg:pr-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] font-serif leading-tight">
                        Geleceğin Sanayi Ekosistemi:<br />
                        Endüstriyel Simbiyoz.
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        Endüstriyel Simbiyoz, sanayi tesislerimizin yan ürünlerini ve atıklarını veri ve yapay zeka ile analiz ederek, bu kaynakları hammadde ihtiyacı olan diğer tesislerle akıllıca eşleştirir. Bu simbiyotik yaklaşım, sadece işletme maliyetlerini optimize etmekle kalmaz, aynı zamanda sanayimizin çevresel ayak izini küçülterek sürdürülebilir bir gelecek için ölçülebilir değer yaratır.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Simbiyozun temel prensiplerini platformumuzun yapay zeka gücüyle birleştirerek, kaynak israfını sıfırlamayı, atık yönetimini en üst seviyeye taşımayı ve sanayimizin çevresel sürdürülebilirliğini güçlü bir şekilde desteklemeyi hedefliyoruz. Bu, kaynak verimliliğini artırırken sanayi ekosistemimizi daha dirençli ve rekabetçi hale getirir.
                    </p>
                </div>

                {/* Info Image */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[4/3] flex items-center justify-center p-8">
                    <img
                        src="/images/simbiyoz-sureci.png"
                        alt="Simbiyoz Süreci Görseli"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* 3 Step Process Section */}
            <div className="py-24 max-w-6xl mx-auto flex flex-col items-center border-t border-slate-100 mt-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] font-serif mb-20 text-center">
                    3 Adımda Endüstriyel Simbiyoz
                </h2>

                {/* Desktop: flex row with connectors as separate elements */}
                <div className="hidden md:flex items-start justify-center w-full">

                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center flex-1 group relative">
                        <div className="absolute -top-3 right-4 lg:right-8 w-7 h-7 rounded-full bg-[#0c4e33] text-white flex items-center justify-center font-bold text-xs shadow-md z-10 pointer-events-none">1</div>
                        <div
                            onClick={() => onNavigate('matchmaking')}
                            className="w-24 h-24 bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center border border-slate-100/80 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(5,150,105,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] cursor-pointer"
                        >
                            <FileText className="h-10 w-10 text-[#0c4e33]" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-6 mb-3 font-serif">Kayıt ve Veri Entegrasyonu</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[230px]">
                            Tesis kapasitenizi ve kaynak envanterinizi, ileri veri analitiği araçlarıyla ekosisteme tanımlayarak dijital ikizinizi oluşturun.
                        </p>
                    </div>

                    {/* Connector 1→2 */}
                    <div className="flex items-center pt-12 px-2 flex-shrink-0" style={{ width: '120px' }}>
                        <div className="w-full h-0 relative" style={{ borderTop: '2px dashed #059669', opacity: 0.4 }}>
                            <div className="absolute -top-[5px] h-[8px] w-[8px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(5,150,105,0.6)]"
                                style={{ animation: 'flowDot 2.5s ease-in-out infinite' }} />
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center flex-1 group relative">
                        <div className="absolute -top-3 right-4 lg:right-8 w-7 h-7 rounded-full bg-[#0c4e33] text-white flex items-center justify-center font-bold text-xs shadow-md z-10">2</div>
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center border border-slate-100/80 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(5,150,105,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]">
                            <RefreshCw className="h-10 w-10 text-[#0c4e33]" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-6 mb-3 font-serif">Stratejik Eşleşme</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[230px]">
                            Yapay zeka destekli motorumuzla; atık ve ihtiyaç profillerinizi analiz ederek en verimli endüstriyel partner ve lojistik rotasıyla eşleşin.
                        </p>
                    </div>

                    {/* Connector 2→3 */}
                    <div className="flex items-center pt-12 px-2 flex-shrink-0" style={{ width: '120px' }}>
                        <div className="w-full h-0 relative" style={{ borderTop: '2px dashed #059669', opacity: 0.4 }}>
                            <div className="absolute -top-[5px] h-[8px] w-[8px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(5,150,105,0.6)]"
                                style={{ animation: 'flowDot 2.5s ease-in-out infinite 1.2s' }} />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center flex-1 group relative">
                        <div className="absolute -top-3 right-4 lg:right-8 w-7 h-7 rounded-full bg-[#0c4e33] text-white flex items-center justify-center font-bold text-xs shadow-md z-10">3</div>
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center border border-slate-100/80 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(5,150,105,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]">
                            <Recycle className="h-10 w-10 text-[#0c4e33]" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-6 mb-3 font-serif">Döngüyü Başlat</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[230px]">
                            Akıllı sözleşmeler ve entegre lojistik yönetimi ile operasyonu başlatın; atığı hammaddeye, maliyeti ölçülebilir kazanca dönüştürün.
                        </p>
                    </div>
                </div>

                {/* Mobile: stacked with vertical connectors */}
                <div className="flex md:hidden flex-col items-center gap-4 w-full">
                    {[
                        { num: '1', icon: <FileText className="h-10 w-10 text-[#0c4e33]" />, title: 'Kayıt ve Veri Entegrasyonu', desc: 'Tesis kapasitenizi ve kaynak envanterinizi, ileri veri analitiği araçlarıyla ekosisteme tanımlayarak dijital ikizinizi oluşturun.', link: 'matchmaking' },
                        { num: '2', icon: <RefreshCw className="h-10 w-10 text-[#0c4e33]" />, title: 'Stratejik Eşleşme', desc: 'Yapay zeka destekli motorumuzla; atık ve ihtiyaç profillerinizi analiz ederek en verimli endüstriyel partner ve lojistik rotasıyla eşleşin.' },
                        { num: '3', icon: <Recycle className="h-10 w-10 text-[#0c4e33]" />, title: 'Döngüyü Başlat', desc: 'Akıllı sözleşmeler ve entegre lojistik yönetimi ile operasyonu başlatın; atığı hammaddeye, maliyeti ölçülebilir kazanca dönüştürün.' },
                    ].map((step, i) => (
                        <React.Fragment key={step.num}>
                            <div className="flex flex-col items-center text-center relative group">
                                <div className="absolute -top-3 -right-1 w-7 h-7 rounded-full bg-[#0c4e33] text-white flex items-center justify-center font-bold text-xs shadow-md z-10 pointer-events-none">{step.num}</div>
                                <div
                                    onClick={() => step.link && onNavigate(step.link)}
                                    className={`w-20 h-20 bg-white rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.08)] flex items-center justify-center border border-slate-100/80 transition-all ${step.link ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(5,150,105,0.15)]' : ''}`}
                                >
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mt-4 mb-2 font-serif">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">{step.desc}</p>
                            </div>
                            {i < 2 && (
                                <div className="w-0 h-10 my-1" style={{ borderLeft: '2px dashed #059669', opacity: 0.35 }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Sosyal Etki Section */}
            <div className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-16">
                <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fafaf9 40%, #f0fdf4 100%)' }} className="py-20 md:py-28 px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Badge */}
                        <div className="flex justify-center mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase border border-emerald-200">
                                <Heart className="h-3.5 w-3.5" />
                                Sosyal Etki
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Left — Text Content */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 font-serif leading-tight">
                                    Sanayi-Tarım Köprüsü ve
                                    <span className="block text-[#0c4e33]">Fırsat Eşitliği</span>
                                </h2>
                                <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                    Eko-Simbiyoz, teknik bir platformun ötesinde, <strong className="text-slate-700">kadın emeğini tarımla buluşturan bir sosyal köprüdür.</strong> Fabrikalardan gelen atık ısı ve suyu, kadın kooperatiflerinin yönettiği akıllı seralara aktararak cinsiyet temelli iş bölümü eşitsizliğini teknolojiyle aşıyoruz.
                                </p>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <div className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                        <Factory className="h-6 w-6 text-[#0c4e33] mx-auto mb-2" />
                                        <p className="text-2xl font-extrabold text-slate-900">12</p>
                                        <p className="text-xs text-slate-400 font-medium">Partner Fabrika</p>
                                    </div>
                                    <div className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                        <Sprout className="h-6 w-6 text-[#0c4e33] mx-auto mb-2" />
                                        <p className="text-2xl font-extrabold text-slate-900">24</p>
                                        <p className="text-xs text-slate-400 font-medium">Akıllı Sera</p>
                                    </div>
                                    <div className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                        <Users className="h-6 w-6 text-[#0c4e33] mx-auto mb-2" />
                                        <p className="text-2xl font-extrabold text-slate-900">340+</p>
                                        <p className="text-xs text-slate-400 font-medium">Kadın Üretici</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right — Illustration */}
                            <div className="flex items-center justify-center">
                                <div className="relative w-full max-w-md">
                                    <img
                                        src="/images/sosyal-etki-illustration.png"
                                        alt="Sanayi-Tarım Köprüsü İllüstrasyonu"
                                        className="w-full h-auto rounded-3xl shadow-lg"
                                    />
                                    {/* Floating accent badge */}
                                    <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-lg border border-slate-100 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <Leaf className="h-5 w-5 text-[#0c4e33]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">%100 Sürdürülebilir</p>
                                            <p className="text-xs text-slate-400">Döngüsel Ekonomi Modeli</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA & Footer Section */}
            <div className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-24">

                {/* Green CTA Banner */}
                <div className="bg-[#0c4e33] py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
                            Döngüye Katılmaya Hazır mısınız?
                        </h2>
                        <p className="text-emerald-50 text-lg mb-10 opacity-90">
                            Atık maliyetlerinizi azaltın, yeni gelir kaynakları oluşturun ve sürdürülebilir üretime katkıda bulunun.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => onNavigate('market')} className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#0c4e33] rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:bg-emerald-50 w-full sm:w-auto overflow-hidden">
                                Pazarı Keşfet
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setShowDemoModal(true)}
                                className="flex items-center justify-center px-8 py-3.5 bg-[#ffffff1a] hover:bg-[#ffffff2a] text-white rounded-xl font-semibold transition-all border border-[#ffffff4a] w-full sm:w-auto"
                            >
                                Demo Talep Et
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="bg-[#fafafa] pt-16 pb-8 px-4 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4 md:px-8">

                            {/* Brand Column */}
                            <div className="space-y-6 lg:pr-8">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0c4e33] text-white shadow-sm">
                                        <Leaf className="h-6 w-6" />
                                    </div>
                                    <span className="text-xl font-bold text-[#1e293b] tracking-tight font-serif">
                                        Eko-<span className="text-[#0c4e33]">Simbiyoz</span>
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed font-serif">
                                    Eko-Simbiyoz'un gücünü keşfedin: İşletmeler arası kaynak iş birliğini dijitalleştirerek, atıkları ekonomiye, maliyetleri kazanca dönüştürüyoruz
                                </p>
                            </div>

                            {/* Links Column 1 */}
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-6 font-serif">Platform</h4>
                                <ul className="space-y-4">
                                    <li><button onClick={() => onNavigate('market')} className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif block text-left">Pazar Yeri</button></li>
                                    <li><button onClick={() => onNavigate('matchmaking')} className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif block text-left">Eşleşme Motoru</button></li>
                                    <li><button onClick={() => onNavigate('map')} className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif block text-left">Canlı Harita</button></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif block text-left">Raporlama</a></li>
                                </ul>
                            </div>

                            {/* Links Column 2 */}
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-6 font-serif">Kurumsal</h4>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif block text-left">Hakkımızda</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif block text-left">Kariyer</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif block text-left">Blog</a></li>
                                    <li>
                                        <button
                                            onClick={() => setShowEmail(!showEmail)}
                                            className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif block text-left w-full"
                                        >
                                            İletişim
                                        </button>
                                        {showEmail && (
                                            <div className="mt-2 text-[13px] font-bold text-[#0c4e33] animate-in fade-in slide-in-from-top-1 bg-emerald-50 px-3 py-1.5 rounded-lg inline-block border border-emerald-100">
                                                selamikolcu52@gmail.com
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>

                            {/* Links Column 3 */}
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-6 font-serif">Yasal</h4>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">KVKK</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Çerez Politikası</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Üyelik Sözleşmesi</a></li>
                                </ul>
                            </div>

                        </div>

                        {/* Copyright */}
                        <div className="pt-8 border-t border-slate-200 text-center">
                            <p className="text-sm text-slate-500 font-serif">
                                © 2026 Eko-Simbiyoz Kaynak Yönetimi A.Ş. Tüm hakları saklıdır.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Simulator Modal */}
            {showDemoModal && (
                <DemoSimulatorModal onClose={() => setShowDemoModal(false)} />
            )}

            {/* Video Lightbox Modal */}
            {showVideoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Dark Backdrop with 80% Blur */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        onClick={() => setShowVideoModal(false)}
                    />

                    {/* Modal Window */}
                    <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300 ease-out z-10 flex flex-col max-h-[90vh]">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 z-20 h-10 w-10 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors"
                            onClick={() => setShowVideoModal(false)}
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Video Area (16:9) */}
                        <div className="relative w-full aspect-video bg-black flex-shrink-0">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/7daVvUsvBuc?autoplay=1&mute=1"
                                title="Endüstriyel Simbiyoz Eğitim Modülü"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 md:p-10 overflow-y-auto bg-white flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold tracking-wider uppercase rounded-full mb-2">
                                        <FileText className="h-3 w-3" /> Yasal Zorunluluk
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0c4e33] font-serif leading-tight">
                                        AB Yeşil Mutabakatı Uyumu
                                    </h3>
                                    <p className="text-sm text-slate-600 font-sans leading-relaxed">
                                        Endüstriyel Simbiyoz ve Döngüsel Ekonomi platformu olan Eko-Simbiyoz, <strong>Sınırda Karbon Düzenleme Mekanizması (SKDM)</strong> kapsamındaki karbon vergisi yükümlülüklerinizi doğrudan azaltır. Sanayi tesisleri arasında gerçekleştirilen her kaynak ve atık takası, belgelendirilebilir karbon nötrleşme sertifikasyonu sağlar. İhracatçı firmalar için regülasyon uyumu vazgeçilmez bir kalkandır.
                                    </p>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wider uppercase rounded-full mb-2">
                                        <TrendingUp className="h-3 w-3" /> Kazanımlar
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0c4e33] font-serif leading-tight">
                                        Ekosistem Avantajları
                                    </h3>
                                    <ul className="space-y-3 mt-4 text-sm text-slate-600 font-sans">
                                        <li className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-0.5 h-4 w-4 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-600">
                                                <Leaf className="h-2.5 w-2.5" />
                                            </div>
                                            <span><strong>Görünmez Karbon Vergisinden Kurtulun:</strong> Atık hammaddelerinize erişerek emisyon hacminizi yıllık bazda raporlanabilir oranda düşürün.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-0.5 h-4 w-4 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-600">
                                                <RefreshCw className="h-2.5 w-2.5" />
                                            </div>
                                            <span><strong>Sıfır Enerji Hedefi:</strong> Atık ısıyı organik tarıma aktaran sinerjik modelle ESG (Çevresel, Sosyal, Kurumsal Yönetişim) denetimlerinde global geçerlilik sağlayın.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Global Reference Panel */}
                            <div className="mt-10 pt-8 border-t border-slate-200 bg-[#f8f9fa] -mx-8 md:-mx-10 -mb-8 md:-mb-10 p-8 md:p-10">
                                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                                    <div className="flex-1 space-y-3 text-center md:text-left">
                                        <h4 className="text-xl font-bold text-[#0c4e33] font-serif">Birleşmiş Milletler (UN) Sürdürülebilir Kalkınma Vizyonu</h4>
                                        <p className="text-sm text-slate-600 font-sans leading-relaxed">
                                            Eco-Simbiyoz platformu, Birleşmiş Milletler'in Mavi Ekonomi (Blue Economy) ve Okyanus Sağlığı stratejileriyle tam uyumlu bir model sunar. Atık suların geri kazanılarak tarımsal ekosistemlere (akıllı seralar) aktarılması, küresel su krizine karşı geliştirilen en etkili 'Endüstriyel Simbiyoz' uygulamalarından biri olarak kabul edilmektedir.
                                        </p>
                                    </div>
                                    <a
                                        href="https://sdgs.un.org/partnerships/blue-economy-and-industrial-symbiosis-enablers-ocean-health"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex flex-shrink-0 items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 hover:border-[#0c4e33] text-[#0c4e33] rounded-xl font-bold transition-all shadow-sm hover:shadow-md text-sm whitespace-nowrap"
                                    >
                                        <FileText className="h-4 w-4" />
                                        BM Teknik Strateji Belgesi
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
