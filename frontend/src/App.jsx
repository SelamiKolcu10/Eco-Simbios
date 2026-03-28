import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';

import { TopNavbar }      from './components/layout/TopNavbar';
import { DashboardContent } from './components/layout/DashboardContent';

import Dashboard         from './components/dashboard/Dashboard';
import DiscoveryPage     from './components/dashboard/DiscoveryPage';
import StrategicDashboard from './components/map/StrategicDashboard';
import SocialImpact      from './components/social/SocialImpact';
import Market            from './components/market/Market';
import MatchmakingEngine from './components/matchmaking/MatchmakingEngine';

// ── Auth screens ─────────────────────────────────────────────────────────────
import Login    from './components/auth/Login';
import Register from './components/auth/Register';

export default function App() {
    const { isLoggedIn, loading, logout } = useAuth();

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('eco-simbios-favorites');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [activeSection, setActiveSectionState] = useState(() => {
        return window.location.hash.replace('#', '') || 'dashboard';
    });
    const [kpiBonus, setKpiBonus]   = useState({ earnings: 0, carbon: 0 });
    const [matchedIds, setMatchedIds] = useState(new Set());
    const [hasProfile, setHasProfile] = useState(false);
    const [pendingMatch, setPendingMatch] = useState(null);

    // 'login' | 'register'  — which auth screen to show when not logged in
    const [authView, setAuthView] = useState('login');
    const [registerData, setRegisterData] = useState(null);

    const setActiveSection = (section, payload = null) => {
        if (section === 'register' && payload) {
            setRegisterData(payload);
        } else if (section !== 'register') {
            setRegisterData(null); // Clear data when navigating away
        }

        setActiveSectionState(section);
        if (window.location.hash !== `#${section}`) {
            window.history.pushState(null, '', `#${section}`);
        }
    };

    useEffect(() => {
        localStorage.setItem('eco-simbios-favorites', JSON.stringify([...favorites]));
    }, [favorites]);

    useEffect(() => {
        const handlePopState = () => {
            const hash = window.location.hash.replace('#', '');
            setActiveSectionState(hash || 'dashboard');
        };
        window.addEventListener('popstate', handlePopState);
        if (!window.location.hash) {
            window.history.replaceState(null, '', '#dashboard');
        }
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleLogout = () => {
        logout();
        setActiveSection('dashboard');
        setKpiBonus({ earnings: 0, carbon: 0 });
        setMatchedIds(new Set());
    };

    const handleMatch = ({ extraEarnings, extraCarbon, itemId }) => {
        setKpiBonus(prev => ({
            earnings: prev.earnings + extraEarnings,
            carbon:   prev.carbon + extraCarbon,
        }));
        setMatchedIds(prev => new Set([...prev, itemId]));
    };

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // ── While restoring session from localStorage ─────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="flex flex-col items-center gap-3 text-slate-500">
                    <svg className="animate-spin w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    <span className="text-sm font-medium">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    // ── Auth gate: show Login or Register ─────────────────────────────────
    if (activeSection === 'login') {
        return (
            <Login
                onNavigate={setActiveSection}
                onSwitchToRegister={() => setActiveSection('register')}
            />
        );
    }

    if (activeSection === 'register') {
        return (
            <Register
                initialData={registerData}
                onNavigate={setActiveSection}
                onSwitchToLogin={() => setActiveSection('login')}
            />
        );
    }

    // ── Main authenticated app ─────────────────────────────────────────────
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#F8F9FA] font-sans text-foreground">
            <TopNavbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onLogout={handleLogout}
            />
            <DashboardContent activeSection={activeSection}>
                <div className="space-y-6">
                    {activeSection === 'dashboard'   && <Dashboard kpiBonus={kpiBonus} onNavigate={setActiveSection} />}
                    {activeSection === 'discovery'   && <DiscoveryPage onNavigate={setActiveSection} />}
                    {activeSection === 'map'         && <StrategicDashboard />}
                    {activeSection === 'social'      && <SocialImpact />}
                    {activeSection === 'market'      && (
                        <Market
                            onMatch={handleMatch}
                            matchedIds={matchedIds}
                            hasProfile={hasProfile}
                            onNavigate={setActiveSection}
                            pendingMatch={pendingMatch}
                            setPendingMatch={setPendingMatch}
                            favorites={favorites}
                            onToggleFavorite={toggleFavorite}
                        />
                    )}
                    {activeSection === 'matchmaking' && <MatchmakingEngine onRegister={() => setHasProfile(true)} onNavigate={setActiveSection} />}
                </div>
            </DashboardContent>
        </div>
    );
}
