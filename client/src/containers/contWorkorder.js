import { connect } from 'react-redux'
import WorkOrder from '../components/Workorder/index.jsx'

const mapStateToProps = (state) => {
  // console.log('4) order container - mapStateToProps')
  // console.log(state);

  return {
    type: state.workorder.type,
    keyword:state.workorder.keyword,
    status:state.workorder.status
  }
}


const contWorkorder = connect(
  mapStateToProps
)(WorkOrder)

export default contWorkorder
