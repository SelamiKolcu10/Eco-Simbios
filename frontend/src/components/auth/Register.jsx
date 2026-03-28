import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// ─── Reusable field ──────────────────────────────────────────────────────────
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

// ─── Select field ────────────────────────────────────────────────────────────
function SelectField({ label, id, value, onChange, options, required }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className="input-cyber w-full px-4 py-2.5 text-sm bg-white cursor-pointer"
            >
                <option value="" disabled>Seçiniz...</option>
                {options.map(({ value: v, label: l }) => (
                    <option key={v} value={v}>{l}</option>
                ))}
            </select>
        </div>
    );
}

const TYPE_OPTIONS = [
    { value: 'Factory',     label: '🏭 Fabrika (Factory)' },
    { value: 'Greenhouse',  label: '🌿 Sera (Greenhouse)' },
    { value: 'Cooperative', label: '🤝 Kooperatif (Cooperative)' },
];

const REGION_OPTIONS = [
    { value: 'Marmara',      label: 'Marmara' },
    { value: 'Ege',          label: 'Ege' },
    { value: 'İç Anadolu',   label: 'İç Anadolu' },
    { value: 'Akdeniz',      label: 'Akdeniz' },
    { value: 'Karadeniz',    label: 'Karadeniz' },
];

// ─── Progress step indicator ─────────────────────────────────────────────────
function StepDots({ steps, current }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            i <= current ? 'bg-emerald-500 scale-110' : 'bg-slate-200'
                        }`}
                    />
                    {i < steps.length - 1 && (
                        <div className={`h-px w-8 transition-all ${i < current ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── Register Page ────────────────────────────────────────────────────────────
export default function Register({ onNavigate, onSwitchToLogin, initialData }) {
    const { register } = useAuth();

    const [step, setStep]       = useState(0); // 0 = identity, 1 = facility info
    const [form, setForm]       = useState({
        name: initialData?.name || '', 
        email: initialData?.email || '', 
        password: '', 
        confirmPassword: '',
        type: '', 
        region: '', 
        sector: initialData?.sector || '',
    });
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);

    const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

    // ── Step 0 → 1 validation ───────────────────────────────────────────────
    const handleNext = (e) => {
        e.preventDefault();
        setError('');
        if (form.password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }
        setStep(1);
    };

    // ── Final submit ────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.type || !form.region) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }
        setLoading(true);
        try {
            await register({
                name:     form.name,
                email:    form.email,
                password: form.password,
                type:     form.type,
                region:   form.region,
                sector:   form.sector,
            });
            onNavigate('map'); // ← redirect to StrategicDashboard
        } catch (err) {
            setError(err?.response?.data?.message || 'Kayıt oluşturulamadı. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-4 py-10">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Tesis Kaydı Oluştur</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {step === 0 ? 'Hesap bilgilerini gir' : 'Tesisin hakkında bize anlat'}
                    </p>
                </div>

                {/* Step indicator */}
                <StepDots steps={['Hesap', 'Tesis']} current={step} />

                {/* Form Card */}
                <div className="carbon-card p-8">

                    {/* ── STEP 0: Email + Password ── */}
                    {step === 0 && (
                        <form onSubmit={handleNext} className="flex flex-col gap-5">
                            <Field
                                label="Tesis / Şirket Adı"
                                id="reg-name"
                                value={form.name}
                                onChange={set('name')}
                                placeholder="Marmara Plastik A.Ş."
                                required
                            />
                            <Field
                                label="E-posta Adresi"
                                id="reg-email"
                                type="email"
                                value={form.email}
                                onChange={set('email')}
                                placeholder="tesis@sirket.com"
                                required
                            />
                            <Field
                                label="Şifre"
                                id="reg-password"
                                type="password"
                                value={form.password}
                                onChange={set('password')}
                                placeholder="En az 6 karakter"
                                required
                            />
                            <Field
                                label="Şifre Tekrar"
                                id="reg-confirm"
                                type="password"
                                value={form.confirmPassword}
                                onChange={set('confirmPassword')}
                                placeholder="Şifreyi tekrar gir"
                                required
                            />

                            {error && (
                                <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn-cyber w-full py-2.5 text-sm mt-1"
                            >
                                Devam Et →
                            </button>
                        </form>
                    )}

                    {/* ── STEP 1: Facility Info ── */}
                    {step === 1 && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <SelectField
                                label="Tesis Tipi"
                                id="reg-type"
                                value={form.type}
                                onChange={set('type')}
                                options={TYPE_OPTIONS}
                                required
                            />
                            <SelectField
                                label="Bölge"
                                id="reg-region"
                                value={form.region}
                                onChange={set('region')}
                                options={REGION_OPTIONS}
                                required
                            />
                            <Field
                                label="Sektör (opsiyonel)"
                                id="reg-sector"
                                value={form.sector}
                                onChange={set('sector')}
                                placeholder="ör. Tekstil, Tarım, Kimya..."
                            />

                            {error && (
                                <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3 mt-1">
                                <button
                                    type="button"
                                    onClick={() => { setStep(0); setError(''); }}
                                    className="flex-1 py-2.5 text-sm border border-slate-300 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition"
                                >
                                    ← Geri
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 btn-cyber py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                                            </svg>
                                            Kaydediliyor...
                                        </>
                                    ) : (
                                        'Hesap Oluştur ✓'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Switch to Login */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Zaten hesabın var mı?{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-emerald-600 font-semibold hover:underline"
                        >
                            Giriş yap →
                        </button>
                    </p>
                </div>

                <p className="text-center text-xs text-slate-400 mt-5">
                    🌱 Eco-Simbios — Döngüsel Ekonomi Platformu
                </p>
            </div>
        </div>
    );
}
