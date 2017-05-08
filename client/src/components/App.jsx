import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
          <header>
            <h1><Link to="/Workorder">Workorder</Link></h1>
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

export default App
