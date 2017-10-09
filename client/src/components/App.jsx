import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';

class App extends Component {

  getLoginLink(){
    if(this.props.authenticated===1){
      return (<li><Link to="/Account/logout" className="signup">Log out</Link></li>);
    }else{
      return (<li><Link to="/Account/login" className="signup">Log in</Link></li>);
    }
  }


  render() {
    return (
      <div className="container">
          <header>
            <h1><Link to="/Workorder">Workorder</Link></h1>
            <ul className="menu">
              <li><IndexLink to="/Workorder">Orders</IndexLink></li>
              <li><IndexLink to="/Account">Account</IndexLink></li>
              {this.getLoginLink()}
            </ul>
          </header>
          <main>
            {this.props.children}
          </main>
          <footer>
            <p>Oppzo 2016</p>
          </footer>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  let authenticated = 0;
  if (state.account.authenticated === 1 || state.workorder.authenticated ===1) {
    authenticated = 1;
  }

  return {
    email:state.account.email,
    authenticated: authenticated
  }

};

export default connect(mapStateToProps)(App);
