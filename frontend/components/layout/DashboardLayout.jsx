import React from 'react';
import {
    LayoutDashboard,
    Leaf,
    Recycle,
    Users,
    Map,
    ShieldAlert,
    Settings,
    Search,
    Bell,
    LogOut
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, text, active, onClick, badge }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full p-3 my-1 rounded-xl transition-all duration-200 group ${active
                ? 'bg-emerald-50 text-emerald-600 font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-emerald-600'
            }`}
    >
        <Icon size={20} className={`mr-3 ${active ? 'text-emerald-600' : 'text-gray-400 group-hover:text-emerald-600'}`} />
        <span className="text-sm">{text}</span>
        {badge && <span className="ml-2 text-[9px] font-bold bg-amber-500/20 text-amber-600 px-1.5 py-0.5 rounded">{badge}</span>}
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />}
    </button>
);

const DashboardLayout = ({ children, activeSection, onNavigate, onLogout }) => {

    const getPageTitle = (id) => {
        switch (id) {
            case 'dashboard': return 'Genel Bakış';
            case 'market': return 'Simbiyoz Pazarı';
            case 'map': return 'Canlı Harita';
            case 'social': return 'Sosyal Etki';
            case 'carbon': return 'Karbon Defteri';
            case 'settings': return 'Ayarlar';
            default: return 'Genel Bakış';
        }
    };

    const getPageSubtitle = (id) => {
        switch (id) {
            case 'dashboard': return 'Bugünün verileri ve karbon analizleri';
            case 'market': return 'Endüstriyel atık eşleştirmeleri';
            case 'map': return 'Tesisler arası lojistik ağ';
            case 'social': return 'Yeşil istihdam ve yerel etkiler';
            case 'carbon': return 'ESG ve yeşil mutabakat uyumu';
            case 'settings': return 'Platform tercihleri';
            default: return 'Sistem Özeti';
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-slate-800">

            {/* ─── SIDEBAR (SOL MENÜ) ─── */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 shrink-0">
                <div className="h-20 flex items-center px-8 border-b border-gray-50 shrink-0">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white mr-3 shadow-lg shadow-emerald-200">
                        <Leaf size={18} fill="currentColor" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">
                        Eco<span className="text-emerald-500">Symbiosis</span>
                    </span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">Ana Modüller</div>
                    <SidebarItem
                        icon={LayoutDashboard}
                        text="Dashboard"
                        active={activeSection === 'dashboard'}
                        onClick={() => onNavigate('dashboard')}
                    />
                    <SidebarItem
                        icon={Recycle}
                        text="Simbiyoz Pazarı"
                        active={activeSection === 'market'}
                        onClick={() => onNavigate('market')}
                        badge="NEW"
                    />
                    <SidebarItem
                        icon={Map}
                        text="Canlı Harita"
                        active={activeSection === 'map'}
                        onClick={() => onNavigate('map')}
                    />
                    <SidebarItem
                        icon={Users}
                        text="Sosyal Etki"
                        active={activeSection === 'social'}
                        onClick={() => onNavigate('social')}
                    />
                    <SidebarItem
                        icon={ShieldAlert}
                        text="Karbon Defteri"
                        active={activeSection === 'carbon'}
                        onClick={() => onNavigate('carbon')}
                    />

                    <div className="mt-6 mb-4 px-3">
                        <div className="h-px bg-gray-100 w-full"></div>
                    </div>

                    <SidebarItem
                        icon={Settings}
                        text="Ayarlar"
                        active={activeSection === 'settings'}
                        onClick={() => onNavigate('settings')}
                    />
                </nav>

                {/* User & System Health */}
                <div className="p-4 border-t border-gray-50">
                    <div className="bg-emerald-50/50 rounded-xl p-3 mb-3 border border-emerald-100/50">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[11px] text-emerald-700 font-semibold uppercase tracking-wider">All Systems Online</span>
                        </div>
                        <div className="h-1 bg-emerald-100 rounded-full overflow-hidden">
                            <div className="h-full w-[97%] bg-emerald-500 rounded-full"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center">
                            <img
                                src="https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff"
                                alt="Profile"
                                className="w-9 h-9 rounded-full shadow-sm"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-semibold text-slate-800 leading-tight">Admin Kullanıcı</p>
                                <p className="text-xs text-gray-400">Yönetici Paneli</p>
                            </div>
                        </div>

                        <button
                            onClick={onLogout}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Çıkış Yap"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* ─── MAIN AREA (ORTA ALAN) ─── */}
            <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">

                {/* HEADER */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-8 z-10 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">{getPageTitle(activeSection)}</h1>
                        <p className="text-sm text-gray-500">{getPageSubtitle(activeSection)}</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Sync: <span className="text-slate-600 font-mono">Just now</span>
                        </div>

                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Verilerde ara..."
                                className="pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
                            />
                        </div>

                        <button className="relative p-2.5 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-emerald-600 hover:border-emerald-200 transition-all hover:shadow-md hover:shadow-emerald-100">
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            <Bell size={20} />
                        </button>
                    </div>
                </header>

                {/* SCROLLABLE CONTENT */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
