import React from 'react'
import { Text, Transformer } from 'react-konva'
import useImage from 'use-image'

const REMOVE_ITEM = 'REMOVE_ITEM'

const TextField = ({ item, shapeProps, isSelected, onSelect, x,y,text, onChange, dispatch, selectedId }) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current)
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Text
        text={text}
        ref={shapeRef}
        onClick={onSelect}
        draggable
        x={x}
        y={y}
        onDragEnd={e => {

        }}
        onDblClick={e => {
          const removeItems = (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
              dispatch({ type: REMOVE_ITEM, payload: { id: selectedId } })
            }
          }
          
          const element = e.target
          const textPosition = e.target.getAbsolutePosition()
          const parentLayer = e.target.parent
          const parentStage = e.target.parent.parent
          const stageBox = e.target.parent.parent.container().getBoundingClientRect()
          var areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y
          }
          var textarea = document.createElement('textarea')
          document.body.appendChild(textarea)

          textarea.value = e.target.text()

          textarea.style.position = 'absolute'
          textarea.style.top = areaPosition.y + 'px'
          textarea.style.left = areaPosition.x + 'px'
          if (item.width) {
            console.log(item.width)
            textarea.style.width = `${item.width * 4}px`
            textarea.style.height = `${item.width * 2}px`
          } else {
            textarea.style.width = '100px'
          }

          console.log(textarea.style.width)

          textarea.style.border = 'none'
          textarea.style.padding = '5px'
          textarea.style.margin = '0px'
          textarea.style.overflow = 'hidden'
          textarea.style.outline = 'none'
          textarea.style.resize = 'none'
          textarea.focus()
          textarea.style.lineHeight = e.target.lineHeight()
          textarea.style.fontFamily = e.target.fontFamily()
          textarea.style.transformOrigin = 'left top'
          textarea.style.textAlign = e.target.align()
          textarea.style.color = e.target.fill()

          setTimeout(() => {
            window.addEventListener('click', removeTextArea)
          })

          function removeTextArea (e) {
            if (e.target !== textarea) {
              textarea.remove()
            }
          }

          textarea.addEventListener('keydown', function (e) {
            if (e.keyCode === 13 && !e.shiftKey) {
              dispatch({ type: 'UPDATE_TEXT_CONTENT', payload: { id: selectedId, content: textarea.value } })

              element.textArr[0].text = textarea.value
              textarea.remove()
              parentLayer.draw()
              
            }
            if (e.keyCode === 27) {
              textarea.remove()
              
            }
          })
        }}
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
      {isSelected && <Transformer ref={trRef} />}
    </>
  )
}
export default TextField
