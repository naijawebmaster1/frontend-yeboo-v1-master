import { NavLink } from "react-router-dom"
import GrooveCard from "../grooves/grooveCard"
import { useSelector } from "react-redux"



const Discover = () => {
    const { grooves } = useSelector((state: any) => state.grooves)

    return (
        <section className="bg-[#FBFBFB] sm:px-20 px-3 py-10">
            <header className="flex flex-col justify-evenly items-center gap-y-3 flex-wrap">
                <span>
                    <h2 className="text-4xl font-bold text-[#292D32] text-center">Discover Supreme Pleasure in Every Yeboo Grooves </h2>
                </span>
                <span>
                    <p className="max-w-[502px] text-[#292D32] text-base font-normal text-center">
                        Your gateway to a world of unmatched pleasure, ensuring that every grooves moment is a memorable one.                    </p>
                </span>
            </header>
            <main>
                <div className="flex justify-between items-center mx-5 mt-5">
                    <span className="text-base font-bold text-[#292D32]">Latest Groove</span>
                    <NavLink to='/auth/login' className="text-base font-bold text-[#292D32]">See More</NavLink>
                </div>
                <div
                    className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-4 mt-5" >
                    {grooves?.slice(0, 5).map((groove: any) => (
                        <div
                            key={groove.id}
                            className=""
                        >
                            <GrooveCard groove={groove} />
                        </div>
                    ))
                    }
                </div>
            </main>
        </section>
    )
}
export default Discover