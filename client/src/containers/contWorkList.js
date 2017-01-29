import { connect } from 'react-redux'
import worklist from '../components/Workorder/list.jsx'

import {DIALOG_OPEN_ORDER, SEARCH_ORDER} from "../actions/workorder.js"

const mapStateToProps = (state) => {
  // console.log('5) list container - state');
  // console.log(state);
  // console.log(SEARCH_ORDER);

  if (state.workorder.type === DIALOG_OPEN_ORDER) {
    return {
      'type': state.workorder.type,
      'orderID': state.workorder.orderID
    }
  }else if(state.workorder.type === SEARCH_ORDER){
    return {
      type: state.workorder.type,
      keyword: state.workorder.keyword,
      status: state.workorder.status
    }
  }else{
    return {}
  }
}


const contWorklist = connect(
  mapStateToProps
)(worklist)

export default contWorklist
