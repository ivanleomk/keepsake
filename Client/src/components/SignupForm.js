import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const SignupForm = ({ login }) => {
  const history = useHistory()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('!!')
    axios.post('http://localhost:3000/login', {
      username, password
    }).then(res => history.push('/user')).catch(err => console.log(err))
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='w-full'>
      <div class=''>
        <label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
                Username
        </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} class='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='password' type='text' placeholder='password' />

      </div>
      <div class='mb-6 w-100'>
        <label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
                Password
        </label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} class='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='password' />
      </div>
      <button onClick={(e) => handleSubmit(e)} class='bg-blue-500 hover:bg-blue-700 w-full text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
        {login ? 'Login' : 'Sign Up'}
      </button>

    </form>
  )
}

export default SignupForm
