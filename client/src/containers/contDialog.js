import { connect } from 'react-redux'
import Dialog from '../components/Workorder/dialog.jsx'

//console.log('* 1. contDialog init.');

// tells how to transform the current Redux store state
// into the props you want to pass to a presentational
// component
const mapStateToProps = (state) => {
  //console.log('4) container for dialog');
  //console.log(state.workorder);
  return {
    type: state.workorder.type,
    orderID: state.workorder.orderID
  }
}


// In addition to reading the state, container components
// can dispatch actions. In a similar fashion, you can
// define a function called mapDispatchToProps() that
// receives the dispatch() method and returns callback
// props that you want to inject into the presentational
// component.
//
// In other work, you can define events in mapDispatchToProps()
// then using them in components.
// Example:
// const mapDispatchToProps = (dispatch) => {
// return {
//     onTodoClick: (id) => {
//       //dispatch(toggleTodo(id))
//     }
//   }
// }
// <Todo onClick={() => onTodoClick(todo.id)} />

const contDialog = connect(
  mapStateToProps
)(Dialog)

export default contDialog
