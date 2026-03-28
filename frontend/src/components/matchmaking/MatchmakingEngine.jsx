import React, { useState } from 'react';
import { Leaf, Recycle, Box, FlaskConical, Layers } from 'lucide-react';

const categories = [
    {
        id: 'metal',
        name: 'Metal',
        desc: 'Demirli ve demirsiz',
        icon: Box,
        subcategories: ['Alüminyum Hurda', 'Bakır Kablo', 'Sarı Pirinç', 'Çelik Talaşı', 'Metal Atık']
    },
    {
        id: 'textile',
        name: 'Tekstil',
        desc: 'Dokuma ve iplik',
        icon: Layers,
        subcategories: ['Pamuklu Kırpıntı', 'Polyester Kumaş', 'Naylon İplik']
    },
    {
        id: 'plastic',
        name: 'Plastik',
        desc: 'Geri dönüştürülebilir polimerler',
        icon: Recycle,
        subcategories: ['PET Şişe', 'HDPE Bidon', 'PVC Boru Hurdası', 'Plastik Atık']
    },
    {
        id: 'chemical',
        name: 'Kimyasal',
        desc: 'Endüstriyel atık',
        icon: FlaskConical,
        subcategories: ['Atık Yağ', 'Çözücü (Solvent)', 'Boya Çamuru']
    },
    {
        id: 'wood',
        name: 'Ahşap',
        desc: 'Ahşap ve orman ürünleri',
        icon: Leaf,
        subcategories: ['Ahşap Palet', 'MDF Tozu', 'Talaş']
    }
];

export default function MatchmakingEngine({ onRegister, onNavigate }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const [formData, setFormData] = useState({
        companyName: '',
        sector: '',
        contactName: '',
        email: ''
    });

    const handleCategorySelect = (cat) => {
        if (selectedCategory?.id === cat.id) return;
        setSelectedCategory(cat);
        setSelectedSubcategory(null);
    };

    const handleSubcategorySelect = (sub) => {
        setSelectedSubcategory(sub);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Tesis bilgilerinizi aldık. Lütfen güvenlik amacıyla parolanızı belirleyerek kaydı tamamlayın.');
        
        // Pass the pre-filled data to the registration component
        if (onNavigate) {
            onNavigate('register', {
                name: formData.companyName,
                email: formData.email,
                sector: formData.sector,
                // Matchmaking specific data if needed later
            });
        }
    };

    return (
        <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-5xl mx-auto py-12 px-4 md:px-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Simbiyoz Ağına Katılın</h1>
                <p className="text-slate-500 mt-2 text-sm font-medium">Adım 1: Birincil malzeme kategorinizi seçin</p>
            </div>

            {/* Step 1: Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {categories.map((cat) => {
                    const isSelected = selectedCategory?.id === cat.id;
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat)}
                            className={`flex flex-col items-center justify-center py-6 px-2 text-center rounded-xl border transition-all duration-200 ${isSelected
                                    ? 'border-[#2e7d58] bg-[#e8f3ee] shadow-sm'
                                    : 'border-slate-200 bg-white hover:border-[#2e7d58]/40 hover:bg-slate-50 shadow-sm'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isSelected ? 'bg-[#2e7d58] text-white' : 'bg-[#e8f3ee] text-[#2e7d58]'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm mb-1">{cat.name}</h3>
                            <p className="text-[10px] text-slate-500 leading-tight px-1">{cat.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Subcategories */}
            {selectedCategory && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-sm font-bold text-slate-800 mb-4">Alt Kategoriler</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedCategory.subcategories.map((sub, idx) => {
                            const isSubSelected = selectedSubcategory === sub;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSubcategorySelect(sub)}
                                    className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all ${isSubSelected
                                            ? 'border-[#2e7d58] bg-[#e8f3ee] text-[#2e7d58]'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-[#2e7d58]/40 hover:text-[#2e7d58]'
                                        }`}
                                >
                                    {sub}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Step 2: Company Registration Form */}
            <div className={`transition-all duration-500 ${selectedCategory ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#2e7d58] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        2
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Adım 2: Şirket Kaydı</h2>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                            {/* Left Column */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">İşletme Bilgileri</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Şirket Unvanı</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Resmi şirket adı"
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#2e7d58] focus:border-[#2e7d58] transition-colors text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Sektör</label>
                                        <select
                                            name="sector"
                                            value={formData.sector}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#2e7d58] focus:border-[#2e7d58] transition-colors text-sm text-slate-600 appearance-none"
                                            required
                                        >
                                            <option value="" disabled>Seçiniz</option>
                                            <option value="manufacturing">Üretim & İmalat</option>
                                            <option value="agriculture">Tarım & Seracılık</option>
                                            <option value="logistics">Lojistik</option>
                                            <option value="recycling">Geri Dönüşüm</option>
                                            <option value="other">Diğer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">Yetkili Kişi</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Ad Soyad</label>
                                        <input
                                            type="text"
                                            name="contactName"
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            placeholder="Yetkili kişi"
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#2e7d58] focus:border-[#2e7d58] transition-colors text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Kurumsal E-posta</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="ad@firma.com"
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#2e7d58] focus:border-[#2e7d58] transition-colors text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Summary Display Box inside Right Column, bottom */}
                                    <div className="mt-4 bg-[#e8f3ee]/50 border border-[#e8f3ee] rounded-lg p-3">
                                        <p className="text-xs font-bold text-[#2e7d58] mb-0.5">Seçilen Ürün/Kategori</p>
                                        <p className="text-[11px] text-slate-600">
                                            {selectedCategory ? selectedCategory.name : 'Kategori seçilmedi'}{' '}
                                            <span className="text-slate-500">
                                                ({selectedSubcategory ? selectedSubcategory : 'alt kategori seçilmedi'})
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-10 flex justify-center">
                            <button
                                type="submit"
                                className="bg-[#2e7d58] hover:bg-[#1f5c3e] text-white text-sm font-bold py-3 px-8 rounded-lg shadow-sm transition-colors"
                            >
                                Kaydı Tamamla
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
