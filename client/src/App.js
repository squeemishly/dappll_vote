import React, { Component } from 'react'
import Ballot from './components/ballot'

class App extends Component {

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
        </nav>

        <main className="container">
          <div>
            <Ballot />
          </div>
        </main>
      </div>
    );
  }
}

export default App
