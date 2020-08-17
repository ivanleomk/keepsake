import React from 'react'
import { Line } from 'react-konva'

// Component Imports
import ImageWrapper from './ImageWrapper'
import TextWrapper from './TextWrapper'
import LineWrapper from './LineWrapper'

const ComponentWrapper = ({ item, itemIndex, selectShape, dispatch, selectedId, edit }) => {
  switch (item.type) {
    case 'IMAGE': {
      return (
        <ImageWrapper
          edit={edit}
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
          edit={edit}
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
          edit={edit}
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
