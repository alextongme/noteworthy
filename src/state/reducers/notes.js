import {
    RECEIVE_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE
} from "../actions/note";

import {
    REMOVE_NOTEBOOK
} from "../actions/notebook";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    // debugger
    let nextState = Object.assign({}, prevState);
    switch(action.type) {
        
        // when fetching all notes, fill the database with each note and normalize the state
        case RECEIVE_NOTES:
            const newNotes = {};
            Object.values(action.notes).forEach((note) => {
                newNotes[note.id] = note;
            })
            return Object.assign({}, prevState, newNotes);

        // when updating a note or creating a new one, replace or create a new note in the state respectively
        case RECEIVE_NOTE:
            const newNote = { [action.note.id]: action.note };
            return Object.assign({}, prevState, newNote);

        // when deleting a note, remove it from the state
        case REMOVE_NOTE:
            // debugger
            delete nextState[action.note.id]
            return nextState;
        
        // when a notebook is removed, delete all associated notes from the store
        case REMOVE_NOTEBOOK:
            action.notebook.note_ids.forEach((noteId) => {
                delete nextState[noteId]
            })
            return nextState;

        default:
            return prevState;
    }
};