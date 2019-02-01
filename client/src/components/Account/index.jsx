import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import {connect} from 'react-redux'
import $ from 'jquery';

import FacebookLogin from 'react-facebook-login';
import {auth} from '../../actions/account.js';
import {getApiUrl} from "../../libs/functions.js"

class Account extends Component{
  constructor(props){
    super(props);

    this.state = {
      apiUrl: getApiUrl() + '/api/userinfo'
    };

    this.doSignup = this.doSignup.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  checkAuth() {
    let self = this;

    $.ajax({
      method: "POST",
      url: getApiUrl() +"/api/checkFBstatus",
      data: {
        token: localStorage.getItem("token"),
        userID:localStorage.getItem("userID"),
        email: localStorage.getItem("email")
      }
    }).done(function(ret){
      if(ret.authenticated!==1){
        browserHistory.push('/Account/login');
      }else{
        self.props.dispatch(auth(localStorage.getItem("email"), 1));
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('email');
    this.props.dispatch(auth(localStorage.getItem("email"), 0));
    browserHistory.push('/Account/login');
  }

  doSignup(event){
    let that = this;

    $.ajax({
      method: "POST",
      url: getApiUrl() +"/api/signup/",
      data: {
        username: that.refs.username.value,
        password: that.refs.password.value
      }
    }).done(function(ret){
      let el = ReactDOM.findDOMNode(that.refs.msg )

      if(ret.authenticated===true){
        // self.closeDialog(true);// Close dialog
        $(el).html("") ;
        browserHistory.push('/Account')
      }else{
        $(el).html(ret.message) ;
      }
    })

    event.preventDefault ();
  }

  componentDidMount(){
    if (this.props.routeParams.action==='logout') {
      this.logout();
    }
  }

  componentWillMount(){
    this.apiGetAccountInfo();
  }

  componentWillReceiveProps(nextState){
    // console.log('account - componentWillReceiveProps');
    this.apiGetAccountInfo();

    if (this.props.routeParams.action==='logout' && this.props.authenticated === 1) {
      this.logout();
      // console.log(this.props);
    }
  }

  responseFacebook(response){
    let self = this;
    let email;
    let name;
    let picture;

    if (response) {
      name    = response.name;
      email   = response.email;

      if(response.hasOwnProperty('picture')){
        picture = response.picture.data.url;
      }

    }

    window.FB.getLoginStatus(function(result){
      // console.log(result);
      if (result.status==='connected' && email !== undefined) {
        self.facebookVerifyAccessToken(result.authResponse.accessToken, result.authResponse.userID, email, name, picture);
      }
    });
  }

  facebookVerifyAccessToken(acessToken, userID, email, name, picture){
    // Call backend to verify login
    $.ajax({
      method: "POST",
      url: getApiUrl() +"/api/checkFBstatus/",
      data: {
        token: acessToken,
        userID:userID,
        email: email,
        name: name,
        picture: picture
      }
    }).done(function(ret){
      if (ret.authenticated===1) {
        // Store to local storage
        localStorage.setItem("token", acessToken);
        localStorage.setItem("userID", userID);
        localStorage.setItem("email", email);
        browserHistory.push('/Workorder');
      }
    })
  }

  signup(){
    return (
      <form onSubmit={this.doSignup}>
        <div className="caption">Username</div>
        <div><input type="text" size="18" ref="username"/></div>

        <div className="caption">Password</div>
        <div><input type="password" size="18" ref="password"/></div>

        <div id="msg" ref="msg"></div>

        <div className="button-box">
          <button type="submit" className="btn" >Sign up</button>
        </div>
      </form>
    );
  }

  apiGetAccountInfo() {
    // console.log('call api');
    let username  = localStorage.getItem("email");
    let userid    = localStorage.getItem("userID");

    var apiUrl = this.state.apiUrl + '/' + username + '/' + userid ;

    this.serverRequest = $.get(apiUrl, function (result) {
      this.setState({
        user: result.user
      });
    }.bind(this));
  }


  myAccount(){
    // console.log('account - myAccount');
    // console.log(this.state);

    let name;
    let picture;
    if (this.state.user) {
      name = this.state.user.name;
      picture = this.state.user.picture;
    }

    return (
      <div className="my_account">
        <div><img src={picture} alt={name}/></div>
        <div>{name}</div>
      </div>
    )
  }

  render(){
    // console.log('account - render');
    // console.log(this.state);
    if (this.props.authenticated !== 1 || this.props.routeParams.action==='login') {
      return (
        <div className="center-box">
          <div className="signup-box">
              <h2>Login</h2>
              <FacebookLogin appId="1785434518447570"
                      autoLoad={false}
                      onClick={this.responseFacebook}
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      cssClass="btn_blue"
                      icon="fa-facebook"
                      redirectUri="/app" />
              <div className="message">Please log in to use this app.</div>
          </div>
        </div>
      )
    }else {
      return this.myAccount();
    }
  }
}

const mapStateToProps = (state) => {
  return {
      authenticated: state.account.authenticated
  }
};

export default connect(mapStateToProps)(Account);
