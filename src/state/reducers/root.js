import { combineReducers } from 'redux';
import entities from './entities';
import session from './session';
import errors from './errors';
import ui from './ui'

const appReducer = combineReducers({
    entities,
    session,
    errors,
    ui,
})

const rootReducer = (state, action) => {
    // reset redux state
    // we dont want last users info in state
    if (action.type == 'LOGOUT_CURRENT_USER') {
      state = undefined;
    }
    
    return appReducer(state, action);
};

export default rootReducer;