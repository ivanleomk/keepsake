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

export const saveInformation = (e, dispatch, item,textarea) => {
  
  if (e.keycode === 13 && !e.shiftKey) {
    const { id } = item
    dispatch({
      type: "UPDATE_TEXT_CONTENT",
      payload: {
        id,
        value: textarea.value
      }
    })
  }
  
}


export const formatTextArea = (e, textarea, item) => {
  //Format References
  const element = e.target
  const textPosition = e.target.getAbsolutePosition()
  const stageBox = e.target.parent.parent.container().getBoundingClientRect()

  var areaPosition = {
    x: stageBox.left + textPosition.x,
    y: stageBox.top + textPosition.y
  }
  
  //Format Textarea
  textarea.value = e.target.text()
  textarea.style.position = 'absolute'
  textarea.style.top = areaPosition.y + 'px'
  textarea.style.left = areaPosition.x + 'px'
  textarea.value = e.target.text()
  textarea.style.width = `${0.97*item.width}px`
  textarea.style.height = `${0.97*item.height}px`
  textarea.style.border = '1 px solid'
  textarea.style.padding = '5px'
  textarea.style.margin = '3px 3px'
  textarea.style.overflow = 'hidden'
  textarea.style.outline = 'none'
  textarea.style.resize = 'none'
  textarea.focus()
  textarea.fontSize = `${item.fontSize}`
  textarea.style.lineHeight = e.target.lineHeight()
  textarea.style.fontFamily = e.target.fontFamily()
  textarea.style.transformOrigin = 'left top'
  textarea.style.textAlign = e.target.align()
  textarea.style.color = e.target.fill()
}