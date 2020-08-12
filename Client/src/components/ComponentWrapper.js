import React from 'react'

// Component Imports
import ImageWrapper from './ImageWrapper'
import TextWrapper from './TextWrapper'

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
  }
}

export default ComponentWrapper
