import { NavLink, useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineSetting } from 'react-icons/ai'
import MobileNav from "../mobileNav/mobileNav"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState<any>('Home')
  const location = useLocation()  
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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }


  const closeMenu = () => {
    setIsOpen(false)
  }
  return (
    <nav className="bg-[#F7E7E9] py-4 flex sm:flex-row justify-between items-center w-full pt-10 pb-10 md:pb-24  px-3 md:px-20 overflow-x-hidden">
      <NavLink
        to="/"
        className="flex gap-2 flex-center mr-2"
      >
        <img
          alt="Yeboo Logo"
          src={require('../../../assets/images/Logo.png')}
          className="object-contain h-10 w-auto "
        />
      </NavLink>

      {/* Desktop Navigation */}

      <Popover.Group className="hidden lg:flex lg:gap-x-12">

        <Popover className="relative">
          <Popover.Button className="flex items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900">
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
          <Popover.Button className="flex items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900">
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
          <Popover.Button className="flex items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900">
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
          <div className="sm:flex hidden justify-evenly items-center md:gap-5">
            <button
              onClick={() => navigate(`/dashboard/home`)}
              className="h-[40px] font-bold py-2 px-4 bg-[#8D1A36] text-[#ffffff] text-center rounded-lg">
              My Account
            </button>
          </div>
        ) : (
          <div className="sm:flex hidden justify-evenly items-center md:gap-5">
            <button
              onClick={() => navigate('/auth/login')}
              className="w-[86px] h-[40px] py-2 px-4 text-[#292D32] 
                        border-none outline-none font-medium text-base"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/auth/sign-up')}
              className="w-auto h-[40px] font-bold py-2 px-4 bg-[#8D1A36] text-[#ffffff] text-center rounded-lg">
              Create account
            </button>
          </div>
        )
      }



      {/* mobile navigation */}
      <div className="sm:hidden relative">
        <button
          className="text-gray-600 hover:text-black focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Close (X) icon when the menu is open */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hamburger menu icon when the menu is closed */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
        {isOpen && <MobileNav isOpen={isOpen} closeMenu={closeMenu} />}
      </div>
    </nav>
  )
}
export default Nav