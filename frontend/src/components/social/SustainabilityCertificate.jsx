import React from 'react';
import { motion } from 'framer-motion';

const SustainabilityCertificate = ({ facility, stats, onClose }) => {
    const today = new Date().toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const score = stats?.sustainabilityScore || 8.4;
    const sealPath = '/images/admin_seal.png';

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl relative"
            >
                {/* Close Button - Hidden in Print */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors z-10 print:hidden"
                >
                    <i className="fa-solid fa-times"></i>
                </button>

                {/* Certificate Content */}
                <div id="certificate-content" className="p-12 border-[16px] border-emerald-50 relative min-h-[600px] flex flex-col items-center text-center font-serif">
                    
                    {/* Decorative Border Corners */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-emerald-600/30 rounded-tl-xl m-4"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-emerald-600/30 rounded-tr-xl m-4"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-emerald-600/30 rounded-bl-xl m-4"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-emerald-600/30 rounded-br-xl m-4"></div>

                    {/* Header */}
                    <div className="mb-10">
                        <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
                            <i className="fa-solid fa-leaf text-white text-4xl"></i>
                        </div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">DÖNGÜSEL EKONOMİ SERTİFİKASI</h1>
                        <p className="text-emerald-600 font-bold tracking-[0.3em] text-sm uppercase">Sürdürülebilirlik ve Sosyal Etki Başarı Belgesi</p>
                    </div>

                    <div className="mb-12">
                        <p className="text-slate-500 italic mb-4">Bu belge, aşağıda adı geçen kurumun çevresel sürdürülebilirlik ve toplumsal fayda hedeflerine olan üstün katkıları sebebiyle tanzim edilmiştir.</p>
                        <h2 className="text-5xl font-black text-[#006A4E] mb-2">{facility?.name || 'Değerli İş Ortağımız'}</h2>
                        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent mx-auto mt-4"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-8 w-full max-w-2xl mb-12">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Başarı Puanı</p>
                            <p className="text-3xl font-black text-emerald-600">{score} / 10</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Tamamlanan Eşleşme</p>
                            <p className="text-3xl font-black text-slate-800">{stats?.matchedListingsCount || 0}</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">CO₂ Tasarrufu</p>
                            <p className="text-3xl font-black text-slate-800">{stats?.totalCarbonSaved || 0} T</p>
                        </div>
                    </div>

                    <p className="max-w-2xl text-slate-600 leading-relaxed text-lg mb-12">
                        Kurumunuz, Eco-Simbios platformu üzerinden gerçekleştirdiği endüstriyel simbiyoz faaliyetleri ile 
                        <strong> {Math.floor((stats?.totalWasteProcessed || 0) / 2.5)} öğrenciye burs </strong> 
                        ve <strong> {stats?.totalWasteProcessed || 0} ton atık </strong> geri dönüşümü sağlayarak 
                        gelecek nesiller için daha yeşil bir dünya hedefine katkıda bulunmuştur.
                    </p>

                    {/* Footer / Seal Section */}
                    <div className="mt-auto w-full flex items-end justify-between px-10">
                        <div className="text-left">
                            <p className="text-xs text-slate-400 mb-1">Düzenleme Tarihi</p>
                            <p className="text-lg font-bold text-slate-800">{today}</p>
                            <div className="mt-6 border-t border-slate-200 pt-2 w-48">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doğrulama Kodu: ESC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="relative">
                            <img 
                                src={sealPath} 
                                alt="Admin Seal" 
                                className="w-32 h-32 object-contain opacity-90 rotate-[-15deg] drop-shadow-md"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <p className="text-[8px] font-bold text-emerald-900/40 uppercase rotate-[-15deg]">Verified by Admin</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-slate-400 mb-1">Onay Makamı</p>
                            <p className="text-lg font-bold text-slate-800 italic">Eco-Simbios Yönetim</p>
                            <div className="mt-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" className="h-10 opacity-60 invert mx-auto filter brightness-0" alt="Signature" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar - Hidden in Print */}
                <div className="bg-slate-50 p-6 flex justify-center gap-4 border-t border-slate-100 print:hidden">
                    <button 
                        onClick={handlePrint}
                        className="bg-[#006A4E] hover:bg-[#00523b] text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10"
                    >
                        <i className="fa-solid fa-download"></i>
                        SERTİFİKAYI İNDİR / YAZDIR
                    </button>
                    <button 
                        onClick={onClose}
                        className="bg-white border border-slate-200 text-slate-600 font-bold py-3 px-8 rounded-xl hover:bg-slate-50 transition-all"
                    >
                        KAPAT
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default SustainabilityCertificate;
