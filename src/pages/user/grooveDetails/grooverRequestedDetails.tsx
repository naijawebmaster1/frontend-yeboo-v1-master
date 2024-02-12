import React from 'react'
import { formatMoney } from '../../../services/utils/helpersFunc';

interface IGrooverRequested {
    details?: any
}

function GrooverRequestedDetails({ details }: IGrooverRequested) {
    return (
        <div>
            <div className='bg-gray-100 my-5 p-4 rounded-lg'>
                <p className='text-gray-400'>Groove Requirements</p>
            </div>
            {/* GROOVE REQUIREMTS LIST */}
            <div className='grid grid-cols-2 gap-1'>
                {/* <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Nationality</p>
                    <p className='font-bold text-gray-600'>{details?.requirements?.nationality}</p>
                </div> */}

                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Category</p>
                    <p className='font-bold text-gray-600'>{details?.category}</p>
                </div>

                {/* <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>State</p>
                    <p className='font-bold text-gray-600'>{details?.state}</p>
                </div> */}

                {/* <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Alcohol</p>
                    <p className='font-bold text-gray-600'>{details?.requirements?.isDrink ? "Yes" : "No"}</p>
                </div> */}

                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>City</p>
                    <p className='font-bold text-gray-600'>{details?.location}</p>
                </div>
{/* 
                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Body Type</p>
                    <p className='font-bold text-gray-600'>{details?.requirements?.bodyType}</p>
                </div> */}

                {/* <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Location</p>
                    <p className='font-bold text-gray-600'>{details?.location}</p>
                </div> */}

                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Availability</p>
                    <p className='font-bold text-gray-600'>{details?.isAvailable ? "Available" : "Unavailable"}</p>
                </div>

                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>State</p>
                    <p className='font-bold text-gray-600'>{details?.state}</p>
                </div>

                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Status</p>
                    <p className='font-bold text-gray-600'>{details?.status}</p>
                </div>

                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Duration</p>
                    <p className='font-bold text-gray-600'>{details?.duration}  {details?.duration === 1 ? "Day" : "Days"}</p>
                </div>

                
                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Budget</p>
                    <p className='font-bold text-gray-600'>₦ {details?.price && formatMoney(details?.price)}</p>
                </div>

                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Request Type </p>
                    <p className='font-bold text-gray-600'>{details?.requestType === 'perSession' ? "Session" : "Day"}</p>
                </div>

                <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                    <p className='text-gray-400'>Date </p>
                    <p className='font-bold text-gray-600'>{details?.date}</p>
                </div>

            </div>
        </div>
    )
}

export default GrooverRequestedDetails
