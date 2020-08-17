import React from 'react'
import { useHistory } from 'react-router-dom'
import Letter from '../components/Letter'

const CardComponent = ({ item }) => {
  const history = useHistory()
  console.log(item.id)
  return (
    <div
      class='hover:shadow-xl max-w-sm rounded overflow-hidden shadow-lg cursor-pointer m-6 ' onClick={() => {
        history.push(`/letter/${item.id}`)
      }}
    >
      <Letter edit={false} id={item.id} />
    </div>
  )
}

export default CardComponent
