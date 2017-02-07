import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import {connect} from 'react-redux'
import $ from 'jquery';

class Account extends Component{
  constructor(props){
    super(props);

    this.doSignup = this.doSignup.bind(this)
  }

  doSignup(event){
    let that = this;
    $.ajax({
      method: "POST",
      url: "/api/signup/",
      data: {
        username: that.refs.username.value,
        password: that.refs.password.value
      }
    }).done(function(ret){
      let el = ReactDOM.findDOMNode(that.refs.msg )

      if(ret.status===true){
        // self.closeDialog(true);// Close dialog
        $(el).html("") ;
        browserHistory.push('/Account')
      }else{
        $(el).html(ret.message) ;
      }
    })


    event.preventDefault ();
  }

  myAccount(){
      return (
        <div>
          accout
        </div>
      )
  }

  componentDidMount(){
    console.log('did mount');
  }

  render(){
    // console.log(this.props.routeParams.action)
    if (this.props.routeParams.action==='signup') {
      return (
        <div className="center-box">
          <div className="signup-box">
            <form onSubmit={this.doSignup}>
              <h2>Sign Up</h2>
              <div className="caption">Username</div>
              <div><input type="text" size="18" ref="username"/></div>

              <div className="caption">Password</div>
              <div><input type="password" size="18" ref="password"/></div>

              <div id="msg" ref="msg"></div>

              <div className="button-box">
                <button type="submit" className="btn" >Sign up</button>
              </div>
            </form>
          </div>
        </div>
      )
    }else {
      return this.myAccount();
    }
  }
}


const mapStateToProps = (state) => ({
    isAuthenticated: true
});

export default connect(mapStateToProps)(Account);

