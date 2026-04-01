import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
// AuthContext
//
// In Eco-Simbios, the "user" IS the "facility" — this is a B2B platform.
// Every auth operation works against the /api/auth endpoints which
// use the Facility model on the backend.
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/auth';

export const AuthContext = createContext(null);

// ─── Custom hook for easy consumption ───────────────────────────────────────
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};

// ─── Provider ────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
    const [facility, setFacility] = useState(null);   // the logged-in facility/company
    const [token, setToken]       = useState(null);
    const [loading, setLoading]   = useState(true);   // true while we restore session

    // ── On mount: restore token from localStorage and fetch /me ─────────────
    useEffect(() => {
        const restoreSession = async () => {
            const stored = localStorage.getItem('eco_token');
            if (!stored) {
                setLoading(false);
                return;
            }
            try {
                setToken(stored);
                const res = await axios.get(`${API_BASE}/me`, {
                    headers: { Authorization: `Bearer ${stored}` },
                });
                setFacility(res.data.facility);
            } catch {
                // token expired or invalid — clear it
                localStorage.removeItem('eco_token');
                setToken(null);
                setFacility(null);
            } finally {
                setLoading(false);
            }
        };
        restoreSession();
    }, []);

    // ── Register a new facility ──────────────────────────────────────────────
    const register = async ({ name, email, password, type, region, sector }) => {
        const res = await axios.post(`${API_BASE}/register`, {
            name, email, password, type, region, sector,
        });
        const { token: newToken, facility: newFacility } = res.data;
        localStorage.setItem('eco_token', newToken);
        setToken(newToken);
        setFacility(newFacility);
        return newFacility;
    };

    // ── Login an existing facility ───────────────────────────────────────────
    const login = async ({ email, password }) => {
        const res = await axios.post(`${API_BASE}/login`, { email, password });
        const { token: newToken, facility: newFacility } = res.data;
        localStorage.setItem('eco_token', newToken);
        setToken(newToken);
        setFacility(newFacility);
        return newFacility;
    };

    // ── Logout ───────────────────────────────────────────────────────────────
    const logout = () => {
        localStorage.removeItem('eco_token');
        setToken(null);
        setFacility(null);
    };

    // ── Derived state ────────────────────────────────────────────────────────
    const isLoggedIn = !!token && !!facility;

    // ── Axios helper with auth header pre-attached ───────────────────────────
    const authAxios = axios.create({
        headers: { Authorization: token ? `Bearer ${token}` : '' },
    });

    return (
        <AuthContext.Provider
            value={{
                facility,       // the logged-in Facility object
                token,
                isLoggedIn,
                loading,
                login,
                register,
                logout,
                authAxios,      // pre-configured axios for protected calls
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
