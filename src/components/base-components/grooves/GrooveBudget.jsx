import React, { useState } from 'react'
import Header from '../../block-components/header/header';
import { requestGrooveAction } from '../../../services/reducers/groovesReducer.ts/requestGroovesReducer';
import { useSelector, useDispatch } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import grooveService from '../../../services/actions/grooveActions';
import CurrencyInputField from '../../block-components/input/currencyInputField';
import YebboBack from '../back/yebooBack';
import { Formik } from 'formik';
import * as Yup from "yup";
import ErrorMsg from '../../block-components/error/errorMessage';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { extractNumberFromString, formatMoney } from '../../../services/utils/helpersFunc';


function GrooveBudget({ setStage }) {
  const navigate = useNavigate()
  const { requestDetails } = useSelector((state) => state.requestGroove)
  const [pricing, setPricing] = useState()
  const { token, } = useSelector((state) => state.login)
  const { info } = useSelector((state) => state.userInfo)
  const [submitting, setSubmitting] = useState(false)
  const [requestType, setRequestType] = useState("")

  const [sign, setSign] = useState('₦')
  const [initialValues, setInitialValues] = useState([
    {
      name: "",
      price: 0.00,
      currency: "NGN",
      description: ""
    },
    {
      name: "",
      price: 0.00,
      currency: "NGN",
      description: ""
    },
    {
      name: "",
      price: 0.00,
      currency: "NGN",
      description: ""
    }
  ])
  const [detailsValue, setDetailsValue] = useState('');
  const [value, setValue] = useState('');

  const dispatch = useDispatch()

  const changeHandler = (index, field, value) => {
    const updatedValues = [...initialValues];
    if ([field][index] === 'currency') {
      if (value === 'NGN') {
        setSign('₦')
      }

      if (value === 'USD') {
        setSign('$')
      }

      if (value === 'GBP') {
        setSign('£')
      }

      if (value === 'EUR') {
        setSign('€')
      }
      if (value === 'CAD') {
        setSign("$")
      }
    }

    if ([field][index] === 'description') {
      setValue(value)
      updatedValues[index][field] = value;
    }
    updatedValues[index][field] = value;
    setInitialValues(updatedValues)
    // initialValues = updatedValues;
  };


  const submitHandler = async (values) => {

    if (!detailsValue) {
      return toast.warning("Enter groove description details")
    }

    if (!requestType){
      return toast.warning("Select request type")
    }

    const apiBody = {
      ...requestDetails,
      price: values.price,
      details: detailsValue,
      requestType: requestType,
      duration: extractNumberFromString(requestDetails?.duration),
      grooveType: "Request"
    }
    setSubmitting(true)
    const res = await grooveService.createGroove({ values: apiBody, token })
    if (res) {
      dispatch(requestGrooveAction({}))
      toast.success('Groove created sucessfully')
      setSubmitting(false)
      navigate(`/dashboard/home`)
    }
    setSubmitting(false)
  }

  return (
    <div>
      <Header pageTitle="Request Groove" />
      <div className='mx-auto max-w-7xl items-center p-6 overflow-x-hidden'>
        <h1 className='font-bold text-2xl my-2 md:block hidden'>Request Groove</h1>
        <YebboBack
          title=''
          screenDetails={['Grooves', 'Request Grooves', 'Add Groove Budget']}
        />

        <Formik
          initialValues={{
            price: requestDetails?.price
          }}
          validationSchema={Yup.object({
            price: Yup.number().required("Groove Budget is required").min(100000, "Groove Budget cannot be less than ₦ 100, 000"),
          })}
          onSubmit={(values) => submitHandler(values)}
        >

          {({
            values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className='grid md:grid-cols-2 gap-3 my-5' >
                <div className='pt-5'>
                  <label htmlFor="Payment Option" className="block text-sm font-bold leading-6 text-charleston">
                    Select Request Payment Type
                  </label>

                  <div className='flex my-3 justify-evenly items-center'>
                    <button 
                    onClick={() => setRequestType("perSession")}
                    className={`rounded-xl px-3 py-2 ${requestType === 'perSession' && "border-2 border-red-500"} `}>
                      Pay Per Session
                    </button>

                    <button
                    className={`rounded-xl px-3 py-2 ${requestType === 'perDay' && "border-2 border-red-500"} `}
                    onClick={() => setRequestType("perDay")}
                    >
                      Pay Per Day
                    </button>
                  </div>
                </div>

                <div className='pt-5'>
                  <CurrencyInputField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    currencySign={sign}
                    value={values.price}
                    currencyValue={pricing}
                    type='number'
                    name='price'
                    label='Budget'
                    placeholder='100, 0000'
                    currencyName='currency'
                    currencyChange={(e) => changeHandler(0, 'currency', e.target.value)}
                  />
                  <p className='font-bold text-charleston'>₦ { values?.price ? formatMoney(values.price) : 0.00}</p>
                  <ErrorMsg name='price' />
                </div>

              </div>

              <div className='py-5'>
                <div>
                  <label htmlFor='pricing' className="block text-sm font-bold leading-6 text-charleston">Add Groove Details (Your Expectation)</label>
                  <ReactQuill className='h-40 mt-3' theme="snow" value={detailsValue} onChange={setDetailsValue} />
                </div>

                {/* <textarea
            // onChange={(e) => setReview(e.target.value)}
                className="w-full h-[400px] rounded-[8px] border-solid border-[0.5px] p-[14px] outline-none"
                placeholder="Share your experience ..."
            /> */}
              </div>

              <div className='grid w-full md:grid-cols-2 grid-cols-1 mt-20 md:mt-10'>
                <div> </div>
                <div className='flex justify-end flex-end space-x-5'>
                  <button type='button' className='text-wine font-bold px-10 py-1.5 bg-white ' onClick={() => setStage('basic')}>
                    Go Back
                  </button>

                  <button
                    disabled={submitting}
                    type='submit' className='bg-wine text-white px-10 py-1.5 font-bold rounded-md'>
                    {submitting ? 'Processing' : 'Submit'}
                  </button>
                </div>

              </div>
            </form>
          )}

        </Formik>





      </div>
    </div>
  )
}


export default GrooveBudget;
