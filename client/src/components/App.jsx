import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
          <header>
            <h1>Redux</h1>
            <div className="header">
              <ul className="menu">
                <li><Link to="/Workorder">App</Link></li>
                <li><IndexLink to="/Description">Description</IndexLink></li>
              </ul>
            </div>
          </header>
          <main>
            {this.props.children}
          </main>
          <footer>
            <p>Powered by Redux with Node JS, Express, React, MongoDB</p>
            <p>R.T. @ 2017</p>
          </footer>
      </div>
    );
  }
}

export default App
