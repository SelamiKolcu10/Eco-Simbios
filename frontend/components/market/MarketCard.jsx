import { tagStyles, typeStyles } from '../../data/marketListings';

export default function MarketCard({ item, onClick, isMatched }) {
    const scoreColor = item.matchScore >= 85 ? 'text-eco-400' : item.matchScore >= 70 ? 'text-amber-400' : 'text-red-400';
    const barColor = item.matchScore >= 85 ? 'bg-eco-400' : item.matchScore >= 70 ? 'bg-amber-400' : 'bg-red-400';

    return (
        <div
            className={`carbon-card rounded-xl p-4 transition-all duration-500 ${isMatched ? 'opacity-50 cursor-default' : 'cursor-pointer hover:border-eco-500/20'}`}
            onClick={isMatched ? undefined : onClick}
            style={isMatched ? { filter: 'grayscale(0.7)' } : {}}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    {isMatched ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-gray-500/20 text-gray-400 border-gray-500/30">
                            🤝 EŞLEŞTİ
                        </span>
                    ) : (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${typeStyles[item.type]}`}>{item.type.toUpperCase()}</span>
                    )}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${tagStyles[item.tag]}`}>{item.tag}</span>
                </div>
                {item.aiMatch && !isMatched && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
                        <i className="fa-solid fa-brain text-[8px]"></i>AI Önerisi
                    </span>
                )}
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">{item.material}</h4>
            <p className="text-[11px] text-slate-500 mb-3">
                <i className="fa-solid fa-industry text-[9px] mr-1"></i>{item.source}
            </p>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-slate-500">
                    {item.amount && <><i className="fa-solid fa-weight-hanging text-[9px] mr-1"></i>{item.amount}</>}
                </span>
                <span className="text-[11px] text-eco-400 font-semibold">{item.income}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">Eşleşme</span>
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${isMatched ? 'bg-gray-500' : barColor}`} style={{ width: `${item.matchScore}%` }}></div>
                </div>
                <span className={`text-[10px] font-bold ${isMatched ? 'text-gray-500' : scoreColor}`}>{item.matchScore}%</span>
            </div>
        </div>
    );
}

