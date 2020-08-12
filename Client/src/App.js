import React, { Component } from 'react'
import Header from './components/Header'

// Pages Imports
import Main from './pages/Main'
import Canvas from './pages/Canvas'
import User from './pages/User'

import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/letter'>
              <Canvas />
            </Route>
            <Route exact path='/user'>
              <User />
            </Route>
            <Route path='/*'>
              <Main />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
