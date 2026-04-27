import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

/**
 * AxiosInterceptorSetup
 *
 * A renderless component that lives INSIDE BrowserRouter + AuthProvider.
 * It registers a global Axios response interceptor so that ANY 401 response
 * from the backend (expired or invalid JWT) automatically:
 *   1. Calls logout() — clears token & facility from state + localStorage
 *   2. Navigates the user to /login with a descriptive message in state
 *
 * We use a ref to track the interceptor ID so we can eject it on unmount,
 * preventing memory leaks if the component ever unmounts.
 *
 * Usage: place <AxiosInterceptorSetup /> once, near the top of the component
 * tree but inside BrowserRouter and AuthProvider.
 */
const AxiosInterceptorSetup = () => {
    const { logout, token } = useAuth();
    const navigate = useNavigate();

    // Keep a stable ref to the current logout & navigate so the interceptor
    // closure always calls the latest version without needing to re-register.
    const logoutRef  = useRef(logout);
    const navigateRef = useRef(navigate);

    useEffect(() => { logoutRef.current  = logout;   }, [logout]);
    useEffect(() => { navigateRef.current = navigate; }, [navigate]);

    useEffect(() => {
        // ── Register global 401 interceptor ──────────────────────────────────
        const interceptorId = axios.interceptors.response.use(
            // Pass successful responses through unchanged
            (response) => response,

            // Handle errors
            (error) => {
                const status = error.response?.status;
                const requestUrl = error.config?.url ?? '';

                // Only auto-logout on 401 from our own API.
                // Exclude the /api/auth/login and /api/auth/register endpoints
                // so that wrong-password errors are NOT treated as session expiry.
                const isAuthEndpoint =
                    requestUrl.includes('/api/auth/login') ||
                    requestUrl.includes('/api/auth/register');

                if (status === 401 && !isAuthEndpoint) {
                    // Clear session
                    logoutRef.current();

                    // Navigate to login, passing a message for the login form to display
                    navigateRef.current('/login', {
                        replace: true,
                        state: {
                            sessionExpired: true,
                            message: 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
                        },
                    });
                }

                // Always reject so individual catch blocks still work
                return Promise.reject(error);
            }
        );

        // ── Cleanup: eject interceptor on unmount ─────────────────────────────
        return () => {
            axios.interceptors.response.eject(interceptorId);
        };
    }, []); // empty deps — we rely on refs, so this only runs once

    return null; // renderless component
};

export default AxiosInterceptorSetup;
