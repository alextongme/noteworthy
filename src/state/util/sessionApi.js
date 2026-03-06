import { apiFetch } from './apiHelper';

export const signup = (user) =>
    apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email: user.email, username: user.username || user.email, password: user.password }),
    });

export const login = (user) =>
    apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: user.email, password: user.password }),
    });

export const logout = () =>
    apiFetch('/api/auth/logout', { method: 'POST' });

export const checkSession = () =>
    apiFetch('/api/auth/session');

export const lookForUser = (email) =>
    apiFetch(`/api/auth/lookForUser?email=${encodeURIComponent(email)}`);
