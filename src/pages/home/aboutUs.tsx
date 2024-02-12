import React from 'react'
import Nav from '../../components/base-components/nav/nav'
import Footer from '../../components/base-components/footer/footer'

function AboutUs() {
  return (
    <div>
        <Nav/>

        <div className='mx-5 md:mx-20 min-h-[600px]'>
            <p className='font-bold text-xl'>ABOUT US</p>

            <p className='flex flex-1 justify-center items-center'>THE ABOUT US GOES HEREEEE</p>
            
        </div>   

        <Footer/>   
    </div>
  )
}

export default AboutUs
