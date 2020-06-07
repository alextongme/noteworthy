import { EDIT_NOTEBOOK_ID } from '../actions/dropdown';

export default (state = null, action) => {
    switch(action.type) {
        // case RECEIVE_NOTEBOOK:
        //     const newNotebook = { [action.notebook.id]: action.notebook };
        //     return Object.assign({}, prevState, newNotebook);
        case EDIT_NOTEBOOK_ID:
            return {notebookId: action.notebookId};
        default:
            return state;
    }
};