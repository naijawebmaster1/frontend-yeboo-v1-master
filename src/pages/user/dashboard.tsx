import { useEffect, useState } from 'react'
import Header from '../../components/block-components/header/header'
import { HiArrowUpRight } from 'react-icons/hi2'
import Table from '../../components/block-components/table/table'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import VerifyAccount from '../../components/base-components/accountVerification/verifyAccount'
import grooveService from '../../services/actions/grooveActions'
import Loader from '../../components/block-components/loader/loader'
import { FilterOrderByStatus } from '../../services/utils/helpersFunc'
import { getWalletTransactionsAction } from '../../services/reducers/walletReducer/getwalletTransactions'
import BVNVerification from '../../components/block-components/modal/BVNVerification'
import ModalLayout from '../../layout/modal/modalLayout';
import EmptyOrderState from '../../components/base-components/emptyState/emptyOrderState';

function Dashboard() {
    const { user, token } = useSelector((state: any) => state.login);
    const { info } = useSelector((state: any) => state.userInfo)
    const { transactions } = useSelector((state: any) => state.transactions)
    const [isBvnVerified, setIsBvnVerified] = useState<boolean>(false)

    const [orders, setOrders] = useState<any>()

    const navigate = useNavigate()
    const dispatch = useDispatch<any>()



    useEffect(() => {
        const getOrders = async () => {
            const res = await grooveService.getMyGrooveOrder({ token })
            if (res) {
                setOrders(res?.data)
            }
        }

        if (!info?.isAuthenticate?.bvn) {
            // toast.warning("Kindly verify your bvn to continue")
            setIsBvnVerified(true)
        } else {
            dispatch(getWalletTransactionsAction({ token }))
        }

        getOrders()

    }, [])

    return (
        <div>
            <Header pageTitle='Dashboard' />

            {
                isBvnVerified && (
                    <ModalLayout open={isBvnVerified} setOpen={() => navigate(-1)} title='Verify BVN' showClose={true}>
                        <BVNVerification setBVNVerificationModalOpen={setIsBvnVerified} />
                    </ModalLayout>
                )
            }

            {!orders && <Loader />}

            {orders && (
                <section className='mx-auto max-w-7xl items-center p-6'>
                    <h3 className='text-gray-400 hidden lg:block'>Hello {user?.firstname}, </h3>
                    <p className='font-bold hidden lg:block'>What are you up to today?</p>

                    {/* {!info?.isAuthenticate.nin && (<VerifyAccount />)} */}

                    {/* {user?.nationality !== 'Nigerian' && !info?.isAuthenticate.passportId && (<VerifyAccount />)} */}

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                        <div
                            onClick={() => navigate(`/dashboard/orders?status=completed`)}
                            className='bg-white hover:bg-gray-50 rounded-xl cursor-pointer p-8 h-40 w-full flex-col flex justify-start items-start'>
                            <img
                                alt=''
                                src={require('../../assets/images/completed.png')}
                                className='ml-4'
                            />
                            <p className='my-2 text-sm '>Completed Grooves</p>
                            <p className='font-bold text-xl'>{orders && FilterOrderByStatus(orders, 'Completed')}</p>
                        </div>

                        <div
                            onClick={() => navigate(`/dashboard/orders?status=accepted`)}
                            className='bg-white hover:bg-gray-50 rounded-xl cursor-pointer p-8 h-40 w-full flex-col flex justify-start items-start'>
                            <img
                                alt=''
                                src={require('../../assets/images/ongoing.png')}
                                className='ml-4'
                            />
                            <p className='my-2 text-sm '>Ongoing Grooves</p>
                            <p className='font-bold text-xl'>{orders && FilterOrderByStatus(orders, 'Accepted') + FilterOrderByStatus(orders, 'Accepted')}</p>
                        </div>

                        <button
                            onClick={() => navigate(`/dashboard/orders?status=pending`)}
                            className='bg-white hover:bg-gray-50 rounded-xl cursor-pointer p-8 h-40 w-full flex-col flex justify-start items-start'>
                            <img
                                alt=''
                                src={require('../../assets/images/canceled.png')}
                                className='ml-4'
                            />
                            <p className='my-2 text-sm '>Pending Grooves</p>
                            <p className='font-bold text-xl'>{orders && FilterOrderByStatus(orders, 'Pending')}</p>
                        </button>


                        {
                            user?.accountType === "Groover" && (
                                <div
                                    onClick={() => navigate(`/dashboard/wallet`)}
                                    className='bg-white cursor-pointer hover:bg-gray-50  rounded-xl p-8 h-40 w-full flex-col flex justify-start items-start'>
                                    <img
                                        alt=''
                                        src={require('../../assets/images/earnings.png')}
                                        className='ml-4'
                                    />
                                    <div className='flex items-center'>
                                        <p className='my-2 text-sm font-bold'>View Balance</p>
                                        <span className='font-bold ml-3'><HiArrowUpRight /></span>
                                    </div>
                                    <p className='text-sm'>Manage your Balance</p>
                                </div>
                            )
                        }

                        {
                            user?.accountType === "Groovie" && (
                                <div
                                    onClick={() => navigate(`/dashboard/wallet`)}
                                    className='bg-white cursor-pointer hover:bg-gray-50  rounded-xl p-8 h-40 w-full flex-col flex justify-start items-start'>
                                    <img
                                        alt=''
                                        src={require('../../assets/images/earnings.png')}
                                        className='ml-4'
                                    />
                                    <div className='flex items-center'>
                                        <p className='my-2 text-sm font-bold'>View Earnings</p>
                                        <span className='font-bold ml-3'><HiArrowUpRight /></span>
                                    </div>
                                    <p className='text-sm'>Manage your earnings </p>
                                </div>
                            )
                        }

                    </div>

                    {/* //RECENT ACTIVITIES STARTS HERE */}
                    <div className='w-full bg-white p-4  text-sm my-6  flex justify-between items-center rounded-lg'>
                        <p>Recent Activities</p>
                        <p
                            onClick={() => navigate(`/dashboard/wallet`)}
                            className='text-wine font-bold cursor-pointer'>View All</p>

                    </div>

                    <section className='w-full p-6 rounded-xl bg-white'>
                        {
                            orders && orders?.length > 0 ? (
                                <Table transactions={orders} />
                            ) : (
                                <EmptyOrderState imageSrc={''} message={"You currently have no order"} />
                            )
                        }
                        {/* {orders && (<Table transactions={orders} />)} */}
                    </section>

                </section>
            )
            }

        </div>
    )
}

export default Dashboard
