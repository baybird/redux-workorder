import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

//import {changeBackground } from '../actions/action.js';


class App extends Component {
  render() {
    //const { dispatch, visibleTodos, visibilityFilter, background } = this.props; // From reducer

    return (
      <div>
        <header>
          <h1>Redux</h1>
          <div className="header">
            <ul className="menu">
                <li><Link to="/Workorder">App</Link></li>
                <li><IndexLink to="/Description">Description</IndexLink></li>
            </ul>
          </div>
        </header>
        <main>
          {this.props.children}
        </main>
        <footer>
            <p>Powered by Redux with Node JS, Express, React, MongoDB</p>
            <p>R.T. @ 2017</p>
        </footer>
      </div>
    );
  }
}


function backgroundValue(val){
  switch(val){
    case 0:
      return "blue";

    default:
      return "red";
  }
}

//  state is component of Connect
function select(state) {
  return {
    background: backgroundValue(state.changeBackground)
  };
}

//Connects a React component to a Redux store.
//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
//
// [mapStateToProps(state, [ownProps]): stateProps] (Function):
// If specified, the component will subscribe to Redux store updates.
// Any time it updates, mapStateToProps will be called. Its result must be
// a plain object*, and it will be merged into the component’s props. If you
// omit it, the component will not be subscribed to the Redux store. If ownProps
// is specified as a second argument, its value will be the props passed to your
// component, and mapStateToProps will be additionally re-invoked whenever the
// component receives new props (e.g. if props received from a parent component
// have shallowly changed, and you use the ownProps argument, mapStateToProps is
// re-evaluated).

export default connect(select)(App);
