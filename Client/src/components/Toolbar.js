// Library Imports
import React from 'react'

// Static Resources
import smiley from '../assets/smiley.png'
import groot from '../assets/groot.svg'
import goodVibes from '../assets/goodVibes.svg'
import cuteCat from '../assets/cuteCat.svg'
import bears from '../assets/barebears.png'
import alien from '../assets/alien.png'
import Trash from '../assets/icons/trash.svg'


// Icon Imports
import Image from '../assets/icons/image.svg'
import Text from '../assets/icons/text.svg'
import Brush from '../assets/icons/brush.svg'

// Defined Action Types
import { LINE_SELECTION, TEXT_SELECTION, IMAGE_SELECTION, ADD_TEXT,DELETE_IMAGE } from '../actionTypes'

// Helper Methods
import { addImage, addText } from '../helperMethods'


//Component Imports
import LineForm from './LineForm'
import TextForm from './TextForm';

const Toolbar = ({ dispatch, selectShape, setDrawing,items,selectedId }) => {
  const [currentScreen, setCurrentScreen] = React.useState(null)
  let currItem = items.filter(item => item.id === selectedId)
  
  //Form-Specific State
  const [strokeWidth,setWidth] = React.useState(5)
  
  //TODO: Create Serialization methods to store to JSON file online
  //TODO: Create method to authenticate
  
  
  const renderItem = (item) => {
    if (item.length>0) {
      switch (item[0].type) {
        case 'LINE':
          {return (
            <LineForm selectShape={selectShape} item={item[0]} dispatch={dispatch}/>
          )
          }
        case 'IMAGE': {
          return (
            <div className='py-2 '>
              <img src={Trash} style={{ width: "30px" }} onClick={(e) => {
                dispatch({ type: DELETE_IMAGE, payload: { id: item[0].id } })
                selectShape(null)
              }} />
            </div>
          )
        }
        case 'TEXT': {
          return (
            <TextForm selectShape={selectShape} item = {item[0]} dispatch={dispatch} />
          )
        }
      }  
    }
    else {
      return null
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
