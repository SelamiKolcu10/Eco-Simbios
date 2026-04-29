// ─────────────────────────────────────────────────────────────────────────────
// Centralized API Client — Eco-Simbios
//
// Tüm HTTP isteklerini tek merkezden yönetir.
// • Base URL: otomatik (VITE_API_URL veya localhost fallback)
// • Auth Token: her istekte otomatik eklenir
// • Error Handling: 401'de otomatik logout + redirect
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

/**
 * localStorage'dan JWT token'ı alıp Authorization header'ı döner.
 */
function authHeaders(extra = {}) {
    const token = localStorage.getItem('eco_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...extra,
    };
}

/**
 * Yanıtı parse eder; hatalı durumlarda anlamlı bir Error fırlatır.
 * 401 → kullanıcıyı otomatik olarak logout eder.
 */
async function handleResponse(res) {
    if (res.status === 401) {
        localStorage.removeItem('eco_token');
        window.location.href = '/login';
        throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
    }

    // Yanıt body'si olmayan başarılı istekler (204 No Content vb.)
    if (res.status === 204) return null;

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const message = data?.message || data?.error || `İstek başarısız (${res.status})`;
        throw new Error(message);
    }

    return data;
}

/**
 * Merkezi API istemcisi.
 *
 * Kullanım:
 *   import api from '@/lib/api';
 *   const data = await api.get('/matches');
 *   await api.post('/social/request', { fullName: '...' });
 */
const api = {
    get: (path) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'GET',
            headers: authHeaders(),
        }).then(handleResponse),

    post: (path, body) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(body),
        }).then(handleResponse),

    put: (path, body) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(body),
        }).then(handleResponse),

    patch: (path, body) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify(body),
        }).then(handleResponse),

    delete: (path) =>
        fetch(`${BASE_URL}${path}`, {
            method: 'DELETE',
            headers: authHeaders(),
        }).then(handleResponse),
};

export default api;
