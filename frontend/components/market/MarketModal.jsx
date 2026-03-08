import { useState, useCallback } from 'react';
import MatchSuccessPopup from '../shared/MatchSuccessPopup';

export default function MarketModal({ item, onClose, onMatchConfirmed }) {
    const [loading, setLoading] = useState(false);

    const scoreColor = item.matchScore >= 85 ? '#34d399' : item.matchScore >= 70 ? '#fbbf24' : '#f87171';

    const handleStartMatch = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("✅ EŞLEŞME BAŞARILI! Bursa Otomotiv ile anlaşma sağlandı.");
            onMatchConfirmed({ extraEarnings: 45000, extraCarbon: 2.5 });
            onClose();
        }, 2000);
    };

    return (
        <>
            {/* Main modal — hidden while success popup is showing */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4`}
                onClick={e => { if (e.target === e.currentTarget && !loading) onClose(); }}
            >
                <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-eco-500/10 flex items-center justify-center">
                                <i className="fa-solid fa-brain text-eco-400"></i>
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">♻️ Yapay Zeka Eşleşme Analizi</h3>
                        </div>
                        <button onClick={onClose} disabled={loading} className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition disabled:opacity-40">
                            <i className="fa-solid fa-xmark text-xs"></i>
                        </button>
                    </div>

                    <div className="bg-eco-500/5 border border-eco-500/15 rounded-xl p-4 mb-4 text-center">
                        <i className="fa-solid fa-arrows-rotate text-eco-400 text-3xl mb-2"></i>
                        <p className="text-lg font-black text-slate-800">♻️ Eşleşme Bulundu!</p>
                        <p className="text-[11px] text-slate-500 mt-1">Yapay zeka simbiyoz fırsatı tespit etti</p>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Malzeme</p>
                            <p className="text-sm font-bold text-slate-800">{item.material}</p>
                            <p className="text-[11px] text-slate-500">{item.amount ? item.amount + ' — ' : ''}{item.source}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Potansiyel Alıcı</p>
                            <p className="text-sm font-bold text-eco-400">
                                <i className="fa-solid fa-building text-[10px] mr-1"></i>{item.buyer}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">Kullanım: {item.buyerUse}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 rounded-lg p-3 text-center">
                                <p className="text-[10px] text-slate-500 uppercase mb-1">Tahmini Gelir</p>
                                <p className="text-lg font-black text-amber-400">{item.income}</p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-3 text-center">
                                <p className="text-[10px] text-slate-500 uppercase mb-1">Önlenen Emisyon</p>
                                <p className="text-lg font-black text-eco-400">{item.co2}</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">AI Eşleşme Güveni</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-eco-600 to-cyber rounded-full" style={{ width: `${item.matchScore}%` }}></div>
                                </div>
                                <span className="text-sm font-bold" style={{ color: scoreColor }}>{item.matchScore}%</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleStartMatch}
                        disabled={loading}
                        className="btn-cyber w-full py-2.5 text-white font-bold text-sm rounded-xl mt-4 flex items-center justify-center gap-2"
                        style={{ opacity: loading ? 0.85 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                        {loading
                            ? <>⏳ İşleniyor...</>
                            : <><i className="fa-solid fa-handshake"></i> Eşleşmeyi Başlat</>
                        }
                    </button>
                </div>
            </div>

        </>
    );
}

