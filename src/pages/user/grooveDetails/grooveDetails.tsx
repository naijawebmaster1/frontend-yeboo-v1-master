import React, { useState, useEffect } from 'react'
import Header from '../../../components/block-components/header/header'
import YebboBack from '../../../components/base-components/back/yebooBack'
import GrooveCard from '../../../components/base-components/grooves/grooveCard'
import GrooveListCard from '../../../components/base-components/grooves/grovesListCard'
import { HiBadgeCheck } from 'react-icons/hi'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { HiOutlineChatBubbleLeftRight, HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'
import { AiFillStar } from 'react-icons/ai'
import Button from '../../../components/block-components/button/button'
import { useNavigate } from 'react-router-dom'
import GrooviePostedDetails from './grooviePostedDetails'
import GrooverRequestedDetails from './grooverRequestedDetails'
import HireNow from '../../../components/block-components/modal/hireNow'
import { toast } from 'react-toastify'
import ConfirmTransaction from './../../../components/block-components/modal/confirmTransaction';
import { useParams } from 'react-router-dom'
import grooveService from '../../../services/actions/grooveActions'
import { useSelector, useDispatch } from 'react-redux';
import { getGroovesAction } from '../../../services/reducers/groovesReducer.ts/getGroovesReducer'
import { formatMoney } from '../../../services/utils/helpersFunc'
import Loader from '../../../components/block-components/loader/loader'
import ModalLayout from '../../../layout/modal/modalLayout'
import PayPerSession from '../../../components/block-components/modal/PayPerSession'
import { hireAndProposalAction } from '../../../services/reducers/orderDetailsReducer/hireAndProposalReducer'



function GrooveDetails() {
    const { user, token } = useSelector((state: any) => state.login)
    const dispatch = useDispatch<any>()
    const { grooves } = useSelector((state: any) => state.grooves)
    const { info } = useSelector((state: any) => state.userInfo)

    const navigate = useNavigate()
    const [selectedPlan, setSelectedPlan] = useState('')
    const [price, setPrice] = useState('')
    const [transactionLoading, setLoading] = useState(false)

    const [payNow, setPayNow] = useState(false)
    const [transactionPin, setTransactionPin] = useState('')
    const [confirmTransaction, setConfirmTransaction] = useState(false)
    const [userType, setUserType] = useState<any>()
    const { id }: any = useParams();
    const [details, setDetails] = useState<any>()
    const [perSessionModalOpen, setPerSessionModalOpen] = useState(false)
    const { orderDetails } = useSelector((state: any) => state.hireAndProposal)


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(hireAndProposalAction({}))
        const user_type = localStorage.getItem('user_type')
        setUserType(user_type)
        const getGrooveDetails = async () => {
            const res = await grooveService.getGroove(id)
            if (res) {
                setDetails(res?.data?.groove)
            }
        }

        if (id) {
            getGrooveDetails()
            dispatch(getGroovesAction({}))
        }
    }, [])


    const selectedPlanHandler = () => {

        if (!orderDetails.groovePackage) {
            return toast.warning('Kindly select groove package continue')
        }

        if (!orderDetails.orderType) {
            return toast.warning('Kindly select either Pay Per Day or Pay Per Session continue')
        }

        if (!info!.nationality) {
            toast.warning('Please update your profile')
            return navigate(`/auth/about-yourself?redirect=groove/${id}`)
        }

        if (!info!.isAuthenticate.bvn) {
            toast.warning('Please verify your account BVN to continue')
            return navigate(`/dashboard/wallet`)
        }

        //Check for the Account Balance To Be Sure It's Sufficient Too
        // if (!info.isAuthenticate.nin) {

        // }

        navigate(`/dashboard/grooves/send-offer`)
        // setPayNow(!payNow)
    }

    const filterGrooveByUserId = (id: string, datas: any) => {
        const res = datas.filter((data: any) => data.customerRef._id === id)
        return res
    }

    const viewProfileHandler = () => {

        if (details?.requirements) {
            navigate(`/dashboard/groovie/${details?.customerRef?._id}`)
        } else {
            navigate(`/dashboard/groover/${details?.customerRef?._id}`)
        }
    }

    const hireMeHandler = async () => {
        setLoading(true)
        const data = {
            grooveId: details?.id,
            groovePackage: selectedPlan,
            transactionPin: Number(transactionPin),
            token: token
        }
        const res = await grooveService.orderGrooves(data)
        if (res) {
            toast.success("Groovie Ordered Successfully")
            navigate(`/dashboard/orders`)
        }
        setLoading(false)
    }

    const favouriteHandler = async () => {
        const res = await grooveService.addGrooveToFavorite({ token, id: details?._id })
        if (res) {
            toast.success("Groove added to favourites")
        }
    }

    const groovieSendProposalHandler = async () => {
        await dispatch(hireAndProposalAction({
            ...orderDetails,
            location: details?.location,
            grooveRef: details?._id,
            price: details?.price,
            proposalType: `${details?.requestType === "perSession" ? "perSession" : 'perDay'}`,
        }))

        navigate(`/dashboard/grooves/send-proposal`)
    }

    return (
        <>
            <ModalLayout open={perSessionModalOpen} setOpen={setPerSessionModalOpen} showClose={true} title={''}>
                <PayPerSession />
            </ModalLayout>
            {!details && <Loader />}
            {
                details && (
                    <div>
                        {payNow && (<HireNow open={payNow} setOpen={() => setPayNow(!payNow)} confirmTransaction={confirmTransaction} selectedPlan={price} setConfirmTransaction={setConfirmTransaction} />)}
                        {confirmTransaction && (<ConfirmTransaction
                            confimHandler={hireMeHandler}
                            open={confirmTransaction} setOpen={setConfirmTransaction} loading={transactionLoading} setPayNow={setPayNow} code={transactionPin} setCode={setTransactionPin} />)}
                        <Header />
                        <section className='mx-auto max-w-7xl items-center p-6'>
                            <YebboBack
                                title='Groove Details'
                                screenDetails={[]}
                            />

                            {/* SECTION STARTS HERE */}

                            <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between overflow-x-hidden '>
                                <div className='w-full md:w-1/3 bg-white md:p-4 p-2'>

                                    <div className='relative'>

                                        {
                                            details?.customerRef?.profileImage ? (
                                                <img
                                                    className='object-cover h-60 w-full rounded-lg '
                                                    alt='Groover'
                                                    src={details?.customerRef?.profileImage}
                                                />
                                            ) : (
                                                <img
                                                    className='object-cover h-60 w-full rounded-lg '
                                                    alt='Groover'
                                                    src={require("../../../assets/images/yeboobg.jpeg")}
                                                />
                                            )
                                        }



                                        <div className='absolute bottom-[-45px] left-36'>
                                            <img
                                                className="h-20 w-20 object-cover rounded-full border-4 border-yellow"
                                                src={details?.customerRef?.profileImage || (info?.sex === 'M' ? require('../../../assets/images/yeboo-male-placeholder.jpg') : require('../../../assets/images/yeboo-placeholder.jpg'))}
                                                alt="profile"
                                            />

                                            {
                                                details?.customerRef.isVip && (
                                                    <HiBadgeCheck
                                                        color='#E0AA3E'
                                                        size={30}
                                                        className='absolute top-12 left-14 bg-white p-0.5 rounded-full'
                                                    />
                                                )
                                            }

                                        </div>
                                    </div>

                                    <div className='flex flex-col text-sm justify-center items-center mt-16'>
                                        <p className='text-wine font-bold'>{details?.customerRef?.lastname} {details?.customerRef?.firstname.charAt(0)}   {details?.customerRef.isVip && ". VIP"}</p>
                                        <p onClick={() => viewProfileHandler()} className='text-wine underline py-2 font-bold cursor-pointer'>View Profile</p>
                                        <p className='text-gray-600 font-bold text-base'>{details?.title}</p>

                                        <div className='flex items-center'>
                                            <p className='text-xs text-gray-500 flex items-center mt-3'>
                                                <AiFillStar
                                                    color='#FCCF14'
                                                    size={20}
                                                />
                                                <p className='ml-1'>{details?.avgRating}</p>

                                            </p>

                                            <p className='text-xs text-gray-500 flex items-center mt-3 ml-2'>
                                                <img
                                                    alt=''
                                                    className='object-cover'
                                                    src={require('../../../assets/images/like.png')}
                                                />
                                                <p className='ml-1'>{details?.nRating}</p>

                                            </p>
                                        </div>

                                        <p className='mt-5 mb-2 text-gray-500'>From</p>
                                        <p className='font-bold text-wine'>NGN {details?.price && formatMoney(details?.price)}</p>
                                    </div>

                                    {/* SHOW THIS IF POSTED BY A GROOVIE */}
                                    {
                                        details.grooveType === 'Request' && (
                                            <GrooverRequestedDetails
                                                details={details}
                                            />
                                        )
                                    }

                                    {
                                        details.grooveType === 'Post' && (
                                            <GrooviePostedDetails
                                                details={details}
                                                setPrice={setPrice}
                                                setSelectedPlan={setSelectedPlan}
                                            />
                                        )
                                    }


                                    {/* ACTION BUTTONS STARTS HERE */}
                                    {
                                        details?.customerRef?.username !== info?.username && (
                                            <div className='grid grid-cols-2 md:gap-3 gap-1 my-5'>
                                                {
                                                    details.grooveType === 'Request' && (
                                                        <div >
                                                            <Button
                                                                icon={<HiOutlineChatBubbleLeftRight />}
                                                                text="Send Proposal" onClick={() => groovieSendProposalHandler()} backgroundColor='#800020' textColor='#fff' />
                                                        </div>
                                                    )
                                                }

                                                {
                                                    details.grooveType === 'Post' && (
                                                        <div>
                                                            <Button
                                                                icon={<HiOutlineChatBubbleBottomCenterText />}
                                                                text="Hire Me" onClick={() => selectedPlanHandler()} backgroundColor='#800020' textColor='#fff' />
                                                        </div>
                                                    )
                                                }

                                                <div>
                                                    <Button
                                                        icon={<MdOutlineFavoriteBorder />}
                                                        text="Favorite" onClick={() => favouriteHandler()} backgroundColor='#fff' textColor='#800020' />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>

                                {/* SECOND HALF STARTS HERE */}
                                <div className='w-full md:w-2/3 bg-white md:mt-5 md:ml-5 md:p-10 p-2'>
                                    {/* THE DETAILS HERE */}
                                    <p className="font-extrabold pb-3 text-gray-700 block">Groove Details</p>
                                    <div className='p-4'>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: `${details?.details}`
                                            }}></div>
                                    </div>
                                    <p className="font-extrabold pb-3 text-gray-700 block mt-10">More Grooves From {details?.customerRef?.username}</p>
                                    
                                    {
                                        grooves && filterGrooveByUserId(details?.customerRef?._id, grooves)?.map((groovy: any) => (
                                            <div key={groovy.id} className='w-full'>
                                                <div className='md:block hidden '>
                                                    <GrooveListCard showCategory={true} groove={groovy} />
                                                </div>
                                            </div>
                                        ))
                                    }

                                    <div className='md:hidden grid grid-cols-2 gap-1'>
                                        {
                                            grooves && filterGrooveByUserId(details?.customerRef?._id, grooves)?.map((groovy: any) => (
                                                <div key={groovy.id} className='w-full'>
                                                    <div className='md:hidden block w-full'>
                                                        <GrooveCard
                                                            groove={groovy}
                                                            showCategory={true} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
        </>

    )
}

export default GrooveDetails
