import React from 'react';
import { Leaf, LogOut } from 'lucide-react';

export function TopNavbar({ activeSection, setActiveSection }) {
    const navItems = [
        { id: 'dashboard', label: 'Endüstriyel Simbiyoz' },
        { id: 'market', label: 'Simbiyoz Pazarı' },
        { id: 'map', label: 'Canlı Harita' },
        { id: 'social', label: 'Sosyal Etki' },
        { id: 'carbon', label: 'Karbon Defteri' },
        { id: 'settings', label: 'Saha' }
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
            <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto w-full justify-between">
                
                {/* Logo Area */}
                <div className="flex items-center gap-2 mr-8">
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

                {/* Right Actions */}
                <div className="flex items-center gap-4 ml-8">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors text-foreground">
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">Çıkış Yap</span>
                    </button>
                </div>
                
            </div>
        </header>
    );
}
