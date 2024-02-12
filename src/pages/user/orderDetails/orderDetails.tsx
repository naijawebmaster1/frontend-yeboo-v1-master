import { useState, useEffect } from 'react'
import Header from '../../../components/block-components/header/header'
import YebboBack from '../../../components/base-components/back/yebooBack'
import { HiBadgeCheck } from 'react-icons/hi'
import { AiFillStar, AiOutlinePaperClip } from 'react-icons/ai'
import PageTitle from '../../../layout/pageTitle/pageTitle'
import { BsImageAlt, BsFillChatRightHeartFill } from 'react-icons/bs'
import { TbFileInvoice } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import grooveService from '../../../services/actions/grooveActions'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { GetOrderDescriptionFromPackage, formatMoney } from '../../../services/utils/helpersFunc'
import RaiseADispute from '../../../components/block-components/modal/raiseDispute'
import AlertModalLayout from '../../../layout/alert/alertLayout'
import { getOrderDetailsAction } from '../../../services/reducers/orderDetailsReducer/orderDetailsReducer';
import OrderChat from './orderChat'
import ReviewOrderModal from '../../../components/block-components/modal/reviewOrderModal'
import ModalLayout from '../../../layout/modal/modalLayout'


function OrderDetails() {
    const navigate = useNavigate()
    const { token } = useSelector((state: any) => state.login)
    const { orderDetails } = useSelector((state: any) => state.orderDetails)
    const { info } = useSelector((state: any) => state.userInfo)
    const [dispute, setDispute] = useState(false)
    const dispatch = useDispatch<any>()
    const [screen, setScreen] = useState('details')
    const [openPrice, setUopenPrice] = useState(true)
    const [cancelGroove, setCancelGroove] = useState(false)
    const [completeGroove, setCompleteGroove] = useState(false)
    const [reviewOrder, setReviewOrder] = useState(false)
    const [processing, setProcessing] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getOrderDetailsAction({ token, id }))
    }, [])

    const completOrderHandler = async () => {
        const data = {
            token: token,
            response: 'Completed',
            orderId: id
        }

        const res = await grooveService.updateGrooveOrderStatus(data)

        if (res) {
            toast.success("Order Completed Successfully")
            dispatch(getOrderDetailsAction({ id, token }))
            setCompleteGroove(!completeGroove)
            // navigate(`/dashboard/orders`)
        }
    }

    const acceptOrderHandler = async () => {
        const data = {
            token: token,
            response: 'Accepted',
            orderId: id
        }
        const res = await grooveService.updateGrooveOrderStatus(data)

        if (res) {
            toast.success("Groove request accepted successfully")
            navigate(`/dashboard/orders`)
        }
    }

    const cancelOrderHandler = async () => {
        const res = await grooveService.cancelGroove({ token, id })
        if (res) {
            toast.success("Order Cancelled Successfully")
            navigate(`/dashboard/orders`)
        }
    }

    const declineOrderHandler = async () => {
        setProcessing(true)
        const data = {
            token: token,
            response: 'Declined',
            orderId: id
        }
        const res = await grooveService.updateGrooveOrderStatus(data)
        if (res) {
            setProcessing(false)
            toast.success("Order Declined Successfully")
            window.location.reload()
        }
        setProcessing(false)
    }

    return (
        <div>
            {dispute && <RaiseADispute open={dispute} setOpen={setDispute} />}
            {cancelGroove &&
                <AlertModalLayout title={'Cancel Groove'}
                    content={'Are Your Sure You Want To Cancel this Groove? This Action Cannot be undone.'} open={cancelGroove} setOpen={setCancelGroove} actionText={'Cancel Groove'} actionFunc={cancelOrderHandler} btnColor='#B11226' />}


{
    completeGroove && 
    <AlertModalLayout title={'Complete Order'}
    content={'Are Your Sure You Want To completed this Groove order? This Action Cannot be undone.'} open={completeGroove} setOpen={setCompleteGroove} actionText={'Complete Order'} actionFunc={completOrderHandler} btnColor='#00FF00' />
}

{reviewOrder && (
    <ModalLayout open={reviewOrder} setOpen={setReviewOrder} title={''} >
        <ReviewOrderModal orderRef={id} setReviewOrder={setReviewOrder}/>
    </ModalLayout>
)}


            <Header pageTitle='Order Details' />
            <section className='mx-auto max-w-7xl items-center p-6'>

                <PageTitle title='Order Details' />

                <YebboBack
                    title='Groove Details'
                    screenDetails={['Grooves', 'Order', 'Order Details']}  />

                {/* SECTION STARTS HERE */}

                {
                    orderDetails && (
                        <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between overflow-x-hidden '>
                            <div className='w-full md:w-1/3 bg-white md:p-4 p-2'>

                                <div className='relative'>
                                    <img
                                        className='object-cover h-60 w-full rounded-lg '
                                        alt='Groover'
                                        src={orderDetails?.grooveRef?.customerRef?.profileImage}
                                    />

                                    <div className='absolute bottom-[-45px] md:left-36 left-28'>
                                        <img
                                            className="h-20 w-20 object-cover rounded-full border-4 border-yellow"
                                            src={orderDetails?.grooveRef?.customerRef?.profileImage}
                                            alt="profile"
                                        />
                                        <HiBadgeCheck
                                            color='#E0AA3E'
                                            size={30}
                                            className='absolute top-12 left-14 bg-white p-0.5 rounded-full'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col text-sm justify-center items-center mt-16'>
                                    <p className='text-wine font-bold'>{orderDetails?.grooveRef?.customerRef?.firstname} {orderDetails?.grooveRef?.customerRef?.lastname?.charAt(0)}.  <span className='text-[5px] font-bold pl-2'></span>VIP</p>
                                    <p onClick={() => navigate(`/dashboard/groovie/${orderDetails?.grooveRef?.customerRef?._id}`)} className='text-wine underline py-2 font-bold cursor-pointer'>View Profile</p>

                                    <p className='text-gray-600 font-bold text-base'>{orderDetails?.grooveRef?.title || 'I`m Available for a night stand'}</p>

                                    <div className='flex items-center'>
                                        <p className='text-xs text-gray-500 flex items-center mt-3'>
                                            <AiFillStar
                                                color='#FCCF14'
                                                size={20}
                                            />
                                            <p className='ml-1'>4.5</p>

                                        </p>

                                        <p className='text-xs text-gray-500 flex items-center mt-3 ml-2'>
                                            <img
                                                alt=''
                                                className='object-cover'
                                                src={require('../../../assets/images/like.png')}
                                            />
                                            <p className='ml-1'>100</p>

                                        </p>
                                    </div>

                                    <p
                                        style={{
                                            backgroundColor: orderDetails?.status === "Pending" ? '#FFF6E6' : orderDetails?.status === "Completed" ? 'green' : orderDetails?.status === "Accepted" ? "red" : "red",
                                            color: orderDetails?.status === "Pending" ? '#000' : orderDetails?.status === "Completed" ? "#fff" : "#fff"
                                        }}
                                        className=' p-2 font-bold text-xs my-5 rounded-md'>{orderDetails?.status === "Accepted" ? "Ongoing" : `${orderDetails?.status}`}</p>
                                </div>
                                {/* text-[#FFA500] */}
                                <div className='flex justify-between items-center p-3'>
                                    <button
                                        onClick={() => setScreen('details')}
                                        style={{
                                            color: screen === 'details' ? '#B11226' : '#696C70'
                                        }}
                                        className='flex text-wine items-center hover:text-wine text-sm font-bold cursor-pointer'>
                                        <BsImageAlt className='mr-2' />
                                        <p>Details</p>
                                    </button>

                                    <button
                                        onClick={() => setScreen('invoice')}
                                        style={{
                                            color: screen === 'invoice' ? '#B11226' : '#696C70'
                                        }}
                                        className='flex items-center hover:text-wine text-sm font-bold cursor-pointer'>
                                        <TbFileInvoice className='mr-2' />
                                        <p>Invoice</p>
                                    </button>

                                    {
                                        orderDetails?.status !== 'Completed' && (
                                            <button
                                                onClick={() => setScreen('chat')}
                                                style={{
                                                    color: screen === 'chat' ? '#B11226' : '#696C70'
                                                }}
                                                className='flex  items-center hover:text-wine text-sm font-bold cursor-pointer'>
                                                <BsFillChatRightHeartFill className='mr-2' />
                                                <p>Chat</p>
                                            </button>
                                        )
                                    }


                                </div>

                                {/* INVOICE DETAILS STARTS HERE */}

                                {
                                    screen === 'invoice' && (
                                        <>
                                            {
                                                [1].map((item: any) => (
                                                    <div key={item}>
                                                        <div className='p-4 flex justify-between items-center my-5'>
                                                            <AiOutlinePaperClip size={20} color='#696C70' />

                                                            <div>
                                                                <p className='font-bold text-sm'>From: {orderDetails?.grooveRef?.customerRef?.firstname}   {orderDetails?.grooveRef?.customerRef?.lastname.charAt(0)}.</p>
                                                                <p className='text-xs text-[#FFA500] mt-2'>{orderDetails?.status}</p>
                                                            </div>

                                                            <div className='text-charleston'>
                                                                <p className='text-xs'>{orderDetails?.time}</p>
                                                                <p className='mt-2 font-bold'>NGN {orderDetails?.amount && formatMoney(Number(orderDetails?.amount))}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    )
                                }

                                {/* DETAILS STARTS HERE */}

                                {
                                    screen === 'details' && (
                                        <>
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
                                                    <div className='grid gap-3 mb-5'>
                                                        <div className='flex justify-between items-start h-40 p-4 w-full bg-[#FFF6CC] rounded-xl'>
                                                            <img
                                                                src={require('../../../assets/images/pro.png')}
                                                                alt='Basic Plan'
                                                            />

                                                            <div className='px-6'>
                                                                <p className='text-sm text-charleston font-bold'>{orderDetails?.groovePackage}</p>
                                                                <p className='font-bold text-xl text-black py-1'>₦ {orderDetails?.amount && formatMoney(Number(orderDetails?.amount))}</p>
                                                                <p className='text-xs '> {orderDetails && GetOrderDescriptionFromPackage(orderDetails?.grooveRef?.groovePackage, orderDetails?.groovePackage)}</p>
                                                            </div>

                                                            <div>
                                                                <input
                                                                    type='radio'
                                                                    name="plan"
                                                                    className='w-5 h-5'
                                                                    defaultChecked
                                                                    value='200000'
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }

                                {/* CHAT SCREEN STARTS HERE */}

                                <OrderChat
                                    screen={screen}
                                    orderDetails={orderDetails}
                                    dispute={dispute}
                                    setDispute={setDispute}
                                />

                                {/* CHAT SCREEN ENDS HEREEEE */}


                                {/* ACTION BUTTONS STARTS HERE */}

                                {
                                    info?.accountType === 'Groover' && (
                                        <>

                                            {
                                                orderDetails?.status === 'Pending' && (
                                                    <div className='grid gap-3'>
                                                        <button
                                                            type='button'
                                                            disabled={true}
                                                            className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                        >
                                                            Groove Pending
                                                        </button>

                                                        <button
                                                            onClick={() => setCancelGroove(!cancelGroove)}
                                                            type='button'
                                                            className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-red-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                        >
                                                            Cancel Groove
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            {/* 
                                            {
                                                orderDetails?.status === 'Ongoing' && (
                                                    <div className='grid'>
                                                        <div>
                                                            <button
                                                                type='button'
                                                                onClick={() => completOrderHandler()}
                                                                className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-[#800020] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                            >
                                                                Complete Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            } */}

                                            {
                                                orderDetails?.status === 'Accepted' && (
                                                    <div className='grid'>
                                                        <div>
                                                            <button
                                                                disabled={true}
                                                                type='button'
                                                                // onClick={() => completOrderHandler()}
                                                                className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-[#800020] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                            >
                                                                Groovie Accepted
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>

                                    )
                                }

                                {
                                    orderDetails.status === 'Completed' && (
                                        <>
                                            {
                                                info?.accountType === 'Groover' && (
                                                    <div className='grid grid-cols-2 gap-3'>

                                                        <button
                                                            type='button'
                                                            disabled={true}
                                                            // onClick={() => completOrderHandler()}
                                                            className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-[#800020] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                        >
                                                            Order Completed
                                                        </button>

                                                        <button
                                                            type='button'
                                                            onClick={() => setReviewOrder(!reviewOrder)}
                                                            className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-green-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                        >
                                                            Rate Groove
                                                        </button>

                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }

                                {/* //STATE FOR WHEN THE ORDER IS STILL PENDING, IN PROGRESS  */}
                                {
                                    info?.accountType === 'Groovie' && (
                                        <div>
                                            {
                                                orderDetails?.status === 'Pending' && (
                                                    <div className='grid md:grid-cols-2 gap-3'>
                                                        <button
                                                            disabled={processing}
                                                            onClick={() => declineOrderHandler()}
                                                            type='button'
                                                            className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-[#800020] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                        >
                                                            {processing ? "Processing ..." : "Decline Request"}
                                                        </button>

                                                        <button
                                                            disabled={processing}
                                                            onClick={() => acceptOrderHandler()}
                                                            type='button'
                                                            className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-green-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                        >
                                                            {processing ? "Processing ..." : " Accept Request"}
                                                        </button>

                                                    </div>
                                                )
                                            }

                                            {
                                                orderDetails?.status === 'Accepted' && (
                                                    <div className='grid'>
                                                        <div >
                                                            <button
                                                                type='button'
                                                                onClick={() => setCompleteGroove(!completeGroove)}
                                                                disabled={processing}
                                                                className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-green-800 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                            >
                                                                Complete Order
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            {
                                                orderDetails?.status === 'Completed' && (
                                                    <div className='grid'>
                                                        <div >
                                                            <button
                                                                type='button'
                                                                onClick={() => completOrderHandler()}
                                                                disabled
                                                                className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-gray-400 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                            >
                                                                Order Completed
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>

                                    )
                                }

                            </div>

                            {/* SECOND HALF STARTS HERE */}
                            < div className='w-full md:w-2/3 bg-white md:mt-5 md:ml-5 md:p-10 p-2' >
                                {/* THE DETAILS HERE */}
                                <p className="font-extrabold pb-3 text-gray-700 block" > Groove Details</p>
                                <div className='p-4'>
                                    <div
                                        className='text-sm'
                                        dangerouslySetInnerHTML={{
                                            __html: `${orderDetails?.grooveRef?.details}`
                                        }}>
                                    </div>
                                </div>

                                <div>
                                    {/* ORDER DETAILS LIST */}
                                    <div className='grid grid-cols-2 gap-1 text-sm md:my-5'>
                                        {/* {
                                            requirements.map((required) => (
                                                <div key={required.title} className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                    <p className='text-gray-400'>{required.title}</p>
                                                    <p className='font-bold text-gray-600'>{required.answer}</p>
                                                </div>
                                            ))
                                        } */}

                                        {
                                            orderDetails?.startDate && (
                                                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                    <p className='text-gray-400'>Start Date</p>
                                                    <p className='font-bold text-gray-600'>{orderDetails?.startDate}</p>
                                                </div>
                                            )
                                        }

                                        {
                                            orderDetails?.endDate && (
                                                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                    <p className='text-gray-400'>End Date</p>
                                                    <p className='font-bold text-gray-600'>{orderDetails?.endDate}</p>
                                                </div>
                                            )
                                        }

                                        {
                                            orderDetails?.orderType && (
                                                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                    <p className='text-gray-400'>Groove Type</p>
                                                    <p className='font-bold text-gray-600'>{orderDetails?.orderType === 'perDay' ? "Day" : 'Session'}</p>
                                                </div>
                                            )
                                        }

                                        {
                                            orderDetails?.sessionTime?.length > 0 && (
                                                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                    <p className='text-gray-400'>Order Type</p>
                                                    <p className='font-bold text-gray-600'>{orderDetails?.sessionTime?.join(",")}</p>
                                                </div>
                                            )
                                        }

                                        {
                                            orderDetails?.groovePackage && (
                                                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                    <p className='text-gray-400'>Plan</p>
                                                    <p className='font-bold text-gray-600'>{orderDetails?.groovePackage}</p>
                                                </div>
                                            )
                                        }


                                    </div>
                                </div>

                                <div>

                                </div>
                            </div>
                        </div>
                    )
                }
            </section >


        </div >
    )
}

export default OrderDetails