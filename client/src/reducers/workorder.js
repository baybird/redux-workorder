import {DIALOG_OPEN_ORDER, SEARCH_ORDER } from '../actions/workorder.js';


function dialog(state = {type:"", orderID:''}, action) {
  // console.log('3) reducer received action:');


  switch (action.type) {
    case DIALOG_OPEN_ORDER:
        return Object.assign(
          {},
          state,
          {
            type: action.type,
            orderID: action.orderID
          }
        );

    case SEARCH_ORDER:
        // console.log('4) reducert - return state')
        // console.log(action.keyword);
        return (
          {
            type: action.type,
            keyword: action.keyword,
            status: action.status
          }
        );
    default:
        return {type: action.type}

  }
}

export default dialog;