import * as APIUtil from '../util/notebookApi';

export const RECEIVE_NOTEBOOK = "RECEIVE_NOTEBOOK";
export const RECEIVE_NOTEBOOKS = "RECEIVE_NOTEBOOKS";

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

// action thunk creators for getting notebooks of current user
export const fetchNotebooks = () => (dispatch) => {
    // take in callback functions for (success, failure)
    // dispatch current user on success
    // dispatch errors on reject
    return APIUtil.fetchNotebooks().then((notebooks) => {
        return dispatch(receiveNotebooks(notebooks));
    }, (error) => {
        return dispatch(receiveErrors(error.responseJSON));
    });
};

export const fetchNotebook = (id) => (dispatch) => {
    // take in callback functions for (success, failure)
    // dispatch current user on success
    // dispatch errors on reject
    return APIUtil.fetchNotebook(id).then((notebook) => {
        return dispatch(receiveNotebook(notebook));
    }, (error) => {
        return dispatch(receiveErrors(error.responseJSON));
    });
};

export const createNotebook = (notebook) => (dispatch) => {
    return APIUtil.createNotebook(notebook).then((notebook) => {
        return dispatch(receiveNotebook(notebook))
    })
};