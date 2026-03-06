import { apiFetch } from './apiHelper';

export const fetchTags = () =>
    apiFetch('/api/tags');

export const fetchTag = (tagId) =>
    apiFetch(`/api/tags/${tagId}`);

export const createTag = (tag) =>
    apiFetch('/api/tags', {
        method: 'POST',
        body: JSON.stringify({ tag }),
    });

export const deleteTag = (id) =>
    apiFetch(`/api/tags/${id}`, { method: 'DELETE' });

export const deleteNoteTag = (tag) =>
    apiFetch(`/api/tags/${tag.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ tag }),
    });
