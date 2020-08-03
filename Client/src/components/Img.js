import React from 'react'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'
const Img = ({ dispatch, id, item, shapeProps, selectedId, onSelect, onChange, imageUrl, height,width,x,y }) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()
  const [image] = useImage(imageUrl)
  
  React.useEffect(() => {
    
    if (selectedId===id) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
    }
    else {
      
    }
    
    
  }, [selectedId])
  return (
    <>
      <Image
        onClick={onSelect}
        image={image}
        ref={shapeRef}
        x={x}
        y={x}
        draggable
        onDragEnd={e => {
          console.log(e.target.x())
          console.log(e.target.y())
          onChange({
            ...shapeProps,
            height: e.target.height(),
            width: e.target.width(),
            x: e.target.x(),
            y: e.target.y()
          })
        }}
        onTransformEnd={e => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY
          })
        }}
      />
      {selectedId===id && <Transformer ref={trRef} />}
    </>
  )
}
export default Img
