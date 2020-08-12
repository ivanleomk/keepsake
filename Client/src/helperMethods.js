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
