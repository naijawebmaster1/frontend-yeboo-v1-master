import { useEffect } from 'react';
import myLogo from './img/yeboo.png';
import process from './img/Processing.png';
import successImg from './img/Sucessful.png';
import FailedImg from './img/Failed.png'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';


function AccountVerification() {
  const { user } = useSelector((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');
  // console.log(status, "the status hereee")

  const nextHandler = () => {
    navigate(`/dashboard/home`)

    // if (status !== 'failed') {
    //   navigate(`/dashboard/home`)
    // } else {
    //   navigate('/auth/verify-nin')
    // }
  }

  useEffect(() => {
    if (!status) {
      navigate('/auth/login')
    }

    if (status !== 'success' && status !== 'processing' && status !== 'failed') {
      navigate('/auth/login');
    }
  }, [])

  return (
    <section className={`w-screen h-screen justify-center flex items-center flex-col`}>
      <img className="yeboo" src={myLogo} alt="yeboo" />
      <div className='flex justify-center items-center flex-col text-center'>
        {status === 'processing' && (<img src={process} alt="" />)}
        {status === 'success' && (<img src={successImg} alt="" />)}
        {status === 'failed' && (<img src={FailedImg} alt="" />)}

        {
          status === 'processing' && (
            <h2 className='text-2xl font-bold'>Verifying Your Account</h2>

          )
        }

        {
          status === 'success' && (
            <h2 className='text-2xl font-bold'>Congratulations!</h2>

          )
        }

        {
          status === 'failed' && (
            <h2 className='text-2xl font-bold'>Account Verification Failed</h2>
          )
        }

        {
          status === 'processing' && (
            <p className='py-5 text-sm'>We're in the process of verifying your <br /> account. Your patience is appreciated.</p>
          )
        }

        {
          status === 'failed' && (
            <p className='py-5 text-sm'>Oops! Account Verification Unsuccessful.<br />Please Double-Check Your Information and Try Again.</p>
          )
        }

        {
          status === 'success' && (
            <p className='py-5 text-sm'>Congratulations! Your Account Verification <br /> was Successful. Welcome aboard! </p>
          )
        }
      </div>

      <div>
        <div
          onClick={() => nextHandler()}
          className='w-full'>
          <button type="button" className='cursor-pointer text-sm rounded-xl py-3 px-28 bg-[#800020] text-white font-bold w-full' >
            {
              status === 'failed' ? 'Retry' : 'Proceed'
            }
          </button>
        </div>
      </div>

    </section>
  );
}

export default AccountVerification;
