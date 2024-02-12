import React from 'react'
import { HiBadgeCheck } from 'react-icons/hi'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface IGroovie {
    details?: any
}

function Groovie({details}:Readonly<IGroovie>) {
    const { info } = useSelector((state: any) => state.userInfo)

    return (
        <div className='rounded-xl p-4 flex items-center justify-start '>
            <div className='relative'>
                <img
                    className="h-10 w-10 object-cover rounded-full border-4 border-amber-500"
                    src={details?.profileImage || (details?.sex === 'M' ? require('../../../assets/images/yeboo-male-placeholder.jpg') : require('../../../assets/images/yeboo-placeholder.jpg'))}
                    alt="profile"
                />
                <HiBadgeCheck
                    color='#E0AA3E'
                    size={20}
                    className='absolute top-6 left-7 bg-white p-0.5 rounded-full'
                />
            </div>

            <div className='pl-6'>
                <Link to={`/dashboard/user/${details?._id}`}>
                    <h3 className='font-bold text-start text-sm cursor-pointer'>{details?.firstname} {details?.lastname.charAt(0)}.</h3>
                </Link>

                <div className='flex items-center'>
                    <p className='text-xs text-gray-500 flex items-center mt-3'>
                        <AiFillStar
                            color='#FCCF14'
                            size={20}
                        />
                        <p className='ml-1'>{details?.ratingsAverage}</p>
                    </p>

                    <p className='text-xs text-gray-500 flex items-center mt-3 ml-2'>
                        <img
                        alt=''
                        className='object-cover'
                        src={require('../../../assets/images/like.png')}
                        />
                        <p className='ml-1'>{details?.ratingsQuantity}</p>

                    </p>
                </div>

            </div>


        </div>
    )
}

export default Groovie
