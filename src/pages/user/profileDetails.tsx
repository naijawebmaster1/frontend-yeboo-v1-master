import React, { useState, useEffect } from 'react'
import Header from '../../components/block-components/header/header'
import YebboBack from '../../components/base-components/back/yebooBack'
import GrooveCard from '../../components/base-components/grooves/grooveCard'
import GrooveListCard from '../../components/base-components/grooves/grovesListCard'
import { HiBadgeCheck } from 'react-icons/hi'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { AiFillStar } from 'react-icons/ai'
import { BsImageAlt } from 'react-icons/bs'
import { PiLockKeyBold } from 'react-icons/pi'
import { IoVideocamOutline } from 'react-icons/io5'
import userService from '../../services/actions/userActions'
import { useSelector } from 'react-redux';
import grooveService from '../../services/actions/grooveActions'
import { useParams } from 'react-router-dom'
import Loader from '../../components/block-components/loader/loader'
import { PiDotOutlineFill } from 'react-icons/pi'
import { countFilesUploaded } from '../../services/utils/helpersFunc'

function ProfileDetails() {
    const [showImage, setShowImage] = useState(true)
    const [userInfo, setUserInfo] = useState<any>()
    const [userGrooves, setUserGrooves] = useState<any>()
    const { token } = useSelector((state: any) => state.login)
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
        const getUserDetails = async () => {
            const res = await userService.getUserInfo({ token, id })
            if (res) {
                setUserInfo(res?.data)
            }
        }
        const getUserGrooves = async () => {
            const res = await grooveService.getGrooveByCustomerId({ id, token })
            if (res) {
                setUserGrooves(res.data)
            }
        }
        getUserDetails()
        getUserGrooves()
    }, [])
    return (
        <div>
            <Header pageTitle='Profile Details' />
            <section className='mx-auto max-w-7xl items-center p-6'>
                <YebboBack
                    title='Profile Details'
                    screenDetails={[]}
                />

                {/* SECTION STARTS HERE */}
                {!userInfo && (<Loader />)}

                {
                    userInfo && (
                        <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between overflow-x-hidden '>
                            <div className='w-full md:w-1/3 bg-white md:p-4 p-2'>

                                <div className='relative'>
                                    {
                                        userInfo?.profileImage && (
                                            <img
                                                className='object-cover h-60 w-full rounded-lg '
                                                alt='Groover'
                                                src={userInfo?.profileImage}
                                            />
                                        )
                                    }

                                    {
                                        !userInfo?.profileImage && (
                                            <img
                                                className='object-cover h-60 w-full rounded-lg '
                                                alt='Groover'
                                                src={require("../../assets/images/yeboobg.jpeg")}
                                            />
                                        )}


                                    <div className='absolute bottom-[-45px] left-36'>

                                        <img
                                            className="h-20 w-20 object-cover rounded-full border-4 border-yellow"
                                            src={userInfo?.profileImage || (userInfo?.sex === 'M' ? require('../../assets/images/yeboo-male-placeholder.jpg') : require('../../assets/images/yeboo-placeholder.jpg'))}
                                            alt="profile"
                                        />
                                        {
                                            userInfo?.isVerified && (
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
                                    <p className='text-gray-700 font-bold'>{userInfo?.firstname} {userInfo?.lastname.charAt(0)}. {userInfo?.isVip && '  VIP'}</p>

                                    <div className='flex items-center'>
                                        <p className='text-xs text-gray-500 flex items-center mt-3'>
                                            <AiFillStar
                                                color='#FCCF14'
                                                size={20}
                                            />
                                            <p className='ml-1'>{userInfo?.ratingsAverage}</p>

                                        </p>

                                        <p className='text-xs text-gray-500 flex items-center mt-3 ml-2'>
                                            <img
                                                alt=''
                                                className='object-cover'
                                                src={require('../../assets/images/like.png')}
                                            />
                                            {/* <RiShieldCheckLine
                                            color='#EE4139'
                                            size={18}
                                        /> */}
                                            <p className='ml-1'>{userInfo?.ratingsQuantity}</p>

                                        </p>


                                    </div>

                                    {
                                        userInfo?.availability ? (
                                            <div className='font-bold my-5 flex bg-[#EBF8F1] text-[#33BB77] justify-center text-xs items-center rounded-lg p-1'>
                                                <PiDotOutlineFill size={20} />
                                                <p>Available</p>
                                            </div>
                                        ) : (
                                            <div className='font-bold my-5 flex bg[#EAEAEB] text-[#949699] justify-center text-xs items-center rounded-lg p-1'>
                                                <PiDotOutlineFill size={20} />
                                                <p>Unavailable</p>
                                            </div>
                                        )
                                    }

                                </div>

                                <div className='bg-gray-100 my-5 p-4 rounded-lg'>
                                    <p className='text-gray-400'>About {userInfo?.username}</p>
                                </div>

                                {/* GROOVE REQUIREMTS LIST */}
                                <div className='grid grid-cols-2 gap-1'>

                                    {
                                        userInfo && (
                                            <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                <p className='text-gray-400'>Availability</p>
                                                <p className='font-bold text-gray-600'>{userInfo.availability ? 'Available' : 'Not Available'}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        userInfo && (
                                            <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                <p className='text-gray-400'>Drink</p>
                                                <p className='font-bold text-gray-600'>{userInfo.isDrink ? 'Yes' : 'No'}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        userInfo && (
                                            <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                <p className='text-gray-400'>Smoke</p>
                                                <p className='font-bold text-gray-600'>{userInfo.isSmoke ? 'Yes' : 'No'}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        userInfo?.bodyType && (
                                            <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                <p className='text-gray-400'>Body Type</p>
                                                <p className='font-bold text-gray-600'>{userInfo.bodyType}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        userInfo?.height && (
                                            <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                <p className='text-gray-400'>Height</p>
                                                <p className='font-bold text-gray-600'>{userInfo.height}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        userInfo?.nationality && (
                                            <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                <p className='text-gray-400'>Nationality</p>
                                                <p className='font-bold text-gray-600'>{userInfo.nationality}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        userInfo?.zodiacSign && (
                                            <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                <p className='text-gray-400'>Zodaic Sign</p>
                                                <p className='font-bold text-gray-600'>{userInfo.zodiacSign}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        userInfo?.zodiacSign && (
                                            <div className='w-full bg-gray-100 h-24 p-6 rounded-lg'>
                                                <p className='text-gray-400'>Successful Grooves</p>
                                                <p className='font-bold text-gray-600'>100+</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>


                            {/* SECOND HALF STARTS HERE */}
                            <div className='w-full md:w-2/3 bg-white md:ml-5 md:p-10 p-2'>
                                {/* THE DETAILS HERE */}
                                <p className="font-extrabold pb-3 text-gray-700 block">Profile Details</p>

                                <div className='grid grid-cols-2 gap-2 my-10'>
                                    <div
                                        onClick={() => setShowImage(!showImage)}
                                        style={{
                                            color: showImage ? "#B11226" : "#9ca3af",
                                            fontWeight: showImage ? 'bold' : 'normal'
                                        }}
                                        className='flex justify-center items-center bg-gray-50 h-10 rounded-lg cursor-pointer'>
                                        <BsImageAlt />
                                        <p className='ml-5'>Image</p>
                                    </div>

                                    <div
                                        onClick={() => setShowImage(!showImage)}
                                        style={{
                                            color: !showImage ? "#B11226" : "#9ca3af",
                                            fontWeight: !showImage ? 'bold' : 'normal'
                                        }}
                                        className='flex justify-center items-center  bg-gray-50 h-10 rounded-lg cursor-pointer'>
                                        <HiOutlineChatBubbleLeftRight />
                                        <p className='ml-5'>Open Grooves</p>
                                    </div>
                                </div>


                                {/* IMAGES CONTAINER */}
                                {
                                    userInfo?.images?.length > 0 && (
                                        <div>
                                            {
                                                showImage && (
                                                    <section>
                                                        <div className='bg-black bg-blend-darken w-auto rounded-lg h-96 relative drop-shadow-lg'>
                                                            <div className='w-full absolute z-5 h-96 backdrop-brightness-[0.1] top-0 '></div>
                                                            <div className='grid grid-cols-2 '>
                                                                <div className='grid grid-cols-1'>
                                                                    {
                                                                        userInfo?.images[0] && (
                                                                            <img
                                                                                className=''
                                                                                alt="Groover"
                                                                                src={userInfo.images[0]}
                                                                            />
                                                                        )
                                                                    }
                                                                </div>

                                                                <div className='grid grid-cols-2'>

                                                                    {
                                                                        userInfo?.images && userInfo.images.map((image: any, i: any) => (
                                                                            <img
                                                                                key={i}
                                                                                alt=""
                                                                                src={image}
                                                                            />
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className='absolute text-white flex flex-col justify-center items-center top-1/3 left-1/3 md:left-4/5'>
                                                                <PiLockKeyBold
                                                                    size={40}
                                                                />

                                                                <button className='px-5 mt-5 text-sm font-bold py-2 bg-white text-wine rounded-xl'>
                                                                    Request Media
                                                                </button>
                                                            </div>

                                                            <div className='absolute text-white flex justify-center items-center bottom-12 left-10 md:bottom-16 md:left-60'>
                                                                <div className='flex justify-center items-center'>
                                                                    <BsImageAlt size={20} />
                                                                    <p className='ml-2'>{userInfo?.images  ? countFilesUploaded(userInfo.images).imageCount : 0} Pictures</p>
                                                                </div>

                                                                <div className='flex justify-center items-center mx-10'>
                                                                    <IoVideocamOutline size={28} />
                                                                    <p className='ml-2'> {userInfo?.images ? countFilesUploaded(userInfo.images).videoCount : 0} video</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </section>
                                                )
                                            }
                                        </div>
                                    )
                                }

                                {userInfo?.images?.length === 0 && (
                                    <h3 className="text-xl text-gray-500">{userInfo.username} doesn't currently have images uploaded</h3>
                                )}




                                {/* GROVERS CONTAINER */}

                                {
                                    !showImage && (
                                        <section>
                                            {
                                                userGrooves && userGrooves.length > 0 && (
                                                    <div className='w-full bg-white md:mt-5 md:ml-5 md:p-10 '>
                                                        {
                                                            userGrooves?.map((groovy: any) => (
                                                                <div key={groovy._id} className='w-full '>
                                                                    <div className='md:block hidden w-full '>
                                                                        <GrooveListCard
                                                                            groove={groovy}
                                                                            showCategory={true}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }


                                                        <div className='md:hidden grid grid-cols-2 gap-1'>
                                                            {
                                                                userGrooves.map((groovy: any) => (
                                                                    <div key={groovy._id} className='w-full'>
                                                                        <div className='md:hidden block'>
                                                                            <GrooveCard groove={groovy} />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    </div>
                                                )
                                            }

                                            {
                                                userGrooves?.length <= 0 && ("NO GROOVE AVAILABLE")
                                            }

                                        </section>
                                    )
                                }
                            </div>
                        </div>
                    )
                }

            </section>


        </div>
    )
}

export default ProfileDetails

