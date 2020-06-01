import {
    RECEIVE_NOTEBOOKS,
    RECEIVE_NOTEBOOK,
    REMOVE_NOTEBOOK
} from "../actions/notebook";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    switch(action.type) {
        case RECEIVE_NOTEBOOKS:
            return action.notebooks;
        case RECEIVE_NOTEBOOK:
            const newNotebook = { [action.notebook.id]: action.notebook };
            return Object.assign({}, prevState, newNotebook);
        case REMOVE_NOTEBOOK:
            let nextState = Object.assign({}, prevState);
            delete nextState[action.notebookId]
            return nextState;
        default:
            return prevState;
    }
};