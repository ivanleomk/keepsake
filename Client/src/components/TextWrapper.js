import React from 'react'
import { Text, Transformer } from 'react-konva';
import {textfit} from 'textfit';

const TextWrapper = ({ item, selectShape, selected, dispatch, itemIndex, text }) => {
  // Item Properties
  const { image, x, y, width, height, value,fontSize } = item
  const shapeRef = React.useRef()
  const trRef = React.useRef()
  
  React.useEffect(() => {
    if (selected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
    }
  }, [selected])
  //TODO: ADD A TEXT AREA to edit text
    //TODO: Support Roation
    //TODO: Add Line Drawing Support
  return (
    <>
      <Text
        x={x}
        y={y}
        width={width}
        height={height}
        text={value}
              ref={shapeRef}
              fontSize = {fontSize}
        onClick={() => selectShape(item.id)}
        onDragEnd={(e) => {
          dispatch({
            type: 'UPDATE_TEXT_POSITION',
            payload: { x: e.target.x(), y: e.target.y(), itemIndex }
          })
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          node.scaleX(1)
            node.scaleY(1)
            console.log(e.target)
          dispatch({
            type: 'UPDATE_TEXT_DIMENSIONS',
            payload: {
              height: Math.max(node.height() * scaleY),
              width: Math.max(5, node.width() * scaleX),
              itemIndex
            }
          })
        }}
        draggable
      />
      {selected && <Transformer ref={trRef} />}
    </>
  )
}

export default TextWrapper
