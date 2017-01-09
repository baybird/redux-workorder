import React, {Component} from 'react';
import $ from 'jquery';

class Dialog extends Component{
  constructor(props){
    super(props);

    var that = this;

    if (this.props.orderId) {
      var orderId = this.props.orderId;

      $.ajax({
        method: "GET",
        url: "/api/get/"+orderId
      }).done(function(ret){
        //console.log(ret.subject);
        that.refs.id.value = ret._id;
        that.refs.subject.value = ret.subject;
        that.refs.priority.value = ret.priority;
        that.refs.status.value = ret.status;
      })
    }

  }

  closeDialog(){
    $( "#dialog" ).slideToggle(function(){
      $(this).remove();
    });
  }

  openDialog(){
    //var that = this;
    $( "#dialog" ).slideToggle(function(){
      //console.log(that.props);
    });
  }

  save(){
    var that = this;

    if (that.refs.id.value==='') { // new - post
      $.ajax({
        method: "POST",
        url: "/api/insert",
        data: {
          subject: that.refs.subject.value,
          priority: that.refs.priority.value,
          status: that.refs.status.value
        }
      }).done(function(ret){
        if(ret.status===true){
          //WorkOrder.refs.worklist.apiGetList();// Call list api
          that.props.apiGetList();
          that.closeDialog();// Close dialog
        }else{
          alert(ret.message);
        }
      })
    } else { // update - put
      $.ajax({
        method: "PUT",
        url: "/api/update",
        data: {
          id: that.refs.id.value,
          subject: that.refs.subject.value,
          priority: that.refs.priority.value,
          status: that.refs.status.value
        }
      }).done(function(ret){
        if(ret.status===true){
          that.props.apiGetList();// Call list api
          that.closeDialog();// Close dialog
        }else{
          alert(ret.message);
        }
      })
    }
  }

  render() {
    //console.log(this.props);

    var prioritys = ['Low','Medium', 'High'];
    var status    = ['Active','Closed','On hold'];


    return (
      <div id="dialog" style={{display:'none'}}>
        <div id="dialog_table">
          <div id="dialog_tcell">
            <div id="dialog_box">
              <div id="dialog_header" ref="caption">New work order</div>
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
  }
};

export default Dialog;