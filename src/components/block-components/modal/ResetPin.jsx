import React, { useState } from 'react';
import style from '../../../assets/CSS/settings.module.css';
import InputCodeField from '../input/inputCodeField';
import ModalLayout from '../../../layout/modal/modalLayout';
import ChangePin from './ChangePin';
import authService from '../../../services/actions/authActions';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify'


function ResetPin() {
  const [receivedOtp, setReceivedOtp] = useState(false)
  const [code, setCode] = useState('')
  const { info } = useSelector((state) => state.userInfo);

  const resendTranactionPin = () => {
    const res = authService.resendVerificationEmail({ email: info?.username })
    if (res) {
      toast.success('OTP sent sucessfully')
    }
  }

  const verifyOTPHandler = () => {
    // const res = authService.
  }

  return (
    <section>
      <ModalLayout open={receivedOtp} setOpen={() => setReceivedOtp(!receivedOtp)} showClose={true} title={'Change Transaction Pin'}>
        <ChangePin otp={code} />
      </ModalLayout>
      <header className='flex flex-col items-center justify-center gap-y-7'>
        {/* <span className='text-base font-medium text-[#292D32]'>Reset PIN</span> */}
        <span className='text-sm'>Secure Access: Verify Your Account by Entering the OTP Sent to Your Email Address.</span>
      </header>

      <form>
        <div className='w-full my-5 text-center flex flex-col justify-center items-center '>
          <InputCodeField code={code} setCode={setCode} size={6} />
          <div className='' onClick={() => resendTranactionPin()}>
            <span className='text-[#344054] text-sm font-medium'>Didn't receive a code?</span>
            <button className='text-[#800020] text-sm'>Resend Now</button>
          </div>
        </div>

        <button
          className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 py-3 px-4 rounded-lg'
          onClick={(e) => {
            e.preventDefault()
            if (!code) {
              return toast.warning('Please enter OTP code')
            }
            if(code.length < 6) {
              return toast.warning('Invalid OTP code')
            }
            setReceivedOtp(!receivedOtp)
          }
          }
        >
          Confirm
        </button>
      </form>
    </section>
  );
}

export default ResetPin;
