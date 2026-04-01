import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrainCircuit, X, MapPin, Building2, CheckCircle2 } from 'lucide-react';

export default function AIMatchModal({ item, onClose, onNavigate }) {
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState('Agent-1: Lojistik ve Sektörel Veriler Analiz Ediliyor...');
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const performAIMatch = async () => {
            try {
                // Fetch matches from real API
                // Wait exactly 1.5 seconds total for the 'Wow Factor'
                const [response] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/listings/${item.id}/matches`),
                    new Promise(resolve => setTimeout(resolve, 1500)) 
                ]);

                if (isMounted) {
                    if (response.data.success) {
                        setMatches(response.data.data);
                    } else {
                        setError('Eşleşme bulunamadı.');
                    }
                    setLoading(false);
                }

            } catch (err) {
                if (isMounted) {
                    console.error("Match error:", err);
                    setError('Yapay zeka analizinde bir hata oluştu.');
                    setLoading(false);
                }
            }
        };

        performAIMatch();

        return () => { isMounted = false; };
    }, [item.id]);

    const handleConnect = (partner) => {
        alert(`${partner.name} ile bağlantı isteği gönderildi! E-posta ile bilgilendirileceksiniz.`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-100 flex flex-col h-[600px] max-h-[90vh]">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0c4e33] to-emerald-700 p-6 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur text-white flex items-center justify-center">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold font-serif">Yapay Zeka Sinerji Analizi</h2>
                            <p className="text-emerald-100 text-xs">Hedef Kaynak: {item.material}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 text-emerald-100" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-6">
                            <div className="relative relative w-20 h-20">
                                <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                                <BrainCircuit className="absolute inset-0 m-auto w-8 h-8 text-emerald-600 animate-pulse" />
                            </div>
                            <div className="text-center">
                                <p className="text-emerald-700 font-bold text-lg min-w-[250px]">{loadingText}</p>
                                <p className="text-slate-400 text-sm mt-2">Döngüsel ekonomi algoritmaları çalışıyor...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="text-red-500 mb-4 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                                <X className="w-6 h-6" />
                            </div>
                            <p className="font-bold text-slate-800">{error}</p>
                            <button onClick={onClose} className="mt-4 text-[#0c4e33] font-bold text-sm">Geri Dön</button>
                        </div>
                    ) : matches.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="text-slate-600 font-medium bg-slate-100 p-4 rounded-xl border border-slate-200">
                                Bu ilan için bölgesel ve sektörel kriterlere uygun potansiyel sinerji ortağı bulunamadı.
                            </p>
                            <button onClick={onClose} className="mt-6 btn-cyber px-6 py-2">Kapat</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="mb-4">
                                <h3 className="text-sm font-bold text-slate-700 tracking-wide uppercase">Bulunan En İyi Eşleşmeler</h3>
                            </div>
                            
                            {matches.map((match, idx) => {
                                const partner = match.partner;
                                const scoreColor = match.matchScore >= 90 ? 'text-emerald-600 bg-emerald-50' :
                                                 match.matchScore >= 75 ? 'text-teal-600 bg-teal-50' : 'text-blue-600 bg-blue-50';
                                
                                return (
                                    <div key={partner._id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col sm:flex-row gap-4">
                                        
                                        {idx === 0 && (
                                            <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-emerald-400 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> En Yüksek Uyum
                                            </div>
                                        )}
                                        
                                        <div className="flex flex-col justify-center items-center p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-[100px]">
                                            <span className="text-2xl font-black text-slate-800">%{match.matchScore}</span>
                                            <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">Uyum</span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Building2 className="w-4 h-4 text-[#0c4e33]" />
                                                <h4 className="font-bold text-slate-800">{partner.name}</h4>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                                                {partner.sector && (
                                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{partner.sector}</span>
                                                )}
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {partner.region} Bölgesi 
                                                    {match.distance != null && (
                                                        <span className="ml-2 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium border border-emerald-100">
                                                            {match.distance} km
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className={`text-xs p-3 rounded-lg border border-opacity-50 ${scoreColor}`}>
                                                <strong className="block mb-1">Algoritma Analizi:</strong>
                                                {match.reasoning}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center shrink-0">
                                            <button 
                                                onClick={() => handleConnect(partner)}
                                                className="w-full sm:w-auto bg-[#0c4e33] hover:bg-[#093b26] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
                                            >
                                                Bağlantı Kur
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
