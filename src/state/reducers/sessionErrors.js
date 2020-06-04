import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
} from "../actions/session";
import { LOCATION_CHANGE } from 'react-router-redux';

// checking for session errors and updating slice of state
// in the case there are no errors, empty array is returned
export default (state = [], action) => {
    // debugger
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return [];
            // tying to reset errors when route changes
        // case LOCATION_CHANGE:
        //     return [];
        default:
            return state;
    }
};