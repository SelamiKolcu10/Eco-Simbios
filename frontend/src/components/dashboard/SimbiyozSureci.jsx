import React from 'react';
import { FileText, RefreshCw, Recycle } from "lucide-react";

function SimbiyozSureci({ onNavigate }) {
    return (
        <>
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

                {/* Desktop: flex row with connectors */}
                <div className="hidden md:flex items-start justify-center w-full">
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

                    <div className="flex items-center pt-12 px-2 flex-shrink-0" style={{ width: '120px' }}>
                        <div className="w-full h-0 relative" style={{ borderTop: '2px dashed #059669', opacity: 0.4 }}>
                            <div className="absolute -top-[5px] h-[8px] w-[8px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(5,150,105,0.6)]"
                                style={{ animation: 'flowDot 2.5s ease-in-out infinite' }} />
                        </div>
                    </div>

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

                    <div className="flex items-center pt-12 px-2 flex-shrink-0" style={{ width: '120px' }}>
                        <div className="w-full h-0 relative" style={{ borderTop: '2px dashed #059669', opacity: 0.4 }}>
                            <div className="absolute -top-[5px] h-[8px] w-[8px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(5,150,105,0.6)]"
                                style={{ animation: 'flowDot 2.5s ease-in-out infinite 1.2s' }} />
                        </div>
                    </div>

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
        </>
    );
}

export default SimbiyozSureci;
