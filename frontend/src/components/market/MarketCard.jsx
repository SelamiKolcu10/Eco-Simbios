import { tagStyles, typeStyles } from '../../data/marketListings';
import { MapPin, Clock, Weight, Heart, BrainCircuit } from 'lucide-react';

export default function MarketCard({ item, onClick, isMatched }) {
    const isHighMatch = item.matchScore >= 80;
    const scoreColor = isHighMatch ? 'text-[#0c4e33]' : 'text-amber-500';
    const barColor = isHighMatch ? 'bg-[#0ed3cf]' : 'bg-amber-400';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            
            {/* Image Section */}
            <div className="relative h-48 w-full shrink-0">
                <img 
                    src={item.image || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800'} 
                    alt={item.material}
                    className="w-full h-full object-cover"
                />
                
                {/* Top Left Tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${typeStyles[item?.type] || 'bg-gray-200 text-gray-800'}`}>
                        {item?.type?.toUpperCase() || 'BİLİNMİYOR'}
                    </span>
                    {item?.tag && (
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${tagStyles[item?.tag] || 'bg-white text-slate-800'}`}>
                            {item.tag}
                        </span>
                    )}
                </div>

                {/* Top Right Heart */}
                <button className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="h-3.5 w-3.5" />
                </button>

                {/* Bottom Right AI Badge */}
                {item.aiMatch && !isMatched && (
                    <div className="absolute bottom-3 right-3 bg-[#0c4e33]/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded outline outline-1 outline-white/20 shadow-sm flex items-center gap-1">
                        <BrainCircuit className="h-3 w-3" />
                        AI Önerisi
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                
                {/* Header Row */}
                <div className="flex items-start justify-between mb-1 gap-2">
                    <h4 className="text-[13px] font-bold text-slate-800 font-serif leading-tight">
                        {item.material}
                    </h4>
                    <span className="text-[13px] font-bold text-[#0c4e33] shrink-0">
                        {item.income}
                    </span>
                </div>
                
                {/* Source Company */}
                <p className="text-[11px] text-slate-500 mb-3">
                    {item.source}
                </p>

                {/* Meta Icons Row */}
                <div className="flex items-center gap-4 text-[10px] text-slate-500 mb-4">
                    {item.amount && (
                        <div className="flex items-center gap-1">
                            <Weight className="h-3 w-3" />
                            <span>{item.amount}</span>
                        </div>
                    )}
                    {item.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location}</span>
                        </div>
                    )}
                    {item.time && (
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.time}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    {/* Match Bar */}
                    {!isMatched && (
                        <div className="mb-4">
                            <div className="flex justify-between text-[10px] mb-1.5">
                                <span className="text-slate-500 font-medium tracking-wide">Eşleşme</span>
                                <span className={`font-bold ${scoreColor}`}>{item.matchScore}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${item.matchScore}%` }}></div>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <button 
                        onClick={onClick}
                        className="w-full py-2.5 bg-[#0c4e33] hover:bg-[#093b26] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                    >
                        Detayları Gör
                    </button>
                </div>

            </div>
        </div>
    );
}

