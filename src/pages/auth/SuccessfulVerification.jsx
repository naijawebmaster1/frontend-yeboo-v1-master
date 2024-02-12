import React from 'react';
import myLogo from './img/yeboo.png';
import successImg from './img/Sucessful.png';
import { Link } from 'react-router-dom';


function SuccessfulVerification() {
  return (
<section className={`w-screen h-screen justify-center flex items-center flex-col`}>
<img className="yeboo" src={myLogo} alt="yeboo" />
<div className='flex justify-center items-center flex-col text-center'>
  <img src={successImg} alt="yeboo2" />
  <h2 className='text-2xl font-bold'>Congratulations!</h2>
  <p className='py-5 text-sm'>Congratulations! your Account Verification was Successful. Welcome aboard!</p>
</div>
<Link to='/auth/about-yourself'>
  <div> 
    <button type="button" className='cursor-pointer rounded-xl py-3 px-28 md:px-40 bg-[#800020] text-white font-bold w-full' >
    Proceed
      </button>
  </div>
</Link>
</section>
  );
}

export default SuccessfulVerification;
