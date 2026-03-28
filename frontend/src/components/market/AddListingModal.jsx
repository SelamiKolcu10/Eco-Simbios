import React, { useState, useRef, useEffect } from 'react';
import { Truck, Flame, Recycle, X, Search, Handshake, ScrollText, Rocket, ChevronDown } from 'lucide-react';
import { findBestMatch } from '../../data/matchingEngine';

const FACILITIES = [
    { id: 1, name: 'Kocaeli Üretim Tesisi', city: 'Kocaeli' },
    { id: 2, name: 'Bursa Otomotiv Fabrikası', city: 'Bursa' },
    { id: 3, name: 'İzmir Tekstil Atölyesi', city: 'İzmir' },
    { id: 4, name: 'Gaziantep Cam Sanayi', city: 'Gaziantep' },
    { id: 5, name: 'Eskişehir Çimento Fabrikası', city: 'Eskişehir' },
    { id: 6, name: 'Ankara Demir Çelik', city: 'Ankara' },
    { id: 7, name: 'Gebze Plastik OSB', city: 'Kocaeli' }
];

const MATERIALS = [
    { category: "Metal", items: ["Alüminyum Hurda", "Bakır Kablo", "Sarı Pirinç", "Çelik Talaşı"] },
    { category: "Tekstil", items: ["Pamuklu Kırpıntı", "Polyester Kumaş", "Naylon İplik"] },
    { category: "Plastik", items: ["PET Şişe", "HDPE Bidon", "PVC Boru Hurdası"] },
    { category: "Kimyasal", items: ["Atık Yağ", "Çözücü (Solvent)", "Boya Çamuru"] },
    { category: "Ahşap", items: ["Ahşap Palet", "MDF Tozu", "Talaş"] }

];

import { useAuth } from '../../context/AuthContext';

