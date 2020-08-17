import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

// Axios Imports
import server from '../api/server'
import GoogleAuth from './GoogleAuth'

const SignupForm = ({ login }) => {
  const history = useHistory()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('!!')
    server.post('/login', {
      username,
      password
    })
    axios.post('http://localhost:3000/login', {
      username, password
    }).then(res => history.push('/user')).catch(err => console.log(err))
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='w-full'>

      <GoogleAuth />
      {/* <button onClick={(e) => handleSubmit(e)} class='bg-blue-500 hover:bg-blue-700 w-full text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
        {login ? 'Login' : 'Sign Up'}
      </button> */}

    </form>
  )
}

export default SignupForm
