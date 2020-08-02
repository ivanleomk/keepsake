import React from 'react'

const InfographicItem = ({ header, text, image, index }) => {
  const reverse = index % 2 === 0 ? 'reverse' : ''
  const textReverse = index % 2 === 0 ? 'leftText' : 'rightText'
  return (
    <div id={reverse} className='sm:max-w-md md:max-w-2xl lg:max-w-3xl flex flex-col items-center text-left sm:flex-row' style={{ width: '80vw', marginTop: '60px' }}>
      <img className='sm:max-w-xs md:max-w-md' src={image} style={{ width: '40vw', paddingBottom: '20px' }} />
      <div className='md:px-6 flex-col text-center items-start md:max-w-lg justify-start sm:ml-4 sm:max-w-xs md:max-w-lg'>
        <p id={textReverse} className='text-lg md:text-2xl md:text-bold'>{header}</p>
        <p id={textReverse} className='text-sm  md:text-md text-gray-700'>{text}</p>
      </div>

    </div>
  )
}

export default InfographicItem
