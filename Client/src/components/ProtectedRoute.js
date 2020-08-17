import React, { useContext } from 'react'
import { RootContext } from '../context/Auth'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component, ...options }) => {
  const { signedIn } = useContext(RootContext)
  if (signedIn) {
    return (<Route {...options} component={component} />)
  } else {
    return (<Redirect to='/' />)
  }
}

export default ProtectedRoute
