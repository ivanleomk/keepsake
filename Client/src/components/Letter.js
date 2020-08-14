// Library Imports
import React, { useReducer, useState, useRef } from 'react'
import { Stage, Layer, Rect, Image, Line } from 'react-konva'
import { v4 as uuidv4 } from 'uuid'

// Component Imports
import ComponentWrapper from './ComponentWrapper'
import Toolbar from './Toolbar'

// Reducer Imports
import { reducer } from '../reducers/letterReducer'

// Helper Methods
import { handleStageClick } from '../helperMethods'

// Hook Imports
import useWindowSize from '../hooks/useWindowSize'
import { ADD_LINE, UPDATE_LINE_POINTS } from '../actionTypes'

const Letter = () => {
  // Reducer State
  const [items, dispatch] = useReducer(reducer, [])

  // React Refs
  const stageEl = React.createRef()
  const layerEl = React.createRef()

  // Local State
  const [selectedId, selectShape] = useState(null)
  const [width, height] = useWindowSize()
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  // Drawing Specific State
  const [drawing, setDrawing] = useState(true)
  const [isDrawing, startDrawing] = useState(false)
  const [tempId,setTempId] = useState(null)

  // ComponentDidMount methods
  React.useEffect(
    () => {
      const newWidth = width > 600 ? 600 : 0.6 * width
      const newHeight = height > 600 ? 600 : 0.6 * height
      setContainerHeight(newHeight)
      setContainerWidth(newWidth)
    }
    , [height, width])
  console.log(items)
  return (
    <div style={{ height: '60vh' }}>
      <Stage
        ref={stageEl}
        width={containerWidth}
        height={containerHeight}
        style={{ border: '1px solid black' }}
        onMouseDown={(e) => {
          if (drawing) {
            const id = uuidv4()
            setTempId(id)
            dispatch({
              type: ADD_LINE,
              payload: {
                id,
                points:[]
              }
            })
            startDrawing(true)
            
          } else {
            handleStageClick(e, selectShape)
          }
        }}
        onMouseMove={(e) => {
          if (isDrawing) {
            const { x, y } = e.target.getStage().getPointerPosition()
            console.log(tempId)
            console.log("Drawing")
            dispatch({ type: UPDATE_LINE_POINTS, payload: { id: tempId, points: [x, y] } })
          }
        }}
        onMouseUp={(e) => {
          if (isDrawing) {
            startDrawing(false)
            setDrawing(false)
          }
        }}
      >
        <Layer>
          {items.map((item, itemIndex) => <ComponentWrapper selectShape={selectShape} item={item} itemIndex={itemIndex} dispatch={dispatch} selectedId={selectedId} />)}
        </Layer>
      </Stage>
      <Toolbar dispatch={dispatch} setDrawing={setDrawing} selectShape={selectShape} />
    </div>
  )
}

export default Letter
