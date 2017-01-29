import React, {Component} from 'react';
import $ from 'jquery';

import {DIALOG_OPEN_ORDER, closeDialog, refreshOrderList} from "../../actions/workorder.js"

//console.log('* 2. Dialog included');

class Dialog extends Component{
  constructor(props){
    super(props);

    this.save = this.save.bind(this)
    this.closeDialog = this.closeDialog.bind(this);
    // console.log('* 2. Dialog init.');
    // console.log('recevied orderid:' + this.props.store);
  }

  // Called after rendering.
  componentDidMount(){
    this.openDialog();
  }

  // Called after rendering.
  componentDidUpdate(){
    //console.log('*** 5. Dialog did update.');
    this.getOrderFromAPI();
    this.openDialog();
  }


  getOrderFromAPI(){
    //console.log('5) dialog - call API to get order data')
    //console.log(this.props)

    var self = this;
    if (this.props.orderID) {
      var orderId = this.props.orderID;

      $.ajax({
        method: "GET",
        url: "/api/get/"+orderId
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
      self.props.dispatch(closeDialog());
      if (refreshList) {
        self.props.dispatch(refreshOrderList());
      }

    });
  }

  openDialog(){
    //var that = this;
    $( "#dialog" ).slideToggle(function(){
      //console.log(that.props);
    });
  }

  save(){
    // console.log("5) dialog - save workorder");
    //console.log(this.refs.id.value)

    var self = this;

    if (self.refs.id.value==='') { // new - post
      $.ajax({
        method: "POST",
        url: "/api/insert",
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
        url: "/api/update",
        data: {
          id: self.refs.id.value,
          subject: self.refs.subject.value,
          priority: self.refs.priority.value,
          status: self.refs.status.value
        }
      }).done(function(ret){
        if(ret.status===true){

          console.log('going to close');
          self.closeDialog(true);// Close dialog
        }else{
          alert(ret.message);
        }
      })
    }
  }

  render(){
    //console.log('5) dialog render');
    //console.log("type: "+this.props.type);
    //console.log("*****************************");


    var prioritys = ['Low','Medium', 'High'];
    var status    = ['Active','Closed','On hold'];

    if (this.props.type===DIALOG_OPEN_ORDER) {
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