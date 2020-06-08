import * as APIUtil from '../util/notebookApi';

export const RECEIVE_NOTEBOOK = "RECEIVE_NOTEBOOK";
export const RECEIVE_NOTEBOOKS = "RECEIVE_NOTEBOOKS";
export const REMOVE_NOTEBOOK = "REMOVE_NOTEBOOK";

export const receiveNotebook = (notebook) => {
    return {
        type: RECEIVE_NOTEBOOK,
        notebook
    }
};

export const receiveNotebooks = (notebooks) => {
    return {
        type: RECEIVE_NOTEBOOKS,
        notebooks
    }
};

export const removeNotebook = (notebookId) => {
    return {
        type: REMOVE_NOTEBOOK,
        notebookId
    }
};

// UI ACTIONS
// action thunk creators for getting notebooks of current user
export const fetchNotebooks = () => (dispatch) => {
    // take in callback functions for (success, failure)
    // dispatch current user on success
    // dispatch errors on reject
    return APIUtil.fetchNotebooks().then((notebooks) => {
        return dispatch(receiveNotebooks(notebooks));
    });
};

export const fetchNotebook = (notebookId) => (dispatch) => {
    return APIUtil.fetchNotebook(notebookId).then((notebook) => {
        return dispatch(receiveNotebook(notebook));
    });
};

export const createNotebook = (notebook) => (dispatch) => {
    return APIUtil.createNotebook(notebook).then((notebook) => {
        return dispatch(receiveNotebook(notebook));
    });
};

export const updateNotebook = (notebook) => (dispatch) => {
    // debugger
    return APIUtil.updateNotebook(notebook).then((notebook) => {
        // debugger
        return dispatch(receiveNotebook(notebook));
    });
};

export const deleteNotebook = (notebookId) => (dispatch) => {
    return APIUtil.deleteNotebook(notebookId).then(() => {
        return dispatch(removeNotebook(notebookId));
    });
};