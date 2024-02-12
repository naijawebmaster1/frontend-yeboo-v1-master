import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { HiBadgeCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatMoney } from '../../../services/utils/helpersFunc'
import TooltipsComponent from '../tooltips/tooltips'


interface IGrooveListCard {
    showCategory?: boolean
    groove?: any
}

function GrooveListCard({ showCategory, groove }: IGrooveListCard) {
    const navigate = useNavigate()
    const { info } = useSelector((state: any) => state.userInfo)

    const navigationHandler = (groove: any) => {
        navigate(`/dashboard/groove/${groove?.id}`)
        window.location.reload()
    }


    return (

        <>
            {
                groove && (
                    <div className='w-auto min-h-40 md:p-4 flex justify-between items-center'>
                        <div className='flex items-center'>

                            {!groove?.customerRef?.profileImage && (
                                <div className='bg-gradient-to-t from-gray-800 h-32 w-40 rounded-lg'>
                                </div>
                            )
                            }

                            {groove?.customerRef?.profileImage && (
                                <div
                                    style={{
                                        backgroundImage: `url(${groove?.customerRef?.profileImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                    className={`bg-gradient-to-t from-gray-800 h-32 w-40 rounded-lg relative`}>
                                </div>
                            )
                            }



                            <div className="md:ml-10 ml-2">
                                {showCategory && (<p className=' text-wine text-sm mb-2 cursor-pointer'>{groove?.category}</p>)}
                                <p onClick={() => navigationHandler(groove)} className="text-sm font-bold text-gray-600 cursor-pointer">I am available for escort project</p>

                                <div className='text-sm'>
                                    <p className='my-2 text-gray-500'>From</p>
                                    <p className='font-bold text-wine'>NGN {groove?.price && formatMoney(groove?.price)}</p>

                                    <div className='md:mt-2 flex items-center'>
                                        <div className='relative'>
                                            <img
                                                className="h-10 w-10 object-cover rounded-full border-4 border-white"
                                                src={groove?.customerRef?.profileImage || (info?.sex === 'M' ? require('../../../assets/images/yeboo-male-placeholder.jpg') : require('../../../assets/images/yeboo-placeholder.jpg'))}
                                                alt="profile"
                                            />
                                            <HiBadgeCheck
                                                color='#E0AA3E'
                                                size={20}
                                                className='absolute top-6 left-5 bg-white p-0.5 rounded-full'
                                            />

                                        </div>

                                        <h3 className=' mt-2 text-start text-xs text-gray-300 font-bold'>{groove?.customerRef?.lastname} {groove?.customerRef?.firstname.charAt(0)}.</h3>
                                    </div>
                                </div>
                            </div>

                        </div>




                        <div className='flex items-center'>
                            <p id='reviews' className='text-xs text-gray-500 flex items-center mt-3'>
                                <AiFillStar
                                    color='#FCCF14'
                                    size={20}
                                />
                                <p className='ml-1'>{groove?.avgRating}</p>
                                <TooltipsComponent
                                    anchorSelect='#reviews'
                                    content='Average Reviews'
                                />
                            </p>

                            <p id='favorite' className='text-xs text-gray-500 flex items-center mt-3 ml-2'>
                                <img
                                    alt=''
                                    className='object-cover'
                                    src={require('../../../assets/images/like.png')}
                                />
                                <p className='ml-1'>{groove?.nRating}</p>
                                <TooltipsComponent
                                    anchorSelect='#favorite'
                                    content='Favorites'
                                />
                            </p>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default GrooveListCard