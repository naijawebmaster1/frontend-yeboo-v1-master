import { NavLink } from "react-router-dom"
import Groovie from "../members/groovie"
import { useSelector } from "react-redux"


const Verified = () => {
    const { users } = useSelector((state: any) => state.users)
    const { info } = useSelector((state: any) => state.userInfo)

    return (
        <section className="bg-[#FBFBFB] sm:px-20 px-3 py-10 ">
            <header className="flex flex-col justify-center items-center gap-y-3">
                <span className="">
                    <h2 className="text-4xl font-bold text-[#292D32] text-center">A World of Endless Exploration and Pure Pleasure</h2>
                </span>
                <span>
                    <p className="max-w-[502px] text-center text-[#292D32] text-base font-normal">
                        Embrace your innermost desires and delve into your fantasies. With Yeboo VIPs, every connection is more than just an encounter—it's a journey of pure pleasure, promising unforgettable moments at every turn.

                    </p>
                </span>
            </header>

            <main className="mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-[#292D32]">Top Verified VIP Member</span>
                    <NavLink to={`/dashboard/groovies?vip=true`} className="text-base font-medium text-[#292D32]">See More</NavLink>
                </div>
                <div className='flex flex-col items-center justify-center md:grid md:grid-cols-3 gap-4 px-2 mt-4'>
                    {
                        users?.slice(0, 12).map?.((groovy: any) => (
                            <aside className="w-[403px] h-[80px] bg-[#fff] w-full">
                                <Groovie details={groovy} />
                            </aside>
                        ))
                    }
                </div>
            </main>
        </section>
    )
}
export default Verified