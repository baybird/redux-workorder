import React, {Component} from 'react';
import { render } from 'react-dom';

import WorkList from './list.jsx'
import Dialog from './dialog.jsx'

class WorkOrder extends Component{
  constructor(props){
    super(props);

    this.state = {
      keyword:"",
      order_status:"all"
    };
  }

  search(){
    var keyword = this.refs.keyword.value;
    var status  = this.refs.selected_status.value.toLowerCase();
    //console.log('status:'+ status);

    this.setState({
      keyword: keyword,
      order_status: status
    });

    // Call getListApi in worklist component
    this.refs.worklist.apiGetList(keyword, status);
  }

  addNew(){
    console.log('render dialog');

    render(
      <Dialog apiGetList={this.refs.worklist.apiGetList} />,
      document.getElementById('dialog_area')
    );

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
        <WorkList ref="worklist" keyword={this.state.keyword} order_status={this.state.order_status} />
        <div id="dialog_area"/>
      </div>
    );
  }
};

export default WorkOrder;