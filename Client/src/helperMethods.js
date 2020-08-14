import { v4 as uuidv4 } from 'uuid'
import { ADD_IMAGE, ADD_TEXT } from './actionTypes'

export const addText = (dispatch, selectShape) => {
  const id = uuidv4()
  dispatch({ type: ADD_TEXT, payload: { id, width: 50, height: 25, x: 100, y: 100 } })
  selectShape(id)
}

export const addImage = (image, dispatch, selectShape) => {
  const id = uuidv4()
  dispatch({
    type: ADD_IMAGE,
    payload: { image, id, width: 50, height: 50, x: 100, y: 100 }
  })
  selectShape(id)
}

export const handleStageClick = (e, selectShape) => {
  if (e.target === e.target.getStage()) {
    selectShape(null)
  }
}

export const createTextArea = () => {
  var textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  return textarea
}

export const formatTextArea = (e, textarea, item) => {
  const { x, y, width, height, fontSize, value } = item
  console.log(item)

  // Getting Constants
  const textPosition = e.target.getAbsolutePosition()
  const stageBox = e.target.parent.parent.container().getBoundingClientRect()
  var areaPosition = {
    x: stageBox.left + x,
    y: stageBox.top + y
  }
  // Setting Attributes
  textarea.style.position = 'absolute'
  textarea.style.top = areaPosition.y + 'px'
  textarea.style.left = areaPosition.x + 'px'
  textarea.style.width = `${item.width}px`
  textarea.value = item.value

  textarea.style.height = `${item.height}px`
  if (e.target.rotation()) {
    const transform = `rotateZ(${e.target.rotation()}deg)`
    textarea.style.transform = transform
    textarea.style.top = `${areaPosition.y + 0.15 * item.height}px`
    textarea.style.left = `${areaPosition.x - 0.015 * item.width}px`
  }

  // Styling Text Area
  textarea.style.lineHeight = e.target.lineHeight()
  textarea.style.fontFamily = e.target.fontFamily()
  textarea.style.transformOrigin = 'left top'
  textarea.style.textAlign = e.target.align()
  textarea.style.color = e.target.fill()
  textarea.style.overflow = 'hidden'
  textarea.style.outline = 'none'
  textarea.style.resize = 'none'
  textarea.focus()
}
