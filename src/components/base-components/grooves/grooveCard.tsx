import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { HiBadgeCheck } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { formatMoney } from '../../../services/utils/helpersFunc'
import { useNavigate } from 'react-router-dom'
import TooltipsComponent from '../tooltips/tooltips'

interface IGrooveCard {
    showCategory?: boolean
    groove?: any
}


function GrooveCard({ showCategory, groove }: IGrooveCard) {
    const { info } = useSelector((state: any) => state.userInfo)
    const navigate = useNavigate()

    const navigationHandler = (groove: any) => {
        navigate(`/dashboard/groove/${groove?.id}`)
        window.location.reload()
    }

    return (
        <div className='w-[12rem] h-80 p-4'>

            <div
                style={{
                    backgroundImage: `url(${groove?.customerRef?.profileImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className={`bg-gradient-to-t from-gray-800 h-32 rounded-lg relative`}>
                <div className='p-4 pt-14 bg-black bg-opacity-50 h-full w-full rounded-lg absolute top-0 left-0 '>
                    <div className='relative'>
                        <img
                            className="h-10 w-10 object-cover rounded-full border-4 border-amber-500"
                            src={groove?.customerRef?.profileImage || (info?.sex === 'M' ? require('../../../assets/images/yeboo-male-placeholder.jpg') : require('../../../assets/images/yeboo-placeholder.jpg'))}
                            alt="profile"
                        />
                        <HiBadgeCheck
                            color='#E0AA3E'
                            size={20}
                            className='absolute top-6 left-5 bg-white p-0.5 rounded-full'
                        />
                    </div>

                    <h3 className=' mt-2 text-start font-extrabold text-xs text-white'>{groove?.customerRef?.lastname} {groove?.customerRef?.firstname.charAt(0)}.</h3>
                </div>
            </div>


            <div className="mt-2">
                {showCategory && (<p className=' text-wine text-sm mb-2 cursor-pointer'>{groove?.category}</p>)}

                <div
                    onClick={() => navigationHandler(groove)}>
                    <p className="text-sm font-bold text-gray-600 cursor-pointer">{groove?.title}</p>
                </div>

                <div className='flex items-center'>
                    <p id='reviews' className='text-xs text-gray-500 flex items-center mt-3'>
                        <AiFillStar
                            color='#FCCF14'
                            size={20}
                        />
                        <p className='ml-1'>{groove?.avgRating}</p>
                        <TooltipsComponent
                            anchorSelect="#reviews"
                            content="Average Reviews"
                        />
                    </p>

                    <p id='favourites' className='text-xs text-gray-500 flex items-center mt-3 ml-2'>

                        <img
                            alt=''
                            className='object-cover'
                            src={require('../../../assets/images/like.png')}
                        />
                        <p className='ml-1'>{groove?.nRating}</p>
                        <TooltipsComponent
                            anchorSelect="#favourites"
                            content="Favorites"
                        />
                    </p>
                </div>
            </div>

            <div className='text-sm'>
                <p className='my-2 text-gray-500'>From</p>
                <p className='font-bold text-wine'>NGN {groove?.price && formatMoney(Number(groove.price))}</p>
            </div>
        </div>
    )
}

export default GrooveCard
