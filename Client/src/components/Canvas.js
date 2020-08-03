import React, { useState, useRef, useReducer } from 'react'
import { Stage, Layer } from 'react-konva'
import Image from './Img'

//Image Imports
import groot from '../assets/groot.svg'
import goodVibes from '../assets/goodVibes.svg'
import cuteCat from '../assets/cuteCat.svg'
import bears from '../assets/barebears.png'
import alien from '../assets/alien.png'
import smiley from '../assets/smiley.png'

import TextField from './TextField'

const uuidv1 = require('uuid/v1')

const ADD_IMAGE = 'ADD_IMAGE'
const UPDATE_IMAGE = 'UPDATE_IMAGE'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADD_TEXT = 'ADD_TEXT'
const UPDATE_TEXT = 'UPDATE_TEXT'
const UPDATE_TEXT_CONTENT = 'UPDATE_TEXT_CONTENT'

function reducer (state, action) {
  switch (action.type) {
    case ADD_IMAGE: {
      const { image, id,width,height,x,y } = action.payload
      return state.concat({ type: 'IMAGE', image, id , width,height ,x,y})
    }

    case UPDATE_IMAGE: {
      const { x, y, width, height, id } = action.payload
      return state.map(item => item.id === id ? { ...item, x: x, y: y, width: width, height: height } : { ...item })
    }

    case ADD_TEXT: {
      const { id } = action.payload
      return state.concat({ type: 'TEXT', id, value: 'Click to edit text' })
    }

    case UPDATE_TEXT_CONTENT: {
      const { id, content } = action.payload
      return state.map(item => item.id === id ? { ...item, value: content } : { ...item })
    }

    case UPDATE_TEXT: {
      const { x, y, width, height, id } = action.payload
      return state.map(item => item.id === id ? { ...item, x: x, y: y, width: width, height: height } : { ...item })
    }

    case REMOVE_ITEM: {
      const { id } = action.payload
      console.log(action)
      console.log('Removing Item')
      console.log(id)
      return state.filter(item => item.id !== id)
    }

    default:
      return state
  }
}

function HomePage () {
  // Combined Shapes
  const [items, dispatch] = useReducer(reducer, [])

  // Currently Selected ELement
  const [selectedId, selectShape] = useState(null)
  console.log(items.filter(item => item.id===selectedId)[0])
  const [, updateState] = React.useState()
  const [editing,setEditing] = React.useState(false)
  const stageEl = React.createRef()
  const layerEl = React.createRef()
  const fileUploadEl = React.createRef()

  const drawImage = () => {
    fileUploadEl.current.click()
  }

  const forceUpdate = React.useCallback(() => updateState({}), [])

  const addImage = (image) => {
    const id = uuidv1()
    dispatch({ type: 'ADD_IMAGE', payload: { image, id ,width:50,height:50,x:100,y:100} })
    selectShape(id)
  }

  const fileChange = ev => {
    const file = ev.target.files[0]
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        const id = uuidv1()
        dispatch({ type: 'ADD_IMAGE', payload: { image: reader.result, id } })
        selectShape(id)
        forceUpdate()
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  console.log(items)
  const renderItems = (item) => {
    switch (item.type) {
      case 'IMAGE':
        return (
          <Image
            dispatch={dispatch}
            key={item.id}
            id={item.id}
            width={item.width}
            height={item.height}
            imageUrl={item.image}
            selectedId={selectedId}
            x={item.x}
            y={item.y}
            onSelect={() => {
              selectShape(item.id)
            }}
            onChange={newAttrs => {
              console.log(newAttrs)
              const { x, y, width, height } = newAttrs

              dispatch({
                type: UPDATE_IMAGE,
                payload: {
                  x,
                  y,
                  width,
                  height,
                  id: item.id
                }
              })
            }}
          />
        )
      case 'TEXT':
        return (
          <TextField
            key={item.id}
            item={item}
            text={item.value}
            x={item.x}
            y = {item.y}
            selectedId={selectedId}
            isSelected={item.id === selectedId}
            onSelect={() => {
              selectShape(item.id)
            }}
            dispatch={dispatch}
            onChange={newAttrs => {
              const { x, y, width, height } = newAttrs
              dispatch({
                type: UPDATE_TEXT,
                payload: {
                  x,
                  y,
                  width,
                  height,
                  id: item.id
                }
              })
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div style = {{maxWidth:"1000px"}}>
      <h1>Whiteboard</h1>
      <div className="flex flex-row items-start justify-start">
        <img  style={{width:"80px", height:"80px"}}className = "max-w-xs" src={groot} onClick={() => addImage(groot)} />
        <img style={{ width: "80px", height:"80px" }} className="max-w-xs" src={goodVibes} onClick={() => addImage(goodVibes)} /> 
        <img style={{ width: "80px", height: "80px" }} className="max-w-xs" src={cuteCat} onClick={() => addImage(cuteCat)} /> 
        <img style={{ width: "80px", height: "80px" }} className="max-w-xs" src={alien} onClick={() => addImage(alien)} /> 
        <img style={{ width: "80px", height: "80px" }} className="max-w-xs" src={smiley} onClick={() => addImage(smiley)} /> 
        <img style={{ width: "80px", height: "80px" }} className="max-w-xs" src={bears} onClick={() => addImage(bears)} /> 
      </div>
      
      <button onClick={() => drawImage()}>Upload Image</button>
      
      <button onClick={() => dispatch({ type: ADD_TEXT, payload: { id: uuidv1() } })}>Add Text</button>
      <div className = "bg-red-400 py-6">
      {selectedId ? <button onClick={()=>dispatch({ type: REMOVE_ITEM, payload: { id: selectedId } })}>Delete Item</button> : <div></div>}
      </div>
      
      <input
        style={{ display: 'none' }}
        type='file'
        ref={fileUploadEl}
        onChange={fileChange}
      />
      <Stage
        width={1000}
        height={1000}
        ref={stageEl}
        className = "border"
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage()
          if (clickedOnEmpty) {
            selectShape(null)
          }
        }}
        onKeyPress={(e) => {
          console.log(e.key)
        }}
      >
        <Layer  className = "border" ref={layerEl}>
          {items.map(item => renderItems(item))}

        </Layer>
      </Stage>
    </div>
  )
}
export default HomePage
