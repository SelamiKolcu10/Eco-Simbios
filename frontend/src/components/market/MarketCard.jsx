import { tagStyles, typeStyles } from '../../data/marketListings';

export default function MarketCard({ item, onClick, isMatched }) {
    const scoreColor = item.matchScore >= 85 ? 'text-eco-400' : item.matchScore >= 70 ? 'text-amber-400' : 'text-red-400';
    const barColor = item.matchScore >= 85 ? 'bg-eco-400' : item.matchScore >= 70 ? 'bg-amber-400' : 'bg-red-400';

    return (
        <div
            className={`carbon-card rounded-xl p-4 transition-all duration-500 hover:border-eco-500/20`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${typeStyles[item?.type] || ''}`}>{item?.type?.toUpperCase() || 'BİLİNMYOR'}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${tagStyles[item?.tag] || ''}`}>{item?.tag}</span>
                </div>
                {item.aiMatch && !isMatched && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
                        <span><i className="fa-solid fa-brain text-[8px]"></i></span>AI Önerisi
                    </span>
                )}
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">{item.material}</h4>
            <p className="text-[11px] text-slate-500 mb-3">
                <span><i className="fa-solid fa-industry text-[9px] mr-1"></i></span>{item.source}
            </p>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-slate-500">
                    {item.amount && <span><i className="fa-solid fa-weight-hanging text-[9px] mr-1"></i>{item.amount}</span>}
                </span>
                <span className="text-[11px] text-eco-400 font-semibold">{item.income}</span>
            </div>

            {isMatched ? (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-[8px] font-bold text-slate-400 mb-1.5 px-0.5">
                        <span className="text-emerald-500">Fırsat Tanımlama</span>
                        <span className="text-blue-500">Ön Fizibilite</span>
                        <span>Anlaşma</span>
                        <span>Uygulama</span>
                    </div>
                    <div className="flex gap-1 h-1.5 w-full">
                        <div className="h-full bg-emerald-500 rounded-full w-1/4"></div>
                        <div className="h-full bg-blue-500 rounded-full w-1/4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                        <div className="h-full bg-slate-200 rounded-full w-1/4"></div>
                        <div className="h-full bg-slate-200 rounded-full w-1/4"></div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">Eşleşme</span>
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${item.matchScore}%` }}></div>
                    </div>
                    <span className={`text-[10px] font-bold ${scoreColor}`}>{item.matchScore}%</span>
                </div>
            )}
        </div>
    );
}

