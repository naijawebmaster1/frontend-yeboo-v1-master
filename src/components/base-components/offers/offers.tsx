import { NavLink } from "react-router-dom"

const Offers = () => {
    return (
        <section className="sm:px-20 px-3 py-10 md:py-20">
            <header className="flex flex-col justify-center items-center gap-y-3">
                <span className="">
                    <h2 className="text-4xl font-bold text-[#292D32] text-center">We prioritize Safety, Consent, and Respect</h2>
                </span>
                <span>
                    <p className="max-w-[502px]  text-[#292D32] text-base text-center font-normal">
                        Your safety is our number one priority. Only KYC verified users are allowed to access grooves on Yeboo.
                    </p>
                </span>
            </header>

            <main className="mt-5 flex flex-col justify-center items-center gap-y-4 gap-x-2 sm:flex-row sm:justify-between sm:items-center sm:gap-x-4 px-2">
                <div className="sm:w-[391px] w-full h-full rounded-2xl flex flex-col p-4 bg-[#FBF8F9] gap-y-7">
                    <span className="bg-[#800020] h-[72px] w-[72px] p-4 rounded">
                        <img src={require('../../../assets/images/grid-6.png')} />
                    </span>
                    <span>
                        <h5 className="text-xl font-bold text-[#292D32]">Create your account</h5>
                    </span>
                    <span>
                        <p className="font-normal text-base text-[#292D32]">
                            Create a new account or Log in to your existing profile via our mobile or web app to find & connect with groovers & groovies
                        </p>
                    </span>
                    <NavLink to="/auth/sign-up">
                        <span className="font-bold text-lg text-[#800020] underline">Get started</span>
                    </NavLink>
                </div>

                <div className="sm:w-[391px] w-full h-full rounded-2xl flex flex-col p-4 bg-[#FBF8F9] gap-y-7">
                    <span className="bg-[#800020] h-[72px] w-[72px] p-4 rounded">
                        <img src={require('../../../assets/images/grid-6.png')} />
                    </span>
                    <span>
                        <h5 className="text-xl font-bold text-[#292D32]">Complete your KYC</h5>
                    </span>
                    <span>
                        <p className="font-normal text-base text-[#292D32]">
                            Complete your KYC by proving your above 18years of age & uploading the necessary information for review.                        </p>
                    </span>
                    <NavLink to="/auth/sign-up">
                        <span className="font-bold text-lg text-[#800020] underline">Get started</span>
                    </NavLink>
                </div>

                <div className="sm:w-[391px] w-full h-full rounded-2xl flex flex-col p-4 bg-[#FBF8F9] gap-y-7">
                    <span className="bg-[#800020] h-[72px] w-[72px] p-4 rounded">
                        <img src={require('../../../assets/images/grid-6.png')} />
                    </span>
                    <span>
                        <h5 className="text-xl font-bold text-[#292D32]">Search, Connect & Flirt</h5>
                    </span>
                    <span>
                        <p className="font-normal text-base text-[#292D32]">
                            Start exploring your gateway to experience the greatest pleasure while connecting on Yeboo                        </p>
                    </span>
                    <NavLink to="/auth/sign-up">
                        <span className="font-bold text-lg text-[#800020] underline">Get started</span>
                    </NavLink>
                </div>
            </main>
        </section>
    )
}
export default Offers