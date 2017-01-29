import React, {Component} from 'react';

import WorkList from '../../containers/contWorkList.js'
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
    // console.log("1) search: "+keyword+ ", "+status);
    this.props.dispatch(search(keyword, status));
  }

  addNew(){
    // console.log('add new - open dialog');
    this.props.dispatch(dialogOpenOrder());
  }

  render(){
    return (
      <div>
        <nav>
          <div style={{width:"100%"}}>
            <input ref="keyword" type="text" name="keyword" id="keyword" placeholder="Searching work orders" autoComplete="off" className="input_keyword" onChange={e => this.search(e)} />
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
        </nav>
        <WorkList ref="worklist" />
        <Dialog />
      </div>
    );
  }
};

export default WorkOrder