import React from 'react';
import { Search, Bell, Lock, Wifi, Settings } from 'lucide-react';

export function DashboardContent({ activeSection, children }) {
    const getPageTitle = (id) => {
        switch (id) {
            case 'dashboard': return 'Genel Bakış';
            case 'market': return 'Simbiyoz Pazarı';
            case 'map': return 'Canlı Harita';
            case 'social': return 'Sosyal Etki';
            case 'carbon': return 'Karbon Defteri';
            case 'settings': return 'Saha & Ayarlar';
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
            case 'settings': return 'Platform tercihleri ve veri sensörleri';
            default: return 'Sistem Özeti';
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-auto bg-background">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
                <div className="flex items-center justify-between px-4 md:px-8 py-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground">{getPageTitle(activeSection)}</h1>
                        <p className="hidden md:block text-sm text-muted-foreground">{getPageSubtitle(activeSection)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>
                            <span className="text-muted-foreground">Senkronizasyon:</span>
                            <span className="font-medium text-foreground">Şu an</span>
                        </div>
                        <div className="relative hidden xl:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Verilerde ara..."
                                className="h-10 w-64 rounded-xl border border-border bg-muted/50 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background"
                            />
                        </div>
                        <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground shadow-sm">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                3
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Container */}
            <div className="p-4 md:p-8 flex-1 flex flex-col">
                <div className="max-w-[1400px] w-full mx-auto flex-1">
                    {children}
                </div>
            </div>

            {/* Status Footer - from new Next.js template */}
            {activeSection === 'dashboard' && (
                <div className="border-t border-border bg-card/60 px-4 md:px-8 py-3 w-full shrink-0">
                    <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-4 md:gap-6 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5 hidden sm:flex">
                            <Lock className="h-3.5 w-3.5" />
                            <span>Şifrelenmiş</span>
                        </div>
                        <div className="flex items-center gap-1.5 hidden sm:flex">
                            <Wifi className="h-3.5 w-3.5" />
                            <span>Bağlı</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Settings className="h-3.5 w-3.5" />
                            <span>SCADA v4.2.1</span>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            <span>Sistem Çalışma Süresi: %99,97</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
