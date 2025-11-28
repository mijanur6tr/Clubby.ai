import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'
import Plan from '../components/Plan.jsx'



const  Home= (props) => {
  return(
    <div>
     <Navbar/>
     <Hero/>
     <Features/>
    <Plan/>
     <Footer/>
    </div>
   )
  }

  
export default Home;
