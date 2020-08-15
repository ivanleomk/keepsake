import { ADD_IMAGE, UPDATE_IMAGE_DIMENSIONS, UPDATE_IMAGE_POSITION, ADD_TEXT, UPDATE_TEXT_POSITION, UPDATE_TEXT_DIMENSIONS, UPDATE_TEXT_CONTENT, ADD_LINE, UPDATE_LINE_POINTS, DELETE_LINE, UPDATE_LINE_COLOR, UPDATE_LINE_WIDTH, UPDATE_TEXT_FONT_FAMILY,UPDATE_TEXT_FONT_SIZE,DELETE_TEXT, DELETE_IMAGE } from '../actionTypes'

export function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case ADD_IMAGE: {
      const { image, id, width, height, x, y } = action.payload
      return state.concat({ type: 'IMAGE', image, id, width, height, x, y })
    }

    case ADD_TEXT: {
      const { id, width, height, x, y } = action.payload
      return state.concat({ type: 'TEXT', id, value: 'Click to edit text', width, height, x, y, fontSize: 12,rotation:0,fontFamily:"Roboto" })
    }

    case ADD_LINE: {
      const { id, points } = action.payload
      return state.concat({
        type: 'LINE',
        id,
        maxy:-Infinity,
        maxx:-Infinity,
        miny:Infinity,
        minx:Infinity,
        points,
        strokeWidth: 5,
        color: "#000000"
      })
    }

    case UPDATE_TEXT_POSITION: {
      const { x, y, itemIndex } = action.payload

      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, x, y } : { ...item }
      )
    }
      
    case UPDATE_TEXT_FONT_FAMILY: {
      const { fontFamily, id } = action.payload
      return state.map((item, mapIndex) =>
        item.id===id ? { ...item, fontFamily } : { ...item }
      )
    }
      
    case UPDATE_TEXT_FONT_SIZE: {
      const { fontSize, id } = action.payload
      return state.map((item, mapIndex) =>
      item.id===id ? { ...item, fontSize } : { ...item }
    )
    }

    case UPDATE_TEXT_CONTENT: {
      const { itemIndex, value } = action.payload
      console.log(value)
      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, value } : { ...item }
      )
    }

    case UPDATE_TEXT_DIMENSIONS: {
      const { height, width, itemIndex,rotation } = action.payload
      const fontSize = 0.05 * width + 0.14 * height + 0.24 * (Math.min(height, width))
      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, height, width, fontSize,rotation } : { ...item }
      )
    }

    case UPDATE_IMAGE_POSITION: {
      const { x, y, itemIndex } = action.payload

      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, x, y } : { ...item }
      )
    }

    case UPDATE_IMAGE_DIMENSIONS: {
      const { height, width, itemIndex,rotation} = action.payload
      return state.map((item, mapIndex) =>
        itemIndex === mapIndex ? { ...item, height, width,rotation } : { ...item }
      )
      
    }

    case UPDATE_LINE_POINTS: {
      const { id, points } = action.payload
      const [x, y] = points
      


      return state.map((item, mapIndex) =>
        item.id === id ? {
          ...item,
          points: item.points.concat([...points]),
          maxy: Math.max(item.maxy, y),
          miny: Math.min(item.miny, y),
          maxx: Math.max(item.maxx, x),
          minx: Math.min(item.minx, x),
        } : { ...item }
      )
    }
    
    case UPDATE_LINE_COLOR: {
      const { id, color } = action.payload
      return state.map((item, itemIndex) => item.id === id ? {
        ...item, color
      } : {...item}
      )
    }
      
    case UPDATE_LINE_WIDTH: {
      const { id, strokeWidth } = action.payload
      return state.map((item, itemIndex) => item.id === id ? {
        ...item, strokeWidth
      } : {...item}
      )
    }

    case DELETE_LINE: {
      const { id } = action.payload
      console.log("deleting",id)
      return state.filter(item => item.id !== id)
    }
    
    case DELETE_TEXT: {
      const { id } = action.payload
      return state.filter(item => item.id !== id)
    }
    
    case DELETE_IMAGE: {
      const { id } = action.payload
      return state.filter(item=>item.id!==id)
    }

    default:
      console.log("We defauled to this")
      return state
  }
}
