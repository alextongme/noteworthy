import * as APIUtil from '../util/noteApi';

export const RECEIVE_NOTE = "RECEIVE_NOTE";
export const RECEIVE_NOTES = "RECEIVE_NOTES";
export const REMOVE_NOTE = "REMOVE_NOTE";

export const receiveNote = (note) => {
    return {
        type: RECEIVE_NOTE,
        note
    }
};

export const receiveNotes = (notes) => {
    return {
        type: RECEIVE_NOTES,
        notes
    }
};

export const removeNote = (noteId) => {
    return {
        type: REMOVE_NOTE,
        noteId
    }
};

// action thunk creators for getting notes of current user
export const fetchNotes = () => (dispatch) => {
    // take in callback functions for (success, failure)
    // dispatch current user on success
    // dispatch errors on reject
    return APIUtil.fetchNotes().then((notes) => {
        return dispatch(receiveNotes(notes));
    });
};

export const fetchNote = (noteId) => (dispatch) => {
    return APIUtil.fetchNote(noteId).then((note) => {
        return dispatch(receiveNote(note));
    });
};

export const createNote = (note) => (dispatch) => {
    // debugger
    return APIUtil.createNote(note).then((note) => {
        // debugger
        return dispatch(receiveNote(note));
    });
};

export const updateNote = (note) => (dispatch) => {
    // debugger
    return APIUtil.updateNote(note).then((note) => {
        // debugger
        return dispatch(receiveNote(note));
    });
};

export const deleteNote = (noteId) => (dispatch) => {
    return APIUtil.deleteNote(noteId).then(() => {
        return dispatch(removeNote(noteId));
    });
};