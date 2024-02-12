import { useState, useEffect } from 'react';
import InputCodeField from "../../components/block-components/input/inputCodeField";
import AuthLayout from '../../layout/auth/authLayout';
import { useNavigate} from 'react-router-dom';
import authService from '../../services/actions/authActions';
import { toast } from 'react-toastify';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function EmailConfirmationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [code, setCode] = useState('')
  const email = localStorage.getItem('email')
  const navigate = useNavigate()
  const [duration, setDuration] = useState(0)


  const verifyEmailHandler = async () => {

    setIsSubmitting(true)
    if (!code) {
      toast.warning("Please enter your email verification code")
    setIsSubmitting(false)
      return
    }
    const res = await authService.validateEmail({ email, otp: code })
    if (res) {
      toast.success("Email Verified Sucessfully. Please check your Phone the phone verification code")
      navigate('/auth/verify-phone')
    }
    setIsSubmitting(false);
  }

  const resendEmailVerificationCode = async () => {
    setDuration(50)
    const res = await authService.resendVerificationEmail({email})
    if (res){
      toast.success(`Verication code sent sucessfully to ${email}`)
    }
  }

  useEffect(() => {
    if (!email) {
      navigate('/auth/login')
    }
  }, [])


  return (
    <section>
      <AuthLayout title='Confirm Your Email' subTitle='Secure Access: Verify your account by entering OTP sent to your email.'>
        <section className='text-charleston w-full !important'>
          <div className='w-full my-5 text-center flex justify-center items-center '>
            <InputCodeField code={code} setCode={setCode} placeholder='000000' />
          </div>

          <div className='text-center my-5 text-sm'>
            <p
            onClick={()=> resendEmailVerificationCode()}
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
            onClick={() => navigate('/auth/edit-email')}
            >Wrong Email? <span className="font-bold text-wine cursor-pointer">Edit Now</span></p>
          </div>

          <div className=' cursor-pointer'>
            <button
              onClick={() => verifyEmailHandler()}
              type='submit'
              disabled={isSubmitting}
              className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold my-2">
              {isSubmitting ? 'Please wait...' : 'Continue'}
            </button>
          </div>

          {/* <div className='grid md:grid-cols-2 gap-3 mt-5 text-center w-full'>
            <Link to='/auth/login'>
              <div>
                <button 
                type="button" 
                className='cursor-pointer rounded-xl py-3 text-center bg-white text-[#800020] font-bold w-full' >
                  Skip
                </button>
              </div>
            </Link>

            <div className='w-full'>
              <button
                onClick={() => verifyEmailHandler()}
                type='submit'
                disabled={isSubmitting}
                className='cursor-pointer rounded-xl py-3 text-center min-w-full bg-[#800020] text-white font-bold w-full' >
                {isSubmitting ? 'Please wait...' : 'Continue'}
              </button>
            </div>

          </div> */}

        </section>

      </AuthLayout>
    </section>
  );
}

export default EmailConfirmationForm;
