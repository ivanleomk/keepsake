import React from 'react'
import Rodal from 'rodal'
import axios from 'axios'

// include styles
import 'rodal/lib/rodal.css'
import SignupForm from './SignupForm'
import { FacebookProvider, Like } from 'react-facebook'

class RodalModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visible: false, login: false }
  }

  show () {
    this.setState({ visible: true })
  }

  hide () {
    this.setState({ visible: false })
  }

  render () {
    return (
      <div>
        <button onClick={this.show.bind(this)}>Login</button>

        <Rodal height='100vh' width='100vw' customStyles={{ backgroundColor: '#F7C6C5' }} showCloseButton visible={this.state.visible} onClose={this.hide.bind(this)}>
          <div
            style={{
              backgroundColor: '#F7C6C5'
            }}
            className='flex justify-center items-center'
          >
            <div className='max-w-md' style={{ minWidth: '300px' }}>
              <div className='flex flex-col justify-center items-center h-screen'>
                <p className='text-4xl text-bold text-center'>{this.state.login ? 'Login' : 'Sign-up'}</p>
                {this.state.login ? <><p className='text-lg text-bold mb-10'>Not a member? <span className='cursor-pointer text-gray-500' onClick={() => this.setState({ login: false })}>Sign Up</span></p></> : <><p className='text-lg text-bold mb-10'>Already a member? <span className='cursor-pointer text-gray-500' onClick={() => this.setState({ login: true })}>Login</span></p></>}
                <SignupForm login={this.state.login} />
              </div>

            </div>
          </div>

        </Rodal>
      </div>
    )
  }
}

export default RodalModal
