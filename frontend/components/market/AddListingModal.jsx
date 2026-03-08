import React, { useState } from 'react';
import { Truck, Flame, Recycle, X, Search, Handshake, ScrollText, Rocket } from 'lucide-react';

export default function AddListingModal({ onClose, onMatchConfirmed }) {
    const [wasteType, setWasteType] = useState('metals');
    const [amount, setAmount] = useState('');
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

            if (["logistics", "storage", "personnel"].includes(wasteType)) {
                result.partner = "Borusan Lojistik A.Ş.";
                result.message = "Lojistik Sinerjisi Başarılı! Boş kamyon kapasitesi paylaşıldı.";
                result.icon = Truck;
                result.colorClass = "text-blue-500 bg-blue-50";
            }
            else if (["waste_heat", "steam", "wastewater"].includes(wasteType)) {
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
                        {/* Task 1: Categorized Dropdown Menu */}
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                                Sinerji Tipi & Kategori
                            </label>
                            <select
                                value={wasteType}
                                onChange={(e) => setWasteType(e.target.value)}
                                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white transition-all"
                            >
                                <optgroup label="Materials & By-products (Yan Ürünler)">
                                    <option value="metals">Metals (Scrap, Copper, Steel)</option>
                                    <option value="plastics">Plastics & Rubber</option>
                                    <option value="chemicals">Chemicals & Ash (Slag, Fly Ash)</option>
                                    <option value="textiles">Textiles</option>
                                </optgroup>

                                <optgroup label="Energy & Water (Enerji ve Su)">
                                    <option value="waste_heat">Waste Heat (Atık Isı)</option>
                                    <option value="steam">Steam (Buhar)</option>
                                    <option value="wastewater">Treated Wastewater (Arıtılmış Su)</option>
                                </optgroup>

                                <optgroup label="Shared Services (Ortak Hizmetler)">
                                    <option value="logistics">Logistics (Empty Truck Sharing)</option>
                                    <option value="storage">Storage / Warehouse Sharing</option>
                                    <option value="personnel">Personnel / Security Sharing</option>
                                </optgroup>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                                Miktar / Kapasite Değeri
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Örn: 500"
                                required
                                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400 focus:bg-white transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-slate-800 text-white font-bold rounded-xl mt-4 hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="animate-pulse">Sinerji Aranıyor...</span>
                            ) : (
                                "Sinerji Oluştur"
                            )}
                        </button>
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
                                    <span className="flex items-center gap-1.5"><i className="fa-solid fa-trash-can text-slate-400"></i> Bertaraf Tasarrufu (Satıcı):</span>
                                    <span className="font-mono font-bold text-slate-800">+{matchResult.disposalCost.toLocaleString()} TL</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="flex items-center gap-1.5"><i className="fa-solid fa-industry text-slate-400"></i> Hammadde İkamesi (Alıcı):</span>
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
                                        extraCarbon: matchResult.savings || 0 // savings var has carbon info for metals
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
