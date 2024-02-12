import React, { useEffect, useState } from 'react';
import myLogo from './img/yeboo.png';
import aboutImg from './img/user.png';
import { Link } from 'react-router-dom';
import InputField from "../../components/block-components/input/inputField";
import SelectInputField from '../../components/block-components/input/selectInputField';
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { availability, nationalities, zodiacSigns, bodyTypes, heights } from '../../services/constants/dataConstants';
import ErrorMsg from '../../components/block-components/error/errorMessage';
import userService from '../../services/actions/userActions';
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUserDetailsAction, } from './../../services/reducers/userReducer.ts/getUserDetailsReducer';


function AboutYourself() {
  const [heightSize, setHeightSize] = useState('IN')
  const [search, setSearch] = useSearchParams();

  const redirectUrl = search.get('redirect')

  const { token } = useSelector((state) => state.login);
  const { info } = useSelector((state) => state.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const updateProfileHandler = async (values, setSubmitting) => {
    const newValues = {
      ...values,
      height: `${values.height} ${heightSize}`,
      isDrink: values.isDrink === 'true' ? true : false,
      isSmoke: values.isSmoke === 'true' ? true : false,
      availability: values.availability === 'true' ? true : false
    }
    const res = await userService.updateUser(newValues, token)
    if (res) {
      toast.success('Profile Updated Successfully')
      dispatch(getUserDetailsAction({ token }))
      if (redirectUrl) {
        return navigate(`/dashboard/${redirectUrl}`)
      }

      navigate('/dashboard/home')
      setSubmitting(false)
      return
    }
    setSubmitting(false)
  }

  useEffect(() => {
    if (!token) {
      navigate('/auth/login')
    } else {
      dispatch(getUserDetailsAction({ token }))
    }
  }, [token, navigate])


  return (
    <section className='flex justify-center items-center flex-1 flex-col'>
      <img
        className='flex text-center justify-center items-center'
        src={myLogo}
        alt="yeboo"
      />
      <div className='w-full md:w-[600px] p-5 md:p-0'>
        <div className=' text-charleston justify-center flex flex-col items-center'>
          <img src={aboutImg} alt="processing" className='mt-10 mb-3' />
          <p style={{ fontSize: '14px', fontWeight: 300 }}>Step 1/2</p>
          <h4 className='text-sm font-bold'>Add More Details</h4>
          <hr
            style={{
              color: '#eaeaea',
              width: '100%',
              height: '0.5px',
              marginTop: '10px',
              opacity: 0.5,
            }}
          />
        </div>
        <div
          className=' text-center text-charleston '
          style={{ marginTop: '10px', marginBottom: '30px' }}
        >
          <h2 className='text-2xl font-bold'>Tell Us About Yourself</h2>
          <p className='text-sm my-5'>
            Let's meet you: share more about yourself to <br /> other  groovers and groovies
          </p>
        </div>
        <Formik
          initialValues={{
            dateOfBirth: info?.dateOfBirth || '',
            isSmoke: info?.isSmoke || '', availability: info?.availability || true,
            bodyType: info?.bodyType || '', isDrink: info?.isDrink || undefined, zodiacSign: info?.zodiacSign || '',
            height: info?.height || '', nationality: info?.nationality || '',
          }}

          validationSchema={Yup.object({
            zodiacSign: Yup.string().required('Zodaic sign is required'),
            dateOfBirth: Yup.string().required('Date Of Birth Is Required'),
            isSmoke: Yup.boolean().required('Confirm your smoking status'),
            isDrink: Yup.boolean().required('Confirm your drinking status'),
            height: Yup.string().required('Height is required'),
            nationality: Yup.string().required('Nationality is required'),
            bodyType: Yup.string().required("Body Type Is Required")
          })}

          onSubmit={(values, { setSubmitting }) => updateProfileHandler(values, setSubmitting)}
        >

          {
            ({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
              <form onSubmit={handleSubmit}>
                <div className='grid md:grid-cols-2 w-full gap-3'>
                  <div>
                    <InputField
                      label='Date of Birth'
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type='date'
                      name='dateOfBirth'
                      maxAge={18}
                    />
                    <div className="text-wine pt-2 text-xs font-bold text-start text">
                      <ErrorMessage name="dateOfBirth" />
                    </div>
                  </div>

                  <div>
                    <label className="flex flex-start text-sm font-bold leading-6 text-charleston">Do You Drink?</label>
                    <div className='flex justify-evenly items-center py-2.5 mt-2 px-4 border-2 rounded-md border-gray-400'>
                      <div className='flex justify-start items-center'>
                        <input
                          name='isDrink'
                          id='isDrink'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={true}
                          type="radio" className='h-5 w-5' />
                        <p className='ml-3 text-sm'>Yes</p>
                      </div>

                      <div className='flex justify-start items-center'>
                        <input
                          name='isDrink'
                          id='isDrink'
                          value={false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="radio" className='h-5 w-5' />
                        <p className='ml-3 text-sm'>No</p>
                      </div>
                    </div>

                    <div className="text-wine pt-2 text-xs font-bold text-start text">
                      <ErrorMessage name="isDrink" />
                    </div>
                  </div>
                </div>

                <div className='grid md:grid-cols-2 w-full gap-3'>
                  <div>
                    <label className="flex flex-start text-sm font-bold leading-6 text-charleston">Do You Smoke?</label>
                    <div className='flex justify-evenly items-center py-2.5 mt-2 px-4 border-2 rounded-md border-charleston ring-charleston'>
                      <div className='flex justify-start items-center'>
                        <input
                          name='isSmoke'
                          id='isSmoke'
                          value={true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="radio" className='h-5 w-5' />
                        <p className='ml-3 text-sm'>Yes</p>
                      </div>


                      <div className='flex justify-start items-center'>
                        <input
                          name='isSmoke'
                          id='isSmoke'
                          value={false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="radio" className='h-5 w-5' />
                        <p className='ml-3 text-sm'>No</p>
                      </div>

                    </div>

                    <div className="text-wine pt-2 text-xs font-bold text-start text">
                      <ErrorMessage name="isSmoke" />
                    </div>

                  </div>

                  <div>
                    <SelectInputField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zodiacSign}
                      name='zodiacSign' id='zodiacSign' label='Zodaic Sign' placeholder='Choose your zodaic sign' data={zodiacSigns} />

                    <div className="text-wine pt-2 text-xs font-bold text-start text">
                      <ErrorMessage name="zodiacSign" />
                    </div>
                  </div>

                </div>

                <div className='grid md:grid-cols-2 w-full gap-3'>
                  <div>
                    <SelectInputField
                      name="availability"
                      data={availability}
                      label='Availability'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.availability}
                      placeholder='How soon are you available?'
                    />

                    <div className="text-wine pt-2 text-xs font-bold text-start text">
                      <ErrorMessage name="availability" />
                    </div>
                  </div>

                  <div>

                    <SelectInputField
                      name='height'
                      label='Height'
                      value={values.height}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Choose your height' data={heights} />

                    <ErrorMsg name='height' />
                  </div>

                </div>

                <div className='grid md:grid-cols-2 w-full gap-3'>

                  <div>
                    <SelectInputField
                      data={bodyTypes}
                      label='Body Type'
                      value={values.bodyType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='bodyType'
                      placeholder='Select Body Type'
                    />
                    <ErrorMsg name='bodyType' />
                  </div>

                  <div>
                    <SelectInputField
                      data={nationalities}
                      label='Nationality'
                      name='nationality'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nationality}
                      placeholder='Select Nationality'
                    />
                    <ErrorMsg name='nationality' />
                  </div>


                </div>

                {/* <Link to='/auth/verify-nin'> */}
                {/* <button
                  type='submit'
                  disabled={isSubmitting}
                  className='py-2.5 font-bold rounded-xl bg-[#800020] w-full my-5 flex justify-center items-center text-white' >
                  {isSubmitting ? 'Processing' : 'Continue'}
                </button> */}

                <div className='grid md:grid-cols-2 gap-3 mt-5 text-center w-full'>
                  <Link to='/dashboard/home'>
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
                      type='submit'
                      disabled={isSubmitting}
                      className='cursor-pointer rounded-xl py-3 text-center min-w-full bg-[#800020] text-white font-bold w-full' >
                      {isSubmitting ? 'Please wait...' : 'Continue'}
                    </button>
                  </div>

                </div>

                {/* </Link> */}
              </form>
            )}

        </Formik>

      </div>

    </section>
  );
}

export default AboutYourself;
