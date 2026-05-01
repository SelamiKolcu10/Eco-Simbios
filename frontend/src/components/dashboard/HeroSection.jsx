import React from 'react';
import { Leaf, Play, ArrowRight } from "lucide-react";

function HeroSection({ onNavigate, onShowVideo }) {
    return (
        <>
            {/* Main Hero Section with Background */}
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
                        onClick={onShowVideo}
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

            {/* Secondary Hero Section */}
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
                            src="/images/newnew.png"
                            alt="Endüstriyel Simbiyoz Ağı"
                            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* İçine hafif aydınlatıcı gradient (Siyahlıkları kırmak için) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-white/20 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;
