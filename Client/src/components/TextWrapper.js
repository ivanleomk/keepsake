import React from 'react'
import { Text, Transformer } from 'react-konva'
import { createTextArea, formatTextArea } from '../helperMethods'

const TextWrapper = ({ item, selectShape, selected, dispatch, itemIndex, text }) => {
  // Item Properties
  const { image, x, y, width, height, value, fontSize } = item
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  // TODO: Add react-textfit component to accurately compute size
  React.useEffect(() => {
    if (selected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
    }
  }, [selected])
  // TODO: ADD A TEXT AREA to edit text
  // TODO: Support Roation
  // TODO: Add Line Drawing Support
  return (
    <>
      <Text
        rotation={item.rotation}
        x={x}
        y={y}
        width={width}
        height={height}
        text={value}
        ref={shapeRef}
        fontSize={fontSize}
        onClick={() => selectShape(item.id)}
        onDragEnd={(e) => {
          dispatch({
            type: 'UPDATE_TEXT_POSITION',
            payload: { x: e.target.x(), y: e.target.y(), itemIndex }
          })
        }}
        onDblClick={e => {
          const element = e.target
          const textarea = createTextArea()
          const parentLayer = e.target.parent
          formatTextArea(e, textarea, item)

          setTimeout(() => {
            window.addEventListener('click', removeTextArea)
          })

          function removeTextArea (e) {
            if (e.target !== textarea) {
              textarea.remove()
            }
          }
          textarea.addEventListener('keydown',function(event){
            console.log(event.keyCode)
            if (event.keyCode === 13) {
              const { id } = item
              dispatch({
                type: 'UPDATE_TEXT_CONTENT',
                payload: {
                  itemIndex,
                  value: textarea.value
                }
              })
              textarea.remove()
              e.target.parent.draw()
            }
            if (event.keyCode === 27) {
              textarea.remove()
            }
          })
          
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          node.scaleX(1)
          node.scaleY(1)
          dispatch({
            type: 'UPDATE_TEXT_DIMENSIONS',
            payload: {
              height: Math.max(node.height() * scaleY),
              width: Math.max(5, node.width() * scaleX),
              itemIndex,
              rotation:e.target.rotation()
            }
          })
        }}
        draggable
      />
      {selected && <Transformer 
         ref={trRef} />}
    </>
  )
}

export default TextWrapper
