import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineHome, AiOutlineSetting, AiOutlineArrowRight } from 'react-icons/ai'
import { MdOutlineSpaceDashboard, MdWallet } from 'react-icons/md'
import { BiWallet } from 'react-icons/bi'
import { FaUserEdit } from 'react-icons/fa'
import { HiBadgeCheck } from 'react-icons/hi'
import { BsChevronDown, } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { GrLocation } from 'react-icons/gr'
import { PiCrownSimpleLight } from 'react-icons/pi'
import { Link } from 'react-router-dom';
import { IoReloadOutline } from 'react-icons/io5'
import ModalLayout from '../../../layout/modal/modalLayout'
import VipUpgrade from './../modal/vipUpgrade';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MobileNotification from '../../base-components/mobileNotification/MobileNotification'
import authService from '../../../services/actions/authActions'
import { toast } from 'react-toastify'
import userService from '../../../services/actions/userActions'
import EmptyGrooveState from '../../base-components/emptyState/emptyGrooveState'

interface IHeader {
  pageTitle?: string
}


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}



export default function Header({ pageTitle }: IHeader) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [vipUpgradeOpen, setVipUpgradeOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { user, token } = useSelector((state: any) => state.login)
  const { info } = useSelector((state: any) => state.userInfo)

  const navigate = useNavigate()
  const userType = localStorage.getItem("user_type") || "";

  const groovesOptions = [
    {
      name: 'Find Grooves',
      action: `/dashboard/grooves`
    },
    ...(userType === 'Groovie'
      ? [
        {
          name: 'Requests',
          action: `/dashboard/requests`
        }
      ]
      : [
        {
          name: 'Proposals',
          action: `/dashboard/proposals`
        }
      ]
    ),
    {
      name: 'My Grooves',
      action: `/dashboard/my-grooves`
    },
    {
      name: 'Orders',
      action: `/dashboard/orders`
    },
    // {
    //   name: 'Chats',
    //   action: `/dashboard/chat`
    // },
    // {
    //   name: 'Disputes',
    //   action: `/dashboard/disputes`
    // },
    // {
    //   name: 'Reviews',
    //   action: `/dashboard/reviews`
    // },
    {
      name: 'Favorites',
      action: `/dashboard/favorites`
    }
  ];


  const logOutAccountHandler = async () => {
    const res = await authService.logOutUserAccount({ token })
    if (res) {
      localStorage.clear()
      toast.success("Account Logged Out Sucessfully")
      navigate('/auth/login')
    }
  }


  const walletOptions = [
    { name: "Manage Wallet", action: `/dashboard/wallet` },
    { name: "Bank Account", action: `/dashboard/bank-accounts` },
    { name: "Invoices", action: `/dashboard/invoices` },
    { name: "Pay Bills", action: `/dashboard/paybills` },
  ]

  const SOSHandler = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude.toString();
        const longitude = position.coords.longitude.toString();
        const res = await userService.updateUserLocation({ token, latitude, longitude })
        if (res) {
          toast.success("Location updated sucessfully")
        }
      });
    } else {
      toast.warning('Geolocation is not supported by this browser.')
    }
  }

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }


  return (
    <>
      <ModalLayout open={vipUpgradeOpen} setOpen={setVipUpgradeOpen} title="Fund Wallet" showClose={true}>
        <VipUpgrade />
      </ModalLayout>

      <header className="bg-white w-full">
        <nav className="mx-auto flex md:mx-10 items-center justify-between p-4" aria-label="Global">

          <div className="hidden lg:block mr-16 ">
            <Link to={`/dashboard/home`}>
              <span className="sr-only -m-1.5 p-1.5">Yebbo</span>
              <img
                className="h-10 w-auto"
                src={require('../../../assets/images/Logo.png')}
                alt=""
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center cursor-pointer justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex lg:hidden">
            <div className=' flex-col justify-start flex items-center'>
              {/* <p className='text-300'>Hello, Zainab</p> */}
              <p className='text-400 font-bold'>{pageTitle}</p>
            </div>
          </div>

          <div className="flex lg:hidden">
            <IoIosNotificationsOutline
              size={30}
              className='cursor-pointer object-contain'
              onClick={toggleNotification}
            />
            <MobileNotification
              isOpen={isNotificationOpen}
              onClose={toggleNotification}
            />
          </div>

          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link to={`/dashboard/home`}>
              <div className='flex items-center cursor-pointer'>
                <AiOutlineHome
                  className="mr-2"
                />
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Home
                </p>
              </div>
            </Link>

            <Link to={`/dashboard/overview`}>
              <div className='flex items-center cursor-pointer'>
                <MdOutlineSpaceDashboard
                  className="mr-2"
                />
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Dashboard
                </p>
              </div>
            </Link>

            <Popover className="relative">
              <Popover.Button className="flex items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <MdWallet
                  className='mr-2'
                />
                Grooves
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
                    {groovesOptions.map((item) => (
                      <Link
                        key={item.name}
                        to={item.action}>
                        <div
                          className="relative flex items-center cursor-pointer  rounded-lg text-sm py-1 leading-6 hover:bg-gray-50"
                        >

                          <GoDotFill
                            size={20}
                            className='text-gray-200 mr-3'
                          />
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
                <BiWallet
                  className='mr-2'
                />
                Wallet
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
                    {walletOptions.map((item) => (
                      <div
                        onClick={() => navigate(`${item.action}`)}
                        key={item.name}
                        className="relative flex items-center cursor-pointer  rounded-lg text-sm py-4 leading-6 hover:bg-gray-50"
                      >
                        <GoDotFill
                          size={20}
                          className='text-gray-200 mr-3'
                        />
                        {item.name}
                        <span className="absolute inset-0" />

                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <div
              onClick={() => navigate(`/dashboard/profile`)}
              className='flex items-center cursor-pointer'>
              <FaUserEdit
                className="mr-1"
              />
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Profile
              </p>
            </div>

            <div
              onClick={() => navigate(`/dashboard/settings`)}

              className='flex items-center cursor-pointer'>
              <AiOutlineSetting
                className="mr-1"
              />
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Settings
              </p>
            </div>

          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">

            {/* <div className="md:flex justify-center items-center hidden mr-4 cursor-pointer">
              <IoIosNotificationsOutline
                size={30}
                className='cursor-pointer'
              />
            </div> */}

            <Popover className="relative md:flex justify-center items-center hidden mr-4 cursor-pointer outline-none">
              <Popover.Button className="flex items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none">
                <IoIosNotificationsOutline
                  size={30}
                  className='cursor-pointer'
                />
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
                <Popover.Panel className="absolute  top-full z-10 mt-3 w-[390px] max-w-md  overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4 flex flex-col">
                    <span className='bg-[#FBFBFB] p-4 uppercase text-xs font-normal text-[#696C70]'>
                      <h3>Today</h3>
                    </span>

                    <EmptyGrooveState message="You currently have no notification" imageSrc="" />

                    {/* <div className='flex items-center gap-x-4 py-4 px-2'>
                      <span>
                        <img 
                          src={require('../../../assets/images/notification-bing.png')} 
                          alt='notification bing' 
                          className='h-6 w-6' 
                        />
                      </span>
                      <span className='flex flex-col'>
                        <aside className='flex flex-row justify-between items-center'>
                          <aside className='text-sm font-medium text-[#292D32]'>Fund Withdrawal</aside>
                          <aside className='text-xs font-normal text-[#696C70] justify-self-end'>10:35:34 PM</aside>
                        </aside>
                        <aside className='flex flex-row justify-between items-center'>
                          <aside className='text-xs font-normal text-[#696C70]'>You withdraw 10, 000 naira from...</aside>
                          <aside></aside>
                        </aside>
                      </span>
                    </div>

                    <div className='flex items-center gap-x-4 py-4 px-2'>
                      <span>
                        <img 
                          src={require('../../../assets/images/wallet.png')} 
                          alt='wallet icon' 
                          className='h-6 w-6' 
                        />
                      </span>
                      <span className='flex flex-col'>
                        <aside className='flex flex-row justify-between items-center'>
                          <aside className='text-sm font-medium text-[#292D32] justify-self-start'>Fund Withdrawal</aside>
                          <aside className='text-xs font-normal text-[#696C70] justify-self-end'>10:35:34 PM</aside>
                        </aside>
                        <aside className='flex flex-row justify-between items-center'>
                          <aside className='text-xs font-normal text-[#696C70]'>You withdraw 10, 000 naira from...</aside>
                          <aside></aside>
                        </aside>
                      </span>
                    </div>

                    <div className='flex items-center gap-x-4 py-4 px-2'>
                      <span>
                        <img 
                          src={require('../../../assets/images/document.png')} 
                          alt='bill' 
                          className='h-6 w-6' 
                        />
                      </span>
                      <span className='flex flex-col'>
                        <aside className='flex flex-row justify-between items-center'>
                          <aside className='text-sm font-medium text-[#292D32]'>Fund Withdrawal</aside>
                          <aside className='text-xs font-normal text-[#696C70] justify-self-end'>10:35:34 PM</aside>
                        </aside>
                        <aside className='flex flex-row justify-between items-center'>
                          <aside className='text-xs font-normal text-[#696C70]'>You withdraw 10, 000 naira from...</aside>
                          <aside></aside>
                        </aside>
                      </span>
                    </div>

                    <div className='flex items-center gap-x-4 py-4 px-2'>
                      <span>
                        <img 
                          src={require('../../../assets/images/user.png')} 
                          alt='user' 
                          className='h-6 w-6' 
                        />
                      </span>
                      <span className='flex flex-col'>
                        <aside className='flex flex-row justify-between items-center'>
                          <aside className='text-sm font-medium text-[#292D32]'>Fund Withdrawal</aside>
                          <aside className='text-xs font-normal text-[#696C70] justify-self-end'>10:35:34 PM</aside>
                        </aside>
                        <aside className='flex flex-row justify-between items-center'>
                          <aside className='text-xs font-normal text-[#696C70]'>You withdraw 10, 000 naira from...</aside>
                          <aside></aside>
                        </aside>
                      </span>
                    </div> */}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm ">
                  <div className='bg-[#F6F6F6] rounded-xl p-4 flex items-center justify-between '>
                    <div className='relative'>
                      <img
                        className="h-10 w-10 object-cover rounded-full border-4 border-amber-500"
                        src={info?.profileImage || (info?.sex === 'M' ? require('../../../assets/images/yeboo-male-placeholder.jpg') : require('../../../assets/images/yeboo-placeholder.jpg'))}
                        alt="profile"
                      />

                      {info?.isVip && (
                        <HiBadgeCheck
                          color='#E0AA3E'
                          size={20}
                          className='absolute top-6 left-6 bg-white p-0.5 rounded-full'
                        />
                      )
                      }

                      {
                        info?.isAuthenticated?.bvn && (
                          <HiBadgeCheck
                            color='#630330'
                            size={20}
                            className='absolute top-6 left-6 bg-white p-0.5 rounded-full'
                          />
                        )
                      }

                    </div>

                    <div className='pl-4'>
                      <h3 className='font-bold text-start'>{user?.firstname} {user?.lastname}</h3>
                      <p className='text-xs text-gray-500 flex items-center'>@{user?.username}
                        {info?.isVip.status && <span> . VIP</span>}
                        <span className='ml-4'><BsChevronDown /></span>
                      </p>
                    </div>


                  </div>

                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right cursor-pointer absolute right-0 mt-2 w-72 z-50 rounded-md shadow-lg p-3 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? '' : '',
                          'block px-4 py-2 text-sm text-gray-700 '
                        )}
                      >
                        {
                          userType === "Groovie" ? (
                            <div
                              onClick={() => navigate(`/dashboard/create-groove`)}
                              className='bg-primary text-[#292D32] justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                              <span className='mr-2 text-xl'>+</span> <span>Create Groove</span>
                            </div>
                          ) : (
                            <div
                              onClick={() => navigate(`/dashboard/request-groove`)}
                              className='bg-primary text-[#292D32] justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                              <span className='mr-2 text-xl'>+</span> <span>Request Groove</span>
                            </div>
                          )
                        }

                      </span>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? '' : '',
                          'block px-4 py-2 text-sm text-gray-700 '
                        )}
                      >
                        {!info?.isVip.status && (
                          <div onClick={() => setVipUpgradeOpen(!vipUpgradeOpen)} className='bg-[#FFFAE6] text-[#292D32] justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                            <span className='mr-2 text-xl'><PiCrownSimpleLight /></span> <span>Upgrade To VIP</span> <span className='ml-2'><AiOutlineArrowRight /></span>
                          </div>
                        )}

                      </span>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? '' : '',
                          'block px-4 py-2 text-sm text-gray-700 '
                        )}
                      >
                        <div
                          onClick={() => SOSHandler()}
                          className='bg-[#FDECEB] text-[#EE4139] justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                          <span className='mr-2 text-base'><GrLocation /></span> <span>SOS</span>
                        </div>
                      </span>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? '' : '',
                          'block px-4 py-2 text-sm text-gray-700 '
                        )}
                      >
                        <div
                          onClick={() => logOutAccountHandler()}
                          className=' text-[#EE4139] hover:bg-gray-100 justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                          <span className='mr-2 text-xl'><IoReloadOutline /></span> <span>Log Out</span>
                        </div>
                      </span>
                    )}
                  </Menu.Item>

                </Menu.Items>
              </Transition>
            </Menu>

          </div>
        </nav>

        {/* MOBILE RESPONSIVENESS STARTS HERE */}
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center cursor-pointer justify-between">
              <Link to={`/dashboard/home`} className="-m-1.5 p-1.5">
                <span className="sr-only">Yeboo</span>
                <img
                  className="h-10 w-auto"
                  src={require('../../../assets/images/Logo.png')}
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">

                  <Link
                    to={`/dashboard/home`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    to={`/dashboard/overview`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>

                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Grooves
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {groovesOptions.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="p"
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              <Link to={item.action}>
                                {item.name}
                              </Link>
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Wallet
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {walletOptions.map((item) => (
                            <Disclosure.Button
                              onClick={() => navigate(`${item.action}`)}
                              key={item.name}
                              as="p"
                              // href={item.href}
                              className="block rounded-lg py-4 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Link
                    to={`/dashboard/profile`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Profile
                  </Link>

                  <Link
                    to={`/dashboard/settings`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Settings
                  </Link>

                </div>
                <div className="py-6">
                  <Menu as="div" className="md:ml-3 relative w-full">
                    <div>
                      <Menu.Button className=" bg-white flex items-center text-sm w-full ">
                        <div className='bg-[#F6F6F6] rounded-xl w-screen p-4 flex items-center justify-between '>
                          <div className='relative'>
                            <img
                              className="h-10 w-10 object-cover rounded-full border-4 border-amber-500"
                              src={info?.profileImage || (info?.sex === 'M' ? require('../../../assets/images/yeboo-male-placeholder.jpg') : require('../../../assets/images/yeboo-placeholder.jpg'))}
                              alt="profile"
                            />
                            {
                              info?.isVip && (
                                <HiBadgeCheck
                                  color='#E0AA3E'
                                  size={20}
                                  className='absolute top-6 left-6 bg-white p-0.5 rounded-full'
                                />
                              )
                            }

                            {
                              info?.isAuthenticated?.bvn && (
                                <HiBadgeCheck
                                  color='#630330'
                                  size={20}
                                  className='absolute top-6 left-6 bg-white p-0.5 rounded-full'
                                />
                              )
                            }

                          </div>

                          <div className='pl-2'>
                            <h3 className='font-bold'>{user?.firstname} {user?.lastname}</h3>
                            <p className='text-sm text-gray-500 flex items-center'>@{user?.username}
                              <span>. VIP</span>
                              <span className='ml-4 '><BsChevronDown /></span>
                            </p>
                          </div>
                        </div>

                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right cursor-pointer absolute right-0 mt-2 w-72 z-50 rounded-md shadow-lg p-3 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? '' : '',
                                'block px-4 py-2 text-sm text-gray-700 '
                              )}
                            >
                              {
                                userType === "Groovie" ? (
                                  <div
                                    onClick={() => navigate(`/dashboard/create-groove`)}
                                    className='bg-primary text-[#292D32] justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                                    <span className='mr-2 text-xl'>+</span> <span>Create Groove</span>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() => navigate(`/dashboard/request-groove`)}
                                    className='bg-primary text-[#292D32] justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                                    <span className='mr-2 text-xl'>+</span> <span>Request Groove</span>
                                  </div>
                                )
                              }
                            </span>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? '' : '',
                                'block px-4 py-2 text-sm text-gray-700 '
                              )}
                            >
                              {
                                !info?.isVip?.status && (
                                  <div onClick={() => setVipUpgradeOpen(!vipUpgradeOpen)} className='bg-[#FFFAE6] text-[#292D32] justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                                    <span className='mr-2 text-xl'><PiCrownSimpleLight /></span> <span>Upgrade To VIP</span> <span className='ml-2'><AiOutlineArrowRight /></span>
                                  </div>
                                )
                              }

                            </span>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? '' : '',
                                'block px-4 py-2 text-sm text-gray-700 '
                              )}
                            >
                              <div
                                onClick={() => SOSHandler()}
                                className='bg-[#FDECEB] text-[#EE4139] justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                                <span className='mr-2 text-base'><GrLocation /></span> <span>SOS</span>
                              </div>
                            </span>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? '' : '',
                                'block px-4 py-2 text-sm text-gray-700 '
                              )}
                            >
                              <div
                                onClick={() => logOutAccountHandler()}
                                className=' text-[#EE4139] hover:bg-gray-100 justify-center flex items-center text-sm font-bold px-4 py-2 rounded-lg'>
                                <span className='mr-2 text-xl'><IoReloadOutline /></span> <span>Log Out</span>
                              </div>
                            </span>
                          )}
                        </Menu.Item>

                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  )
}
