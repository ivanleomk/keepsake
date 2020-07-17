import React, { useRef, useState } from 'react'
import useOnClickOutside from '../hooks/useClickOutside'
import { useHistory, useLocation } from 'react-router-dom'
import { useSpring } from 'react-spring'

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
    <nav ref={ref} class='flex items-center justify-between flex-wrap bg-red-500 px-6 py-4'>
      <div
        onClick={() => history.push('/')}
        class='flex items-center flex-shrink-0 text-white mr-6 pt-2'
      >Postage With Love
      </div>
      <div class='block lg:hidden'>
        <button onClick={() => setModalOpen(!isModalOpen)} class='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'>
          <svg class='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Menu</title><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' /></svg>
        </button>
      </div>
      {isModalOpen
        ? <div class='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
          <div className='text-sm lg:flex-grow'>

            <a href='#responsive-header' class='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
                How It Works
            </a>
            <a href='#responsive-header' class='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
                Examples
            </a>
            <a href='#responsive-header' class='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white'>
                Contact Us
            </a>
            {Location.pathname !== '/letter'
              ? <button onClick={() => handleButtonClick()} style={{ marginTop: '20px' }} class=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
                        Send a letter
              </button>
              : null}
          </div>
        </div> : null}
    </nav>
  )
}

export default LandingPageHeader
