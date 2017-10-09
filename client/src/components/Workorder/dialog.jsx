import React, {Component} from 'react';
import $ from 'jquery';

import {DIALOG_OPEN_ORDER, closeDialog, refreshOrderList, } from "../../actions/workorder.js"
import {AUTHENTICATED} from "../../actions/account.js"
import {getApiUrl} from "../../libs/functions.js"

class Dialog extends Component{
  constructor(props){
    super(props);

    this.save = this.save.bind(this)
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentDidMount(){
    this.openDialog();
  }

  componentDidUpdate(){
    this.getOrderFromAPI();
    this.openDialog();
  }


  getOrderFromAPI(){
    var self = this;
    if (this.props.orderID) {
      var orderId = this.props.orderID;

      $.ajax({
        method: "GET",
        url: getApiUrl() + "/api/get/"+orderId
      }).done(function(ret){
        self.refs.id.value = ret._id;
        self.refs.subject.value = ret.subject;
        self.refs.priority.value = ret.priority;
        self.refs.status.value = ret.status;
      })
    }
  }

  closeDialog(refreshList=false){
    var self = this;
    $( "#dialog" ).slideToggle(function(){
      self.props.dispatch(closeDialog(self.props.authenticated));

      if (refreshList) {
        self.props.dispatch(refreshOrderList(self.props.authenticated));
      }
    });
  }

  openDialog(){
    $( "#dialog" ).slideToggle(function(){
    });
  }

  save(){
    var self = this;

    if (self.refs.id.value==='') { // new - post
      $.ajax({
        method: "POST",
        url: getApiUrl() + "/api/insert",
        data: {
          subject: self.refs.subject.value,
          priority: self.refs.priority.value,
          status: self.refs.status.value
        }
      }).done(function(ret){
        if(ret.status===true){
          self.closeDialog(true);// Close dialog
        }else{
          alert(ret.message);
        }
      })
    } else { // update - put
      $.ajax({
        method: "PUT",
        url: getApiUrl() + "/api/update",
        data: {
          id: self.refs.id.value,
          subject: self.refs.subject.value,
          priority: self.refs.priority.value,
          status: self.refs.status.value
        }
      }).done(function(ret){
        if(ret.status===true){
          self.closeDialog(true);// Close dialog
        }else{
          alert(ret.message);
        }
      })
    }
  }

  render(){
    var prioritys = ['Low','Medium', 'High'];
    var status    = ['Active','Closed','On hold'];

    if (this.props.type===DIALOG_OPEN_ORDER || (this.props.type === AUTHENTICATED && this.props.authenticated === true ) ) {
      return (
        <div id="dialog" style={{display:'none'}}>
          <div id="dialog_table">
            <div id="dialog_tcell">
              <div id="dialog_box">
                <div id="dialog_header" ref="caption">Work order</div>
                <div id="dialog_body">
                  <input type="hidden" name="id" ref="id" value="" />
                  <table>
                    <tbody>
                      <tr>
                        <td width="25%" style={{textAlign: 'right'}} className="caption" >Subject</td>
                        <td><input type="text" name="subject" style={{width:'300px'}} ref="subject" placeholder="Enter subject"/></td>
                      </tr>
                      <tr>
                        <td style={{textAlign: 'right'}} className="caption" >Priority</td>
                        <td>
                          <select style={{width:'200px'}} ref='priority' placeholder="Select priority" >
                            <option></option>
                            {
                              prioritys.map(function(priority, key){
                                return (<option key={key} value={priority.toLowerCase()} >{priority}</option>)
                              })
                            }
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td style={{textAlign: 'right'}} className="caption" >Status</td>
                        <td>
                          <select style={{width:'200px'}} ref="status" placeholder="Select status" >
                            <option></option>
                            {
                              status.map(function(status, key){
                                return (<option key={key} value={status.toLowerCase()} >{status}</option>)
                              })
                            }
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="dialog_footer">
                  <button type="button" className="btn" onClick={e => this.save(e)} >Save</button>
                  <button type="button" className="btn btn_cancel" onClick={e => this.closeDialog(e)} >Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return (<div></div>);
    }
  }
};

export default Dialog;
