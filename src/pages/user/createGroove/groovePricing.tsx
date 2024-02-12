import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../../../components/block-components/header/header'
import YebboBack from '../../../components/base-components/back/yebooBack'
import InputField from '../../../components/block-components/input/inputField'
import UpgradeAccount from '../../../components/base-components/upgrade/upgradeAccount';
import CurrencyInputField from '../../../components/block-components/input/currencyInputField';
import { useNavigate } from 'react-router-dom';
import Switch from "react-switch";
import { Formik } from 'formik';
import TextAreaInputField from '../../../components/block-components/input/textAreaInputField';
import { useSelector, useDispatch } from 'react-redux'
import grooveService from '../../../services/actions/grooveActions';
import { requestGrooveAction } from '../../../services/reducers/groovesReducer.ts/requestGroovesReducer';
import { toast } from 'react-toastify';
import { filterAndFormatPrices, extractNumberFromString } from '../../../services/utils/helpersFunc';

function GroovePricing({ setStage }: any) {
    const { requestDetails } = useSelector((state: any) => state.requestGroove)
    const [submitting, setSubmitting] = useState(false)
    const dispatch = useDispatch<any>()
    const { info } = useSelector((state: any) => state.userInfo)
    const { token, } = useSelector((state: any) => state.login)

    const isVipUser = info?.isVip?.status || false

    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(true);
    const [showProPlan, setShowProPlan] = useState(false)
    const [showPremiumPlan, setShowPremiumPlan] = useState(false)
    const [sign, setSign] = useState('₦')
    const [initialValues, setInitialValues] = useState([
        {
            name: "Basic",
            perSession: 0.00,
            perDay: 0.00, 
            currency: "NGN",
            description: ""
        },
        {
            name: "Pro",
            perSession: 0.00,
            perDay: 0.00, 
            currency: "NGN",
            description: ""
        },
        {
            name: "Premium",
            perSession: 0.00,
            perDay: 0.00, 
            currency: "NGN",
            description: ""
        }
    ])

    // let initialValues = 

    const navigate = useNavigate()

    const changeHandler = (index: any, field: any, value: any) => {
        const updatedValues: any = [...initialValues];
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

    const submitHandler = async (values: any) => {
        if (!initialValues) {
            return toast.warning("Please ensure at least the basic package details is completed")
        }

        if (!initialValues[0].perDay) {
            return toast.warning("Please complete complete your daily and session pricing")
        }

        if (!initialValues[0].description) {
            return toast.warning("Please complete all fields in the basic package section")
        }

        const groovePackageFiltered = filterAndFormatPrices(initialValues)
        const apiBody = {
            ...requestDetails,
            // perSession: values.perSession,
            // perDay: values.perDay,
            duration: extractNumberFromString(requestDetails?.duration),
            groovePackage: groovePackageFiltered,
            grooveType: "Post"
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
            <Header pageTitle='Groove Pricing' />
            <section className='mx-auto max-w-7xl items-center p-6 overflow-x-hidden'>
                <h1 className='font-bold text-2xl my-2 md:block hidden'>Groove Pricing</h1>
                {/* <YebboBack
                    title='Pricing'
                    screenDetails={[]}
                /> */}

                {/* SECTION STARTS HERE */}

                {
                    !isVipUser && (
                        <UpgradeAccount title='Upgrade To Vip' subTitle='Upgrade to VIP to setup custom price for your groove.' />
                    )
                }

                {/* <UpgradeAccount title='Upgrade To Vip' subTitle='Upgrade to VIP to setup custom price for your groove.' /> */}

                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={(values, { setErrors, setSubmitting }) => submitHandler({ values, setErrors, setSubmitting })}
                >

                    {({
                        values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
                        <form onSubmit={handleSubmit} className='bg-white rounded-lg p-2  md:p-5  md:mt-10 mt-5'>
                            <div className='flex justify-stretch items-center bg-[#FBFBFB] mb-5 p-2'>
                                <Switch
                                    onChange={handleChange}
                                    checked={checked}
                                    className="react-switch"
                                    disabled={true}
                                />
                                <p className='ml-3'>BASIC PRICING PLAN</p>
                            </div>

                            <div className='w-full  bg-white rounded-lg  flex flex-col md:flex-row justify-between '>

                                <div className='w-full'>
                                    <div className='my-4 '>
                                        <InputField disabled={true} label='Package Title' onChange={(e: any) => changeHandler(0, 'name', e.target.value)} value={values[0].name} onBlur={handleBlur} name='title' type='text' placeholder='Basic Plan' />

                                    </div>

                                    <div className='grid md:grid-cols-2 gap-3 w-full'>
                                        <CurrencyInputField
                                            onChange={(e: any) => changeHandler(0, 'perSession', e.target.value)}
                                            currencySign={sign}
                                            onBlur={handleBlur}
                                            value={values[0].perSession}
                                            currencyValue={values[0].currency}
                                            type='number'
                                            name='perSession'
                                            label='Set Session Pricing'
                                            placeholder='10,000'
                                            currencyName='currency'
                                            currencyChange={(e: any) => changeHandler(0, 'currency', e.target.value)}
                                        />

                                        <CurrencyInputField
                                            onChange={(e: any) => changeHandler(0, 'perDay', e.target.value)}
                                            currencySign={sign}
                                            onBlur={handleBlur}
                                            value={values[0].perDay}
                                            currencyValue={values[0].currency}
                                            type='number'
                                            name='perDay'
                                            label='Set Daily Pricing'
                                            placeholder='100,000'
                                            currencyName='currency'
                                            currencyChange={(e: any) => changeHandler(0, 'currency', e.target.value)}
                                        />
                                    </div>

                                    <div className='w-full my-5'>
                                        <div>
                                            <label htmlFor="location" className="block text-sm font-bold leading-6 text-gray-900">Description</label>
                                            {/* <ReactQuill placeholder='Enter a description' className='h-40 mt-3' theme="snow" value={value} onChange={setValue} /> */}
                                            <TextAreaInputField value={values[0].description} setValue={(content: any) => changeHandler(0, 'description', content)} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* //PRO PLAN STARTS HERE */}

                            <div className='flex justify-stretch items-center bg-[#FBFBFB] mb-5 p-2 my-16 md:my-10'>
                                <Switch
                                    onChange={() => setShowProPlan(!showProPlan)}
                                    checked={showProPlan}
                                    className="react-switch"
                                    disabled={!isVipUser}
                                />
                                <p className='ml-3'>PRO PRICING PLAN</p>
                            </div>

                            {
                                showProPlan && (
                                    <div className='w-full  bg-white rounded-lg  flex flex-col md:flex-row justify-between '>

                                        <div className='w-full'>
                                            <div className='my-4'>
                                                <InputField disabled={true} label='Package Title' onChange={(e: any) => changeHandler(1, 'name', e.target.value)} value={values[1].name} onBlur={handleBlur} name='title' type='text' placeholder='Pro Plan' />
                                            </div>

                                            <div className='grid md:grid-cols-2 gap-3 w-full'>
                                                <CurrencyInputField
                                                    onChange={(e: any) => changeHandler(1, 'perSession', e.target.value)}
                                                    onBlur={handleBlur}
                                                    currencySign={sign}
                                                    value={values[1].perSession}
                                                    currencyValue={values[1].currency}
                                                    type='number'
                                                    name='perSession'
                                                    label='Set Session Pricing'
                                                    placeholder='50, 0000'
                                                    currencyName='currency'
                                                    currencyChange={(e: any) => changeHandler(1, 'currency', e.target.value)}
                                                />

                                                <CurrencyInputField
                                                    onChange={(e: any) => changeHandler(1, 'perDay', e.target.value)}
                                                    onBlur={handleBlur}
                                                    currencySign={sign}
                                                    value={values[1].perDay}
                                                    currencyValue={values[1].currency}
                                                    type='number'
                                                    name='perDay'
                                                    label='Set Daily Pricing'
                                                    placeholder='200, 0000'
                                                    currencyName='currency'
                                                    currencyChange={(e: any) => changeHandler(1, 'currency', e.target.value)}
                                                />
                                            </div>

                                            <div className='w-full my-5'>
                                                <div>
                                                    <label htmlFor="location" className="block text-sm font-bold leading-6 text-gray-900">Description</label>
                                                    <TextAreaInputField value={values[1].description} setValue={(content: any) => changeHandler(1, 'description', content)} />
                                                </div>                        </div>
                                        </div>

                                    </div>
                                )
                            }


                            {/* PREMIUM STARTS HERE */}


                            <div className='flex justify-stretch items-center bg-[#FBFBFB] mb-5 p-2 my-16 md:my-10'>
                                <Switch
                                    onChange={() => setShowPremiumPlan(!showPremiumPlan)}
                                    checked={showPremiumPlan}
                                    className="react-switch"
                                    disabled={!isVipUser}
                                />
                                <p className='ml-3'>PREMIUM SERVICES</p>
                            </div>

                            {
                                showPremiumPlan && (
                                    <div className='w-full  bg-white rounded-lg  flex flex-col md:flex-row justify-between '>

                                        <div className='w-full'>
                                            <div className='my-4'>
                                                <InputField disabled={true} label='Package Title' onChange={(e: any) => changeHandler(2, 'name', e.target.value)} value={values[2].name} name='title' type='text' placeholder='Premium  Plan' />
                                            </div>
                                            <div className='grid md:grid-cols-2 gap-3 w-full'>
                                                <CurrencyInputField
                                                    onChange={(e: any) => changeHandler(2, 'perSession', e.target.value)}
                                                    currencySign='₦'
                                                    onBlur={handleBlur}
                                                    value={values[2].perSession}
                                                    currencyValue={values[2].currency}
                                                    type='number'
                                                    name='perSession'
                                                    label='Set Session Pricing'
                                                    placeholder='100, 0000'
                                                    currencyName='currency'
                                                    currencyChange={(e: any) => changeHandler(2, 'currency', e.target.value)}
                                                />

                                                <CurrencyInputField
                                                    onChange={(e: any) => changeHandler(2, 'price', e.target.value)}
                                                    currencySign='₦'
                                                    onBlur={handleBlur}
                                                    value={values[2].perDay}
                                                    currencyValue={values[2].currency}
                                                    type='number'
                                                    name='perDay'
                                                    label='Set Daily Pricing'
                                                    placeholder='400, 0000'
                                                    currencyName='currency'
                                                    currencyChange={(e: any) => changeHandler(2, 'currency', e.target.value)}
                                                />
                                            </div>

                                            <div className='w-full my-5'>
                                                <div>
                                                    <label htmlFor="location" className="block text-sm font-bold leading-6 text-gray-900">Description</label>
                                                    <TextAreaInputField value={values[2].description} setValue={(content: any) => changeHandler(2, 'description', content)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }


                            <div className=' my-24 grid md:grid-cols-2 w-full text-center'>
                                <p></p>
                                <div className='flex justify-end'>
                                    <button
                                        onClick={() => setStage('basic')}
                                        className='bg-white w-full rounded-lg text-wine text-center font-bold py-2 px-3 md:w-80 '>
                                        Go Back
                                    </button>
                                    <button
                                        disabled={isSubmitting}
                                        className='bg-wine w-full font-bold disabled:bg-gray-300 rounded-lg text-white text-center py-2 px-3 md:w-80 '>
                                        {isSubmitting ? "Processing....." : 'Continue'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                </Formik>


            </section>


        </div>
    )
}

export default GroovePricing

