import { tagStyles, typeStyles } from '../../data/marketListings';
import { MapPin, Clock, Weight, Heart, BrainCircuit } from 'lucide-react';
import { cn } from "../../lib/utils";

export default function MarketCard({ item, onClick, isMatched, isFavorited, onToggleFavorite, onAIMatchClick }) {
    const isHighMatch = item.matchScore >= 80;
    const scoreColor = isHighMatch ? 'text-[#0c4e33]' : 'text-amber-500';
    const barColor = isHighMatch ? 'bg-[#0ed3cf]' : 'bg-amber-400';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">

            {/* Image Section — only if image exists */}
            {item.image && (
            <div className="relative h-48 w-full shrink-0">
                <img 
                    src={item.image} 
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
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                    className={cn(
                        "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm border",
                        isFavorited 
                            ? "bg-red-50 border-red-100 text-red-500 scale-110" 
                            : "bg-white/90 backdrop-blur border-slate-100 text-slate-400 hover:text-red-500"
                    )}
                >
                    <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
                </button>

                {/* Bottom Right AI Badge */}
                {item.aiMatch && !isMatched && (
                    <div className="absolute bottom-3 right-3 bg-[#0c4e33]/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded outline outline-1 outline-white/20 shadow-sm flex items-center gap-1">
                        <BrainCircuit className="h-3 w-3" />
                        AI Önerisi
                    </div>
                )}
            </div>
            )}

            {/* Fallback tags when no image */}
            {!item.image && (
            <div className="px-5 pt-4 pb-0 flex items-center justify-between">
                <div className="flex gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${typeStyles[item?.type] || 'bg-gray-200 text-gray-800'}`}>
                        {item?.type?.toUpperCase() || 'BİLİNMİYOR'}
                    </span>
                    {item?.tag && (
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${tagStyles[item?.tag] || 'bg-white text-slate-800'}`}>
                            {item.tag}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {item.aiMatch && !isMatched && (
                        <div className="bg-[#0c4e33]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <BrainCircuit className="h-3 w-3" />
                            AI Önerisi
                        </div>
                    )}
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all border",
                            isFavorited 
                                ? "bg-red-50 border-red-100 text-red-500" 
                                : "bg-slate-50 border-slate-100 text-slate-400 hover:text-red-500"
                        )}
                    >
                        <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
                    </button>
                </div>
            </div>
            )}

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


                    {/* Action Button */}
                    <div className="flex flex-col gap-2">
                        <button 
                            onClick={onClick}
                            className="w-full py-2.5 bg-white border border-[#0c4e33] text-[#0c4e33] hover:bg-emerald-50 text-xs font-bold rounded-lg transition-colors shadow-sm"
                        >
                            Detayları Gör
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); if (onAIMatchClick) onAIMatchClick(item); }}
                            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-xs font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                        >
                            <BrainCircuit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            AI Sinerji Bul
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

