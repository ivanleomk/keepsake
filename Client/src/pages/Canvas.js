import React, { useRef } from 'react'
import Letter from '../components/Letter'
import { useParams } from 'react-router-dom'

const Canvas = () => {
  const { id } = useParams()
  return (
    <div className='flex flex-col items-center justify-center'>
      <div style={{ height: '60vh' }}>
        <p className='text-3xl'>Write Your Letter</p>
        <Letter edit id={id} />
      </div>
    </div>
  )
}

export default Canvas
