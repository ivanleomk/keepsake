import React from 'react'

const InfographicItem = ({ header, text, image, index }) => {
  const reverse = index % 2 === 0 ? 'flex-reverse' : ''
  return (
    <div id={reverse} className='m-w-sm odd:flex-row-reverse sm:m-w-md flex flex-col items-center text-left sm:flex-row' style={{ width: '80vw', marginTop: '60px',maxWidth:"550px" }}>
      <img src={image} style={{ width: '40vw', paddingBottom: '20px', maxWidth: '200px' }} />
      <div className='flex-col items-start justify-start sm:ml-4 max-w-xs'>
        <p className='text-2xl'>{header}</p>
        <p className='text-sm text-gray-700'>{text}</p>
      </div>

    </div>
  )
}

export default InfographicItem
