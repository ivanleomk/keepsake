import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RootContext } from '../context/Auth'
import { useToasts } from 'react-toast-notifications'

const GoogleAuth = () => {
  const { auth, user, signedIn } = useContext(RootContext)
  const location = useLocation()
  const { addToast } = useToasts()
  
  return (
    <>
      {signedIn
        ? <div className='flex flex-row items-center justify-center'>
          {location.pathname === '/' ? <Link className='font-bold py-2 px-4 text-gray-300' to='/home'>
                        See Your Letters
                                       </Link> : null}
          <button
            class='text-white font-bold py-2 px-4 focus:outline-none '
            type='button'
            onClick={() => {
              auth.signOut()
            }}
          >Sign Out
          </button>
          </div>

        : <button
          class='hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
          type='button'
          onClick={() => {
            if (auth) {
              auth.signIn()  
            }
            else {
              addToast('Google oAuth requires cookies. Please enable them to login.', { appearance: 'warning' })
            }
            
          }}
          >Login with Google
        </button>}
    </>
  )
}

export default GoogleAuth
