import React, { useEffect, useState } from 'react'

export const RootContext = React.createContext()

export default ({ children }) => {
  const [auth, setAuth] = React.useState(null)
  const [signedIn, setSignIn] = React.useState(null)
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '260891842737-t7k25pp1d1ol9iqp25utds4jubkdkrmi.apps.googleusercontent.com',
        scope: 'profile email'
      }).then(() => {
        const authObj = window.gapi.auth2.getAuthInstance()
        const userInfo = authObj.currentUser.get().getBasicProfile()
        console.log("authObj Obtained")
        console.log(authObj)
        authObj.isSignedIn.listen(() => setSignIn(authObj.isSignedIn.get()))
        setAuth(authObj)
        setSignIn(authObj.isSignedIn.get())
      })
    })
  }, [])

  if (signedIn && user === null) {
    const userInfo = auth.currentUser.get().getBasicProfile()
    setUser({ name: userInfo.Cd, email: userInfo.zu })
  }

  const defaultContext = {
    auth,
    user,
    signedIn
  }
  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  )
}

// Store In Local Storage
// const prevAuth = window.localStorage.getItem('auth') || false;
//   const prevAuthBody = window.localStorage.getItem('authBody')) || null;
//   const [authenticated, setAuthenticated] = useState(prevAuth);
//   const [authBody, setAuthBody] = useState(prevAuthBody);
//   useEffect(
//     () => {
//       window.localStorage.setItem('authenticated', authenticated);
//       window.localStorage.setItem('authBody', authBody);
//     },
//     [authenticated, authBody]
//   );
