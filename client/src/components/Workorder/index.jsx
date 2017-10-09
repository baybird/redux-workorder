import React, {Component} from 'react';
import { connect } from 'react-redux'

import WorkList from '../../components/Workorder/list.jsx'
import Dialog from '../../containers/contDialog.js'
import {dialogOpenOrder, search} from '../../actions/workorder.js'

class WorkOrder extends Component{
  constructor(props){
    super(props);

    this.state = {
      keyword:"",
      order_status:"all"
    };
  }


  search(e){
    var keyword = this.refs.keyword.value;
    var status  = this.refs.selected_status.value.toLowerCase();
    this.props.dispatch(search(keyword, status, this.props.authenticated));
  }

  addNew(){
    this.props.dispatch(dialogOpenOrder('', this.props.authenticated));
  }

  render(e){
    return (
      <div>
        <nav>
          <div>
            <div className="nav_right">
              <div id="dropdown">
                <select onChange={e=>this.search(e)} ref="selected_status">
                  <option>All</option>
                  <option>Active</option>
                  <option>Closed</option>
                  <option>On hold</option>
                </select>
              </div>
              <button type="button" id="btn_new" onClick={e => this.addNew(e)} className='btn'>New</button>
            </div>

            <div className="nav_left">
              <input ref="keyword" type="text" name="keyword" id="keyword" placeholder="Searching work orders" autoComplete="off" className="input_keyword" onChange={e => this.search(e)} />
            </div>
          </div>
        </nav>
        <WorkList ref="worklist" />
        <Dialog />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    type:           state.workorder.type,
    keyword:        state.workorder.keyword,
    authenticated:  state.account.authenticated
  }
}


const contWorkorder = connect(
  mapStateToProps
)(WorkOrder)

export default contWorkorder
