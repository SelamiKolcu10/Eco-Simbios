import React from 'react';
import { X, Leaf, RefreshCw, TrendingUp, FileText } from "lucide-react";

function VideoModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop with 80% Blur */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Modal Window */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300 ease-out z-10 flex flex-col max-h-[90vh]">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 z-20 h-10 w-10 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors"
                    onClick={onClose}
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
    );
}

export default VideoModal;
