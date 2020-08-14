import React from 'react'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'

const ImageWrapper = ({ item, selectShape, selected, dispatch, itemIndex }) => {
  const { image, x, y, width, height } = item
  const [imageSrc] = useImage(image)

  const shapeRef = React.useRef()
  const trRef = React.useRef()

  React.useEffect(() => {
    if (selected) {
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
    }
  }, [selected])

  return (
    <>
      <Image
        image={imageSrc}
        onClick={() => selectShape(item.id)}
        x={x}
        y={y}
        width={width}
        height={height}
        onDragEnd={(e) => {
          dispatch({
            type: 'UPDATE_IMAGE_POSITION',
            payload: { x: e.target.x(), y: e.target.y(), itemIndex }
          })
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          console.log(e)
          node.scaleX(1)
          node.scaleY(1)
          dispatch({
            type: 'UPDATE_IMAGE_DIMENSIONS',
            payload: {
              height: Math.max(node.height() * scaleY),
              width: Math.max(5, node.width() * scaleX),
              itemIndex,
              rotation:e.target.rotation()
            }
          })
        }}
        ref={shapeRef}
        width={width}
        height={height}
        draggable
      />
      {selected && <Transformer ref={trRef} />}
    </>
  )
}

export default ImageWrapper
