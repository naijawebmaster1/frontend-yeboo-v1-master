import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { RiShieldCheckLine } from 'react-icons/ri'
import {CiViewTimeline} from 'react-icons/ci'
import {BiDislike, BiRightArrowAlt} from 'react-icons/bi'
import { PiNumberOneFill } from 'react-icons/pi'

interface IOrderCard {
    showCategory?: boolean
}

function OrderCard({ showCategory }: IOrderCard) {
    return (
        <>
        <div className='w-full min-h-40 md:p-4 flex flex-col md:flex-row items-center overflow-x-hidden'>
            <div className='flex items-center'>
                <div className='bg-gradient-to-t from-gray-800 h-32 w-80 rounded-lg'>
                </div>
            </div>


            <div className="md:ml-10 ml-2 w-full">
                <div className='flex justify-between items-center md:m-0 m-2'>
                    <div>
                        <p className=' text-wine text-xs cursor-pointer font-bold'>One Night Stand</p>
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
                            <RiShieldCheckLine
                                color='#EE4139'
                                size={18}
                            />
                            <p className='ml-1'>100</p>

                        </p>
                    </div>
                </div>

                <p className="text-sm font-bold text-gray-600 cursor-pointer border-b-2 border-gray-100 py-2">I need a lady for One Night Stand</p>


                <div className='py-3 border-b-2 border-gray-100 md:m-0 m-2'>
                    <div className='flex justify-between items-center'>
                        <p className=' text-gray-400 text-xs'>Price</p>
                        <p className=' text-gray-400 text-sm'>Status</p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <p className=' text-[#292D32] text-sm font-bold'>NGN 50, 000</p>
                        <p className=' text-green-600 text-xs py-4 font-bold'>Completed</p>
                    </div>                
                </div>
            </div>




        </div>

        
        <div className='py-4 border-b-2 border-gray-100 md:m-0 m-2 flex flex-col md:flex-row items-center justify-between'>
                  
                  <div className='flex items-center'>
                  <div className='flex items-center cursor-pointer'>
                        <CiViewTimeline
                        size={30}
                        className='shadow-lg p-2 rounded-lg'
                        />
                        <p className=' text-gray-400 text-sm ml-4'>View Invoice</p>
                    </div>

                    <div className='flex items-center text-[#EE4139] ml-4 cursor-pointer'>
                        <BiDislike
                        size={30}
                        className='shadow-lg p-2 rounded-lg'
                        />
                        <p className=' text-sm ml-4'>Raise a Dispute</p>
                    </div>
                  </div>

                    <div className='flex justify-start items-center text-[#800020] cursor-pointer md:mt-0 mt-3 '>
                       <p className='text-sm font-bold'>View Groove Details</p>
                       <PiNumberOneFill className='mx-3 rounded-full'/>
                       <BiRightArrowAlt/>
                    </div>                
                </div>
        </>
    )
}

export default OrderCard