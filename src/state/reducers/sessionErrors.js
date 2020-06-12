import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
    EMAIL_EXISTS,
    CLEAR_SESSION_ERRORS
} from "../actions/session";

// checking for session errors and updating slice of state
// in the case there are no errors, empty array is returned
export default (state = [], action) => {
    // debugger
    Object.freeze(state);
    switch(action.type) {
        case CLEAR_SESSION_ERRORS:
            return [];
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return [];
        case EMAIL_EXISTS:
            return [];
        default:
            return state;
    }
};