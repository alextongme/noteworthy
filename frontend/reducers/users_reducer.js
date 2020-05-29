import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

// if there is a signup/login, set the slice of state equal to the current user
const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        default:
            return state;
    }
};

export default usersReducer;