export default function AddListingModal({ onClose, onMatchConfirmed }) {
    const { authAxios } = useAuth(); // Get authAxios from Context

    const [category, setCategory] = useState('Metal');
    const [type, setType] = useState('Satılık Atık');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('Ton');
    const [source, setSource] = useState('');
    const [description, setDescription] = useState('');
    const [matchResult, setMatchResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Searchable dropdown states
    const [isSourceOpen, setIsSourceOpen] = useState(false);
    const [sourceSearch, setSourceSearch] = useState('');
    const sourceRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (sourceRef.current && !sourceRef.current.contains(event.target)) {
                setIsSourceOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredFacilities = FACILITIES.filter(f =>
        f.name.toLowerCase().includes(sourceSearch.toLowerCase()) ||
        f.city.toLowerCase().includes(sourceSearch.toLowerCase())
    );

    const handleListingSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMatchResult(null);

        try {
            const numAmount = parseFloat(amount) || 100;

            // 1. Post real data to the backend via authAxios
            const payload = {
                category,
                type,
                wasteType: description || 'Bilinmiyor',
                description: `${source || 'Kullanıcı Tesisi'} tarafından eklenen ${amount} ${unit} ${description || 'malzeme'}`,
                amount: numAmount,
                energyValue: numAmount * 1.5, // Arbitrary calculation for energy
                status: 'active'
            };
            const res = await authAxios.post('http://localhost:5000/api/listings', payload);
            const dbListing = res.data.data;

            // 2. Generate match result UI logic
            let result = {
                partner: "",
                message: "",
                disposalCost: 0,
                materialSaving: 0,
                totalEconomicValue: 0,
                icon: null,
                colorClass: ""
            };

            result.disposalCost = numAmount * 850; 
            result.materialSaving = numAmount * 5000 * 0.40; 
            result.totalEconomicValue = result.disposalCost + result.materialSaving;

            // SMART MATCHING ENGINE INTEGRATION
            const matchData = findBestMatch(description || 'Bilinmiyor', source || 'Bilinmiyor');
            result.partner = matchData.buyer;
            
            if (matchData.matchScore >= 85) {
                result.message = "Mükemmel Uyum! %100 Kapalı Çevrim Geri Dönüşüm Seçeneği.";
                result.icon = Recycle;
                result.colorClass = "text-emerald-500 bg-emerald-50";
            } else if (matchData.matchScore >= 70) {
                result.message = "İyi Uyum. Alternatif Hammadde Olarak Değerlendirilebilir.";
                result.icon = Flame;
                result.colorClass = "text-orange-500 bg-orange-50";
            } else {
                result.message = "Genel Geri Dönüşüm Kapsamında Değerlendirilecek.";
                result.icon = Truck;
                result.colorClass = "text-blue-500 bg-blue-50";
            }

            // Map DB object to Frontend MarketCard format
            result.newListing = {
                id: dbListing._id,
                type: dbListing.type || type,
                material: dbListing.wasteType || description || 'Yeni Sinerji İlanı',
                amount: `${dbListing.amount || amount} ${unit}`,
                source: dbListing.createdBy?.name || source || 'Kullanıcı Tesisi',
                category: dbListing.category || category,
                tag: matchData.aiMatch ? 'Yüksek Uyum' : 'Yeni İlan',
                matchScore: matchData.matchScore,
                aiMatch: matchData.aiMatch,
                buyer: matchData.buyer,
                buyerUse: matchData.buyerUse,
                income: `${result.totalEconomicValue.toLocaleString()} TL`,
                co2: (numAmount * 0.4).toFixed(1) + ' Ton'
            };

            setMatchResult(result);
        } catch (error) {
            console.error("Listing creation failed:", error);
            alert("İlan eklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
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
                    <form onSubmit={handleListingSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Kategori</label>
                                <select 
                                    value={category} 
                                    onChange={e => {
                                        setCategory(e.target.value);
                                        setDescription(''); // Reset material when category changes
                                    }} 
                                    className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400"
                                >
                                    <option value="Metal">Metal</option>
                                    <option value="Tekstil">Tekstil</option>
                                    <option value="Plastik">Plastik</option>
                                    <option value="Kimyasal">Kimyasal</option>
                                    <option value="Ahşap">Ahşap</option>
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

                        <div className="relative" ref={sourceRef}>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Kaynak / Konum (Tesis Seçimi)</label>
                            <div
                                onClick={() => setIsSourceOpen(!isSourceOpen)}
                                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-sm rounded-xl px-4 py-3 cursor-pointer flex justify-between items-center transition-shadow hover:shadow-md"
                            >
                                <span className={source ? "text-slate-800 font-medium" : "text-slate-400"}>
                                    {source || "Sistemden tesis arayın veya seçin..."}
                                </span>
                                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isSourceOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {isSourceOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-2 border-b border-slate-50">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                                            <input
                                                type="text"
                                                autoFocus
                                                placeholder="Tesis veya şehir ara..."
                                                value={sourceSearch}
                                                onChange={e => setSourceSearch(e.target.value)}
                                                className="w-full bg-slate-50/50 border-none text-sm rounded-lg pl-9 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto p-1">
                                        {filteredFacilities.length > 0 ? (
                                            filteredFacilities.map(f => (
                                                <div
                                                    key={f.id}
                                                    onClick={() => {
                                                        setSource(`${f.name} (${f.city})`);
                                                        setIsSourceOpen(false);
                                                        setSourceSearch('');
                                                    }}
                                                    className="px-3 py-2.5 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors flex justify-between items-center group"
                                                >
                                                    <span className="font-medium text-slate-700 text-sm group-hover:text-emerald-700">{f.name}</span>
                                                    <span className="text-xs text-slate-500 bg-slate-100 group-hover:bg-emerald-100 px-2 py-0.5 rounded-md transition-colors">{f.city}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-4 text-sm text-slate-500 text-center flex flex-col items-center">
                                                <Search className="h-6 w-6 text-slate-300 mb-2" />
                                                <span>Sonuç bulunamadı</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Açıklama / Malzeme Adı</label>
                            <div className="relative group">
                                <select
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                    className="w-full bg-slate-50 border border-gray-200 text-slate-800 font-medium text-sm rounded-xl px-4 py-3 outline-none focus:border-emerald-400 appearance-none hover:shadow-md transition-shadow cursor-pointer"
                                    style={{ paddingRight: '2.5rem' }}
                                >
                                    <option value="" disabled className="text-slate-400 font-normal">Sistemde tanımlı malzeme seçin...</option>
                                    {MATERIALS.filter(cat => cat.category === category).map(cat => (
                                        <optgroup key={cat.category} label={'── ' + cat.category.toUpperCase() + ' ──'} className="font-bold text-slate-500 bg-slate-50">
                                            {cat.items.map(item => (
                                                <option key={item} value={item} className="text-slate-800 font-medium bg-white py-1">{item}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-hover:text-emerald-500 transition-colors" />
                            </div>
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
