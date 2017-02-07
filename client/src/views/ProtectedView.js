import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/action.js';

export class ProtectedView extends React.Component {
    render () {
        return (
            <div>
                <h1>login</h1>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    data: state.data.data,
    isFetching: state.data.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView);

