import { apiFetch } from './apiHelper';

export const fetchNotes = () =>
    apiFetch('/api/notes');

export const fetchNote = (noteId) =>
    apiFetch(`/api/notes/${noteId}`);

export const createNote = (note) =>
    apiFetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ note }),
    });

export const updateNote = (note) =>
    apiFetch(`/api/notes/${note.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ note }),
    });

export const deleteNote = (noteId) =>
    apiFetch(`/api/notes/${noteId}`, { method: 'DELETE' });
