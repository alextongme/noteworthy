import { combineReducers } from 'redux';
import users from './users'
import notebooks from './notebooks'

export default combineReducers({
    users,
    notebooks,
})
