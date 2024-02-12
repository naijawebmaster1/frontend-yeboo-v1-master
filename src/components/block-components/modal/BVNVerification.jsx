import { useState } from 'react';
import fund from '../../../assets/images/fund.svg';
import InputField from '../input/inputField';
import ModalLayout from '../../../layout/modal/modalLayout';
import BVNSubmitted from './BVNSubmitted';
import userService from '../../../services/actions/userActions';
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import ErrorMsg from '../error/errorMessage';
import { getUserDetailsAction } from '../../../services/reducers/userReducer.ts/getUserDetailsReducer';
import InputCodeField from '../input/inputCodeField';
import { toast } from 'react-toastify';
import { convertDateFormat } from '../../../services/utils/helpersFunc';


const BVNVerification = ({ setBVNVerificationModalOpen }) => {
  const { token, user } = useSelector((state) => state.login)
  const [isBVNSubmitted, setIsBVNSubmitted] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [bvnValues, setBvnValues] = useState('')
  const { info } = useSelector((state) => state.userInfo)

  console.log(info, "the info back")

  const dispatch = useDispatch()

  const handleBVNVerification = async (values, setSubmitting) => {
    setSubmitting(true)
    setBvnValues(values)

    if (values.method === 'dob') {
      const res = await userService.verifyBVNNew(token, values.bvn, convertDateFormat(values.dob))
      console.log(res, "the res back ")

      if (res) {
        toast.success("BVN Verified successfully")
        window.location.reload()
        return
      }
      setSubmitting(false)
      return
    }

    const sendCode = await userService.BVNLookup(token, values.bvn, values.method === 'sms' ? 'phone' : 'email')

    if (sendCode) {
      toast.success(`OTP sent successfully`)
      return setShowCodeInput(true)
    }

    setSubmitting(false)

    // const res = await userService.verifyBVN({ bvn: values.bvn, token }); 

    // if (res) {
    //   setBVNVerificationModalOpen(false)
    //   dispatch(getUserDetailsAction({ token }))
    //   setIsBVNSubmitted(true)
    //   window.location.reload()
    // }
    // setSubmitting(false)
  };


  const verifyBVNOTPCode = async (values) => {
    console.log(values, bvnValues, "the values")
    const res = await userService.verifyBVNOtp(token, bvnValues.bvn, bvnValues.method === 'sms' ? 'phone' : 'email', Number(values.code))
    if (res) {
      toast.success("BVN Verified Successfully")
      dispatch(getUserDetailsAction({ token }))
      setIsBVNSubmitted(true)
      window.location.reload()
    }  }

  return (
    <section>
      <ModalLayout open={isBVNSubmitted} setOpen={() => setIsBVNSubmitted(!isBVNSubmitted)} showClose={true} title={''}>
        <BVNSubmitted verificationResult={verificationResult} />
      </ModalLayout>

      {!showCodeInput && (
        <header>
          <div className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center gap-x-4 p-4 mt-4'>
            <aside>
              <img src={fund} alt='add fund icon' className='w-[62.052px] h-[40px]' />
            </aside>
            <aside className='flex flex-col items-start'>
              <span>
                <b className='text-[#292D32] text-sm text-left font-bold'>BVN Verification</b>
              </span>
              <span>
                <p className=' text-[#292D32] text-xs text-left font-normal'>
                  Your BVN is safe with yeboo. it's solely used for verification purposes and to protect you from fraud. it doesn't give us access to your account or transactions.
                </p>
              </span>
            </aside>
          </div>
        </header>
      )}

      {showCodeInput && (
        <header>
          <div className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center gap-x-4 p-4 mt-4'>
            <aside>
              <img src={fund} alt='add fund icon' className='w-[62.052px] h-[40px]' />
            </aside>
            <aside className='flex flex-col items-start'>
              <span>
                <b className='text-[#292D32] text-sm text-left font-bold'>Enter Verification code</b>
              </span>
              <span>
                <p className=' text-[#292D32] text-xs text-left font-normal'>
                  Please enter the verification code  </p>
              </span>
            </aside>
          </div>
        </header>
      )}

      {
        !showCodeInput && (
          <Formik
            initialValues={{
              bvn: '',
              method: '',
              dob: ''
            }}

            validationSchema={Yup.object({
              bvn: Yup.string().required("BVN is required").min(11, "Invalid BVN Number").max(11, "BVN Number must be 11 digits"),
              method: Yup.string().required('Choose verification method')
            })}

            onSubmit={(values, { setSubmitting }) => handleBVNVerification(values, setSubmitting)}
          >
            {({
              values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues
            }) => (
              <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-4 mt-4'>
                <InputField
                  label='Enter BVN Number'
                  type='text'
                  value={values.bvn}
                  name='bvn'
                  id='bvn'
                  maxLength={11}
                  placeholder='Enter the eleven digits of your BVN'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMsg name='bvn' />

                <div>
                  <p className='text-center font-bold mb-5 '>How do you prefer to verify your BVN?</p>

                  <div
                    onClick={() => setValues({
                      method: 'sms'
                    })}
                    className={`rounded-xl cursor-pointer  h-28 w-full p-4  ${values.method === 'sms' && 'bg-[#F2E6E9]'}`}>
                    <p className='font-bold text-left'>SMS</p>
                    <div className={`flex justify-between items-center my-4`}>
                      <p>OTP will be sent to the phone linked to your BVN</p>
                      <input
                        name='method'
                        id='method'
                        value='sms'
                        onChange={() => setValues({ ...values, method: 'sms' })}
                        checked={values.method === 'sms' ? true : false}
                        type="radio" className='h-5 w-5' />
                    </div>
                  </div>

                  <div
                    onClick={() => setValues({
                      method: 'email'
                    })}
                    className={`rounded-xl cursor-pointer  h-28 w-full p-4  ${values.method === 'email' && 'bg-[#F2E6E9]'}`}>
                    <p className='font-bold text-left'>EMAIL</p>
                    <div className='flex justify-between items-center my-4'>
                      <p>OTP will be sent to the Email linked to your BVN</p>
                      <input
                        name='method'
                        id='method'
                        value='email'
                        onChange={() => setValues({ ...values, method: 'email' })}
                        checked={values.method === 'email' ? true : false}
                        type="radio" className='h-5 w-5' />
                    </div>
                  </div>

                  <div
                    onClick={() => setValues({
                      method: 'dob'
                    })}
                    className={`rounded-xl cursor-pointer  h-28 w-full p-4  ${values.method === 'dob' && 'bg-[#F2E6E9]'}`}>
                    <p className='font-bold text-left'>Date Of Birth</p>
                    <div className='flex justify-between items-center my-4'>
                      <p>You will be prompted to choose your DOB</p>
                      <input
                        name='method'
                        id='method'
                        value='dob'
                        onChange={() => setValues({ ...values, method: 'dob' })}
                        checked={values.method === 'dob' ? true : false}
                        type="radio" className='h-5 w-5' />
                    </div>
                  </div>
                </div>
                <ErrorMsg name='method' />

                {values.method === 'dob' && (
                  <InputField
                    label='Enter Date Of Birth'
                    type='date'
                    value={values.dob}
                    name='dob'
                    id='dob'
                    placeholder='Enter your date of birth'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxAge={18}
                  />
                )
                }


                <button
                  type='submit'
                  className='w-full h-12 bg-[#800020]  disabled:bg-gray-300 text-white text-base font-medium mt-4 rounded-lg'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Verifying...' : 'Continue'}
                </button>
              </form>
            )}

          </Formik>
        )
      }

      {showCodeInput && (
        <Formik
          initialValues={{
            code: '',
          }}

          validationSchema={Yup.object({
            code: Yup.string().required("Verification code is required").min(6, "Invalid Verification code").max(6, "Invalid verification code "),
          })}
          onSubmit={(values, { setSubmitting }) => verifyBVNOTPCode(values)}
        >
          {({
            values, handleSubmit, isSubmitting, setValues
          }) => (
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-4 mt-4'>

              <div className='p-5 flex justify-center items-center'>
                <InputCodeField code={values.code} setCode={(value) => {
                  setValues({ ...values, code: value })
                }} />
              </div>


              <ErrorMsg name='code' />

              <button
                type='submit'
                className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Submit'}
              </button>
            </form>
          )}

        </Formik>
      )}

    </section>
  );
};

export default BVNVerification;
