import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Lock, Wifi, Settings } from 'lucide-react';

const mockNotifications = [
    { id: 1, icon: '♻️', text: 'Yeni eşleşme: Bandırma Gübre Fabrikası', time: '2 dk önce' },
    { id: 2, icon: '🎉', text: "Borusan Eco-Simbiyoz'a hoş geldiniz!", time: '1 saat önce' },
    { id: 3, icon: '📊', text: 'Haftalık karbon raporu hazır', time: '3 saat önce' },
];

export function DashboardContent({ activeSection, children }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef(null);
    const scrollRef = useRef(null);
    const scrollPositions = useRef({});

    useEffect(() => {
        function handleClickOutside(e) {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Restore scroll position when active section changes
    useEffect(() => {
        if (scrollRef.current) {
            const savedScroll = scrollPositions.current[activeSection] || 0;
            scrollRef.current.scrollTo({ top: savedScroll, behavior: 'instant' });
        }
    }, [activeSection]);

    const handleScroll = (e) => {
        scrollPositions.current[activeSection] = e.target.scrollTop;
    };

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
        <div ref={scrollRef} onScroll={handleScroll} className="flex-1 flex flex-col overflow-auto bg-background">
            {/* Content Container */}
            <div className="p-4 md:p-8 flex-1 flex flex-col bg-[#F8F9FA]">
                <div className="max-w-7xl w-full mx-auto flex-1">
                    {children}
                </div>
            </div>

        </div>
    );
}
