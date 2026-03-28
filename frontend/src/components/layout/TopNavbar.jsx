import React from 'react';
import { Leaf, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function TopNavbar({ activeSection, setActiveSection, onLogout }) {
    const { isLoggedIn, facility } = useAuth();

    const navItems = [
        { id: 'dashboard', label: 'Endüstriyel Simbiyoz' },
        { id: 'market', label: 'Simbiyoz Pazarı' },
        { id: 'matchmaking', label: 'Eşleştirme Motoru' },
        { id: 'map', label: 'Stratejik Harita' },
        { id: 'social', label: 'Sosyal Etki' }
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
            <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto w-full justify-between">
                
                {/* Logo Area */}
                <div 
                    onClick={() => setActiveSection('dashboard')}
                    className="flex items-center gap-2 mr-8 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006A4E] text-white">
                        <Leaf className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        Eko-<span className="text-[#006A4E]">Simbiyoz</span>
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`text-sm font-medium transition-colors hover:text-[#006A4E] ${
                                activeSection === item.id 
                                ? 'text-[#006A4E] font-semibold' 
                                : 'text-muted-foreground'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Right Actions Slot */}
                <div className="flex items-center justify-end gap-3 ml-8 min-w-[200px]">
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-sm font-semibold border border-emerald-100/50">
                                <User className="h-4 w-4 text-emerald-600" />
                                <span className="max-w-[120px] truncate">{facility?.name || 'Profilim'}</span>
                            </div>
                            <button
                                onClick={onLogout}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Çıkış Yap"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setActiveSection('login')}
                            className="bg-[#006A4E] hover:bg-[#00523b] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95"
                        >
                            Giriş Yap
                        </button>
                    )}
                </div>
                
            </div>
        </header>
    );
}
