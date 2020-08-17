import React, { Component } from 'react'
import Hero from '../components/Hero'
import LandingPageHeader from '../components/Header'
import { useSpring } from 'react-spring'
import InfographicItem from '../components/InfographicItem'
import Footer from '../components/Footer'

import HeroBg from '../assets/Hero.svg'

import time from '../assets/time.svg'
import typewriter from '../assets/typewriter.svg'
import message from '../assets/message.svg'

const headerItems = [
  {
    header: 'Create A Letter',
    text: "Show your creativity in any way. Write, draw, add stickers and photos. Make your letter as outlandish or as plain as you'd like. Customise it to your heart's content!",
    img: typewriter
  },
  {
    header: 'Set a time',
    text: 'The best things in life are worth waiting for. Just like physical mail, our letters will take time to be sent.',
    img: time
  },
  {
    header: 'Send It Out',
    text: "What are letters if not to be kept?  They'll be able to save it to their virtual keepsake box, so they can look at it whenver they want. You can also send them a physical copy of your letter.",
    img: message
  }
]

const Main = () => {
  const explanation = React.useRef()

  return (
    <>
      <div >
        <LandingPageHeader />
        <Hero bg={HeroBg} title='Your Love Made Digital' subtext="We'll travel the distance for you" explainRef={explanation} />
        <div style={{width: '100vw', paddingTop: '30px' }} className='flex flex-col items-center justify-center mb-4'>
          <h1 className='text-3xl text-bold'>How It Works!</h1>
          <hr />
          <div ref={explanation} className='pictures'>
            {headerItems.map((item, itemIndex) => {
              return (
                <InfographicItem header={item.header} text={item.text} image={item.img} index={itemIndex} />
              )
            }
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Main
