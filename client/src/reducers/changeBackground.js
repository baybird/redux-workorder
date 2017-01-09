import {
  CHANGE_BACKGROUND
} from '../actions/action.js';

function todos(state = [], action) {
  //console.log("action.type:"+action.type);
  //console.log(state);

  switch (action.type) {
    case CHANGE_BACKGROUND:
      //console.log(action);
      return action.background;

    default:
      return 0;
  }
}

export default todos;