import React, {Component} from 'react';
import $ from 'jquery';

import {dialogOpenOrder, REFRESH_ORDER_LIST, SEARCH_ORDER } from '../../actions/workorder.js';

// import Dialog from '../../containers/contDialog.js'

class List extends Component {
    constructor(props) {
      super(props);

      this.openOrder = this.openOrder.bind(this)

      this.state = {
        items: [],
        apiUrl: '/api'
      };
    }

    apiGetList(keyword, status, sortingKey, sortingOrder) {
        // console.log('*** api called for worklist');


        // Setting default values
        // By doing it on this way is to suppoert the compatibility in IE
        if (typeof keyword === 'undefined') {
          keyword = null;
        }

        if (typeof status === 'undefined') {
          status = 'all';
        }

        if (typeof sortingKey === 'undefined') {
          sortingKey = 'id';
        }

        if (typeof sortingOrder === 'undefined') {
          sortingOrder = 1;
        }

        var apiUrl = this.state.apiUrl + '/' + status + '/' + sortingKey + '/' + sortingOrder;

        if (keyword) {
          apiUrl += '/' + keyword;
        }

        this.serverRequest = $.get(apiUrl, function (result) {
          this.setState({
            items: result
          });
        }.bind(this));
    }

    sort(field){
      var sortingKeyArr = [];

      if(this.state.hasOwnProperty('sortingKey') ){
        sortingKeyArr = this.state.sortingKey;
      }

      //  1 to specify ascending order.
      // -1 to specify descending order.
      if(typeof sortingKeyArr[field] === 'undefined'){
        sortingKeyArr[field] = 1
      }else{

        if(sortingKeyArr[field] === 1){
          sortingKeyArr[field] = -1;
        }else{
          sortingKeyArr[field] = 1;
        }
      }

      this.setState({
        sortingKey: sortingKeyArr
      });

      var keyword = this.props.keyword;
      var status  = this.props.order_status;

      // Call getListApi
      this.apiGetList(keyword, status, field, sortingKeyArr[field]);

    }

    sortingIcon(num){
      if(num===1){
        return (<i className="fa fa-sort-asc" aria-hidden="true"></i>);
      }else{
        return (<i className="fa fa-sort-desc" aria-hidden="true"></i>);
      }
    }

    openOrder(e, id){
      //console.log('0) UI send an action' );
      this.props.dispatch(dialogOpenOrder(id));
      //render(<Dialog orderId={id}/>, document.getElementById('dialog_area'));
    }

    componentWillReceiveProps(nextProps)
    {
      // console.log('0) componentWillReceiveProps' );
      // console.log(nextProps);

      if (nextProps.type === REFRESH_ORDER_LIST) {
        this.apiGetList();
      }else if (nextProps.type === SEARCH_ORDER) {
        // console.log('call api');
        this.apiGetList(nextProps.keyword, nextProps.status);
      }
    }
    // Called before rendering on both server and client side.
    componentWillMount(){
      //console.log('*** worklist will mount');
      this.apiGetList();
    }

    render(){
      // console.log("*** worklist render");
      // console.log(this.props);

      var sortingOrderTicket    = (<i className="fa fa-sort" aria-hidden="true"></i>);
      var sortingOrderPriority  = (<i className="fa fa-sort" aria-hidden="true"></i>);
      var sortingOrderSubject   = (<i className="fa fa-sort" aria-hidden="true"></i>);
      var sortingOrderTime      = (<i className="fa fa-sort" aria-hidden="true"></i>);
      var sortingOrderStatus    = (<i className="fa fa-sort" aria-hidden="true"></i>);


      if(typeof this.state.sortingKey !== 'undefined'){
        if(this.state.sortingKey['id']){
          sortingOrderTicket = this.sortingIcon(this.state.sortingKey['id']);
        }

        if(this.state.sortingKey['priority']){
          sortingOrderPriority = this.sortingIcon(this.state.sortingKey['priority']);
        }

        if(this.state.sortingKey['subject']){
          sortingOrderSubject = this.sortingIcon(this.state.sortingKey['subject']);
        }

        if(this.state.sortingKey['time']){
          sortingOrderTime = this.sortingIcon(this.state.sortingKey['time']);
        }

        if(this.state.sortingKey['status']){
          sortingOrderStatus = this.sortingIcon(this.state.sortingKey['status']);
        }
      }

      var that = this;

      return (
        <table className='list'>
          <thead>
            <tr>
              <th onClick={ e => this.sort('id')}>Ticket# {sortingOrderTicket} </th>
              <th onClick={ e => this.sort('priority')}>Priority {sortingOrderPriority}</th>
              <th onClick={ e => this.sort('subject')}>Subject {sortingOrderSubject}</th>
              <th onClick={ e => this.sort('time')}>Time {sortingOrderTime}</th>
              <th onClick={ e => this.sort('status')}>Status {sortingOrderStatus}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.items.map(function(item, key){
              return (
                <tr key={key} >
                  <td>{item._id}</td>
                  <td>{item.priority}</td>
                  <td>{item.subject}</td>
                  <td>{item.duration}</td>
                  <td>{typeof item.status==='undefined'?'':item.status.charAt(0).toUpperCase() + item.status.slice(1)} </td>
                  <td><button type="button" onClick={ (e) => that.openOrder(e, item._id.toString())} className="btn btn_small">Modify</button></td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      );
    }
}// end class


export default List;