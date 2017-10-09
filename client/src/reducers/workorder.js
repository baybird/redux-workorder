import {DIALOG_OPEN_ORDER, SEARCH_ORDER, CLOSE_DIALOG } from '../actions/workorder.js';


function dialog(state = {type:"", orderID:''}, action) {
  switch (action.type) {
    case DIALOG_OPEN_ORDER:
        return (
          {},
          state,
          {
            type: action.type,
            orderID: action.orderID,
            authenticated: action.authenticated
          }
        );

    case CLOSE_DIALOG:
        return (
          {},
          state,
          {
            type: action.type,
            authenticated: action.authenticated
          }
        );

    case SEARCH_ORDER:
        return (
          {},
          state,
          {
            type: action.type,
            keyword: action.keyword,
            status: action.status,
            authenticated: action.authenticated
          }
        );
    default:
        return {
          type: action.type,
          authenticated: action.authenticated
        }

  }
}

export default dialog;
