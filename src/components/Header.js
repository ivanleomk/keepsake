import React, { useRef, useState } from 'react'
import useOnClickOutside from '../hooks/useClickOutside'
import { useHistory, useLocation } from 'react-router-dom'
import Logo from '../assets/Postheart_Logo.png'
import text from '../assets/Postheart_Logo Text Blue.png'
import RodalModal from '../components/RodalModal'

// include styles
import 'rodal/lib/rodal.css';

const LandingPageHeader = () => {
  const ref = useRef()
  const [isModalOpen, setModalOpen] = useState(false)
  useOnClickOutside(ref, () => setModalOpen(false))

  const history = useHistory()
  const Location = useLocation()

  const handleButtonClick = () => {
    setModalOpen(false)
    history.push('/letter')
  }

  return (
    <nav ref={ref} class='flex items-center justify-between flex-wrap px-6 py-4' style={{ backgroundColor: '#842724' }}>
      <div
        onClick={() => history.push('/')}
        class='flex items-center flex-shrink-0 text-white mr-6 pt-2'
      >
        <img style={{ width:"40vw", maxWidth: "200px"}} src={Logo} alt="Logo" />
        <img style={{ width:"40vw",maxWidth: "350px" }} src = {text} alt = "text" />
      </div>
      <div class='block lg:hidden'>
        <button onClick={() => setModalOpen(!isModalOpen)} class='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'>
          <svg class='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Menu</title><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' /></svg>
        </button>
      </div>
      <RodalModal />
      
    </nav>
  )
}

export default LandingPageHeader
