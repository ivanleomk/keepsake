// Library Imports
import React from 'react'

// Static Resources
import smiley from '../assets/smiley.png'
import groot from '../assets/groot.svg'
import goodVibes from '../assets/goodVibes.svg'
import cuteCat from '../assets/cuteCat.svg'
import bears from '../assets/barebears.png'
import alien from '../assets/alien.png'

// Icon Imports
import Image from '../assets/icons/image.svg'
import Text from '../assets/icons/text.svg'
import Brush from '../assets/icons/brush.svg'

// Defined Action Types
import { LINE_SELECTION, TEXT_SELECTION, IMAGE_SELECTION, ADD_TEXT } from '../actionTypes'

// Helper Methods
import { addImage, addText } from '../helperMethods'

const Toolbar = ({ dispatch, selectShape }) => {
  const [currentScreen, setCurrentScreen] = React.useState(null)

  return (
    <div className='flex flex-col items-center justify-center bg-red-400'>
      <div className='flex flex-row justify-between py-4' style={{ width: '40vw', maxWidth: '400px' }}>
        <img onClick={() => setCurrentScreen(IMAGE_SELECTION)} style={{ width: '10vw', maxWidth: '40px' }} src={Image} />
        <img
          onClick={() => {
            setCurrentScreen(TEXT_SELECTION)
            addText(dispatch, selectShape)
          }} style={{ width: '10vw', maxWidth: '40px' }} src={Text}
        />
        <img onClick={() => setCurrentScreen(LINE_SELECTION)} style={{ width: '10vw', maxWidth: '40px' }} src={Brush} />
      </div>
      {currentScreen === IMAGE_SELECTION
        ? <div className='flex flex-row items-center py-2 overflow-x-auto' style={{ width: '60vw', maxWidth: '600px' }}>
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={smiley} onClick={() => addImage(smiley, dispatch, selectShape)} />
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={groot} onClick={() => addImage(groot, dispatch, selectShape)} />
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={goodVibes} onClick={() => addImage(goodVibes, dispatch, selectShape)} />
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={cuteCat} onClick={() => addImage(cuteCat, dispatch, selectShape)} />
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={bears} onClick={() => addImage(bears, dispatch, selectShape)} />
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={alien} onClick={() => addImage(alien, dispatch, selectShape)} />
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={cuteCat} onClick={() => addImage(cuteCat, dispatch, selectShape)} />
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={bears} onClick={() => addImage(bears, dispatch, selectShape)} />
          <img style={{ width: '10vw', maxWidth: '60px', margin: '0 20px' }} src={alien} onClick={() => addImage(alien, dispatch, selectShape)} />

          </div>
        : null}
      {currentScreen === TEXT_SELECTION
        ? <div className='py-2 '>No Text Selected</div> : null}
      {currentScreen === LINE_SELECTION
        ? <div className='py-2 '>No Line Selected</div> : null}

    </div>

  )
}

export default Toolbar
