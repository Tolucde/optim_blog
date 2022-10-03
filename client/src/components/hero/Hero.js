import React from 'react'
import bulb from '../../assets/bulb.jpg'
import sun from '../../assets/sun.jpg'
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeftTwoTone'
import ArrowRight from '@material-ui/icons/KeyboardArrowRightTwoTone'
import './hero.scss'
import HeroHeadline from './heroHeadline/HeroHeadline'

const Hero = () => {
  return (
    <section className='heroContainer'>
      <section className='hero'>
        <div className='hero__image'>
          <img src={bulb} alt='herojpg' />
          <HeroHeadline />
        </div>

        <div className='hero__slider'>
          <div className='hero__slider__image'>
            <img src={sun} alt='sunjpg' />
          </div>
          <div className='hero__slider__actions'>
            <ArrowLeft className='hero__slider__actions__arrow Left' />
            <ArrowRight className='hero__slider__actions__arrow Left' />
          </div>
        </div>
      </section>
    </section>
  )
}

export default Hero
