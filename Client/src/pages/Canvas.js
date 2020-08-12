import React, { useRef } from 'react'
import Letter from '../components/Letter'

const Canvas = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div style={{ height: '60vh' }}>
        <p className='text-3xl'>Write Your Letter</p>
        <Letter />
      </div>
    </div>
  )
}

export default Canvas
