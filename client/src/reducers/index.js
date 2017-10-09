import { combineReducers } from 'redux';
import workorder from './workorder.js';
import account from './account.js';

const rootReducer = combineReducers({
  workorder, account
});

export default rootReducer;