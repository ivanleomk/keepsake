// Library Imports
import React, { useReducer, useState, useRef } from 'react'
import { Stage, Layer, Rect, Image, Line } from 'react-konva'
import { v4 as uuidv4 } from 'uuid'

// Component Imports
import ComponentWrapper from './ComponentWrapper'
import Toolbar from './Toolbar'
import server from '../api/server'

// Reducer Imports
import { reducer } from '../reducers/letterReducer'

// Helper Methods
import { handleStageClick } from '../helperMethods'

// Hook Imports
import useWindowSize from '../hooks/useWindowSize'
import { ADD_LINE, UPDATE_LINE_POINTS, SET_INITIAL_STATE } from '../actionTypes'

const Letter = ({ edit, id }) => {
  // Reducer State
  const [items, dispatch] = useReducer(reducer, [])

  // React Refs
  const stageEl = React.createRef()
  const layerEl = React.createRef()
  const backgroundRect = React.createRef()

  // Local State
  const [selectedId, selectShape] = useState(null)
  const [width, height] = useWindowSize()
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  // Drawing Specific State
  const [drawing, setDrawing] = useState(false)
  const [isDrawing, startDrawing] = useState(false)
  const [tempId, setTempId] = useState(null)

  // ComponentDidMount methods
  React.useEffect(
    () => {
      const newWidth = width > 600 ? 600 : 0.6 * width
      const newHeight = height > 600 ? 600 : 0.6 * height
      setContainerHeight(newHeight)
      setContainerWidth(newWidth)
    }
    , [height, width])

  // InitialDownload Of Card Content
  React.useEffect(() => {
    server.post('/getCard', { id })
      .then(({ data }) => {
        console.log(data)
        const { metadata } = data[0]
        console.log(metadata)
        const newState = JSON.parse(metadata).items
        dispatch({ type: SET_INITIAL_STATE, payload: { newState } })
      })
      .catch(err => console.log(err))
  }, [])

  const handleUpload = (e) => {
    server.post('/saveCard', { id, metadata: items })
      .then((res) => console.log(res))
      .catch(err => console.log(err))
  }

  const handleDownload = (e) => {
    const dataURL = stageEl.current.toDataURL({ pixelRatio: 3 })
    const link = document.createElement('a')
    link.download = 'letter.png'
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <div style={{ height: '60vh' }}>
      {edit ? <button className='border' onClick={(e) => handleUpload(e)}>Save Card</button> : null}
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
                points: []
              }
            })
            startDrawing(true)
          } else {
            handleStageClick(e, selectShape, backgroundRect.current)
          }
        }}
        onMouseMove={(e) => {
          if (isDrawing) {
            const { x, y } = e.target.getStage().getPointerPosition()
            console.log(tempId)
            console.log('Drawing')
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
          <Rect ref={backgroundRect} x={0} y={0} width={containerWidth} height={containerHeight} fill='white' />
          {items.map((item, itemIndex) => <ComponentWrapper edit={edit} selectShape={selectShape} item={item} itemIndex={itemIndex} dispatch={dispatch} selectedId={selectedId} />)}
        </Layer>
      </Stage>
      {edit ? <Toolbar items={items} dispatch={dispatch} setDrawing={setDrawing} selectShape={selectShape} selectedId={selectedId} /> : null}

    </div>
  )
}

export default Letter
