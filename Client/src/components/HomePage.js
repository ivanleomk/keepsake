import React, { useContext } from 'react'
import { RootContext } from '../context/Auth'
import server from '../api/server'
import CardComponent from './CardComponent'
import Plus from '../assets/icons/plus.svg'
import { useHistory } from "react-router-dom";

const HomePage = ({ props }) => {
  const { user } = useContext(RootContext)
  const { name, email } = user
  const [cards, setCards] = React.useState([])
  const history = useHistory()

  React.useEffect(
    () => {
      server.post('/loadCards', { email })
        .then(({ data }) => {
          setCards(data)
          console.log(data)
        })
        .catch((err) => console.log(err))
    }
    , [])

  const createCard = (e) => {
    e.preventDefault()
    server.post('/createCard', { email })
      .then(({ data }) => {
        history.push(`/letter/${data.id}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="m-10">
      <div className = "mb-4 flex items-center">
        
        <p className="text-bold text-xl">Your Cards</p>
        <button className="ml-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={(e) => createCard(e)}><img style={{width:"30px", marginRight:"20px"}} src={Plus} />Create Card</button>
      </div>
      
      <div className = "flex flex-row flex-wrap">
        
      {cards.map(item => <CardComponent item={item} />)}
      </div>
      
      
    </div>
  )
}

export default HomePage
