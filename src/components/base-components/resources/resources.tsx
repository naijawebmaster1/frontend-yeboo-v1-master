import { useNavigate } from 'react-router-dom';


const Resources = () => {
    const navigate = useNavigate()

    return (
        <section className="sm:px-20 px:3 py-10">
            <header className="flex flex-col justify-center items-center gap-y-3">
                <span className="">
                    <h2 className="text-4xl font-bold text-[#292D32] text-center">Enhance Your Journey with Yeboo  <br/> Educational Resources</h2>
                </span>
                <span>
                    <p className="max-w-[502px]  text-[#292D32] text-base text-center font-normal">
                    Dive into our informative resources, designed to provide users with valuable insights and tips for enriching their experiences. Unlock the secrets to maximizing your enjoyment and understanding on Yeboo.
                    </p>
                </span>
            </header>

            <main className="mt-5 flex flex-col justify-center items-center gap-y-20 sm:flex-row sm:justify-between sm:items-center sm:gap-x-2">
                <div className="flex flex-col gap-y-7">
                    <span  className="cursor-pointer" onClick={() => navigate('/auth/login')}>
                        <img src={require('../../../assets/images/Frame 5.png')} alt=""/>
                    </span>
                    <span className="justify-self-center">
                        <h5 className="text-lg sm:text-xl font-bold text-center text-[#292D32]">Getting started</h5>
                    </span>
                    <span>
                        <p className="text-sm sm:text-base font-normal text-[#292D32] max-w-[341px] text-center">
                            This video guides users through the step-by-step process 
                            of creating an account on Yeboo, verification & grooves bookings
                        </p>
                    </span>
                </div>

                <div className="flex flex-col gap-y-7">
                    <span className="cursor-pointer" onClick={() => navigate('/auth/login')}>
                        <img src={require('../../../assets/images/Frame 6.png')} alt='' />
                    </span>
                    <span className="justify-self-center">
                        <h5 className="text-lg sm:text-xl font-bold text-center text-[#292D32]">Safety and Privacy</h5>
                    </span>
                    <span>
                        <p className="text-sm sm:text-base font-normal text-[#292D32] max-w-[341px] text-center">
                        Discover essential guidelines for safeguarding personal info 
                        and staying safe from online risks and scams on Yeboo
                        </p>
                    </span>
                </div>

                <div className="flex flex-col gap-y-7 items-center justify-center">
                    <span className="cursor-pointer" onClick={() => navigate('/auth/login')} >
                        <img src={require('../../../assets/images/Frame 7.png')} alt='' />
                    </span>
                    <span className="justify-self-center">
                        <h5 className="text-lg sm:text-xl font-bold text-center">Fostering Tips</h5>
                    </span>
                    <span className="justify-self-center">
                        <p className="text-sm sm:text-base font-normal text-[#292D32] max-w-[341px] text-center">
                        Insights for deeper connections: effective communication, engaging conversations, 
                        and meaningful relationships on Yeboo
                        </p>
                    </span>
                </div>
            </main>
        </section>
    )
}
export default Resources