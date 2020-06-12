import * as APIUtil from '../util/notebookApi';

export const RECEIVE_NOTEBOOK = "RECEIVE_NOTEBOOK";
export const RECEIVE_NOTEBOOKS = "RECEIVE_NOTEBOOKS";
export const REMOVE_NOTEBOOK = "REMOVE_NOTEBOOK";
export const CHANGE_DEFAULT_NOTEBOOK_ID = "CHANGE_DEFAULT_NOTEBOOK_ID";

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

export const removeNotebook = (notebook) => {
    return {
        type: REMOVE_NOTEBOOK,
        notebook
    }
};

export const changeDefaultNotebook = (notebookId) => {
    return {
        type: CHANGE_DEFAULT_NOTEBOOK_ID,
        notebookId
    }
};

// UI ACTIONS
export const updateDefaultNotebook = (notebookId) => (dispatch) => {
    // debugger
    return APIUtil.updateDefaultNotebook(notebookId).then(() => {
        // debugger
        return dispatch(changeDefaultNotebook(notebookId));
    });
};

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
        // debugger
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
    return APIUtil.deleteNotebook(notebookId).then((notebook) => {
        return dispatch(removeNotebook(notebook));
    });
};