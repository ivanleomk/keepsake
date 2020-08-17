import React, { useRef } from 'react'
import Letter from '../components/Letter'
import { useHistory, useParams } from 'react-router-dom'

const View = () => {
    const { id } = useParams()
    const history = useHistory()
  return (
    <div className='flex flex-col items-center justify-center'>
      <div style={{ height: '60vh' }}>
              <p className='text-3xl'>Your Letter</p>
              <button onClick={()=>history.push('/')}>Create a letter</button>
        <Letter edit={false} id={id} />
      </div>
    </div>
  )
}

export default View
