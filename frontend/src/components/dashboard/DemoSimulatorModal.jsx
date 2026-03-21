import React, { useState, useEffect } from 'react';
import { X, Database, Network, Calculator, ArrowRight, CheckCircle2, BrainCircuit, Search } from 'lucide-react';

const sectorWasteMap = {
    'Metal İşleme & Sanayi': ['Alüminyum Hurda', 'Bakır Kablo', 'Sarı Pirinç', 'Çelik Talaşı', 'Metal Atık'],
    'Tekstil & Dokuma': ['Pamuklu Kırpıntı', 'Polyester Kumaş', 'Naylon İplik'],
    'Plastik & Ambalaj': ['PET Şişe', 'HDPE Bidon', 'PVC Boru Hurdası', 'Plastik Atık'],
    'Kimya Sanayii': ['Atık Yağ', 'Çözücü (Solvent)', 'Boya Çamuru'],
    'Ahşap & Mobilya': ['Ahşap Palet', 'MDF Tozu', 'Talaş'],
    'Diğer': ['Cam', 'Elektronik Atıklar (AEEE)', 'İnşaat Yıkıntı', 'Karışık/Diğer Atık']
};

const sectors = Object.keys(sectorWasteMap);

export default function DemoSimulatorModal({ onClose }) {
    const [phase, setPhase] = useState('input'); // 'input', 'processing', 'result'
    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        sector: '',
        waste: '',
        amount: 50,
        companyName: '',
        fullName: '',
        email: ''
    });

    const [calculatedData, setCalculatedData] = useState({
        co2: 0,
        jobs: 0
    });

    // Start Demo Simulation
    const handleStartDemo = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.sector || !formData.waste || !formData.companyName || !formData.fullName || !formData.email) {
            alert('Lütfen analiz için tüm alanları doldurun.');
            return;
        }

        // Calculate fake metrics based on input amount and waste type
        // Just a fun formula to make it seem dynamic
        const wasteLen = formData.waste.length;
        const multiplier = wasteLen > 10 ? 1.4 : 2.1;
        const estimatedCo2 = Math.floor(formData.amount * multiplier * 12.5);
        const estimatedJobs = Math.max(1, Math.floor(formData.amount / 15));

        setCalculatedData({
            co2: estimatedCo2.toLocaleString(),
            jobs: estimatedJobs
        });

        setPhase('processing');
    };

    // Simulate AI loading steps when phase becomes 'processing'
    useEffect(() => {
        if (phase === 'processing') {
            const timers = [
                setTimeout(() => setStep(1), 1000),
                setTimeout(() => setStep(2), 2000),
                setTimeout(() => {
                    setStep(3);
                    setTimeout(() => setPhase('result'), 800); // Wait a bit then show result
                }, 3000)
            ];
            return () => timers.forEach(clearTimeout);
        }
    }, [phase]);

    const steps = [
        { id: 1, label: 'Veri Tabanı Tarandı', icon: Database },
        { id: 2, label: 'Ajanlar Eşleşti', icon: Network },
        { id: 3, label: 'Endeks Hesaplandı', icon: Calculator }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'sector') {
                newData.waste = ''; // Reset waste when sector changes
            }
            return newData;
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark Blur Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div className="relative w-full max-w-2xl bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl border border-teal-500/30 shadow-[0_0_60px_-15px_rgba(20,184,166,0.3)] overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 rounded-full backdrop-blur-sm transition-all z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Sub-bg Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-teal-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                <div className="relative p-6 md:p-8 pt-10 text-center border-b border-slate-800/70 bg-slate-900/60 shadow-inner">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400/20 to-teal-500/5 border border-teal-400/30 mb-4 shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                        <BrainCircuit className="w-6 h-6 text-teal-400" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight font-serif uppercase w-full">
                        İnteraktif Etki Simülatörü:<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-500">Potansiyelinizi Keşfedin</span>
                    </h2>
                </div>

                <div className="p-6 md:p-10">

                    {phase === 'input' && (
                        <form onSubmit={handleStartDemo} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* Sector & Waste */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-teal-500 tracking-wider uppercase">Sektörünüzü Seçin</label>
                                    <div className="relative">
                                        <select
                                            name="sector"
                                            value={formData.sector}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/80 rounded-xl text-white appearance-none focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm font-medium"
                                            required
                                        >
                                            <option value="" disabled>Sektör seçiniz...</option>
                                            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-teal-500 tracking-wider uppercase">Ana Atık Türünüzü Seçin</label>
                                    <div className="relative">
                                        <select
                                            name="waste"
                                            value={formData.waste}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/80 rounded-xl text-white appearance-none focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                            required
                                            disabled={!formData.sector}
                                        >
                                            <option value="" disabled>{formData.sector ? 'Atık türü seçiniz...' : 'Önce sektör seçiniz'}</option>
                                            {formData.sector && sectorWasteMap[formData.sector].map(w => <option key={w} value={w}>{w}</option>)}
                                        </select>
                                        <Database className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Amount Slider */}
                            <div className="space-y-3 bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                                <div className="flex justify-between items-end mb-1">
                                    <label className="text-[10px] font-bold text-teal-500 tracking-wider uppercase">Tahmini Yıllık Miktar (Ton)</label>
                                    <span className="text-xl font-black text-teal-300 tabular-nums">{formData.amount} <span className="text-xs font-medium text-slate-400">Ton</span></span>
                                </div>
                                <input
                                    type="range"
                                    name="amount"
                                    min="1"
                                    max="5000"
                                    step="10"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(formData.amount / 5000) * 100}%, #334155 ${(formData.amount / 5000) * 100}%, #334155 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-[9px] text-slate-500 font-medium">
                                    <span>1 Ton</span>
                                    <span>5000+ Ton</span>
                                </div>
                            </div>

                            {/* Lead Generation Form */}
                            <div className="space-y-4 pt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Şirket Adı" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm font-medium" required />
                                    <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Ad Soyad" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm font-medium" required />
                                </div>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Kurumsal E-posta Adresi" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm font-medium" required />
                            </div>

                            {/* Action Button */}
                            <div className="pt-4 text-center">
                                <p className="text-[11px] text-slate-400 mb-4 px-4 leading-relaxed">
                                    Sektör ve atık bilgilerinizi girerek, AI ajanlarımızın size özel simbiyoz potansiyelini analiz etmesini sağlayın.
                                </p>
                                <button
                                    type="submit"
                                    className="group relative flex w-full items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 text-slate-900 font-extrabold text-sm py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)]"
                                >
                                    DEMOYU BAŞLAT
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    )}

                    {(phase === 'processing' || phase === 'result') && (
                        <div className="space-y-10 animate-in fade-in duration-500">
                            {/* Simulated Loading Flow */}
                            <div className="flex items-center justify-between relative max-w-lg mx-auto mb-2">
                                <div className="absolute top-1/2 left-4 w-[calc(100%-2rem)] h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                                <div
                                    className="absolute top-1/2 left-4 h-0.5 bg-teal-500 -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out"
                                    style={{ width: step === 0 ? '0%' : step === 1 ? '45%' : step === 2 ? '90%' : '100%' }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-200 shadow-[0_0_10px_rgba(45,212,191,1)]"></div>
                                </div>

                                {steps.map((s, index) => {
                                    const active = step >= index + 1;
                                    const current = step === index;
                                    const Icon = s.icon;

                                    return (
                                        <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${active
                                                ? 'bg-teal-900/60 border-teal-500/50 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.2)] scale-100'
                                                : current
                                                    ? 'bg-slate-800 border-teal-500/40 text-teal-200 shadow-[0_0_10px_rgba(20,184,166,0.1)] scale-110 animate-pulse'
                                                    : 'bg-slate-900 border-slate-700/50 text-slate-600 scale-95'
                                                }`}>
                                                {active ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                            </div>
                                            <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-center max-w-[80px] transition-colors ${active ? 'text-teal-400' : current ? 'text-teal-200' : 'text-slate-600'
                                                }`}>
                                                {s.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Calculated Data Hook Output */}
                            <div className={`transition-all duration-700 transform ${phase === 'result' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>

                                <div className="flex w-full justify-center mb-4">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-[10px] text-slate-300 font-mono tracking-wider">
                                        <span className="text-teal-500 font-bold">SEKTÖR:</span> {formData.sector.toUpperCase()}
                                        <span className="text-slate-600 px-1">|</span>
                                        <span className="text-teal-500 font-bold">ATIK:</span> {formData.waste.toUpperCase()}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-b from-teal-900/30 to-slate-900/80 border border-teal-500/20 rounded-2xl p-8 text-center shadow-[inset_0_0_30px_rgba(20,184,166,0.05)] relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                        <Database className="w-32 h-32" />
                                    </div>
                                    <h3 className="text-[11px] md:text-sm font-bold text-teal-400/80 tracking-widest uppercase mb-2">Tahmini Yıllık Karbon Tasarrufu</h3>
                                    <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-100 to-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.2)] tabular-nums mb-6">
                                        {calculatedData.co2} <span className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-teal-200 to-teal-600">TON CO₂</span>
                                    </div>

                                    <div className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-medium text-slate-300 bg-black/40 rounded-xl py-3 px-6 border border-teal-900/50 shadow-inner">
                                        POTANSİYEL YEŞİL İSTİHDAM KOTASI: <span className="font-extrabold text-teal-400 text-base ml-1">+{calculatedData.jobs} KİŞİ</span>
                                    </div>
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-sm text-teal-200 font-medium mb-2">Analiz sonucunuz yöneticilerimize başarıyla ulaştırıldı. Harika potansiyelinizi konuşmak için ekibimiz sizinle iletişime geçecektir.</p>
                                    <p className="text-[10px] text-slate-500">Bu pencereyi kapatıp platformu keşfetmeye devam edebilirsiniz.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
