import { RECEIVE_CURRENT_USER } from "../actions/session";
import { CHANGE_DEFAULT_NOTEBOOK_ID } from "../actions/notebook";

// if there is a signup/login, set the slice of state equal to the current user
export default (prevState = {}, action) => {
    Object.freeze(prevState);
    let nextState = Object.assign({}, prevState);
    let currUser = Object.values(nextState)[0];
    let currUserId;
    // if(currUser !== undefined) {
    //     currUserId = Object.values(nextState)[0].id;
    // }
    // Object.keys[prevState]
    
    switch(action.type) {
        case CHANGE_DEFAULT_NOTEBOOK_ID:
            // debugger
            currUserId = Object.values(nextState)[0].id;
            return ({
                ...prevState,
                [currUserId]: {
                    ...currUser,
                    default_notebook_id: action.notebookId
                }
            })
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, prevState, { 
                [action.currentUser.id]: action.currentUser 
            });
        default:
            return prevState;
    }
};