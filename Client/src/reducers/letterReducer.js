import { ADD_IMAGE, UPDATE_IMAGE_DIMENSIONS, UPDATE_IMAGE_POSITION, ADD_TEXT, UPDATE_TEXT_POSITION,UPDATE_TEXT_DIMENSIONS } from '../actionTypes'

export function reducer (state, action) {
  switch (action.type) {
    case ADD_IMAGE: {
      const { image, id, width, height, x, y } = action.payload
      return state.concat({ type: 'IMAGE', image, id, width, height, x, y })
    }

    case ADD_TEXT: {
      const { id, width, height, x, y } = action.payload
      return state.concat({ type: 'TEXT', id, value: 'Click to edit text',width, height, x, y,fontSize:12 })
    }

    case UPDATE_TEXT_POSITION: {
      const { x, y, itemIndex } = action.payload

      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, x, y } : { ...item }
      )
    }
      
    case UPDATE_TEXT_DIMENSIONS: {
      const { height, width, itemIndex } = action.payload
      const fontSize = 0.05*width + 0.14*height + 0.24*(Math.min(height,width))
      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, height, width,fontSize } : { ...item }
      )
    }

    case UPDATE_IMAGE_POSITION: {
      const { x, y, itemIndex } = action.payload

      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, x, y } : { ...item }
      )
    }

    case UPDATE_IMAGE_DIMENSIONS: {
      const { height, width, itemIndex } = action.payload
      console.log(`item index is ${itemIndex}`)
      console.log(height, width)
      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, height, width } : { ...item }
      )
    }

    default:
      return state
  }
}
