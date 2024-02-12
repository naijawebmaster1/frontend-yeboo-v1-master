import { useState, useEffect } from 'react'
import Header from '../../components/block-components/header/header'
import YebboBack from '../../components/base-components/back/yebooBack'
import { HiBadgeCheck } from 'react-icons/hi'
import { BsCheck } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { IoNotificationsCircleOutline } from 'react-icons/io5'
import AcceptRejectReqestModal from '../../components/block-components/modal/acceptRequestModal'
import { useSelector } from 'react-redux';
import userService from '../../services/actions/userActions'
import { filterRequestedOrders, formatOrderDate2, formatMoney } from '../../services/utils/helpersFunc'
import LoadingState from '../../components/block-components/loader/loading'
import { useNavigate } from 'react-router-dom'
import grooveService from '../../services/actions/grooveActions'
import { toast } from 'react-toastify'
import EmptyGrooveState from '../../components/base-components/emptyState/emptyGrooveState'
import ModalLayout from '../../layout/modal/modalLayout'

function Proposals() {
    const [showDetails, setShowDetails] = useState(false)
    const [acceptReject, setAcceptReject] = useState(false)
    const [status, setStatus] = useState('')
    const [processing, setProcessing] = useState(false)
    const { info } = useSelector((state: any) => state.userInfo)
    const { token } = useSelector((state: any) => state.login)
    const [selectedGroove, setSelectedGroove] = useState<any>()
    const [Proposals, setProposals] = useState<any>()
    const navigate = useNavigate()

    const getOrders = async () => {
        const res = await userService.getMyProposals(token)
        if (res) {
            setProposals(filterRequestedOrders(res.data, 'Pending'))
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getOrders()
    }, [])

    const viewHandler = (selected: any) => {
        setSelectedGroove(selected)
        setShowDetails(true)

    }

    const acceptHandler = () => {
        setStatus('accept')
        setAcceptReject(!acceptReject)
    }

    const rejectHandler = () => {
        setStatus('reject')
        setAcceptReject(!acceptReject)
    }

    const acceptOrderHandler = async () => {
        setProcessing(true)
        const data = {
            token: token,
            response: 'Accepted',
            orderId: selectedGroove._id
        }
        const res = await grooveService.updateGrooveOrderStatus(data)

        if (res) {
            setProcessing(false)
            setAcceptReject(!acceptReject)
            toast.success("Groove request accepted successfully")
            window.location.reload()
        }
        setProcessing(false)
    }

    const cancelOrderHandler = async () => {
        setProcessing(true)
        const data = {
            token: token,
            response: 'Declined',
            orderId: selectedGroove._id
        }
        const res = await grooveService.updateGrooveOrderStatus(data)
        if (res) {
            setProcessing(false)
            toast.success("Order cancelled successfully")
            setAcceptReject(!acceptReject)
            window.location.reload()
        }
        setProcessing(false)
    }

    return (
        <div>
            {acceptReject && <AcceptRejectReqestModal processing={processing} action={status} isOpen={acceptReject} setOpen={() => setAcceptReject(!acceptReject)} acceptHandler={acceptOrderHandler} declineHandler={cancelOrderHandler} />}
            <Header pageTitle='Proposals' />
            <section className='mx-auto max-w-7xl items-center p-6'>
                <p className='my-5 font-bold md:text-xl'>Proposals</p>

                <YebboBack
                    title='Proposals'
                    screenDetails={["Grooves", "Proposals"]}
                />

                {/* SECTION STARTS HERE */}

                <div className='flex flex-col md:flex-row justify-between  my-4 items-center'>
                    <p className='font-bold text-gray-700 md:mb-0 mb-4'>All Proposals</p>
                </div>


                <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between '>
                    <div className='w-full md:w-1/3 bg-white md:p-10 p-2 h-full'>

                        {Proposals?.length === 0 && 
                        <EmptyGrooveState message="There's currently no pending proposals" imageSrc=''/>
                        }

                        {!Proposals && <LoadingState />}
                        {
                            Proposals && Proposals?.length > 0 && Proposals.map((request: any) => (
                                <button
                                    onClick={() => viewHandler(request)}
                                    key={request?._id} className='flex mb-5 hover:bg-[#EAEAEB] rounded-lg p-3  justify-start items-center cursor-pointer'>
                                    <div className='relative'>
                                        <img
                                            className="h-10 w-10 object-cover rounded-full border-4 border-amber-500"
                                            src={request?.grooverRef?.profileImage}
                                            alt=""
                                        />
                                        <HiBadgeCheck
                                            color='#E0AA3E'
                                            size={20}
                                            className='absolute top-6 left-7 bg-white p-0.5 rounded-full'
                                        />
                                    </div>
                                    <div className='ml-5'>
                                        <p className='text-[14px] font-semibold text-charleston'>New Groove Request</p>
                                        <p className='text-sm font-[400px]'>Tap to view request</p>

                                    </div>

                                </button>
                            ))
                        }
                    </div>



                    {
                        showDetails && (
                            <div className='w-full md:w-2/3 bg-white md:ml-5 md:p-10 p-2'>

                                <div className='bg-[#FBFBFB] p-5 rounded-lg flex flex-col lg:flex-row justify-between items-center'>

                                    <div className='flex justify-start items-center'>
                                        <div className='relative'>
                                            <img
                                                className="h-10 w-10 object-cover rounded-full border-4 border-amber-500"
                                                src={selectedGroove?.grooverRef?.profileImage}
                                                alt="profile"
                                            />
                                            <HiBadgeCheck
                                                color='#E0AA3E'
                                                size={20}
                                                className='absolute top-6 left-7 bg-white p-0.5 rounded-full'
                                            />
                                        </div>

                                        <div className='ml-3'>
                                            <p className='font-bold text-sm'>{selectedGroove?.grooverRef?.username}</p>
                                            <p className='text-sm '>Groover
                                                <span
                                                    onClick={() => navigate(`/dashboard/user/${selectedGroove?.grooverRef?._id}`)}
                                                    className="text-wine font-bold ml-5 cursor-pointer">view profile</span></p>
                                        </div>
                                    </div>

                                    <div className='text-sm flex lg:justify-center items-center gap-x-3 gap-y-3'>
                                        <button
                                            onClick={() => rejectHandler()}
                                            className='bg-white px-3 py-2 flex items-center rounded-lg text-red-600 border-gray-300'>
                                            <AiOutlineClose />
                                            <span className='ml-3'> Reject</span>
                                        </button>
                                        <button
                                            onClick={() => acceptHandler()}
                                            className='text-green-500 flex items-center  px-3 py-2 bg-white border-gray-300'>
                                            <BsCheck />
                                            <span className='ml-3'> Accept</span>
                                        </button>
                                    </div>
                                </div>


                                <div className='bg-[#FBFBFB] p-5 my-3 rounded-lg flex flex-col  justify-start'>

                                    <p className='text-xs  text-charleston'>Groove Title</p>
                                    <p className='font-bold text-charleston my-3'>{selectedGroove?.grooveRef?.details}</p>
                                    <p
                                        onClick={() => navigate(`/dashboard/user/${selectedGroove?.grooveRef?._id}`)}
                                        className='text-wine text-xs font-bold cursor-pointer'>view groove</p>
                                </div>

                                {/* //NOTE STARTS HERE */}

                                <div className='bg-[#FBFBFB] h-20 p-5 my-3 rounded-lg flex flex-col  justify-start'>

                                    <p className='text-xs  text-charleston'>Note</p>
                                </div>

                                <div className=' grid md:grid-cols-2 gap-3'>
                                    <div className='bg-[#FBFBFB] h-20 p-5 my-3 rounded-lg flex flex-col  justify-start'>
                                        <p className='text-xs mb-1  text-charleston'>{selectedGroove?.proposalType === "perSession" ? "Session" : "Day"}</p>
                                        <p className='font-bold text-sm'>{selectedGroove?.proposalType === "perSession" ? `${selectedGroove?.sessionTime}` : selectedGroove?.date}</p>
                                    </div>

                                    <div className='bg-[#FBFBFB] h-20 p-5 my-3 rounded-lg flex flex-col  justify-start'>
                                        <p className='text-xs  text-charleston mb-1'>Request Date</p>
                                        <p className='font-bold text-sm'>{selectedGroove?.createdAt && formatOrderDate2(selectedGroove?.createdAt)}</p>
                                    </div>
                                </div>

                                <div className=' grid md:grid-cols-2 gap-3'>
                                    <div className='bg-[#FBFBFB] h-20 p-5 my-3 rounded-lg flex flex-col  justify-start'>
                                        <p className='text-xs mb-1  text-charleston'>Amount</p>
                                        <p className='font-bold text-sm'>
                                            N {selectedGroove?.amount && formatMoney(selectedGroove?.amount)}  <span className=' text-gray-300 font-light'>
                                                / {selectedGroove?.orderType === 'perSession' ? "session" : "day"} </span></p>
                                    </div>

                                    <div className='bg-[#FBFBFB] h-20 p-5 my-3 rounded-lg flex flex-col  justify-start'>
                                        <p className='text-xs  text-charleston mb-1'>Plan</p>
                                        <p className='font-bold text-sm'>Basic Plan</p>
                                    </div>
                                </div>

                                <div className=' grid md:grid-cols-2 gap-3'>
                                    <div className='bg-[#FBFBFB] h-20 p-5 my-3 rounded-lg flex flex-col  justify-start'>
                                        <p className='text-xs mb-1  text-charleston'>Expected Amount</p>
                                        <p className='font-bold text-sm'>N {selectedGroove?.amount && formatMoney(selectedGroove?.amount)}</p>
                                    </div>

                                    {/* <div className='bg-[#FBFBFB] h-20 p-5 my-3 rounded-lg flex flex-col  justify-start'>
                                        <p className='text-xs  text-charleston mb-1'>Location</p>
                                        <p className='font-bold text-sm'>Kwara State</p>
                                    </div> */}
                                </div>

                                <div className='mt-5 flex justify-start p-5'>
                                    <IoNotificationsCircleOutline size={30} color="#949699" />
                                    <div className='ml-3'>
                                        <p className='font-bold text-charleston text-sm'>Notification</p>
                                        <p className='text-xs text-charleston mt-2'>Cost is calculated based on Groove duration. Each day contributes to the total. Project rate: N300,000. Questions? Reach out anytime. Thank you!</p>
                                    </div>

                                </div>

                            </div>
                        )
                    }
                </div>
            </section>
        
        </div>
    )
}

export default Proposals

