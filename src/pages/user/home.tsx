import { useState, useEffect } from 'react'
import Header from '../../components/block-components/header/header'
import InputFieldWithIcon from '../../components/block-components/input/inputFieldWithIcon'
import Slider from '../../components/base-components/slider/slider'
import Groovie from '../../components/base-components/members/groovie'
import GrooveCard from '../../components/base-components/grooves/grooveCard'
import { grooveCategories } from '../../services/constants/dataConstants'
import SelectInputField from '../../components/block-components/input/selectInputField'
import { useNavigate } from 'react-router-dom'
import { getGroovesAction } from '../../services/reducers/groovesReducer.ts/getGroovesReducer'
import { useSelector, useDispatch } from 'react-redux'
import { filterGroovesByType, filterUsersByAccount } from '../../services/utils/helpersFunc'
import grooveService from '../../services/actions/grooveActions'
import { toast } from 'react-toastify'
import EmptyStateComponent from '../../components/base-components/emptyState/emptyState'
import { getAllUsersAction } from '../../services/reducers/userReducer.ts/getAllUsersReducer'
import EmptyGrooveState from '../../components/base-components/emptyState/emptyGrooveState'
import LoadingState from '../../components/block-components/loader/loading'
import BannerSlider from '../../components/base-components/slider/bannerSlider'

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const { info } = useSelector((state: any) => state.userInfo)
    const { token, user } = useSelector((state: any) => state.login)
    const [locationGrooves, setLocationGrooves] = useState<any>()
    const [filterCategory, setFilterCategory] = useState('')
    const [searchName, setSearchName] = useState('')
    const filterGrooveBy = info?.accountType === 'Groover' ? "Post" : "Request"

    const filterUserBy = info?.accountType === 'Groover' ? "Groovie" : "Groover"

    const { grooves, loading } = useSelector((state: any) => state.grooves)
    const { users } = useSelector((state: any) => state.users)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getGroovesAction({}))
        dispatch(getAllUsersAction({}))

        const getGrooveByLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const res = await grooveService.upDateGrooveLocation({ token, latitude, longitude, id: user?._id })
                    if (res) {
                        return setLocationGrooves(res?.data)
                    }
                });
            } else {
                toast.warning('Geolocation is not supported by this browser.')
            }
        }
        getGrooveByLocation()
    }, [])

    const adsSliders = [
        require('../../assets/images/ads1.png'),
        require('../../assets/images/ads2.png'),
        require('../../assets/images/ads3.png'),
        require('../../assets/images/ads4.jpg')
    ]

    return (
        <div>
            <Header pageTitle="Home" />
            <section className='mx-auto max-w-7xl items-center p-6 overflow-x-hidden'>
                <h3 className='font-bold'>Hello {info?.firstname} </h3>
                <p className='text-gray-400'>What are you up to today?</p>

                <div className="flex w-full flex-col mt-5 md:flex-row md:space-x-3 space-y-5 md:space-y-0 h-80 md:h-40 ">
                    <div className=' rounded-lg md:w-2/3 w-full pb-4 relative'>
                        <BannerSlider>
                            {
                                adsSliders?.map((item, i) => (
                                    <div key={i} className='rounded-lg'>
                                        <img
                                            className='image-cover w-full min-w-min rounded-lg h-40'
                                            src={item}
                                            alt=""
                                        />
                                    </div>
                                ))
                            }

                        </BannerSlider>
                    </div>




                    <div className='bg-white md:right-10  rounded-lg p-4  h-40 md:w-1/3 w-full shadow-2xl'>
                        <InputFieldWithIcon
                            type='text'
                            name='name'
                            value={searchName}
                            placeholder='What are you looking for?'
                            onChange={(e: any) => setSearchName(e.target.value)}
                        />

                        <div className='grid grid-cols-2 gap-3 w-full mt-5'>
                            <div>
                                <SelectInputField placeholder='Select List' name='Select List' onChange={(e: any) => setFilterCategory(e.target.value)} label='' data={grooveCategories} />
                            </div>

                            <div>
                                <button
                                    onClick={() => navigate(`/dashboard/grooves?category=${filterCategory}&search=${searchName}`)}
                                    className='py-2 px-3 mt-2 rounded-md text-wine w-full border-2 font-bold'>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Category Starts Here */}

                <div className=' w-full bg-[#EAEAEB] mt-10 h-36 p-4 rounded-lg'>
                    <div className='flex justify-between items-center font-bold mb-3'>
                        <p>Categories</p>
                        <p
                            onClick={() => navigate('/dashboard/grooves')}
                            className='text-[rgb(128,0,32)] cursor-pointer'>Explore All</p>
                    </div>

                    <Slider>
                        {/* <Category /> */}
                        {
                            grooveCategories.map((category: any) => (
                                <div
                                    onClick={() => navigate(`/dashboard/grooves?category=${category.name}`)}
                                    key={category.name}
                                    className='flex justify-center md:mx-3 items-center flex-col cursor-pointer w-[10rem]'>
                                    <img
                                        className='image-fill p-2 h-14 w-14 rounded-full bg-white'
                                        src={category.image}
                                        alt=""
                                    />
                                    <p className='text-sm'>{category.name}</p>
                                </div>
                            ))
                        }
                    </Slider>
                </div>

                {/* AVAILABLE GROOVES  */}

                <section className=' w-full mt-5  p-4 rounded-lg'>
                    <div className='flex justify-between items-center font-bold mb-3'>
                        <p>Available Grooves</p>
                        <p className='text-[rgb(128,0,32)] cursor-pointer' onClick={() => navigate(`/dashboard/grooves`)}>See More</p>
                    </div>

                    <div className='grid md:grid-cols-6 grid-cols-2 gap-4 w-full'>
                        {loading && <LoadingState />}
                        {
                            grooves && filterGroovesByType(filterGrooveBy, grooves).slice(0, 6).map((groove: any) => (
                                <div
                                    key={groove.id}
                                    className='w-ful'>
                                    <GrooveCard groove={groove} />
                                </div>
                            ))
                        }

                    </div>

                    {
                        grooves && filterGroovesByType(filterGrooveBy, grooves)?.length === 0 && (
                            <EmptyGrooveState imageSrc={''} message="There's currently no groove available" />
                        )
                    }

                    {
                        !loading && !grooves && (
                            <EmptyGrooveState imageSrc={''} message="There's currently no groove available" />
                        )
                    }

                </section>



                {/* //Top Verified Members Section  */}

                <section className=' w-full mt-5 p-2 md:p-4 rounded-lg'>
                    <div className='flex justify-between items-center font-bold mb-3'>
                        <p>Top Verified</p>
                        <p className='text-[rgb(7,7,7)] cursor-pointer' onClick={() => navigate(`/dashboard/groovies?vip=true`)}>See More</p>
                    </div>

                    <div className='grid  md:grid-cols-3 gap-1'>
                        {
                            users && filterUsersByAccount(filterUserBy, users).slice(0, 9).map((user: any) => (
                                <div
                                    key={user.id}
                                    className='w-full bg-white'>
                                    <Groovie details={user} />
                                </div>
                            ))
                        }
                    </div>
                    {users && users?.length === 0 && <div className='w-full flex justify-center items-center'><EmptyGrooveState message="There's currently no top verified" imageSrc={''} /> </div>}

                </section>

                {/* Latest Posted Grooves */}

                <section className=' w-full mt-5  p-4 rounded-lg'>
                    <div className='flex justify-between items-center font-bold mb-3'>
                        <p>Latest {info?.accountType === 'Groovie' ? "Requested" : "Posted"} Grooves</p>
                        <p className='text-[rgb(128,0,32)] cursor-pointer' onClick={() => navigate(`/dashboard/grooves`)}>See More</p>
                    </div>

                    <div className='grid md:grid-cols-6 grid-cols-2 gap-4 w-full'>
                        {loading && <LoadingState />}
                        {
                            grooves && filterGroovesByType(filterGrooveBy, grooves).slice(0, 18).map((groove: any) => (
                                <div
                                    key={groove.id}
                                    className='w-ful'>
                                    <GrooveCard groove={groove} />
                                </div>
                            ))
                        }

                    </div>

                    {
                        grooves && filterGroovesByType(filterGrooveBy, grooves)?.length === 0 && (
                            <EmptyGrooveState imageSrc={''} message="There's currently no groove available" />
                        )
                    }

                    {
                        !loading && !grooves && (
                            <EmptyGrooveState imageSrc={''} message="There's currently no groove available" />
                        )
                    }

                </section>


                <section className=' w-full md:p-4 rounded-lg'>
                    <div className='flex justify-between items-center font-bold mb-3'>
                        <p>Grooves Around You</p>
                        {/* <p className='text-[rgb(128,0,32)] cursor-pointer' onClick={() => navigate(`/dashboard/grooves`)}>See More</p> */}
                    </div>

                    <div className='grid md:grid-cols-6 grid-cols-2 gap-1 w-full'>
                        {
                            locationGrooves && filterGroovesByType(filterGrooveBy, locationGrooves).map((groove: any) => (
                                <div
                                    key={groove.id}
                                    className='w-full'>
                                    <GrooveCard groove={groove} />
                                </div>
                            ))
                        }
                    </div>

                    {locationGrooves === undefined && <EmptyGrooveState imageSrc={''} message="There's currently no grooves around you" />}
                    {locationGrooves === null && <EmptyGrooveState imageSrc={''} message="There's currently no groove  around you" />}
                    {/* {locationGrooves && locationGrooves.length === 0 && <EmptyStateComponent btnText='See All Grooves' message="There's currently no grooves around you" onClick={() => navigate(`/dashboard/grooves`)} imageSrc={''} />} */}
                </section>

            </section>
        </div>
    )
}

export default Home
