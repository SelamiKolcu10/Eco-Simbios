import { useState, useEffect } from 'react';
import { TopNavbar } from './components/layout/TopNavbar';
import { DashboardContent } from './components/layout/DashboardContent';

import Dashboard from './components/dashboard/Dashboard';
import DiscoveryPage from './components/dashboard/DiscoveryPage';
import LiveMap from './components/map/LiveMap';
import SocialImpact from './components/social/SocialImpact';
import CarbonLedger from './components/carbon/CarbonLedger';
import Settings from './components/settings/Settings';
import Market from './components/market/Market';
import MatchmakingEngine from './components/matchmaking/MatchmakingEngine';
import LoginModal from './components/shared/LoginModal';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeSection, setActiveSectionState] = useState(() => {
        return window.location.hash.replace('#', '') || 'dashboard';
    });
    const [kpiBonus, setKpiBonus] = useState({ earnings: 0, carbon: 0 });
    const [matchedIds, setMatchedIds] = useState(new Set());
    const [hasProfile, setHasProfile] = useState(false);
    const [pendingMatch, setPendingMatch] = useState(null);

    const setActiveSection = (section) => {
        setActiveSectionState(section);
        if (window.location.hash !== `#${section}`) {
            window.history.pushState(null, '', `#${section}`);
        }
    };

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

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setActiveSection('dashboard');
        setKpiBonus({ earnings: 0, carbon: 0 });
        setMatchedIds(new Set());
    };

    const handleMatch = ({ extraEarnings, extraCarbon, itemId }) => {
        setKpiBonus(prev => ({
            earnings: prev.earnings + extraEarnings,
            carbon: prev.carbon + extraCarbon,
        }));
        setMatchedIds(prev => new Set([...prev, itemId]));
    };

    if (!isLoggedIn) {
        return <LoginModal onLogin={handleLogin} />;
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#F8F9FA] font-sans text-foreground">
            <TopNavbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            <DashboardContent activeSection={activeSection}>
                <div className="space-y-6">
                    {activeSection === 'dashboard' && <Dashboard kpiBonus={kpiBonus} onNavigate={setActiveSection} />}
                    {activeSection === 'discovery' && <DiscoveryPage onNavigate={setActiveSection} />}
                    {activeSection === 'map' && <LiveMap />}
                    {activeSection === 'social' && <SocialImpact />}
                    {activeSection === 'carbon' && <CarbonLedger />}
                    {activeSection === 'settings' && <Settings />}
                    {activeSection === 'market' && <Market onMatch={handleMatch} matchedIds={matchedIds} hasProfile={hasProfile} onNavigate={setActiveSection} pendingMatch={pendingMatch} setPendingMatch={setPendingMatch} />}
                    {activeSection === 'matchmaking' && <MatchmakingEngine onRegister={() => setHasProfile(true)} onNavigate={setActiveSection} />}
                </div>
            </DashboardContent>
        </div>
    );
}
