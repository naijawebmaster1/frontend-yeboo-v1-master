import React from 'react'
import { AiFillStar, AiOutlineEye } from 'react-icons/ai'
import { RiShieldCheckLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { formatMoney } from '../../../services/utils/helpersFunc';
import { getOrderDetailsAction } from '../../../services/reducers/orderDetailsReducer/orderDetailsReducer';
import { useDispatch } from 'react-redux';
import { GetOrderPriceFromPackage } from '../../../services/utils/helpersFunc';


interface IMyOrder {
    order?: any
}
function MyOrderCard({ order }: IMyOrder) {
    const { info } = useSelector((state: any) => state.userInfo)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate();

    const viewOrderHandler = (data: any) => {
        // dispatch(getOrderDetailsAction({data}))
        navigate(`/dashboard/order/${order.id}`)
    }

    return (
        <div>
            <>
                <div className='w-full min-h-40 md:p-4 flex flex-col md:flex-row items-center overflow-x-hidden'>
                    <div className='flex items-center'>
                        <div className='bg-gradient-to-t from-gray-800 h-32 w-80 rounded-lg'>
                        </div>

                        {/* <img 
                        className='h-32 w-80 object-cover rounded-lg'
                        alt="" 
                        src={info?.userName === "Groover" ? `${order?.groovieRef.profileImage}` : `${order?.grooverRef?.profileImage}`}/> */}
                    </div>

                    <div className="md:ml-10 ml-2 w-full">
                        <div className='flex justify-between items-center md:m-0 m-2'>
                            <div>
                                {
                                    info?.accountType === 'Groovie' ? (
                                        <p
                                            onClick={() => navigate(`/dashboard/groover/${order?.customerRef?._id}`)}
                                            className=' text-wine text-xs cursor-pointer font-bold'>Request From</p>
                                    ) : (
                                        <p
                                            onClick={() => navigate(`/dashboard/groovie/${order?.grooveRef?.customerRef?._id}`)}
                                            className=' text-wine text-xs cursor-pointer font-bold'>Groovie</p>
                                    )
                                }
                            </div>
                            <div className='flex items-center justify-center'>
                                <p className='text-xs text-gray-500 flex items-center '>
                                    <AiFillStar
                                        color='#FCCF14'
                                        size={20}
                                    />
                                    <p className='ml-1'>4.5</p>
                                </p>

                                <p className='text-xs text-gray-500 flex items-center ml-2'>
                                    <img
                                        alt=''
                                        className='object-cover'
                                        src={require('../../../assets/images/like.png')}
                                    />
                                    <p className='ml-1'>100</p>

                                </p>
                            </div>
                        </div>

                        {
                            info?.accountType === 'Groovie' ? (
                                <p className="text-sm font-bold text-gray-600 cursor-pointer border-b-2 border-gray-100 py-2">{order?.grooverRef?.username}</p>
                            ) : (
                                <p className="text-sm font-bold text-gray-600 cursor-pointer border-b-2 border-gray-100 py-2">{order?.grooveRef?.customerRef?.username}</p>
                            )
                        }

                        <div className='py-3 border-b-2 border-gray-100 md:m-0 m-2'>
                            <div className='flex justify-between items-center'>
                                <p className=' text-wine text-xs'>Package</p>
                                <p className=' text-gray-400 text-sm'>Amount</p>
                            </div>

                            <div className='flex justify-between items-center'>
                                <p className=' text-[#292D32] text-sm font-bold'>{order?.groovePackage}</p>
                                <p className=' text-[#292D32] text-xs py-4 font-bold'>NGN {order?.amount && formatMoney(order?.amount)}
                                    {/* {order?.amount && formatMoney(Number(order?.amount))} */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='py-4 border-b-2 border-gray-100 md:m-0 m-2 flex flex-col md:flex-row items-center justify-between'>

                    <div className='flex items-center'>
                        <div className=''>
                            <p className=' text-gray-400 text-sm text-center md:text-start py-3 '>Status</p>
                            <p className={`font-bold text-sm 
                            ${order?.status === "Accepted" ? "bg-yellow" : order?.status === 'Pending' ? "bg-wine" : "bg-green-500"}
                             text-white px-3 py-1 rounded-md`}>
                                {order?.status === "Accepted" ? "Ongoing" : order?.status}
                            </p>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate(`/dashboard/order/${order?.id}`)}
                        className='flex justify-start items-center text-[#800020] cursor-pointer md:mt-0 mt-3 '>
                        <AiOutlineEye
                            size={30}
                            className='shadow-lg p-2 rounded-lg mr-4'
                        />
                        <p className='text-sm'>View Order Details</p>
                    </div>
                </div>
            </>
        </div>
    )
}

export default MyOrderCard
