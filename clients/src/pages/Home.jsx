import React from 'react'
import Header from '../components/Header'
import Steps from '../components/steps'
import Description from '../components/description'
import Testimonial from '../components/Testimonial'
import Generatebtn from '../components/Generatebtn'

const Home = () => {
  return (
    <div>
        <Header></Header>
        <Steps/>
        <Description/>
        <Testimonial/>
        <Generatebtn/>
    </div>
  )
}

export default Home