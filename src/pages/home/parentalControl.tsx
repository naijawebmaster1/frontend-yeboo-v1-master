import React from 'react'
import Nav from '../../components/base-components/nav/nav'
import Footer from '../../components/base-components/footer/footer'

function ParentalControl() {
  return (
    <div>
        <Nav/>

        <div className='mx-5 md:mx-20 min-h-[600px]'>
            <p className='flex flex-1 justify-center items-center font-bold text-xl py-5'>PARENTAL CONTROL CONSENT</p>
            
            <p className='mt-10'>
            Welcome to <span className='font-bold'>YeBoo Entertainment</span>, an adult entertainment platform designed exclusively for individuals aged 18 and above. 
            </p>

            <p className='py-3'>
            By accessing or using our service, you affirm that you are of legal age in your jurisdiction to view explicit content.
            </p>

            <p>We understand the importance of ensuring that minors are not exposed to adult-oriented materials. As a responsible platform, we strongly encourage parents and legal guardians to take proactive steps in preventing underage access to explicit content.</p>

            <ol>
              <li className='py-3'>
              <span className='font-bold'>1. Age Verification:</span> We have implemented stringent measures to verify the age of our users. Upon registration, we require proof of age through government-issued identification or credit card verification to ensure that only adults access our platform. We urge users not to falsify information during the registration process.
              </li>

              <li >
              <span className='font-bold'>2. Parental Control Tools:</span> As a parent or guardian, you have the ability to control and restrict access to explicit content. We recommend utilizing parental control software or settings available on devices and internet browsers to block access to adult websites. These tools can prevent minors from inadvertently accessing mature content.
              </li>

              <li className='py-3'>
              <span className='font-bold'>3. Educational Resources: </span> We acknowledge the significance of education in promoting online safety. We provide comprehensive resources and guides to assist parents in initiating conversations with their children about responsible internet usage and the potential risks associated with explicit materials. Educating children about the importance of avoiding adult content is a crucial step in safeguarding their online experience.
              </li>

              <li >
              <span className='font-bold'>4. Secure Account Management: </span> To prevent unauthorized access by minors, we emphasize the importance of maintaining secure account management practices. Adults are advised not to share their login credentials with individuals under the age of 18. Implementing a strong password and logging out after each session are simple yet effective measures to prevent unauthorized access to the platform.
              </li>

              <li className='py-3'>
              <span className='font-bold'>5. Reporting and Assistance:</span> We take reports of unauthorized access by minors seriously. If you suspect that a minor has gained access to our platform or if you encounter any inappropriate content, please report it immediately. Our dedicated support team is available to address concerns and provide assistance promptly.
              </li>
            </ol>

            <p>
            <span>In conclusion,</span> we prioritize the safety and well-being of our users, especially minors. We strive to create a secure environment by implementing stringent age verification measures and providing resources for parental control. We urge parents and guardians to actively engage in overseeing their children's online activities to ensure a safe and appropriate browsing experience.Thank you for choosing YeBoo Entertainment .
            </p>

            <p className='py-3'>Together, let's promote responsible internet usage and safeguard minors from exposure to explicit content.</p>
        </div>   

        <Footer/>   
    </div>
  )
}

export default ParentalControl
