import {
    RECEIVE_NOTEBOOKS,
    RECEIVE_NOTEBOOK,
} from "../actions/notebook";

export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_NOTEBOOKS:
            return action.notebooks;
        case RECEIVE_NOTEBOOK:
            const newNotebook = { [action.notebook.id]: action.notebook };
            return Object.assign({}, state, newNotebook);
        default:
            return state;
    }
};