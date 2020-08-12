// Library Imports
import React, { useReducer, useState, useRef } from 'react'
import { Stage, Layer, Rect, Image } from 'react-konva'

// Component Imports
import ComponentWrapper from './ComponentWrapper'
import Toolbar from './Toolbar'

// Reducer Imports
import { reducer } from '../reducers/letterReducer'

// Helper Methods
import { handleStageClick } from '../helperMethods'

// Hook Imports
import useWindowSize from '../hooks/useWindowSize'

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

  // ComponentDidMount methods
  React.useEffect(
    () => {
      const newWidth = width > 600 ? 600 : 0.6 * width
      const newHeight = height > 600 ? 600 : 0.6 * height
      setContainerHeight(newHeight)
      setContainerWidth(newWidth)
    }
    , [height, width])

  return (
    <div style={{ height: '60vh' }}>
      <Stage
        ref={stageEl}
        width={containerWidth}
        height={containerHeight}
        style={{ border: '1px solid black' }}
        onMouseDown={(e) => handleStageClick(e, selectShape)}
      >
        <Layer>
          {items.map((item, itemIndex) => <ComponentWrapper selectShape={selectShape} item={item} itemIndex={itemIndex} dispatch={dispatch} selectedId={selectedId} />)}
        </Layer>
      </Stage>
      <Toolbar dispatch={dispatch} selectShape={selectShape} />
    </div>
  )
}

export default Letter
