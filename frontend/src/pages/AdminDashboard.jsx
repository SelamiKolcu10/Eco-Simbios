import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    User, Lock, Building2, MapPin, Briefcase, Loader2, 
    Activity, Target, Recycle, Leaf, ArrowUpRight, 
    History, Settings, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_AUTH = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/auth';
const API_STATS = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/stats';
const API_MATCHES = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/matches';

// ─── Small reusable field ─────────────────────────────────────────────────────
function Field({ label, id, type = 'text', value, onChange, placeholder, icon: Icon, disabled }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400`}
                />
            </div>
        </div>
    );
}

// ─── Select field ─────────────────────────────────────────────────────────────
function SelectField({ label, id, value, onChange, options, icon: Icon }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                )}
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`w-full appearance-none ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition`}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const { facility, token, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('pano'); // 'pano' | 'history' | 'profile' | 'security'

    // ── Profile form state ───────────────────────────────────────────────────
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        type: 'Factory',
        region: 'Marmara',
        sector: '',
    });
    const [profileLoading, setProfileLoading] = useState(false);

    // ── Password form state ──────────────────────────────────────────────────
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    // ── Stats state ──────────────────────────────────────────────────────────
    const [stats, setStats] = useState({
        activeListingsCount: 0,
        matchedListingsCount: 0,
        totalWasteProcessed: 0,
        totalCarbonSaved: 0
    });
    const [statsLoading, setStatsLoading] = useState(false);

    // ── Match History state ──────────────────────────────────────────────────
    const [matchHistory, setMatchHistory] = useState({ initiated: [], received: [] });
    const [historyLoading, setHistoryLoading] = useState(false);

    // Populate profile form
    useEffect(() => {
        if (facility) {
            setProfile({
                name:   facility.name   || '',
                email:  facility.email  || '',
                type:   facility.type   || 'Factory',
                region: facility.region || 'Marmara',
                sector: facility.sector || '',
            });
        }
    }, [facility]);

    // Fetch Stats
    useEffect(() => {
        const fetchStats = async () => {
            if (!token) return;
            try {
                setStatsLoading(true);
                const res = await axios.get(`${API_STATS}/summary`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success) setStats(res.data.data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    // Fetch Match History
    useEffect(() => {
        const fetchHistory = async () => {
            if (!token || activeTab !== 'history') return;
            try {
                setHistoryLoading(true);
                const res = await axios.get(`${API_MATCHES}/history`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success) setMatchHistory(res.data.data);
            } catch (error) {
                console.error('Failed to fetch match history:', error);
            } finally {
                setHistoryLoading(false);
            }
        };
        fetchHistory();
    }, [token, activeTab]);

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        const toastId = toast.loading('Profil güncelleniyor...');
        try {
            await axios.put(`${API_AUTH}/me`, profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Profil bilgileriniz başarıyla güncellendi.', { id: toastId });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Güncelleme sırasında bir hata oluştu.', { id: toastId });
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error('Yeni şifreler eşleşmiyor.');
            return;
        }
        setPasswordLoading(true);
        const toastId = toast.loading('Şifre güncelleniyor...');
        try {
            await axios.put(
                `${API_AUTH}/me`,
                { currentPassword: passwords.currentPassword, newPassword: passwords.newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Şifreniz başarıyla değiştirildi.', { id: toastId });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Şifre değiştirme başarısız.', { id: toastId });
        } finally {
            setPasswordLoading(false);
        }
    };

    const navItems = [
        { id: 'pano', label: 'Genel Bakış', icon: Activity },
        { id: 'history', label: 'Eşleşme Geçmişi', icon: History },
        { id: 'profile', label: 'Tesis Bilgileri', icon: Building2 },
        { id: 'security', label: 'Şifre ve Güvenlik', icon: Lock },
    ];

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row w-full max-w-7xl mx-auto py-8 px-4 md:px-8 gap-8 animate-in fade-in duration-500">
            
            {/* ── Sidebar ─────────────────────────────────────────────────── */}
            <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
                <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl text-white mb-4 shadow-lg shadow-emerald-900/10">
                    <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-1">Hoş Geldiniz</p>
                    <h2 className="text-lg font-extrabold truncate">{facility?.name || 'Tesis'}</h2>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        Yönetici Hesabı Aktif
                    </div>
                </div>

                <nav className="flex flex-col gap-1">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                activeTab === item.id 
                                ? 'bg-white text-emerald-700 shadow-sm' 
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                            }`}
                        >
                            <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-emerald-600' : ''}`} />
                            {item.label}
                            {activeTab === item.id && <ChevronRight className="ml-auto w-4 h-4 text-emerald-300" />}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* ── Main Content Area ────────────────────────────────────────── */}
            <main className="flex-1 bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 overflow-hidden">
                
                {/* ── Genel Bakış (Pano) ──────────────────────────────────── */}
                {activeTab === 'pano' && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10">
                            <h3 className="text-2xl font-extrabold text-slate-800 font-serif">Genel Bakış</h3>
                            <p className="text-slate-500 text-sm mt-1">Tesisinizin güncel performans ve simbiyoz metrikleri.</p>
                        </div>

                        {statsLoading ? (
                            <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-emerald-500" /></div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-[1.5rem]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl"><Activity className="w-6 h-6"/></div>
                                        <p className="font-bold text-emerald-900">Aktif İlanlarım</p>
                                    </div>
                                    <h4 className="text-5xl font-black text-slate-800">{stats.activeListingsCount}</h4>
                                    <p className="text-xs font-semibold text-emerald-600/80 mt-2">Simbiyoz pazarında bekleyen ilan sayısı.</p>
                                </div>

                                <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-[1.5rem]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-amber-100 text-amber-700 rounded-xl"><Target className="w-6 h-6"/></div>
                                        <p className="font-bold text-amber-900">Başarılı Eşleşme</p>
                                    </div>
                                    <h4 className="text-5xl font-black text-slate-800">{stats.matchedListingsCount}</h4>
                                    <p className="text-xs font-semibold text-amber-600/80 mt-2">Tamamlanan operasyon ve sinerji sayısı.</p>
                                </div>

                                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex flex-col items-center text-center">
                                    <Recycle className="w-8 h-8 text-blue-500 mb-3" />
                                    <h4 className="text-3xl font-black text-slate-800">{stats.totalWasteProcessed} <span className="text-sm text-slate-400 font-bold">Ton</span></h4>
                                    <p className="text-xs font-semibold text-slate-500 mt-1">Dönüştürülen Atık Miktarı</p>
                                </div>

                                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex flex-col items-center text-center">
                                    <Leaf className="w-8 h-8 text-emerald-500 mb-3" />
                                    <h4 className="text-3xl font-black text-slate-800">{stats.totalCarbonSaved} <span className="text-sm text-slate-400 font-bold">Ton</span></h4>
                                    <p className="text-xs font-semibold text-slate-500 mt-1">Toplam CO₂ Tasarrufu</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Eşleşme Geçmişi ───────────────────────────────────────── */}
                {activeTab === 'history' && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10">
                            <h3 className="text-2xl font-extrabold text-slate-800 font-serif">Eşleşme Geçmişi</h3>
                            <p className="text-slate-500 text-sm mt-1">Tesisinizin dahil olduğu tüm simbiyotik takaslar.</p>
                        </div>

                        {historyLoading ? (
                            <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-emerald-500" /></div>
                        ) : (
                            <div className="space-y-10">
                                {/* Received Matches */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Gelen Talepler (İlanlarınıza)</h4>
                                    {matchHistory.received.length === 0 ? (
                                        <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-dashed">Henüz ilanlarınız için bir eşleşme talebi gelmedi.</p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm">
                                                <thead className="text-slate-400 border-b">
                                                    <tr>
                                                        <th className="py-4 font-semibold">Tesis</th>
                                                        <th className="py-4 font-semibold">İlan</th>
                                                        <th className="py-4 font-semibold">Tarih</th>
                                                        <th className="py-4 font-semibold text-right">Durum</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {matchHistory.received.map(m => (
                                                        <tr key={m._id} className="group hover:bg-slate-50/50 transition-colors">
                                                            <td className="py-4">
                                                                <p className="font-bold text-slate-800">{m.fromFacility?.name}</p>
                                                                <p className="text-xs text-slate-400">{m.fromFacility?.type} - {m.fromFacility?.region}</p>
                                                            </td>
                                                            <td className="py-4 font-medium text-slate-600">{m.toListing?.title}</td>
                                                            <td className="py-4 text-slate-500">{formatDate(m.createdAt)}</td>
                                                            <td className="py-4 text-right">
                                                                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase">Tamamlandı</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>

                                {/* Initiated Matches */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Gerçekleştirdiğim Eşleşmeler</h4>
                                    {matchHistory.initiated.length === 0 ? (
                                        <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-dashed">Henüz başka bir ilanla eşleşme sağlamadınız.</p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm">
                                                <thead className="text-slate-400 border-b">
                                                    <tr>
                                                        <th className="py-4 font-semibold">Hedef Tesis</th>
                                                        <th className="py-4 font-semibold">Eşleşilen İlan</th>
                                                        <th className="py-4 font-semibold">Tarih</th>
                                                        <th className="py-4 font-semibold text-right">Durum</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {matchHistory.initiated.map(m => (
                                                        <tr key={m._id} className="group hover:bg-slate-50/50 transition-colors">
                                                            <td className="py-4 font-bold text-slate-800">{m.toListing?.createdBy?.name}</td>
                                                            <td className="py-4 font-medium text-slate-600">{m.toListing?.title}</td>
                                                            <td className="py-4 text-slate-500">{formatDate(m.createdAt)}</td>
                                                            <td className="py-4 text-right">
                                                                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">Sinerji Sağlandı</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tesis Bilgileri ──────────────────────────────────────── */}
                {activeTab === 'profile' && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-xl">
                        <div className="mb-10">
                            <h3 className="text-2xl font-extrabold text-slate-800 font-serif">Tesis Bilgileri</h3>
                            <p className="text-slate-500 text-sm mt-1">Profil bilgileriniz pazar yerinde diğer tesisler tarafından görülür.</p>
                        </div>

                        <form onSubmit={handleProfileSave} className="space-y-6">
                            <Field label="Tesis Adı" id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} icon={Building2} />
                            <Field label="E-posta" id="email" type="email" value={profile.email} disabled icon={User} />
                            <div className="grid grid-cols-2 gap-4">
                                <SelectField label="Tesis Türü" id="type" value={profile.type} onChange={(e) => setProfile({...profile, type: e.target.value})} options={[{value:'Factory', label:'🏭 Fabrika'}, {value:'Greenhouse', label:'🌿 Sera'}, {value:'Cooperative', label:'🤝 Kooperatif'}]} icon={Building2} />
                                <SelectField label="Bölge" id="region" value={profile.region} onChange={(e) => setProfile({...profile, region: e.target.value})} options={[{value:'Marmara', label:'Marmara'}, {value:'Ege', label:'Ege'}, {value:'İç Anadolu', label:'İç Anadolu'}]} icon={MapPin} />
                            </div>
                            <Field label="Sektör" id="sector" value={profile.sector} onChange={(e) => setProfile({...profile, sector: e.target.value})} placeholder="Tekstil, Metal, Gıda..." icon={Briefcase} />
                            
                            <button type="submit" disabled={profileLoading} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2">
                                {profileLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                Değişiklikleri Kaydet
                            </button>
                        </form>
                    </div>
                )}

                {/* ── Şifre ve Güvenlik ────────────────────────────────────── */}
                {activeTab === 'security' && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-xl">
                        <div className="mb-10">
                            <h3 className="text-2xl font-extrabold text-slate-800 font-serif">Şifre ve Güvenlik</h3>
                            <p className="text-slate-500 text-sm mt-1">Hesabınızın güvenliği için düzenli şifre değişimi önerilir.</p>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            <Field label="Mevcut Şifre" id="current" type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})} icon={Lock} />
                            <div className="h-px bg-slate-100 my-2"></div>
                            <Field label="Yeni Şifre" id="new" type="password" value={passwords.newPassword} onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} icon={Lock} />
                            <Field label="Yeni Şifre (Tekrar)" id="confirm" type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} icon={Lock} />
                            
                            <button type="submit" disabled={passwordLoading} className="px-8 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2">
                                {passwordLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                Şifreyi Güncelle
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
