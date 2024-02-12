import React, { useState, useEffect } from 'react'
import Header from '../../block-components/header/header';
import InputField from '../../block-components/input/inputField';
import SelectInputField from '../../block-components/input/selectInputField';
import YebboBack from '../back/yebooBack';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { states, grooveCategories, durations, availability } from '../../../services/constants/dataConstants'
import { Formik } from 'formik';
import * as Yup from "yup";
import ErrorMsg from '../../block-components/error/errorMessage';
import { toast } from 'react-toastify'
import { requestGrooveAction } from '../../../services/reducers/groovesReducer.ts/requestGroovesReducer';


function RequestGroove({ setStage, details }) {
  const { requestDetails } = useSelector((state) => state.requestGroove)
  const [state, setState] = useState(requestDetails?.state)
  const [locationArr, setLocationArr] = useState([])
  const navigate = useNavigate()
  const { info } = useSelector((state) => state.userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    // if (!info?.isAuthenticate?.nin) {
    //   toast.warning("Please verify your account to continue groove creation")
    //   navigate(`/auth/verify-nin?redirect=/dashboard/request-groove`)
    // }

    if (requestDetails.state) {
      stateSelectHandler(requestDetails.state)
    }

  }, [])

  const stateSelectHandler = (selectedState) => {
    setState(selectedState)
    setLocationArr([])
    const filteredArr = states.find((state) => state.name === selectedState)
    setLocationArr(filteredArr?.lgas)
  }

  const nextHandler = (values) => {
    if (!state) {
      return toast.warning("Kindly select a state for the groove")
    }

    const newValues = {
      ...values,
      state: state,
    }

    dispatch(requestGrooveAction(newValues))
    setStage('pricing')
    return
  }

  return (
    <div >
      <Header pageTitle='Request Groove' />
      <div className='mx-auto max-w-7xl items-center p-6 overflow-x-hidden'>
        <div className="">
          <h1 className='font-bold text-2xl my-2 md:block hidden'>Request Groove</h1>
          <YebboBack
            title=''
            screenDetails={['Grooves', 'Request Grooves']}
          />

          <div className='w-full mt-5 bg-white rounded-lg  p-2  md:p-5  md:mt-10 flex flex-col md:flex-row justify-between '>

            <Formik
              initialValues={{
                title: details?.title || requestDetails?.title || "I need a ",
                category: details?.category || requestDetails?.category,
                duration: details?.duration || requestDetails?.duration || '',
                // ethnicity: requestDetails?.ethnicity || '',
                location: details?.location || requestDetails?.location || '',
                date: details?.date || requestDetails?.date || '',
                isAvailable: details?.isAvailable || requestDetails?.isAvailable || '',
              }}

              validationSchema={Yup.object({
                title: Yup.string().required("Title is required").max(50, 'Groove title cannot be more than 50 letters').min(10, 'Groove title cannot be less than 10 letters'),
                category: Yup.string().required("Category is required"),
                // ethnicity: Yup.string().required("Ethnicity is required"),
                duration: Yup.string().required("Duration is required"),
                location: Yup.string().required("Location is required"),
                date: Yup.string().required("Available date is required"),
                isAvailable: Yup.string().required("Availability is required"),
              })}
              onSubmit={(values) => nextHandler(values)}
            >
              {({
                values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
                <form onSubmit={handleSubmit} className='w-full'>
                  <div className='grid md:grid-cols-2 gap-3 w-full'>
                    <div>
                      <SelectInputField
                        name="category"
                        label="What Do You Need?"
                        data={grooveCategories}
                        placeholder="Select Category"
                        value={values.category}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ErrorMsg name="category" />
                    </div>

                    <div>
                      <InputField label='Your Request Title' value={values.title} onBlur={handleBlur} onChange={handleChange} name='title' type='text' placeholder='Request title' />
                      <ErrorMsg name="title" />
                    </div>

                  </div>


                  <div className='grid md:grid-cols-2 gap-3 w-full'>
                    <div>
                      <SelectInputField onBlur={handleBlur} label="Availability " placeholder='Select Availability' name="isAvailable" data={availability} onChange={handleChange} />
                      <div className="text-wine pt-2 text-xs font-bold text-start text">
                        <ErrorMsg name="isAvailable" />
                      </div>
                    </div>

                    <div>
                      <InputField
                        min={new Date().toISOString().split('T')[0]}
                        label='Available Date' value={values.date} onBlur={handleBlur} onChange={handleChange} name='date' type='date' placeholder='Groove Title' />
                      <div className="text-wine pt-2 text-xs font-bold text-start text">
                        <ErrorMsg name="date" />
                      </div>
                    </div>

                  </div>


                  <div className='grid md:grid-cols-2 gap-3 w-full'>
                    <div>
                      <SelectInputField value={state} onBlur={handleBlur} label="State" placeholder='Select State' name="state" data={states} onChange={(e) => stateSelectHandler(e.target.value)} />
                      <div className="text-wine pt-2 text-xs font-bold text-start text">
                      </div>
                    </div>

                    <div>
                      <SelectInputField value={values.location} onBlur={handleBlur} label="Location" placeholder='Select Location' name="location" data={locationArr} onChange={handleChange} />
                      <div className="text-wine pt-2 text-xs font-bold text-start text">
                        <ErrorMsg name="location" />
                      </div>
                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 gap-3 w-full my-3'>
                    <div>
                      <div>
                        <label htmlFor={"duration"} className="flex flex-start text-sm font-bold leading-6 text-charleston">
                          Duration
                        </label>

                        <select
                          id="duration"
                          name="duration"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.duration}
                          className="mt-2 block w-full rounded-md border-[1px] border-solid border-#EAEAEB outline-none py-3 px-4 text-gray-900 ring-1 ring-charleston ring-inset sm:text-sm sm:leading-6"
                        >
                          <option value='' disabled selected>Select Duration</option>
                          {
                            durations.map((item, i) => (
                              <option key={i} value={item?.value || item.name || item}>{item.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="text-wine pt-2 text-xs font-bold text-start text">
                        <ErrorMsg name="duration" />
                      </div>
                    </div>
                    
                  </div>


                  <div className=' mt-5 grid md:grid-cols-2 w-full text-center'>
                    <p></p>
                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        className='bg-wine w-full rounded-lg text-white text-center py-2 px-3 md:w-80 '>
                        Continue
                      </button>

                    </div>
                  </div>
                </form>
              )}

            </Formik>

          </div>
        </div>

      </div>

    </div>
  )
}


// }


export default RequestGroove
