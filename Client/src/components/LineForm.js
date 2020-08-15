import React from 'react'
import { CompactPicker } from 'react-color'
import { UPDATE_LINE_COLOR, UPDATE_LINE_WIDTH, DELETE_LINE } from '../actionTypes'
import Trash from '../assets/icons/trash.svg'

const LineForm = ({item,dispatch,selectShape}) => {
    const [strokeWidth, setWidth] = React.useState(item.strokeWidth)
    const [color, setColor] = React.useState(item.color)
    console.log(color)
    return (
        <div className='py-2 flex flex-row items-center justify-between px-20 w-full'>
            <div>
                <p> Stroke Width: </p>
                <input type="range" min="1" max="50" value={strokeWidth}
                    onChange={(e) => {
                        dispatch({type:UPDATE_LINE_WIDTH,payload:{strokeWidth:e.target.value,id:item.id}})
                        setWidth(e.target.value)
                    }} class="slider" id="myRange"></input>
            </div>
            <CompactPicker onChange={(e) => {
                dispatch({type:UPDATE_LINE_COLOR,payload:{color:e.hex,id:item.id}})
                setColor(e.hex)
            }} color={color} />
            <img style={{ width: "30px" }} src={Trash} onClick={() => {
                dispatch({ type: DELETE_LINE, payload: { id: item.id } })
                selectShape(null)
            }} />
          </div>
    )
}

export default LineForm
