import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ─── Reusable field component ────────────────────────────────────────────────
function Field({ label, id, type = 'text', value, onChange, placeholder, required }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="input-cyber w-full px-4 py-2.5 text-sm"
            />
        </div>
    );
}

// ─── Login Page ──────────────────────────────────────────────────────────────
export default function Login({ onNavigate, onSwitchToRegister }) {
    const { login } = useAuth();
    const location  = useLocation();

    // Message passed from AxiosInterceptorSetup when a 401 triggers auto-logout
    const sessionMsg = location.state?.sessionExpired ? location.state.message : null;

    const [form, setForm]       = useState({ email: '', password: '' });
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);

    const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login({ email: form.email, password: form.password });
            onNavigate('map'); // ← redirect to StrategicDashboard
        } catch (err) {
            setError(err?.response?.data?.message || 'Giriş yapılamadı. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4">
            {/* Card */}
            <div className="w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Eco-Simbios'a Hoşgeldiniz</h1>
                    <p className="text-sm text-slate-500 mt-1">Tesisine giriş yaparak ekosisteme katıl</p>
                </div>

                {/* Form Card */}
                <div className="carbon-card p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Field
                            label="E-posta Adresi"
                            id="login-email"
                            type="email"
                            value={form.email}
                            onChange={set('email')}
                            placeholder="tesis@sirket.com"
                            required
                        />
                        <Field
                            label="Şifre"
                            id="login-password"
                            type="password"
                            value={form.password}
                            onChange={set('password')}
                            placeholder="••••••••"
                            required
                        />

                        {/* Session expired banner */}
                        {sessionMsg && (
                            <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {sessionMsg}
                            </div>
                        )}

                        {/* Error message */}
                        {error && (
                            <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-cyber w-full py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                                    </svg>
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                'Giriş Yap'
                            )}
                        </button>
                    </form>

                    {/* Switch to Register */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Henüz hesabın yok mu?{' '}
                        <button
                            onClick={onSwitchToRegister}
                            className="text-emerald-600 font-semibold hover:underline"
                        >
                            Tesis kaydı oluştur →
                        </button>
                    </p>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-slate-400 mt-5">
                    🌱 Eco-Simbios — Döngüsel Ekonomi Platformu
                </p>
            </div>
        </div>
    );
}
