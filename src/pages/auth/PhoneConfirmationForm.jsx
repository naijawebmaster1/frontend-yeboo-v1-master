import { useState, useEffect } from 'react';
import InputCodeField from "../../components/block-components/input/inputCodeField";
import AuthLayout from '../../layout/auth/authLayout';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/actions/authActions';
import { toast } from 'react-toastify';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


function PhoneConfirmationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [code, setCode] = useState('')
  const phone = localStorage.getItem('phone')
  const navigate = useNavigate()
  const [duration, setDuration] = useState(0)


  const verifyPhoneHandler = async () => {
    setIsSubmitting(true)
    if (!code) {
      toast.warning("Please enter your phone verification code")
      setIsSubmitting(false)
      return
    }
    const res = await authService.validatePhone({ phone, otp: code })
    if (res) {
      toast.success("Phone Verified Sucessfully")
      navigate('/auth/create-pin')
    }
    setIsSubmitting(false);
  }

  const resendPhoneVerificationCode = async () => {
    setDuration(50)
    const res = await authService.resendVerificationPhone({ phone })
    if (res){
      toast.success(`Verification code sent sucessfully to ${phone} `)
    }
  }

  useEffect(() => {
    if (!phone) {
      navigate('/auth/login')
    }
  }, [phone, navigate])


  return (
    <section>
      <AuthLayout title='Confirm Your Phone Number' subTitle='Secure Access: Verify your account by entering OTP sent to your phone.'>
        <section className='text-charleston w-full !important'>
          <div className='w-full my-5 text-center flex justify-center items-center '>
            <InputCodeField code={code} setCode={setCode} placeholder='000000' />
          </div>

          <div className='text-center my-5 text-sm'>
            <p
              onClick={() => resendPhoneVerificationCode()}
            >Didn't get an OTP?
              {
                duration === 0 && (
                  <>
                    <span className="font-bold text-wine cursor-pointer ml-3">Resend Now</span>
                  </>
                )
              }
            </p>
          </div>

          {
            duration > 0 && (
              <div className='flex w-full justify-center items-center'>
                <CountdownCircleTimer
                  isPlaying
                  duration={duration}
                  onComplete={() => setDuration(0)}
                  size={100}
                  colors={['#B11226', '#F7B801', '#696C70', '#A30000']}
                  colorsTime={[50, 30, 20, 10]}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>

              </div>
            )
          }


          <div className='text-sm text-center my-5'>
            <p
              onClick={() => navigate('/auth/edit-phone')}
            >Wrong Phone? <span className="font-bold text-wine cursor-pointer">Edit Now</span></p>
          </div>

          <div className=' cursor-pointer'>
            <button
              onClick={() => verifyPhoneHandler()}
              type='submit'
              disabled={isSubmitting}
              className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold my-2">
              {isSubmitting ? 'Please wait...' : 'Continue'}
            </button>
          </div>
        </section>

      </AuthLayout>
    </section>
  );
}

export default PhoneConfirmationForm;