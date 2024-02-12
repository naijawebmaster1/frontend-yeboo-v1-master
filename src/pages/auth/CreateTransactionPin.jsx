import { useState, useEffect } from 'react';
import InputCodeField from "../../components/block-components/input/inputCodeField";
import AuthLayout from '../../layout/auth/authLayout';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/actions/authActions';
import { toast } from 'react-toastify';

function CreateTransactionPin() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [code, setCode] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  const createTransactionPinHandler = async () => {

    if (code !== verifyCode){
      toast.warning('Kindly ensure the transaction pin and the confirm are the same')
      return
    }
    if (!code || !verifyCode){
      toast.error("Please enter your transaction pin")
      return
    }

    setIsSubmitting(true)
    if (!code) {
      toast.warning("Please enter your email verification code")
      setIsSubmitting(false)
      return
    }
    const res = await authService.createPin({ username:username, transactionPin: Number(code) })
    if (res) {
      toast.success('Transaction pin created successfully')
      navigate('/auth/congratulations')
      localStorage.removeItem('email')
      localStorage.removeItem('username',)
      localStorage.removeItem('phone',)
    }
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (!username) {
      navigate('/auth/login')
    }
  }, [username, navigate])


  return (
    <section>
      <AuthLayout title='Create Transaction Pin' subTitle=''>
        <section className='text-charleston w-full flex flex-col items-center justify-center !important'>
          <div className='w-full my-5 text-center flex justify-center items-center '>

            <div className='flex flex-col justify-center items-center'>
            <p style={{ fontWeight: '600', fontSize: '14px' }} className='p-5'>Create new pin</p>
            <InputCodeField code={code} setCode={setCode} size={4} type='password' placeholder='0000' />

            <p style={{ fontWeight: '600', fontSize: '14px' }} className='p-5'>Confirm pin</p>
            <InputCodeField code={verifyCode} setCode={setVerifyCode} size={4} type='password' placeholder='0000' />
            </div>
          </div>

          <div className='w-full cursor-pointer'>
            <button
              onClick={() => createTransactionPinHandler()}
              type='submit'
              disabled={isSubmitting}
              className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold my-2">
              {isSubmitting ? 'Please wait...' : 'Confirm'}
            </button>
          </div>
        </section>

      </AuthLayout>
    </section>
  );
}

export default CreateTransactionPin;
