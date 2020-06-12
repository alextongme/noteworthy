import {
    RECEIVE_NOTEBOOKS,
    RECEIVE_NOTEBOOK,
    REMOVE_NOTEBOOK
} from "../actions/notebook";

import {
    REMOVE_NOTE
} from "../actions/note";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    let nextState = Object.assign({}, prevState);
    switch(action.type) {
        case RECEIVE_NOTEBOOKS:
            const newNotebooks = {};
            Object.values(action.notebooks).forEach((notebook) => {
                newNotebooks[notebook.id] = notebook;
            })
            return Object.assign({}, prevState, newNotebooks);
        case RECEIVE_NOTEBOOK:
            const newNotebook = { [action.notebook.id]: action.notebook };
            return Object.assign({}, prevState, newNotebook);
        case REMOVE_NOTEBOOK:
            delete nextState[action.notebook.id]
            return nextState;

        // when a note is removed, delete the note-id association in the notebook
        case REMOVE_NOTE:
            let index = nextState[action.note.notebook_id].note_ids.indexOf(action.note.id)
            nextState[action.note.notebook_id].note_ids.splice(index, 1)
            // debugger
            return nextState;
    
        default:
            return prevState;
    }
};