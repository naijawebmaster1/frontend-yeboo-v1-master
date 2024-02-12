import { NavLink } from "react-router-dom"
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="mx-auto px-3 sm:px-20 bg-white">
            <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-5 my-10">
                <div className="col-span-2">
                    <div className="mb-4 lg:-mt-2">
                        <NavLink
                            to="/"
                            className="inline-flex items-center gap-2 text-xl font-bold text-gray-100 md:text-2xl"
                            aria-label="logo"
                        >
                            <img
                                alt=''
                                src={require('../../../assets/images/Logo.png')}
                                className="object-contain w-[139px] h-[57px]"
                            />
                        </NavLink>
                    </div>

                    <p className="mb-6 text-base font-normal sm:pr-8">
                        Yeboo is your gateway to a world of unmatched pleasure. Whether you're seeking meaningful Hookup, Dinner Date, Erotic Massage, Holiday Buddy, Travel Companion, we've got you covered. Our platform is designed to cater to your desires, ensuring that every groove is a memorable one.                    </p>
                </div>

                <div>
                    <div className="mb-4 font-extrabold uppercase tracking-widest text-base ">Overview</div>

                    <nav className="flex flex-col gap-4">
                        <div>
                            <a href="/investors" className="text-base font-normal transition duration-100 hover:text-wine active:text-wine hover:font-bold">Investor Relations</a>
                        </div>

                        <div>
                            <a href="/terms" className="text-base font-normal transition duration-100 hover:text-wine active:text-wine hover:font-bold">Terms of services</a>
                        </div>

                        <div>
                            <a href="/privacy-policy" className="text-base font-normal transition duration-100 hover:text-wine active:text-wine hover:font-bold">Privacy policy</a>
                        </div>

                        <div>
                            <a href="/parental-control" className="text-base font-normal transition duration-100 hover:text-wine active:text-wine hover:font-bold">Parental Control</a>
                        </div>

                        <div>
                            <a href="#" className="text-base font-normal transition duration-100 hover:text-wine active:text-wine hover:font-bold">Adult Policy and anti slavery</a>
                        </div>
                    </nav>
                </div>


                <div>
                    <div className="mb-4 font-extrabold uppercase tracking-widest text-base">Support</div>

                    <nav className="flex flex-col gap-4">
                        <div>
                            <a href="/contact-us" className="text-base font-normal transition duration-100 hover:font-bold hover:text-wine active:text-wine">Contact Us</a>
                        </div>

                        <div>
                            <a href="/faq" className="text-base font-normal transition duration-100 hover:font-bold hover:text-wine active:text-wine">FAQ</a>
                        </div>

                        <div className=" mt-5">
                            <span className="text-base transition duration-100  uppercase font-extrabold">Follow us</span>

                            <div className="flex gap-4 mt-3">
                                <a href="#" target="_blank" className="transition duration-100 hover:text-gray-500 active:text-wine">
                                    <RiInstagramFill color="#800020" className="h-7 w-7" />
                                </a>

                                <a href="#" target="_blank" className="transition text-white duration-100 hover:text-gray-500 active:text-wine">
                                    <svg className="h-7 w-7 p-1 rounded-full bg-wine text-white" width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>

                                <a href="#" target="_blank" className="text-wine transition duration-100 hover:text-gray-500 active:text-wine">
                                    <svg className="h-7 w-7 rounded-full" width="24" height="24" viewBox="0 0 24 24" fill="#800020" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>

                                <a href="#" target="_blank" className="text-wine transition duration-100 hover:text-gray-500 active:text-wine">
                                    <FaFacebook color="#800020" className="h-7 w-7" />
                                </a>

                            </div>
                        </div>


                    </nav>
                </div>
                {/* <div>
                    <div className="mb-4 font-extrabold uppercase tracking-widest text-base">download</div>

                    <nav className="flex flex-col gap-4">
                        <div className="flex flex-col gap-y-5">

                            <div>
                                <img
                                    src={require('../../../assets/images/playstore.png')}
                                    alt="get it on playstore"
                                    className="h-10 object-contain w-auto cursor-pointer"
                                />
                            </div>

                            <div>
                                <img
                                    src={require('../../../assets/images/applestore.png')}
                                    alt="get it on playstore"
                                    className="h-10 object-contain w-auto cursor-pointer"
                                />
                            </div>


                        </div>


                        <div>
                            <p className="text-xs">
                                Apple and the Apple Logo are trademarks of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.
                            </p>
                        </div>
                    </nav>
                </div> */}
            </div>

            <div className="border-t border-[#fff]-800 py-8 text-center text-sm font-normal">
                © Copyright {new Date().getFullYear()}. All Rights Reserved by Yeboo
            </div>
        </footer>
    )
}
export default Footer