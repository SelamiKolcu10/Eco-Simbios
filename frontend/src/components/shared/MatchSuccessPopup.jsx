import { useEffect } from 'react';

export default function MatchSuccessPopup({ buyer, income, onClose }) {
    // Empty deps: onClose is stable for this component's lifetime (rendered once per match)
    useEffect(() => {
        const t = setTimeout(onClose, 5000);
        return () => clearTimeout(t);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="match-success-popup bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center" style={{ border: '1px solid rgba(0,220,130,0.3)' }}>
                {/* Animated check icon */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 success-icon-ring" style={{ background: 'rgba(0,220,130,0.1)', border: '2px solid rgba(0,220,130,0.4)' }}>
                    <span><i className="fa-solid fa-handshake text-eco-400 text-4xl"></i></span>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-[.2em] text-eco-400 mb-2">Anlaşma Tamamlandı</p>
                <h2 className="text-2xl font-black text-slate-800 mb-3">Tebrikler! 🎉</h2>
                <p className="text-sm text-slate-600 mb-5">
                    <span className="text-eco-400 font-bold">{buyer}</span> ile simbiyoz anlaşması imzalandı.
                </p>

                <div className="rounded-xl p-4 mb-6 grid grid-cols-2 gap-3 bg-slate-50">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Kazanç</p>
                        <p className="text-xl font-black text-amber-400">{income}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Durum</p>
                        <p className="text-sm font-bold text-eco-400">🤝 EŞLEŞTİ</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="btn-cyber w-full py-2.5 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"
                >
                    <span><i className="fa-solid fa-check"></i></span> Harika!
                </button>

                {/* Auto-close progress bar */}
                <div className="mt-4 h-0.5 rounded-full overflow-hidden bg-slate-200">
                    <div className="h-full bg-eco-500/40 success-progress-bar"></div>
                </div>
                <p className="text-[9px] text-slate-400 mt-1">5 saniye içinde otomatik kapanır</p>
            </div>
        </div>
    );
}
