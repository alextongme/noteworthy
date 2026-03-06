import { apiFetch } from './apiHelper';

export const fetchNotebooks = () =>
    apiFetch('/api/notebooks');

export const fetchNotebook = (notebookId) =>
    apiFetch(`/api/notebooks/${notebookId}`);

export const createNotebook = (notebook) =>
    apiFetch('/api/notebooks', {
        method: 'POST',
        body: JSON.stringify({ notebook }),
    });

export const updateDefaultNotebook = (default_notebook_id) =>
    apiFetch('/api/user', {
        method: 'PATCH',
        body: JSON.stringify({ default_notebook_id }),
    });

export const updateNotebook = (notebook) =>
    apiFetch(`/api/notebooks/${notebook.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ notebook }),
    });

export const deleteNotebook = (notebookId) =>
    apiFetch(`/api/notebooks/${notebookId}`, { method: 'DELETE' });
