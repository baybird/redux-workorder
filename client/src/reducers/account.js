import {AUTHENTICATED} from '../actions/account.js';


function auth(state = {type:"", authenticated: 0, email:''}, action) {
  switch (action.type) {
    case AUTHENTICATED:
        return Object.assign(
          {},
          state,
          {
            type: action.type,
            authenticated: action.authenticated,
            email: action.email
          }
        );
    default:
        return {
          type: action.type,
          authenticated: action.authenticated,
        }

  }
}

export default auth;