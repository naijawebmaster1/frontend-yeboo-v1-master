import React, {useEffect} from 'react';
import myLogo from './img/yeboo.png';
import congratsImg from './img/congrats.png';
import { Link, useNavigate } from 'react-router-dom';

function Congratulations() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/auth/login')
    }, 3000)
  }, [])

  return (
    <section className={`w-screen h-screen justify-center flex items-center flex-col`}>
      <img className="yeboo" src={myLogo} alt="yeboo" />
      <div className='flex justify-center items-center flex-col text-center'>
        <img src={congratsImg} alt="yeboo2" />
        <h2 className='text-2xl font-bold'>Congratulations!</h2>
        <p className='py-5 text-sm'>You're just one step away. You will be redirected <br />to login and share more about yourself</p>
      </div>

      <Link to='/auth/login'>
          <div>
            <button type="button" className='cursor-pointer rounded-xl py-3 px-28 md:px-40 bg-[#800020] text-white font-bold w-full' >
              Continue
            </button>
          </div>
        </Link>


      <div className='grid md:grid-cols-2 gap-3 mt-5'>
        {/* <Link to='/auth/login'>
          <div>
            <button type="button" className='cursor-pointer rounded-xl py-3 px-28 md:px-40 bg-white text-[#800020] font-bold w-full' >
              Skip
            </button>
          </div>
        </Link> */}

        {/* <Link to='/auth/login'>
          <div>
            <button type="button" className='cursor-pointer rounded-xl py-3 px-28 md:px-40 bg-[#800020] text-white font-bold w-full' >
              Continue
            </button>
          </div>
        </Link> */}

      </div>
    </section>
  );
}

export default Congratulations;
