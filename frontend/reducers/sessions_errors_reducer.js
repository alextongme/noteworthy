import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
} from "../actions/session_actions";

// checking for session errors and updating slice of state
// in the case there are no errors, empty array is returned
export default (state = [], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
};