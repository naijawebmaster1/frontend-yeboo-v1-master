import React, { useState, useEffect } from 'react'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { formatMoney } from '../../../services/utils/helpersFunc'
import { CiCircleInfo } from "react-icons/ci";
import PayPerDay from '../../../components/block-components/modal/PayPerDay';
import PayPerSession from '../../../components/block-components/modal/PayPerSession';
import ModalLayout from '../../../layout/modal/modalLayout';
import { useDispatch, useSelector } from 'react-redux';
import { hireAndProposalAction } from '../../../services/reducers/orderDetailsReducer/hireAndProposalReducer';
import { toast } from 'react-toastify';

interface IGrooviePostedDetails {
    setSelectedPlan: any
    details: any
    setPrice: any
}


function GrooviePostedDetails({ setSelectedPlan, details, setPrice }: IGrooviePostedDetails) {
    const [openPrice, setUopenPrice] = useState(true)
    const dispatch = useDispatch<any>()
    const [selectedPayPerDay, setSelectedPayPerDay] = useState(false)
    const [selectedPayPerSession, setSelectedPayPerSession] = useState(false)
    const { orderDetails } = useSelector((state: any) => state.hireAndProposal)


    useEffect(() => {
        dispatch(hireAndProposalAction({}))
    }, [dispatch])


    const handlePlanSelection = (value: string) => {
        dispatch(hireAndProposalAction({ ...orderDetails, groovePackage: value }))
    }

    const selectedPricing = (value: string, price: any) => {
        if (!orderDetails.groovePackage) {
            return toast.warning("Please select plan to continue ")
        }
        dispatch(hireAndProposalAction({
            ...orderDetails,
            orderType: value,
            price: price,
            grooveId: details.id
        }))
        if (value === "perSession") {
            setSelectedPayPerSession(true)
        }

        if (value === "perDay") {
            setSelectedPayPerDay(true)
        }
    }

    return (
        <div className='my-5'>

            <ModalLayout open={selectedPayPerDay} setOpen={setSelectedPayPerDay} title={''}>
                <PayPerDay setOpen={setSelectedPayPerDay} />
            </ModalLayout>

            <ModalLayout open={selectedPayPerSession} setOpen={setSelectedPayPerSession} title={''}>
                <PayPerSession setOpen={setSelectedPayPerSession} />
            </ModalLayout>



            <div className='w-full grid grid-cols-2 gap-4 text-charleston'>
                <div className=''>
                    <img
                        className=''
                        src={require('../../../assets/images/escrow.png')}
                        alt=''
                    />
                    <p className='text-xs my-2'>Total Escrow Amount</p>
                    <p className='font-bold text-xl text-black'>₦
                        {!orderDetails?.price && formatMoney(details?.price)}
                        {orderDetails?.price && formatMoney(orderDetails?.price)}
                    </p>
                </div>
                <div className=''>
                    <img
                        className=''
                        src={require('../../../assets/images/totalPaid.png')}
                        alt=''
                    />
                    <p className='text-xs my-2'>Total Paid Amount</p>
                    <p className='font-bold text-xl text-black'>₦
                        {!orderDetails?.price && formatMoney(details?.price)}
                        {orderDetails?.price && formatMoney(orderDetails?.price)}
                    </p>
                </div>
                <div className=''>
                    <img
                        className=''
                        src={require('../../../assets/images/escrowBalance.png')}
                        alt=''
                    />
                    <p className='text-xs my-2'>Bal. Escrow Amount</p>
                    <p className='font-bold text-xl text-black'>₦
                        {!orderDetails?.price && formatMoney(details?.price)}
                        {orderDetails?.price && formatMoney(orderDetails?.price)}
                    </p>
                </div>
            </div>


            {/* GROOVE PRICING STARTS HERE */}

            <div className='p-4 bg-[#FBFBFB] flex justify-between items-center my-5'>
                <p>PRICE & COST</p>
                {
                    openPrice ? (
                        <MdOutlineKeyboardArrowUp
                            className="cursor-pointer" onClick={() => setUopenPrice(!openPrice)}
                        />
                    ) : (
                        <IoIosArrowDown
                            className="cursor-pointer" onClick={() => setUopenPrice(!openPrice)}
                        />
                    )
                }
            </div>

            {
                openPrice && (
                    <div className='grid gap-3'>
                        {
                            details?.groovePackage[0] && (
                                <div className=' h-52 p-4 w-full shadow-2xl rounded-xl'>

                                    <div className='flex justify-between items-start'>
                                        <img
                                            src={require('../../../assets/images/basic.png')}
                                            alt='Basic Plan'
                                        />

                                        <div className='px-6'>
                                            <p className='text-sm text-charleston font-bold'>{details?.groovePackage[0]?.name}</p>
                                            {/* <p className='text-xs '> {details?.groovePackage[0]?.description}</p> */}
                                            <div
                                                className='text-sm'
                                                dangerouslySetInnerHTML={{
                                                    __html: `${details?.groovePackage[0]?.description}`
                                                }}></div>
                                        </div>

                                        <div>
                                            <input
                                                type='radio'
                                                name="plan"
                                                checked={orderDetails?.groovePackage === "Basic" ? true : false}
                                                onChange={(e) => handlePlanSelection(e.target.value)}
                                                value={details?.groovePackage[0]?.name}
                                                className='w-5 h-5'
                                            />
                                        </div>
                                    </div>

                                    <div className='w-full text-xs border-t-gray-300 flex mt-5 justify-between items-center '>
                                        <div
                                            onClick={() => selectedPricing('perSession', details?.groovePackage[0]?.perSession)}
                                            style={{
                                                border: orderDetails?.orderType === 'perSession' && orderDetails?.groovePackage === "Basic" ? "2px solid red" : "1px solid #808080 "
                                            }}
                                            className='px-4 cursor-pointer py-2  rounded-lg'>
                                            <div className='flex justify-between items-center'>
                                                <p className='font-bold mr-3'>Pay Per Session</p>
                                                <CiCircleInfo />

                                            </div>
                                            <p className='mt-2'>₦ {details?.groovePackage[0]?.perSession && formatMoney(details?.groovePackage[0]?.perSession)}</p>
                                        </div>

                                        <div
                                            onClick={() => selectedPricing('perDay', details?.groovePackage[0]?.perDay)}
                                            style={{
                                                border: orderDetails?.orderType === 'perDay' && orderDetails?.groovePackage === "Basic" ? "2px solid red" : "1px solid #808080"
                                            }}
                                            className='px-4 cursor-pointer py-2 rounded-lg'>
                                            <div className='flex justify-between items-center'>
                                                <p className='font-bold mr-3'>Pay Per Day</p>
                                                <CiCircleInfo />

                                            </div>
                                            <p className='mt-2'>₦ {details?.groovePackage[0]?.perDay && formatMoney(details?.groovePackage[0]?.perDay)}</p>
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                        {
                            details?.groovePackage[1] && (
                                <div className=' h-52 p-4 w-full shadow-2xl rounded-xl'>

                                    <div className='flex justify-between items-start'>
                                        <img
                                            src={require('../../../assets/images/pro.png')}
                                            alt='Basic Plan'
                                        />

                                        <div className='px-6'>
                                            <p className='text-sm text-charleston font-bold'>{details?.groovePackage[1]?.name}</p>
                                            {/* <p className='text-xs '> {details?.groovePackage[0]?.description}</p> */}
                                            <div
                                                className='text-sm'
                                                dangerouslySetInnerHTML={{
                                                    __html: `${details?.groovePackage[1]?.description}`
                                                }}></div>
                                        </div>

                                        <div>
                                            <input
                                                type='radio'
                                                name="plan"
                                                checked={orderDetails?.groovePackage === "Pro" ? true : false}
                                                onChange={(e) => handlePlanSelection(e.target.value)}
                                                value={details?.groovePackage[1]?.name}
                                                className='w-5 h-5'
                                            />
                                        </div>
                                    </div>

                                    <div className='w-full text-xs border-t-gray-300 flex mt-5 justify-between items-center '>
                                        <div
                                            onClick={() => selectedPricing('perSession', details?.groovePackage[1]?.perSession)}
                                            style={{
                                                border: orderDetails?.orderType === 'perSession' && orderDetails?.groovePackage === "Pro" ? "2px solid red" : "1px solid #808080"
                                            }}
                                            className='px-4 cursor-pointer py-2  rounded-lg'>
                                            <div className='flex justify-between items-center'>
                                                <p className='font-bold mr-3'>Pay Per Session</p>
                                                <CiCircleInfo />

                                            </div>
                                            <p className='mt-2'>₦ {details?.groovePackage[1]?.perSession && formatMoney(details?.groovePackage[1]?.perSession)}</p>
                                        </div>

                                        <div
                                            onClick={() => selectedPricing('perDay', details?.groovePackage[1]?.perDay)}
                                            style={{
                                                border: orderDetails?.orderType === 'perDay' && orderDetails?.groovePackage === "Pro" ? "2px solid red" : " 1px solid #808080 "
                                            }}
                                            className='px-4 cursor-pointer py-2 rounded-lg'>
                                            <div className='flex justify-between items-center'>
                                                <p className='font-bold mr-3'>Pay Per Day</p>
                                                <CiCircleInfo />

                                            </div>
                                            <p className='mt-2'>₦ {details?.groovePackage[1]?.perDay && formatMoney(details?.groovePackage[1]?.perDay)}</p>
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                        {
                            details?.groovePackage[2] && (
                                <div className=' h-52 p-4 w-full shadow-2xl rounded-xl'>

                                    <div className='flex justify-between items-start'>
                                        <img
                                            src={require('../../../assets/images/professional.png')}
                                            alt='Basic Plan'
                                        />

                                        <div className='px-6'>
                                            <p className='text-sm text-charleston font-bold'>{details?.groovePackage[2]?.name}</p>
                                            {/* <p className='text-xs '> {details?.groovePackage[0]?.description}</p> */}
                                            <div
                                                className='text-sm'
                                                dangerouslySetInnerHTML={{
                                                    __html: `${details?.groovePackage[2]?.description}`
                                                }}></div>
                                        </div>

                                        <div>
                                            <input
                                                type='radio'
                                                name="plan"
                                                checked={orderDetails?.groovePackage === "Premium" ? true : false}
                                                onChange={(e) => handlePlanSelection(e.target.value)}
                                                value={details?.groovePackage[2]?.name}
                                                className='w-5 h-5'
                                            />
                                        </div>
                                    </div>

                                    <div className='w-full text-xs border-t-gray-300 flex mt-5 justify-between items-center '>
                                        <div
                                            onClick={() => selectedPricing('perSession', details?.groovePackage[1]?.perSession)}
                                            style={{
                                                border: orderDetails?.orderType === 'perSession' && orderDetails?.groovePackage === "Premium" ? "2px solid red" : "1px solid #808080"
                                            }}
                                            className='px-4 cursor-pointer py-2  rounded-lg'>
                                            <div className='flex justify-between items-center'>
                                                <p className='font-bold mr-3'>Pay Per Session</p>
                                                <CiCircleInfo />

                                            </div>
                                            <p className='mt-2'>₦ {details?.groovePackage[1]?.perSession && formatMoney(details?.groovePackage[1]?.perSession)}</p>
                                        </div>

                                        <div
                                            onClick={() => selectedPricing('perDay', details?.groovePackage[2]?.perDay)}
                                            style={{
                                                border: orderDetails?.orderType === 'perDay' && orderDetails?.groovePackage === "Premium" ? "2px solid red" : "1px solid #808080"
                                            }}
                                            className='px-4 cursor-pointer py-2 rounded-lg'>
                                            <div className='flex justify-between items-center'>
                                                <p className='font-bold mr-3'>Pay Per Day</p>
                                                <CiCircleInfo />

                                            </div>
                                            <p className='mt-2'>₦ {details?.groovePackage[2]?.perDay && formatMoney(details?.groovePackage[2]?.perDay)}</p>
                                        </div>
                                    </div>

                                </div>
                            )}
                    </div>
                )
            }
        </div>
    )
}

export default GrooviePostedDetails
