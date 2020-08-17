import React from 'react'
import { UPDATE_TEXT_FONT_FAMILY, UPDATE_TEXT_FONT_SIZE, DELETE_TEXT } from '../actionTypes'
import Trash from '../assets/icons/trash.svg'

const TextForm = ({ item, dispatch, selectShape }) => {
  const [fontSize, setFontSize] = React.useState(item.fontSize)
  const [fontFamily, setFontFamily] = React.useState(item.fontFamily)

  return (
    <div className='py-2 flex flex-row items-center justify-center w-full'>
      <select
        value={fontFamily} className='mr-4' onChange={(e) => {
          setFontFamily(e.target.value)
          dispatch({ type: UPDATE_TEXT_FONT_FAMILY, payload: { fontFamily: e.target.value, id: item.id } })
        }}
      >
        <option value='roboto'>Roboto</option>
        <option value='mali'>Mali</option>
        <option value='dancing script'>Dancing</option>
        <option value='Gaegu'>Gaegu</option>
      </select>
      <div>
        <p> Font Size: </p>
        <input
          type='range' min='1' max='300' value={fontSize}
          onChange={(e) => {
            dispatch({ type: UPDATE_TEXT_FONT_SIZE, payload: { id: item.id, fontSize: e.target.value } })
            setFontSize(e.target.value)
          }} class='slider' id='myRange'
        />
      </div>
      <img
        style={{ width: '30px' }} src={Trash} onClick={() => {
          dispatch({ type: DELETE_TEXT, payload: { id: item.id } })
          selectShape(null)
        }}
      />
    </div>
  )
}

export default TextForm
