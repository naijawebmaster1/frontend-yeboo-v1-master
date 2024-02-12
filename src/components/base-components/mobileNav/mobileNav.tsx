import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineSetting } from 'react-icons/ai'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';



type MobileNavProps = {
    isOpen: boolean
    closeMenu: () => void
}

const MobileNav = ({ isOpen, closeMenu }: MobileNavProps) => {
    const navigate = useNavigate()
    const { user, token } = useSelector((state: any) => state.login)
    const tokenn = null


    const legalOptions = [
        { name: "Terms of service", action: `/terms` },
        { name: "Privacy Policy", action: `/privacy-policy` },
    ]

    const safetyOptions = [
        {
            name: 'Parental Control',
            action: `/parental-control`
        },
        {
            name: 'Adult Policy',
            action: `#`
        },
    ];

    const supportOptions = [
        {
            name: 'Contact Us',
            action: `/contact-us`
        },
        {
            name: 'FAQ',
            action: `/faq`
        },
    ];


    const translateXValue = isOpen ? "0%" : "100%"
    return (
        <div
            className={`fixed inset-0 z-50 bg-black w-full bg-opacity-50 transition-transform duration-300`}
            style={{
                transform: `translateX(${translateXValue})`,
                overflowX: 'hidden'
            }}
        >
            <div className="h-full bg-white flex w-full flex-col justify-center items-center p-6">
                <Popover.Group className="flex flex-col lg:gap-x-6 gap-y-5">

                    <Popover className="relative">
                        <Popover.Button className="flex w-full justify-between items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Safety
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-8 top-full z-50 mt-3 w-[180px] max-w-md  overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {safetyOptions.map((item: any) => (
                                        <Link
                                            key={item.name}
                                            to={item.action}>
                                            <div
                                                className="relative flex items-center cursor-pointer  rounded-lg text-sm py-1 leading-6"
                                            >
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>


                    <Popover className="relative">
                        <Popover.Button className="flex w-full items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Legal
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-[180px] max-w-md  overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {legalOptions.map((item: any) => (
                                        <div
                                            onClick={() => navigate(`${item.action}`)}
                                            key={item.name}
                                            className="relative flex items-center cursor-pointer  rounded-lg text-sm  leading-6 "
                                        >
                                            {item.name}
                                            <span className="absolute inset-0" />

                                        </div>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <Popover className="relative">
                        <Popover.Button className="flex w-full items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Support
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-[180px] max-w-md  overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {supportOptions.map((item: any) => (
                                        <div
                                            onClick={() => navigate(`${item.action}`)}
                                            key={item.name}
                                            className="relative flex items-center cursor-pointer  rounded-lg text-sm leading-6"
                                        >
                                            {item.name}
                                            <span className="absolute inset-0" />

                                        </div>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <div
                        onClick={() => navigate(`/investors`)}

                        className='flex items-center cursor-pointer'>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            Investor Relations
                        </p>
                    </div>

                </Popover.Group>

                {
                    tokenn ? (
                        <div className="flex justify-evenly items-center md:gap-5">
                            <button
                                onClick={() => navigate(`/dashboard/home`)}
                                className="h-[40px] font-bold py-2 px-4 bg-[#8D1A36] text-[#ffffff] text-center rounded-lg">
                                My Account
                            </button>
                        </div>
                    ) : (
                        <div className="sm:flex flex-col  mt-10 justify-evenly items-center md:gap-5">
                            <button
                                onClick={() => navigate('/auth/login')}
                                className="w-[86px] h-[40px] py-2 px-4 bg-[#FFFFFF] text-[#292D32] 
                        border-none outline-none font-medium text-base"
                            >
                                Sign in
                            </button>
                            <button
                                onClick={() => navigate('/auth/sign-up')}
                                className="w-[124px] h-[40px] font-bold py-2 px-4 bg-[#8D1A36] text-[#ffffff] text-center rounded-lg">
                                Get started
                            </button>
                        </div>
                    )
                }

                {/* <button
                    className="w-[86px] h-[40px] py-2 px-4 bg-[#FFFFFF] text-[#292D32] 
                    border-none outline-none font-medium text-base"
                    onClick={() => {
                        navigate('/auth/login')
                    }}
                >
                    Sign in
                </button>
                <button
                    className="w-[124px] font-bold h-[40px] py-2 px-4 bg-[#8D1A36] text-[#ffffff] text-center rounded-lg"
                    onClick={() => navigate('/auth/sign-up')}
                >
                    Get started
                </button> */}

                {/*yeboo logo*/}
                <NavLink
                    to="/"
                    className="flex gap-2 flex-center absolute top-6 left-0"
                >
                    <img
                        src={require('../../../assets/images/Logo.png')}
                        className="object-contain w-[139px] h-[57px]"
                    />
                </NavLink>

                {/* Close button */}
                <button
                    className="absolute top-10 right-10 text-gray-600 hover:text-black focus:outline-none"
                    onClick={closeMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Close (X) icon */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}
export default MobileNav