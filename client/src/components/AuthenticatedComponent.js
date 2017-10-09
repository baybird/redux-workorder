import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import $ from 'jquery';

import {auth} from '../actions/account.js';
import {getApiUrl} from "../libs/functions.js"

class AuthenticatedComponent extends React.Component {
    constructor(props){
        super(props);
        this.authenticated = false;
    }

    componentWillMount() {
        this.checkAuth();
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
                self.authenticated = true;
                self.props.dispatch(auth(localStorage.getItem("email"), 1));
            }
        })
    }

    checkAuth2() {
        console.log("check auth - checkAuth2");

        $.ajax({
          method: "POST",
          url: getApiUrl() + "/api/checkFBstatus",
          data: {
            token: localStorage.getItem("token"),
            userID:localStorage.getItem("userID"),
            email: localStorage.getItem("email")
          }
        }).done(function(ret){
            if(ret.authenticated!==1){
                browserHistory.push('/Account/login');
            }
        })
    }

    render() {
        if(this.authenticated === true){
            return this.props.children
        }else{
            return (
                <div></div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.account.email,
        authenticated: state.account.authenticated
    }
};

export default connect(mapStateToProps)(AuthenticatedComponent);
