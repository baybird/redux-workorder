import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
          <header>
            <h1><Link to="/Workorder">Workorder</Link></h1>
            <ul className="menu">
              <li><IndexLink to="/Account">Account</IndexLink></li>
              <li><IndexLink to="/Account/signup" className="signup">Sign up</IndexLink></li>
            </ul>
          </header>
          <main>
            {this.props.children}
          </main>
          <footer>
            <p>Powered by Node JS, Express, React, Redux, MongoDB and Redis</p>
            <p>R.T. @ 2016-2017</p>
          </footer>
      </div>
    );
  }
}

export default App
