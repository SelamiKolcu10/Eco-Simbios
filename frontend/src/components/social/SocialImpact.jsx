import React, { useState } from 'react';

export default function SocialImpact() {
    const [activeTab, setActiveTab] = useState('club');
    
    const [formData, setFormData] = useState({});
    const [statusIndicator, setStatusIndicator] = useState(null);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async () => {
        try {
            setStatusIndicator('loading');
            const reqTypeMap = { student: 'Burs', women: 'Kooperatif', club: 'Kulüp', recycle: 'Lojistik', other: 'Diğer' };
            const payload = { ...formData, requestType: reqTypeMap[activeTab] || 'Diğer' };

            const res = await fetch('http://localhost:5000/api/social/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatusIndicator('success');
                setFormData({});
                setTimeout(() => setStatusIndicator(null), 3000);
            } else {
                setStatusIndicator('error');
                setTimeout(() => setStatusIndicator(null), 3000);
            }
        } catch (err) {
            setStatusIndicator('error');
            setTimeout(() => setStatusIndicator(null), 3000);
        }
    };

    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto pb-10">
            {/* Context & Data Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-leaf text-teal-600 text-xl drop-shadow-sm"></i>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Şeffaflık ve Başvuru Portalı</h3>
                    <p className="text-xs text-slate-500 font-medium">Sosyal Girişimler & İklim Yatırımları Takip Sistemi</p>
                </div>
            </div>

            {/* 4 Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'CO₂ Elimine Edildi', value: '156.8 T', color: 'text-teal-600', icon: 'fa-cloud' },
                    { label: 'Kömür Tüketimi Önlendi', value: '312.5 T', color: 'text-amber-500', icon: 'fa-fire-extinguisher' },
                    { label: 'Termal Etki Engellendi', value: '4.2°C', color: 'text-rose-500', icon: 'fa-temperature-arrow-down' },
                    { label: 'Su Tasarrufu', value: '24.5K m³', color: 'text-sky-500', icon: 'fa-droplet' },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3 border border-slate-100/50">
                            <i className={`fa-solid ${item.icon} ${item.color} text-lg drop-shadow-sm`}></i>
                        </div>
                        <p className="text-2xl font-black text-slate-800 mb-1">{item.value}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.label}</p>
                    </div>
                ))}
            </div>

            {/* Canlı Fon Havuzu (Replaced Carbon Credit Funnel) */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-400"></div>
                
                <h3 className="text-sm font-bold text-slate-800 mb-8 self-center md:self-start w-full text-center md:text-left">Canlı Fon Havuzu</h3>
                
                {/* Glowing Counter / Circular Progress */}
                <div className="relative w-56 h-56 mb-8 flex items-center justify-center">
                    {/* Outer Glow */}
                    <div className="absolute inset-4 rounded-full bg-teal-400/10 blur-2xl animate-pulse"></div>
                    
                    {/* SVG Circle */}
                    <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#f8fafc" strokeWidth="6" />
                        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#tealGradient)" strokeWidth="6" strokeDasharray="289" strokeDashoffset="58" className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                        <defs>
                            <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2dd4bf" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                        </defs>
                    </svg>
                    
                    {/* Inner Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-center leading-tight">Dağıtılabilir Eğitim<br/>ve Ar-Ge Fonu</span>
                        <span className="text-3xl font-black text-slate-800 tracking-tight">₺125,000</span>
                    </div>
                </div>

                {/* Stats Icons */}
                <div className="flex items-center gap-8 w-full justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                            <i className="fa-solid fa-user-graduate text-slate-500 text-lg"></i>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-800">12</p>
                            <p className="text-[10px] text-slate-500 font-medium">Burs Bekleyenler</p>
                        </div>
                    </div>
                    <div className="h-10 w-[1px] bg-slate-200"></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                            <i className="fa-solid fa-users-rectangle text-slate-500 text-lg"></i>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-800">5</p>
                            <p className="text-[10px] text-slate-500 font-medium">Desteklenen Kulüpler</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5 Merged Social Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Funded Scholarships */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_5px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-eco-50 border border-eco-100 flex items-center justify-center mb-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                        <i className="fa-solid fa-graduation-cap text-eco-500 text-xl"></i>
                    </div>
                    <p className="text-2xl font-black text-slate-800 mb-1">120</p>
                    <p className="text-[11px] text-slate-600 font-bold mb-1">Finanse Edilen Burs</p>
                    <p className="text-[9px] text-slate-400">Karbon Tasarruflarıyla Finanse Edildi</p>
                </div>
                
                {/* 2. Student Internships */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_5px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center mb-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                        <i className="fa-solid fa-user-graduate text-purple-500 text-xl"></i>
                    </div>
                    <p className="text-2xl font-black text-slate-800 mb-1">49</p>
                    <p className="text-[11px] text-slate-600 font-bold mb-1">Student Internships</p>
                    <p className="text-[9px] text-slate-400">Per £50,000 savings &rarr; 1 position</p>
                </div>

                {/* 3. Women Employed */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_5px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mb-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                        <i className="fa-solid fa-seedling text-pink-500 text-xl cursor-help" title="Seracılık / Kadın İstihdam"></i> 
                    </div>
                    <p className="text-2xl font-black text-slate-800 mb-1">29</p>
                    <p className="text-[11px] text-slate-600 font-bold mb-1">Kadın İstihdam Ediliyor</p>
                    <p className="text-[9px] text-slate-400">%60 kadın istihdam oranı</p>
                </div>

                {/* 4. Communities Served */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_5px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mb-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                        <i className="fa-solid fa-people-group text-sky-500 text-xl"></i>
                    </div>
                    <p className="text-2xl font-black text-slate-800 mb-1">8</p>
                    <p className="text-[11px] text-slate-600 font-bold mb-1">Communities Served</p>
                    <p className="text-[9px] text-slate-400">Across Marmara & Aegean</p>
                </div>

                {/* 5. University Clubs Supported */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_5px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mb-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                        <i className="fa-solid fa-building-columns text-amber-500 text-xl"></i> 
                    </div>
                    <p className="text-2xl font-black text-slate-800 mb-1">15</p>
                    <p className="text-[11px] text-slate-600 font-bold mb-1">University Clubs Supported</p>
                    <p className="text-[9px] text-slate-400">R&D and Event Grants</p>
                </div>
            </div>

            {/* Dynamic Application Portal */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100">
                <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Hızlı Talep & Başvuru Portalı</h3>
                    <p className="text-sm text-slate-500">Destek almak istediğiniz alanı seçerek dinamik başvuru formunu doldurun.</p>
                </div>

                {/* Category Selector Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
                    {[
                        { id: 'student', label: 'Burs & Staj Talebi', icon: 'fa-graduation-cap' },
                        { id: 'women', label: 'Kadın İstihdam Kooperatifi', icon: 'fa-person-dress' },
                        { id: 'club', label: 'Üniversite Kulüp Bütçesi', icon: 'fa-building-columns' },
                        { id: 'recycle', label: 'Lojistik & Geri Dönüşüm', icon: 'fa-truck-arrow-right' },
                        { id: 'other', label: 'Diğer Başvuru', icon: 'fa-file-lines' },
                    ].map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl transition-all duration-300 border ${
                                activeTab === cat.id 
                                    ? 'bg-white border-teal-500/40 shadow-[0_4px_15px_rgba(20,184,166,0.15)] text-teal-600' 
                                    : 'bg-slate-50 border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                            }`}
                        >
                            <i className={`fa-solid ${cat.icon} text-xl ${activeTab === cat.id ? 'text-teal-500 drop-shadow-sm' : 'text-slate-400'}`}></i>
                            <span className="text-[10px] font-bold text-center leading-tight">{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Dynamic Form Area */}
                <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100">
                    
                    {/* UNIVERSAL CLUB VIEW */}
                    {activeTab === 'club' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in zoom-in-95 duration-200">
                            {[
                                { label: 'Şirket/Kurum Adı', name: 'institution', type: 'text', icon: 'fa-building', placeholder: 'Sponsor veya Kurum Adınız' },
                                { label: 'Ad Soyad', name: 'fullName', type: 'text', icon: 'fa-user', placeholder: 'Yetkili Adı' },
                                { label: 'Kurumsal E-posta', name: 'email', type: 'email', icon: 'fa-envelope', placeholder: 'ornek@kurum.com' },
                                { label: 'Telefon', name: 'phone', type: 'tel', icon: 'fa-phone', placeholder: '+90 (555) 000 00 00' },
                                { label: 'Üniversite Kulüp Adı', name: 'university', type: 'text', icon: 'fa-users', placeholder: 'Örn: İTÜ Çevre Kulübü' },
                                { label: 'Talep Edilen Bütçe (₺)', name: 'budget', type: 'number', icon: 'fa-turkish-lira-sign', placeholder: 'Miktar giriniz' },
                                { label: 'Tahmini Etkinlik/Proje Tarihi', name: 'date', type: 'date', icon: 'fa-calendar', placeholder: '' },
                            ].map((field, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{field.label}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <i className={`fa-solid ${field.icon} text-slate-400`}></i>
                                        </div>
                                        <input 
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            type={field.type} 
                                            placeholder={field.placeholder} 
                                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Proje/Etkinlik Özeti (Max 300 Kelime)</label>
                                <textarea 
                                    name="message"
                                    value={formData.message || ''}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Lütfen kulüp projenizin veya etkinliğinizin iklim/çevre hedeflerini özetleyin..." 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] resize-none"
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {/* STUDENT INTERN VIEW */}
                    {activeTab === 'student' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in zoom-in-95 duration-200">
                            {[
                                { label: 'Ad Soyad', name: 'fullName', type: 'text', icon: 'fa-user', placeholder: 'Örn: Ayşe Yılmaz' },
                                { label: 'Üniversite / Bölüm', name: 'university', type: 'text', icon: 'fa-building-columns', placeholder: 'Örn: Boğaziçi Üniversitesi / Çevre Müh.' },
                                { label: 'Gmail / E-posta', name: 'email', type: 'email', icon: 'fa-envelope', placeholder: 'ornek@gmail.com' },
                                { label: 'Telefon', name: 'phone', type: 'tel', icon: 'fa-phone', placeholder: '+90 (555) 000 00 00' },
                            ].map((field, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{field.label}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <i className={`fa-solid ${field.icon} text-slate-400`}></i>
                                        </div>
                                        <input 
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            type={field.type} 
                                            placeholder={field.placeholder} 
                                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Transkript Yükle (.pdf)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-file-pdf text-slate-400"></i>
                                    </div>
                                    <input 
                                        type="file" 
                                        className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* WOMEN EMPLOYMENT VIEW */}
                    {activeTab === 'women' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in zoom-in-95 duration-200">
                            {[
                                { label: 'Ad Soyad / Kooperatif Adı', name: 'fullName', type: 'text', icon: 'fa-user', placeholder: 'Talep Eden Kişi/Kurum' },
                                { label: 'İletişim & Gmail', name: 'email', type: 'text', icon: 'fa-envelope', placeholder: 'Tel / E-posta' },
                            ].map((field, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{field.label}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <i className={`fa-solid ${field.icon} text-slate-400`}></i>
                                        </div>
                                        <input 
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            type={field.type} 
                                            placeholder={field.placeholder} 
                                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">İstihdam Yeri</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-location-dot text-slate-400"></i>
                                    </div>
                                    <select 
                                        name="location"
                                        value={formData.location || ''}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] appearance-none cursor-pointer">
                                        <option value="" disabled>Bölge/Sera Seçiniz</option>
                                        <option value="marmara">Marmara - Bandırma Serası</option>
                                        <option value="ege">Ege - İzmir Kadın Kooperatifi</option>
                                        <option value="akdeniz">Akdeniz - Antalya Serası</option>
                                        <option value="cukurova">Çukurova - Adana Kadın İstihdamı</option>
                                        <option value="ic_anadolu">İç Anadolu - Konya Tarım Kooperatifi</option>
                                        <option value="karadeniz">Karadeniz - Fındık/Çay Kooperatifleri</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Uzmanlık Alanı</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-seedling text-slate-400"></i>
                                    </div>
                                    <select 
                                        name="specialization"
                                        value={formData.specialization || ''}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] appearance-none cursor-pointer">
                                        <option value="" disabled>Pozisyon Seçiniz</option>
                                        <option value="Organik Tarım Üreticisi">Organik Tarım Üreticisi</option>
                                        <option value="Geri Dönüştürülmüş Gübre Uzmanı">Geri Dönüştürülmüş Gübre Uzmanı</option>
                                        <option value="Paketleme & Lojistik">Paketleme & Lojistik</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RECYCLE/LOGISTICS VIEW */}
                    {activeTab === 'recycle' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in zoom-in-95 duration-200">
                            {[
                                { label: 'Tesis Bilgileri', name: 'institution', type: 'text', icon: 'fa-industry', placeholder: 'Kayıtlı Kurum/Tesis Adı' },
                                { label: 'İletişim / Gmail', name: 'email', type: 'text', icon: 'fa-envelope', placeholder: 'Tel / E-posta' },
                                { label: 'Miktar (Ton)', name: 'amount', type: 'number', icon: 'fa-scale-balanced', placeholder: 'Beklenen Toplam Miktar' },
                            ].map((field, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{field.label}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <i className={`fa-solid ${field.icon} text-slate-400`}></i>
                                        </div>
                                        <input 
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            type={field.type} 
                                            placeholder={field.placeholder} 
                                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Atık / Kategori</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-recycle text-slate-400"></i>
                                    </div>
                                    <select 
                                        name="specialization"
                                        value={formData.specialization || ''}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] appearance-none cursor-pointer">
                                        <option value="" disabled>Atık Türü Seçiniz</option>
                                        <option value="Organik / Tarımsal Atık">Organik / Tarımsal Atık</option>
                                        <option value="Endüstriyel Isı/Su">Endüstriyel Isı/Su</option>
                                        <option value="Geri Dönüştürülebilir Plastik/Metal">Geri Dönüştürülebilir Plastik/Metal</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* OTHER APPLICATION VIEW */}
                    {activeTab === 'other' && (
                        <div className="animate-in fade-in zoom-in-95 duration-200 text-center py-6 text-slate-500">
                            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <i className="fa-solid fa-envelope-open-text text-2xl text-slate-400"></i>
                            </div>
                            <p className="font-medium text-sm">Farklı bir konuda şeffaf başvuru yapmak için lütfen bizimle genel e-posta üzerinden iletişime geçin.</p>
                            <a href="#" className="inline-block mt-3 text-teal-600 font-bold text-xs hover:underline">selamikolcu52@gmail.com</a>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-center flex-col items-center gap-3">
                        {statusIndicator === 'success' && <p className="text-sm text-emerald-600 font-bold">Talebiniz başarıyla alındı!</p>}
                        {statusIndicator === 'error' && <p className="text-sm text-rose-500 font-bold">Bir hata oluştu, lütfen zorunlu alanları doldurun.</p>}
                        
                        <button 
                            onClick={handleSubmit}
                            disabled={statusIndicator === 'loading'}
                            className="w-full md:w-2/3 lg:w-1/2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-sm py-4 px-8 rounded-xl shadow-[0_4px_15px_rgba(30,41,59,0.3)] hover:shadow-[0_6px_20px_rgba(30,41,59,0.4)] transition-all flex items-center justify-center gap-3">
                            <span>{statusIndicator === 'loading' ? 'Gönderiliyor...' : 'Talebi İncelemeye Gönder'}</span>
                            <i className={`fa-solid ${statusIndicator === 'loading' ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-[11px]`}></i>
                        </button>
                    </div>

                </div>
            </div>

            {/* Goodwill Agreements Footer */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_5px_rgba(0,0,0,0.02)] flex items-center justify-center gap-4 mt-6">
                <i className="fa-solid fa-ribbon text-teal-500 text-3xl"></i>
                <div>
                    <h4 className="text-sm font-bold text-teal-600 mb-0.5">✅ 12 Goodwill Agreements Signed</h4>
                    <p className="text-[11px] text-slate-500 font-medium tracking-wide">All participating greenhouses commit to local hiring and fair wages.</p>
                </div>
            </div>
        </div>
    );
}
