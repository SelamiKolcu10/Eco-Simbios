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
    ChevronDown,
    Play,
    FileText,
    RefreshCw,
    Recycle,
    Trash2,
    ArrowRight
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

const Dashboard = ({ kpiBonus }) => {
    const [selectedPeriod, setSelectedPeriod] = useState("Bu Hafta");

    // Dynamic calculations based on matches
    const baseCarbon = 1245;
    const baseCost = 24.5; // in K

    const totalCarbon = (baseCarbon + (kpiBonus?.carbon || 0)).toLocaleString(undefined, { maximumFractionDigits: 1 });
    const totalCost = (baseCost + ((kpiBonus?.earnings || 0) / 1000)).toLocaleString(undefined, { maximumFractionDigits: 1 }) + 'K';

    return (
        <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-7xl mx-auto py-8">

            {/* New Hero Section with Background */}
            <div className="w-full max-w-7xl mx-auto mb-16 rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center bg-slate-900 shadow-xl border border-slate-100 p-8 md:p-12 relative z-10">
                {/* Background Image with Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: "url('/images/simbiyoz.png')",
                        backgroundSize: 'cover'
                    }}
                >
                    {/* Radial gradient to fade out towards center and edges */}
                    <div className="absolute inset-0 bg-gradient-radial from-white/60 via-white/40 to-transparent"></div>
                    {/* White fade at top and bottom for smooth transition */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-20 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/80 backdrop-blur-sm text-emerald-700 text-xs font-semibold border border-emerald-100 mb-8 shadow-sm">
                        <Play className="h-3.5 w-3.5 fill-current" />
                        EĞİTİM MODÜLÜ
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1e293b] mb-6 font-serif drop-shadow-sm">
                        Endüstriyel <span className="text-[#006A4E]">Simbiyoz</span> Nedir?
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 font-medium">
                        Endüstriyel atıkları ortak kaynaklara dönüştüren sürdürülebilir üretim ekosistemi.
                    </p>

                    <button className="flex items-center gap-2 px-10 py-4 bg-[#006A4E] hover:bg-[#00553e] text-white rounded-2xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                        <Play className="h-5 w-5 fill-current" />
                        Gör
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
                        <button className="px-6 py-3 bg-[#1e3a5f] hover:bg-[#152e4d] text-white rounded-lg font-medium transition-colors shadow-sm">
                            Simbiyoz Ağına Katıl
                        </button>
                        <button className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-medium transition-colors shadow-sm">
                            Kaynak Haritasını İncele
                        </button>
                    </div>
                </div>

                {/* Right Interactive/Image Section */}
                <div className="relative w-full aspect-auto md:aspect-video lg:aspect-[1.2] xl:max-h-[500px]">
                    <img
                        src="/images/user-provided-hero.png"
                        alt="Endüstriyel Simbiyoz Ağı"
                        className="w-full h-full object-contain drop-shadow-xl"
                    />
                </div>
            </div>

            {/* Simbiyoz Etkisi Banner */}
            <div className="max-w-3xl mb-16">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-500 tracking-wider mb-4 uppercase">Simbiyoz Etkisi</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <Leaf className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">+500,000 Ton/Yıl</p>
                                <p className="text-sm font-medium text-slate-500">CO₂ Tasarrufu</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-6 md:pt-0 md:pl-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <div className="h-6 w-6 border-2 border-emerald-600 rounded flex items-center justify-center">
                                    <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">+750,000 Ton/Yıl</p>
                                <p className="text-sm font-medium text-slate-500">Hammadde Tasarrufu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dark Green Banner Section */}
            <div className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#0c4e33] py-20 px-4 my-16 bg-[url('/images/banner-bg.png')] bg-cover bg-center bg-no-repeat bg-blend-soft-light shadow-inner">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Endüstriyel Sinerji ile
                        <br />
                        Eko-Simbiyoz Platformu
                    </h2>
                    <p className="text-emerald-50 text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
                        Döngü, endüstriyel tesislerin yan ürünlerini ve atıklarını veri odaklı AI algoritmalarıyla analiz ederek, hammaddeye ihtiyacı olan diğer tesislerle akıllı eşleşmeler sağlar. Bu döngüsel yaklaşım, işletme maliyetlerini optimize eder, çevresel etkiyi azaltır ve sürdürülebilir bir sanayi geleceği için ölçülebilir ekonomik değer yaratır.
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
                        Döngü, sanayi tesislerimizin yan ürünlerini ve atıklarını veri ve yapay zeka ile analiz ederek, bu kaynakları hammadde ihtiyacı olan diğer tesislerle akıllıca eşleştirir. Bu simbiyotik yaklaşım, sadece işletme maliyetlerini optimize etmekle kalmaz, aynı zamanda sanayimizin çevresel ayak izini küçülterek sürdürülebilir bir gelecek için ölçülebilir değer yaratır.
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 w-full relative">
                    {/* Connecting Line for Desktop */}
                    <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10"></div>

                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center relative">
                        <div className="absolute -top-4 -right-4 md:right-8 lg:right-16 w-8 h-8 rounded-full bg-[#0c4e33] text-white flex items-center justify-center font-bold text-sm shadow-md z-10">
                            1
                        </div>
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-8 border border-slate-50 transition-transform hover:-translate-y-1">
                            <FileText className="h-10 w-10 text-[#0c4e33]" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 font-serif">Kayıt ve Veri Entegrasyonu</h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">
                            Tesis kapasitenizi ve kaynak envanterinizi, ileri veri analitiği araçlarıyla ekosisteme tanımlayarak dijital ikizinizi oluşturun.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center relative">
                        <div className="absolute -top-4 -right-4 md:-right-4 lg:right-4 w-8 h-8 rounded-full bg-[#0c4e33] text-white flex items-center justify-center font-bold text-sm shadow-md z-10">
                            2
                        </div>
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-8 border border-slate-50 transition-transform hover:-translate-y-1">
                            <RefreshCw className="h-10 w-10 text-[#0c4e33]" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 font-serif">Stratejik Eşleşme</h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">
                            Yapay zeka destekli motorumuzla; atık ve ihtiyaç profillerinizi analiz ederek en verimli endüstriyel partner ve lojistik rotasıyla eşleşin.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center relative">
                        <div className="absolute -top-4 -right-4 md:-right-8 lg:-right-4 w-8 h-8 rounded-full bg-[#0c4e33] text-white flex items-center justify-center font-bold text-sm shadow-md z-10">
                            3
                        </div>
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-8 border border-slate-50 transition-transform hover:-translate-y-1">
                            <Recycle className="h-10 w-10 text-[#0c4e33]" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 font-serif">Döngüyü Başlat</h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">
                            Akıllı sözleşmeler ve entegre lojistik yönetimi ile operasyonu başlatın; atığı hammaddeye, maliyeti ölçülebilir kazanca dönüştürün.
                        </p>
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
                            <button className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#0c4e33] rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:bg-emerald-50 w-full sm:w-auto overflow-hidden">
                                Pazarı Keşfet
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <button className="flex items-center justify-center px-8 py-3.5 bg-[#ffffff1a] hover:bg-[#ffffff2a] text-white rounded-xl font-semibold transition-all border border-[#ffffff4a] w-full sm:w-auto">
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
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Pazar Yeri</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Eşleşme Motoru</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Canlı Harita</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Raporlama</a></li>
                                </ul>
                            </div>

                            {/* Links Column 2 */}
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-6 font-serif">Kurumsal</h4>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Hakkımızda</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Kariyer</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">Blog</a></li>
                                    <li><a href="#" className="text-sm text-slate-500 hover:text-[#0c4e33] transition-colors font-serif">İletişim</a></li>
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

        </div>
    );
};

export default Dashboard;
