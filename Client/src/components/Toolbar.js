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

const Toolbar = ({ dispatch, selectShape, setDrawing,items,selectedId }) => {
  const [currentScreen, setCurrentScreen] = React.useState(null)
  let currItem = items.filter(item => item.id === selectedId)
  
  //Form-Specific State
  const [strokeWidth,setWidth] = React.useState(5)
  //TODO: Create Render Methods to update properties of individual components
  //TODO: Create Serialization methods to store to JSON file online
  //TODO: Create method to authenticate
  //TODO: Create save 2 png method
  
  const renderItem = (item) => {
    console.log(item)
    switch (item[0].type) {
      case 'LINE':
        {return (
          <div className='py-2 '>
            <input type="range" min="1" max="10" value={strokeWidth} onChange={(e)=>setWidth(e.target.value)} class="slider" id="myRange"></input>
          </div>
        )
        }
      case 'IMAGE': {
        return (
          <div className='py-2 '>
            Delete Image
          </div>
        )
      }
      case 'TEXT': {
        console.log("Rendering Text!")
        return (
          <div className='py-2 '>
            Set Text
          </div>
        )
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center bg-red-400'>
      <div className='flex flex-row justify-between py-4' style={{ width: '40vw', maxWidth: '400px' }}>
        <img onClick={() => {
          setCurrentScreen(IMAGE_SELECTION)
          setDrawing(false)
        }
        } style={{ width: '10vw', maxWidth: '40px' }} src={Image} />
        <img
          onClick={() => {
            setDrawing(false)
            setCurrentScreen(TEXT_SELECTION)
            addText(dispatch, selectShape)
          }} style={{ width: '10vw', maxWidth: '40px' }} src={Text}
        />
        <img
          onClick={() => {
            setCurrentScreen(LINE_SELECTION)
            setDrawing(true)
          }} style={{ width: '10vw', maxWidth: '40px' }} src={Brush}
        />
      </div>
      {selectedId && renderItem(currItem)}
      {!selectedId && currentScreen === IMAGE_SELECTION
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
      {!selectedId && currentScreen === TEXT_SELECTION
        ? <div className='py-2 '>No Text Selected</div> : null}
      {!selectedId && currentScreen === LINE_SELECTION
        ? <div className='py-2 '>No Line Selected</div> : null}

    </div>

  )
}

export default Toolbar
