import React, { Component } from 'react'

// Component Imports
import ProtectedRoute from './components/ProtectedRoute'

// Pages Imports
import Main from './pages/Main'
import Canvas from './pages/Canvas'
import User from './pages/User'
import View from './pages/View'

import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// Context Import
import RootProvider from './context/Auth'
import { ToastProvider } from 'react-toast-notifications';

class App extends Component {
  render() {
    return (
      <ToastProvider autoDismiss
        autoDismissTimeout={3000}
        placement="top-right">
      <RootProvider>
        <Router>
          <div>
            <Switch>
              <Route exact path='/letter/:id'>
                <Canvas />
              </Route>
              <ProtectedRoute exact path='/home'>
                <User />
                </ProtectedRoute>
                <Route exact path='/view/:id'>
                  <View />
              </Route>
              <Route path='/*'>
                <Main />
              </Route>
            </Switch>
          </div>
        </Router>
        </RootProvider>
        </ToastProvider>
    )
  }
}

export default App
