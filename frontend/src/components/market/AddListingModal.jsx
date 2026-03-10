import React, { useState } from 'react';
import { Truck, Flame, Recycle, X, Search, Handshake, ScrollText, Rocket } from 'lucide-react';

export default function AddListingModal({ onClose, onMatchConfirmed }) {
    const [category, setCategory] = useState('Metal');
    const [type, setType] = useState('Satılık Atık');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('Ton');
    const [source, setSource] = useState('');
    const [description, setDescription] = useState('');
    const [matchResult, setMatchResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const simulateMatchProcess = (e) => {
        e.preventDefault();
        setLoading(true);
        setMatchResult(null);

        setTimeout(() => {
            let result = {
                partner: "",
                message: "",
                disposalCost: 0,
                materialSaving: 0,
                totalEconomicValue: 0,
                icon: null,
                colorClass: ""
            };

            const numAmount = parseFloat(amount) || 100;

            // Financial calculations based on amount (e.g. tons)
            result.disposalCost = numAmount * 850; // Mock 850 TL/ton saved from landfill taxes
            result.materialSaving = numAmount * 5000 * 0.40; // Mock 40% cheaper than new raw material
            result.totalEconomicValue = result.disposalCost + result.materialSaving;

            if (category === 'Logistics' || category === 'Storage') {
                result.partner = "Borusan Lojistik A.Ş.";
                result.message = "Lojistik Sinerjisi Başarılı! Kapasite paylaşıldı.";
                result.icon = Truck;
                result.colorClass = "text-blue-500 bg-blue-50";
            }
            else if (category === 'Energy' || category === 'Water') {
                result.partner = "Bandırma Sera Bölgesi";
                result.message = "Enerji Transfer Hattı Onaylandı.";
                result.icon = Flame;
                result.colorClass = "text-orange-500 bg-orange-50";
            }
            else {
                result.partner = "Marmara Geri Dönüşüm Tesisi";
                result.message = "Hammadde İkamesi Tamamlandı! Geri dönüşüm sürecine alındı.";
                result.icon = Recycle;
                result.colorClass = "text-emerald-500 bg-emerald-50";
            }

            const matchScore = Math.floor(Math.random() * (95 - 65 + 1)) + 65;

            result.newListing = {
                id: Date.now(),
                type: type,
                material: description || 'Yeni Sinerji İlanı',
                amount: `${amount} ${unit}`,
                source: source || 'Kullanıcı Tesisi',
                category: category,
                tag: 'Yeni İlan',
                matchScore: matchScore,
                aiMatch: true,
                buyer: result.partner,
                buyerUse: 'Simbiyoz Odaklı',
                income: `${result.totalEconomicValue.toLocaleString()} TL`,
                co2: (numAmount * 0.4).toFixed(1) + ' Ton'
            };

            setMatchResult(result);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">İlan Ekle (Add Waste)</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-800 transition">
                        <X size={20} />
                    </button>
                </div>

                {!matchResult ? (
                    <form onSubmit={simulateMatchProcess} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Kategori</label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400">
                                    <option value="Metal">Metal</option>
                                    <option value="Textile">Textile</option>
                                    <option value="Plastic">Plastic</option>
                                    <option value="Chemical">Chemical</option>
                                    <option value="Wood">Wood</option>
                                    <option value="Energy">Energy</option>
                                    <option value="Water">Water</option>
                                    <option value="Logistics">Logistics</option>
                                    <option value="Storage">Storage</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">İlan Tipi</label>
                                <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400">
                                    <option value="Satılık Atık">Satılık Atık</option>
                                    <option value="Aranan Hammadde">Aranan Hammadde</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Miktar</label>
                                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Örn: 50" required className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Birim</label>
                                <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400">
                                    <option value="Ton">Ton</option>
                                    <option value="kg">kg</option>
                                    <option value="L">L</option>
                                    <option value="Adet">Adet</option>
                                    <option value="Birim">Birim</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Kaynak / Konum</label>
                            <input type="text" value={source} onChange={e => setSource(e.target.value)} placeholder="Örn: Kocaeli Tesis" required className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400" />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Açıklama / Malzeme Adı</label>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Örn: Alüminyum Hurda" required className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400" />
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button type="button" onClick={onClose} className="w-full py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                                İptal
                            </button>
                            <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                                {loading ? <span className="animate-pulse">Sinerji Aranıyor...</span> : "Sisteme Kaydet ve Eşleştir"}
                            </button>
                        </div>
                    </form>
                ) : (
                    /* Task 2: Advanced Match Result Screen */
                    <div className="text-center animate-fade-in">
                        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${matchResult.colorClass}`}>
                            <matchResult.icon size={36} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">{matchResult.partner}</h3>
                        <p className="text-slate-600 font-medium mb-6">
                            "{matchResult.message}"
                        </p>

                        {/* Symbiosis Maturity Model Stepper */}
                        <div className="relative mb-8 mt-2">
                            {/* Connecting Line */}
                            <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-slate-200 -z-10"></div>

                            <div className="flex justify-between relative z-10">
                                {/* Step 1: Fırsat Tanımlama (Completed) */}
                                <div className="flex flex-col items-center w-1/4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-white shadow-sm mb-2">
                                        <Search size={16} />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-800 text-center leading-tight">Fırsat<br />Tanımlama</p>
                                </div>

                                {/* Step 2: Fizibilite (Active) */}
                                <div className="flex flex-col items-center w-1/4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center border-4 border-white shadow-sm mb-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40"></span>
                                        <Handshake size={16} />
                                    </div>
                                    <p className="text-[10px] font-bold text-blue-600 text-center leading-tight">Ön<br />Fizibilite</p>
                                </div>

                                {/* Step 3: Anlaşma (Pending) */}
                                <div className="flex flex-col items-center w-1/4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-white shadow-sm mb-2">
                                        <ScrollText size={16} />
                                    </div>
                                    <p className="text-[10px] font-semibold text-slate-400 text-center leading-tight">Anlaşma &<br />Sözleşme</p>
                                </div>

                                {/* Step 4: Uygulama (Pending) */}
                                <div className="flex flex-col items-center w-1/4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-white shadow-sm mb-2">
                                        <Rocket size={16} />
                                    </div>
                                    <p className="text-[10px] font-semibold text-slate-400 text-center leading-tight">Simbiyoz<br />Uygulama</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-[10px] text-slate-500 italic mb-6">
                            Yapay Zeka ön fizibilite raporunu hazırlıyor...
                        </p>

                        <div className="bg-slate-50 border border-gray-100 rounded-2xl p-4 mb-6 text-left">
                            <p className="font-bold text-emerald-600 mb-3 text-sm flex items-center gap-1.5">
                                💰 Kazan-Kazan Analizi:
                            </p>
                            <ul className="space-y-2.5 text-xs text-slate-600">
                                <li className="flex justify-between items-center">
                                    <span className="flex items-center gap-1.5"><span><i className="fa-solid fa-trash-can text-slate-400"></i></span> Bertaraf Tasarrufu (Satıcı):</span>
                                    <span className="font-mono font-bold text-slate-800">+{matchResult.disposalCost.toLocaleString()} TL</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="flex items-center gap-1.5"><span><i className="fa-solid fa-industry text-slate-400"></i></span> Hammadde İkamesi (Alıcı):</span>
                                    <span className="font-mono font-bold text-slate-800">+{matchResult.materialSaving.toLocaleString()} TL</span>
                                </li>
                                <li className="border-t border-gray-200 pt-3 flex justify-between items-center font-bold text-emerald-600 text-sm">
                                    <span>TOPLAM EKONOMİK DEĞER:</span>
                                    <span>+{matchResult.totalEconomicValue.toLocaleString()} TL</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => {
                                if (onMatchConfirmed) {
                                    onMatchConfirmed({
                                        extraEarnings: matchResult.totalEconomicValue,
                                        extraCarbon: matchResult.savings || 0, // savings var has carbon info for metals
                                        newListing: matchResult.newListing
                                    });
                                }
                                onClose();
                            }}
                            className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                        >
                            Harika, Kapat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
