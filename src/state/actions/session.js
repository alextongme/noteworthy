import * as APIUtil from '../util/sessionApi';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const EMAIL_EXISTS = "EMAIL_EXISTS";

// actions for receiving a user during login/signup, logging out, and any errors associated
export const receiveEmailExists = () => {
    return {
        type: EMAIL_EXISTS
    }
};

export const receiveCurrentUser = (currentUser) => {
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser,
    }
};

export const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER,
    }
};

export const receiveErrors = (errors) => {
    return {
        type: RECEIVE_SESSION_ERRORS,
        errors
    }
};

// action thunk creators for signing up, logging in, and logging out
export const signup = (user) => (dispatch) => {
    // take in callback functions for (success, failure)
    // dispatch current user on success
    // dispatch errors on reject
    return APIUtil.signup(user).then((user) => {
        return dispatch(receiveCurrentUser(user));
    }, (error) => {
        return dispatch(receiveErrors(error.responseJSON));
    });
};

export const login = (user) => (dispatch) => {
    return APIUtil.login(user).then((user) => {
        return dispatch(receiveCurrentUser(user));
    }, (error) => {
        return dispatch(receiveErrors(error.responseJSON));
    });
};

export const logout = () => (dispatch) => {
    return APIUtil.logout().then((user) => {
        return dispatch(logoutCurrentUser())
    })
};

export const lookForUser = (email) => (dispatch) => {
    return APIUtil.lookForUser(email).then(() => {
        return dispatch(receiveEmailExists());
    }, (error) => {
        return dispatch(receiveErrors(error.responseJSON));
    });
};