import { combineReducers } from 'redux';

import modal from './modal';
import dropdown from './dropdown';

export default combineReducers({
    modal,
    dropdown
})