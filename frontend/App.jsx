import { useState, useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import LiveMap from './components/map/LiveMap';
import SocialImpact from './components/social/SocialImpact';
import CarbonLedger from './components/carbon/CarbonLedger';
import Settings from './components/settings/Settings';
import Market from './components/market/Market';
import LoginModal from './components/shared/LoginModal';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [kpiBonus, setKpiBonus] = useState({ earnings: 0, carbon: 0 });
    const [matchedIds, setMatchedIds] = useState(new Set());

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
        <DashboardLayout
            activeSection={activeSection}
            onNavigate={setActiveSection}
            onLogout={handleLogout}
        >
            <div className="space-y-6">
                {activeSection === 'dashboard' && <Dashboard kpiBonus={kpiBonus} />}
                {activeSection === 'map' && <LiveMap />}
                {activeSection === 'social' && <SocialImpact />}
                {activeSection === 'carbon' && <CarbonLedger />}
                {activeSection === 'settings' && <Settings />}
                {activeSection === 'market' && <Market onMatch={handleMatch} matchedIds={matchedIds} />}

                <div className="pt-8">
                    <Footer />
                </div>
            </div>
        </DashboardLayout>
    );
}
