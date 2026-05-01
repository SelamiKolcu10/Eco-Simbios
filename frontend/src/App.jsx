import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/shared/PrivateRoute';
import AxiosInterceptorSetup from './components/shared/AxiosInterceptorSetup';
import AdminDashboard from './pages/AdminDashboard';

import { Toaster } from 'react-hot-toast';
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

function AppLayout() {
    const { isLoggedIn, loading, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('eco-simbios-favorites');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const [kpiBonus, setKpiBonus]   = useState({ earnings: 0, carbon: 0 });
    const [matchedIds, setMatchedIds] = useState(new Set());
    const [hasProfile, setHasProfile] = useState(false);
    const [pendingMatch, setPendingMatch] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // activeSection is derived from pathname for backwards compatibility in TopNavbar
    const activeSection = location.pathname.substring(1) || 'dashboard';

    useEffect(() => {
        localStorage.setItem('eco-simbios-favorites', JSON.stringify([...favorites]));
    }, [favorites]);

    useEffect(() => {
        if (isLoggedIn) {
            setHasProfile(true);
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        logout();
        navigate('/');
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

    // Helper for old onNavigate callbacks
    const handleNavigate = (path) => {
        if (path === 'dashboard') navigate('/');
        else navigate(`/${path}`);
    };

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

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#F8F9FA] font-sans text-foreground">
            {/* Global 401 interceptor — auto-logout on expired/invalid JWT */}
            <AxiosInterceptorSetup />
            {/* Toast notification system */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3500,
                    style: {
                        fontFamily: 'inherit',
                        fontSize: '13px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                        padding: '12px 16px',
                    },
                    success: {
                        iconTheme: { primary: '#059669', secondary: '#fff' },
                        style: { background: '#f0fdf4', color: '#14532d', border: '1px solid #bbf7d0' },
                    },
                    error: {
                        iconTheme: { primary: '#dc2626', secondary: '#fff' },
                        style: { background: '#fef2f2', color: '#7f1d1d', border: '1px solid #fecaca' },
                        duration: 5000,
                    },
                    loading: {
                        style: { background: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0' },
                    },
                }}
            />
            {/* Profile slide-over panel removed - replaced by full page /admin */}
            <TopNavbar
                activeSection={activeSection}
                setActiveSection={handleNavigate}
                onLogout={handleLogout}
            />
            <DashboardContent activeSection={activeSection}>
                <Routes>
                    <Route path="/" element={<Dashboard kpiBonus={kpiBonus} onNavigate={handleNavigate} />} />
                    <Route path="/discovery" element={<DiscoveryPage onNavigate={handleNavigate} />} />
                    <Route path="/map" element={<StrategicDashboard />} />
                    <Route path="/social" element={<SocialImpact />} />
                    <Route path="/market" element={
                        <Market
                            onMatch={handleMatch}
                            matchedIds={matchedIds}
                            hasProfile={hasProfile}
                            onNavigate={handleNavigate}
                            pendingMatch={pendingMatch}
                            setPendingMatch={setPendingMatch}
                            favorites={favorites}
                            onToggleFavorite={toggleFavorite}
                        />
                    } />
                    <Route path="/matchmaking" element={
                        <MatchmakingEngine onRegister={() => setHasProfile(true)} onNavigate={handleNavigate} />
                    } />
                    <Route path="/login" element={<Login onNavigate={handleNavigate} onSwitchToRegister={() => navigate('/register')} />} />
                    <Route path="/register" element={<Register initialData={null} onNavigate={handleNavigate} onSwitchToLogin={() => navigate('/login')} />} />
                    <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </DashboardContent>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppLayout />
        </BrowserRouter>
    );
}
