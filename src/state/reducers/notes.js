import {
    RECEIVE_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE
} from "../actions/note";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    switch(action.type) {
        case RECEIVE_NOTES:
            return action.notes;
        case RECEIVE_NOTE:
            const newNote = { [action.note.id]: action.note };
            return Object.assign({}, prevState, newNote);
        case REMOVE_NOTE:
            let nextState = Object.assign({}, prevState);
            delete nextState[action.noteId]
            return nextState;
        default:
            return prevState;
    }
};