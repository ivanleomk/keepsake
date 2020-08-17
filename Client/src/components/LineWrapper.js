import React from 'react'
import { Line, Transformer, Rect } from 'react-konva'
import { DELETE_LINE } from '../actionTypes'

const LineWrapper = ({ item, dispatch, selectShape, selected, itemIndex, edit }) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  React.useEffect(() => {
    if (selected && edit) {
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
    }
  }, [selected])

  if (item.points.length === 0) {
    return null
  } else {
    return (
      <>
        <Line

          key={item.id}
          points={item.points}
          stroke={item.color}
          strokeWidth={item.strokeWidth}
          onDblClick={() => {
            console.log(item.maxx, item.maxy)
            console.log(item.minx, item.miny)
            selectShape(item.id)
          }}
        />
        {selected && <Rect
          ref={shapeRef}
          x={item.minx - 10}
          y={item.miny - 10}
          width={item.maxx - item.minx + 20}
          height={item.maxy - item.miny + 20}
          fill='transparent'
        />}
        {selected && <Transformer rotateEnabled={false} enabledAnchors={[]} ref={trRef} />}
      </>
    )
  }
}

export default LineWrapper
