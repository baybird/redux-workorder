import React from 'react';
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
// import {pushState} from 'react-router';
import $ from 'jquery';

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
            console.log(nextProps)
        }

        checkAuth() {
            console.log('check auth');

            $.ajax({
              method: "GET",
              url: "/api/checkauth/"
            }).done(function(ret){
              if(ret.token!==true){
                browserHistory.push('/Account/logout');
              }else{
                // dispatch();
              }
            })


            // if (!this.props.isAuthenticated) {
            //     let redirectAfterLogin = this.props.location.pathname;
            //     this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
            // }
        }

        render() {

            return (
                <div>
                    {
                        this.props.isAuthenticated === true?
                        <Component {...this.props}/>:
                        "Please log in"
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        // token: state.auth.token,
        // userName: state.auth.userName,
        isAuthenticated: false
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}