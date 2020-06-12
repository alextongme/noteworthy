import { combineReducers } from 'redux';
import users from './users'
import notebooks from './notebooks'
import notes from './notes'
import tags from './tags'

export default combineReducers({
    users,
    notebooks,
    notes,
    tags
})
