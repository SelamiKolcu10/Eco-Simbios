import { useState, useId } from 'react';

export default function LoginModal({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const emailId = useId();
    const passwordId = useId();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Lütfen e-posta ve şifrenizi girin.');
            return;
        }
        setError('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin({ email });
        }, 800);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-premium-mesh bg-opacity-90">
            <div className="absolute inset-0 bg-premium-overlay z-0"></div>
            <div className="carbon-card p-10 max-w-[400px] w-full shadow-2xl login-modal-enter relative z-10" style={{ borderBottomColor: 'rgba(45, 212, 191, 0.4)' }}>
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-eco-500/10 flex items-center justify-center mb-4" style={{ border: '1px solid rgba(0,220,130,0.15)' }}>
                        <i className="fa-solid fa-seedling text-eco-400 text-2xl"></i>
                    </div>
                    <h1 className="text-xl font-black text-slate-800">Eco-Symbiosis</h1>
                    <p className="text-xs text-slate-500 mt-1">Circular Economy Platform v3.0</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor={emailId} className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                            E-Posta
                        </label>
                        <input
                            id={emailId}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="ornek@firma.com"
                            className="w-full px-3 py-2.5 rounded-lg text-slate-800 text-sm placeholder-slate-400 outline-none transition-all"
                            style={{
                                background: 'white',
                                border: `1px solid ${focusedField === 'email' ? 'rgba(0,220,130,0.6)' : 'rgba(0,0,0,0.1)'}`,
                            }}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                        />
                    </div>
                    <div>
                        <label htmlFor={passwordId} className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                            Şifre
                        </label>
                        <input
                            id={passwordId}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3 py-2.5 rounded-lg text-slate-800 text-sm placeholder-slate-400 outline-none transition-all"
                            style={{
                                background: 'white',
                                border: `1px solid ${focusedField === 'password' ? 'rgba(0,220,130,0.6)' : 'rgba(0,0,0,0.1)'}`,
                            }}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                        />
                    </div>
                    {error && (
                        <p className="text-xs text-red-400 flex items-center gap-1.5">
                            <i className="fa-solid fa-circle-exclamation text-[10px]"></i>{error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-cyber w-full py-2.5 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 mt-2"
                    >
                        {loading
                            ? <><i className="fa-solid fa-spinner fa-spin text-sm"></i> Giriş yapılıyor...</>
                            : <><i className="fa-solid fa-right-to-bracket"></i> Giriş Yap</>
                        }
                    </button>
                </form>

                <p className="text-[10px] text-slate-400 text-center mt-6">
                    Demo sistemi — herhangi bir e-posta ve şifre ile giriş yapabilirsiniz.
                </p>
            </div>
        </div>
    );
}
