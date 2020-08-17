import React, { useRef, useState } from 'react'
import useOnClickOutside from '../hooks/useClickOutside'
import { useHistory, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import RodalModal from '../components/RodalModal'

// include styles
import 'rodal/lib/rodal.css'
import GoogleAuth from './GoogleAuth'

const LandingPageHeader = () => {
  const ref = useRef()
  const [isModalOpen, setModalOpen] = useState(false)
  useOnClickOutside(ref, () => setModalOpen(false))

  const history = useHistory()
  const Location = useLocation()

  return (
    <nav ref={ref} class='flex flex-row items-center justify-between flex-wrap px-6 py-4' style={{ backgroundColor: '#842724' }}>
      <div
        onClick={() => history.push('/')}
        class='flex items-center flex-shrink-0 text-white mr-6 pt-2'
      >
        <img style={{ paddingLeft: '2vw', width: '30vw', maxWidth: '350px' }} src={Logo} alt='Logo' />

      </div>
      <GoogleAuth />

    </nav>
  )
}

export default LandingPageHeader
