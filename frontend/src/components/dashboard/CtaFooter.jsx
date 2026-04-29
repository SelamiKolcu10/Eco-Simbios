import React, { useState } from 'react';
import { Leaf, ArrowRight } from "lucide-react";

function CtaFooter({ onNavigate, onShowDemo }) {
    const [showEmail, setShowEmail] = useState(false);

    return (
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
                            onClick={onShowDemo}
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
    );
}

export default CtaFooter;
