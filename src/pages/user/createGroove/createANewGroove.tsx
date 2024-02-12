import React, { useState, useEffect } from 'react'
import Header from '../../../components/block-components/header/header';
import InputField from '../../../components/block-components/input/inputField';
import SelectInputField from '../../../components/block-components/input/selectInputField';
import YebboBack from '../../../components/base-components/back/yebooBack';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { states, grooveCategories, durations, availability} from '../../../services/constants/dataConstants'
import { Formik } from 'formik';
import * as Yup from "yup";
import ErrorMsg from '../../../components/block-components/error/errorMessage';
import { toast } from 'react-toastify'
import { requestGrooveAction } from '../../../services/reducers/groovesReducer.ts/requestGroovesReducer';
import ReactQuill from 'react-quill';


function CreateANewGroove({ setStage }: any) {
    const { requestDetails } = useSelector((state: any) => state.requestGroove)
    const [state, setState] = useState(requestDetails?.state)
    const [detailsValue, setDetailsValue] = useState(requestDetails?.details);

    const [locationArr, setLocationArr] = useState<any>([])
    const navigate = useNavigate()
    const { info } = useSelector((state: any) => state.userInfo)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        window.scrollTo(0, 0)
        // if (!info?.isAuthenticate?.nin) {
        //     toast.warning("Please verify your account to continue groove creation")
        //     navigate(`/auth/verify-nin?redirect=/create-groove`)
        //     return
        // }

        // if (!info?.nationality) {
        //     toast.warning("Please complete your profile before requesting a groove")
        //     navigate(`/auth/verify-nin?redirect=/create-groove`)
        // }

        if (requestDetails?.state) {
            stateSelectHandler(requestDetails.state)
        }

    }, [])

    const stateSelectHandler = (selectedState: string) => {
        setState(selectedState)
        setLocationArr([])
        const filteredArr = states.find((state: any) => state.name === selectedState)
        setLocationArr(filteredArr?.lgas)
    }

    const nextHandler = async (values: any) => {
        if (!state) {
            return toast.warning("Kindly select a state for the groove")
        }

        if (!detailsValue) {
            return toast.warning("Kindly enter groove details")
        }

        const newValues = {
            ...values,
            state: state,
            details: detailsValue
        }

        dispatch(requestGrooveAction(newValues))
        setStage('pricing')
        return
    }

    return (
        <div >
            <Header pageTitle='Create Groove' />
            <div className='mx-auto max-w-7xl items-center p-6 overflow-x-hidden'>
                <div>
                    <h1 className='font-bold text-2xl my-2 md:block hidden'>Create Groove</h1>
                    <YebboBack
                        title=''
                        screenDetails={['Grooves', 'Create Grooves']}
                    />

                    <div className='w-full mt-5 bg-white rounded-lg  p-2  md:p-5  md:mt-10 flex flex-col md:flex-row justify-between '>

                        <Formik
                            initialValues={{
                                title: requestDetails?.title || "I'm available for ",
                                category: requestDetails?.category || '',
                                duration: requestDetails?.duration || '',
                                location: requestDetails?.location || '',
                                date: requestDetails?.date || '',
                                isAvailable: requestDetails?.isAvailable === 'true' ? true : false || '',
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
                                            <InputField label='Add Your Groove Title' value={values.title} onBlur={handleBlur} onChange={handleChange} name='title' type='text' placeholder='Request title' />
                                            <ErrorMsg name="title" />
                                        </div>

                                        <div>
                                            <SelectInputField
                                                name="category"
                                                label="Category"
                                                data={grooveCategories}
                                                placeholder="Select Category"
                                                value={values.category}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            <ErrorMsg name="category" />
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
                                                min={new Date().toJSON().slice(0, 10)}
                                                label='Available Date' value={values.date} onBlur={handleBlur} onChange={handleChange} name='date' type='date' placeholder='Groove Title' />
                                            <div className="text-wine pt-2 text-xs font-bold text-start text">
                                                <ErrorMsg name="date" />
                                            </div>
                                        </div>

                                    </div>


                                    <div className='grid md:grid-cols-2 gap-3 w-full'>
                                        <div>
                                            <SelectInputField value={state} onBlur={handleBlur} label="State" placeholder='Select State' name="state" data={states} onChange={(e: any) => stateSelectHandler(e.target.value)} />
                                            <div className="text-wine pt-2 text-xs font-bold text-start text">
                                            </div>
                                        </div>

                                        <div>
                                            <SelectInputField value={values?.location} onBlur={handleBlur} label="Location" placeholder='Select Location' name="location" data={locationArr} onChange={handleChange} />
                                            <div className="text-wine pt-2 text-xs font-bold text-start text">
                                                <ErrorMsg name="location" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='grid md:grid-cols-2 gap-3 w-full'>
                                        <div>
                                            <SelectInputField onBlur={handleBlur} label="Duration" placeholder='Select duration' name="duration" value={values.duration} data={durations} onChange={handleChange} />
                                            <div className="text-wine pt-2 text-xs font-bold text-start text">
                                                <ErrorMsg name="duration" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='pricing' className="block text-sm font-bold leading-6 text-charleston">Add Groove Details (Groove Expectation)</label>
                                            <ReactQuill className='h-40 mt-3' theme="snow" value={detailsValue} onChange={setDetailsValue} />
                                        </div>
                                        {/* <div>
                                            <SelectInputField value={values.ethnicity} onBlur={handleBlur} label="Ethnicity" placeholder='Select Ethnics' name="ethnicity" data={ethnicity} onChange={handleChange} />
                                            <div className="text-wine pt-2 text-xs font-bold text-start text">
                                                <ErrorMsg name="ethnicity" />
                                            </div>
                                        </div> */}
                                    </div>


                                    <div className=' mt-20 grid md:grid-cols-2 w-full text-center'>
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


export default CreateANewGroove
