import {
    RECEIVE_NOTEBOOKS,
    RECEIVE_NOTEBOOK,
    REMOVE_NOTEBOOK
} from "../actions/notebook";

// import {
//     RECEIVE_NOTE,
//     REMOVE_NOTE
// } from "../actions/note";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    switch(action.type) {

        // case RECEIVE_NOTE:
        //     let newNotebooks = {};
        //     Object.values(action.notebooks).forEach((notebook) => {
        //         newNotebooks[notebook.id] = notebook;
        //     })
        //     return Object.assign({}, prevState, newNotebooks);
        // case REMOVE_NOTE:
        //     newNotebooks = {};
        //     Object.values(action.notebooks).forEach((notebook) => {
        //         newNotebooks[notebook.id] = notebook;
        //     })
        //     return Object.assign({}, prevState, newNotebooks);

        case RECEIVE_NOTEBOOKS:
            const newNotebooks = {};
            Object.values(action.notebooks).forEach((notebook) => {
                newNotebooks[notebook.id] = notebook;
            })
            return Object.assign({}, prevState, newNotebooks);
        case RECEIVE_NOTEBOOK:
            // debugger
            const newNotebook = { [action.notebook.id]: action.notebook };
            return Object.assign({}, prevState, newNotebook);
        // case UPDATE_NOTEBOOK:
        //     const newNotebook = { [action.notebook.id]: action.notebook };
        //     return Object.assign({}, prevState, newNotebook);
        case REMOVE_NOTEBOOK:
            let nextState = Object.assign({}, prevState);
            delete nextState[action.notebookId]
            return nextState;
        default:
            return prevState;
    }
};