import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
} from "../actions/session_actions";

// when there is no user logged in (page startup/logout/etc.)
const _nullUser = Object.freeze({
    id: null,
});

// reducer to change the state based off action given
// takes in old state & new action and returns a modified new state slice
const sessionReducer = (state = _nullUser, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return { id: action.currentUser.id };
        case LOGOUT_CURRENT_USER:
            return _nullUser;
        default:
            return state;
    }
};

export default sessionReducer;