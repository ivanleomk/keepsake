import React from 'react'
import { Line } from 'react-konva'

// Component Imports
import ImageWrapper from './ImageWrapper'
import TextWrapper from './TextWrapper'
import LineWrapper from './LineWrapper'

const ComponentWrapper = ({ item, itemIndex, selectShape, dispatch, selectedId }) => {
  switch (item.type) {
    case 'IMAGE': {
      return (
        <ImageWrapper
          item={item}
          key={itemIndex}
          selectShape={selectShape}
          selected={item.id === selectedId}
          itemIndex={itemIndex}
          dispatch={dispatch}
        />
      )
    }
    case 'TEXT': {
      return (
        <TextWrapper
          item={item}
          key={itemIndex}
          selectShape={selectShape}
          selected={item.id === selectedId}
          itemIndex={itemIndex}
          dispatch={dispatch}
        />
      )
    }
    case 'LINE': {
      return (
        <LineWrapper
          key={itemIndex}
          item={item}
          selectShape={selectShape}
          selected={item.id === selectedId}
          itemIndex={itemIndex}
          dispatch={dispatch}
        />
      )
    }
  }
}

export default ComponentWrapper
