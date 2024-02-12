import { useNavigate } from 'react-router-dom'
import LazyLoad from 'react-lazy-load';


const Hero = () => {
    const navigate = useNavigate()
    return (
        <section className="bg-[#F7E7E9] w-screen flex  flex-col justify-center items-center  sm:flex-row sm:justify-between sm:items-center flex-wrap px-3 md:px-20  ">
            <div className="flex flex-col items-center justify-start sm:items-start">
                <span className="relative">
                    <h2 className="text-3xl sm:text-5xl font-extrabold"><span className=''>Africa’s</span> <span className='text-[#8D1A36]'>Largest Adult</span></h2>
                    <h2 className="text-3xl sm:text-5xl font-extrabold mt-2">Entertainment Platform</h2>

                    <LazyLoad >
                        <img
                            alt=''
                            src={require('../../../assets/images/circle.png')}
                            className="hidden sm:block absolute z-40 object-cover sm:top-[-30px] right-5"
                        />
                    </LazyLoad>
                </span>

                <span className="">
                    <p className="sm:max-w-[527px] sm:max-h-[168px] text-[16px] sm:font-base font-normal text-left mt-5">
                        Safest way to connect for instant Hookup, Dinner Date, Erotic Massage, Holiday Buddy, Travel Companion and many more.
                    </p>
                </span>

                <div className="flex mt-10 md:w-auto w-full flex-col gap-5 md:flex-row justify-evenly items-center md:gap-5">
                    <button
                        onClick={() => navigate('/auth/sign-up')}
                        className="md:w-auto w-full h-[40px] font-bold py-2 px-4 bg-[#8D1A36] text-[#ffffff] text-center rounded-lg">
                        Create account
                    </button>

                    <button
                        onClick={() => navigate('/auth/login')}
                        className="w-[86px] h-[40px] py-2 px-4 text-[#292D32] 
                        border-none outline-none font-medium text-base"
                    >
                        Sign in
                    </button>

                </div>

                <p className='text-charleston text-sm my-10'>
                    We prioritize Safety, Consent, Respect, and Privacy <br /> for users to build new relationships.
                </p>

                <span className="hidden md:flex items-center space-x-5 my-10">

                    <img
                        src={require('../../../assets/images/members.png')}
                        alt="get it on playstore"
                        className="h-[72px] w-[380px] object-contain"
                    />
                </span>

                <span className="flex  md:hidden items-center space-x-5 my-10">

                    <img
                        src={require('../../../assets/images/playstore.png')}
                        alt="get it on playstore"
                        className=" object-contain"
                    />

                    <img
                        src={require('../../../assets/images/applestore.png')}
                        alt="get it on playstore"
                        className="object-contain"
                    />
                </span>

            </div>
            <div className="relative">
                <LazyLoad >
                    <img
                        alt=''
                        src={require('../../../assets/images/newLanding2.png')}
                        className="md:w-[596.16px] md:h-[792px] object-contain justify-center items-center"
                    />
                </LazyLoad>
            </div>
        </section>
    )
}
export default Hero