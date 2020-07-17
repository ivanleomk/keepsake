import React from 'react'
import down from '../assets/down.svg'
import { useSpring } from 'react-spring'

const Hero = (props) => {
  const { bg, title, subtext, explainRef } = props
  const [, setY] = useSpring(() => ({ y: 0, config:{duration:250} }))
  console.log(explainRef)
  return (
    <div
      style={{ paddingLeft: '5vw', paddingRight: '5vw', backgroundImage: `url(${bg})`, height: '95vh', paddingTop: '30vh', paddingBottom: '10vh' }}
      className='flex flex-col items-center justify-between'
    >
      <div className='flex flex-col items-center justify-center text-center'>
        <p className='text-3xl'>{title}</p>
        <p className='text-lg'>{subtext}</p>
        <button
          className='outline-none bg-red-500 px-4 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 '
        >Send A Letter
        </button>
      </div>
      <button
        onClick={() => {
          setY({
            y: explainRef.current.getBoundingClientRect().top,
            reset: true,
            from: { y: window.scrollY },
            onFrame: props => window.scroll(0, props.y)
          })
      }}
        style={{ outline: "None" }} className="bg-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex flex-col items-center justify-center">
      Find Out More
        <img style = {{width:"20px"}} src={down} />
        
      </button>
      </div>
    
  )
}

export default Hero
