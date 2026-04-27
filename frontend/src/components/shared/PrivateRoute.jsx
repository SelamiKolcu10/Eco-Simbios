import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * PrivateRoute
 *
 * Wraps any route that requires authentication.
 * - While the session is being restored (loading), shows a full-screen spinner
 *   so we never flash the login page to a user who is actually logged in.
 * - If the user is not authenticated after loading completes, redirects to /login
 *   and stores the attempted path so we can redirect back after login.
 * - If the user is authenticated, renders the children normally.
 */
const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    // ── Still restoring session from localStorage ────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="flex flex-col items-center gap-3 text-slate-500">
                    <svg
                        className="animate-spin w-8 h-8 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-label="Yükleniyor"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                        />
                    </svg>
                    <span className="text-sm font-medium">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    // ── Not logged in — redirect to /login ───────────────────────────────────
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // ── Authenticated — render the protected content ─────────────────────────
    return children;
};

export default PrivateRoute;
