import { useState, useEffect } from 'react'
import { BsArrowUpRight } from "react-icons/bs"
import Header from "../../components/block-components/header/header"
import { RiExchangeDollarFill, RiLockPasswordLine } from "react-icons/ri"
import { NavLink } from "react-router-dom"
import WalletTabs from "../../components/base-components/walletTabs/walletTabs"
import ModalLayout from "../../layout/modal/modalLayout"
import ChangePin from '../../components/block-components/modal/ChangePin.jsx'
import WithdrawFunds from '../../components/block-components/modal/WithdrawFunds'
import BVNVerification from '../../components/block-components/modal/BVNVerification'
import FundWallet from '../../components/block-components/modal/FundWallet.jsx'
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import VerifyAccount from '../../components/base-components/accountVerification/verifyAccount'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import ComingSoon from '../../components/block-components/modal/comingSoon'
import { getUserDetailsAction } from '../../services/reducers/userReducer.ts/getUserDetailsReducer'
import { getWalletAction } from '../../services/reducers/walletReducer/getWalletReducer'
import { formatMoney, FilterAndGetTransactionSum } from '../../services/utils/helpersFunc'
import { getWalletTransactionsAction } from '../../services/reducers/walletReducer/getwalletTransactions'
import { getBankInfoAction } from '../../services/reducers/userReducer.ts/getBankDetailsReducer'
import ResetPin from '../../components/block-components/modal/ResetPin'
import authService from '../../services/actions/authActions'
import TooltipsComponent from '../../components/base-components/tooltips/tooltips'

const Wallet = () => {
    const { info } = useSelector((state: any) => state.userInfo)
    const { walletInfo } = useSelector((state: any) => state.wallet)

    const navigate = useNavigate()
    const { user, token } = useSelector((state: any) => state.login);
    const [searchParams] = useSearchParams();
    const verify = searchParams.get('verify')
    const { transactions } = useSelector((state: any) => state.transactions)
    const [isChangePinOpen, setIsChangePinOpen] = useState(false)
    const [isWithdrawFundsOpen, setIsWithdrawFundsOpen] = useState(false)
    const [isAddFundOpen, setIsAddFundOpen] = useState(false)
    const isBVNVerified = info?.isAuthenticate?.bvn
    const [bvnVerificationModalOpen, setBVNVerificationModalOpen] = useState(false)

    //HANDLING COMING SOON
    const [comingSoon, setComingSoon] = useState(false)

    const dispatch = useDispatch<any>()

    const handleFundWallet: () => void = () => {
        if (isBVNVerified) {
            setIsAddFundOpen(true)
        } else {
            setBVNVerificationModalOpen(true)
        }
    }

    const handleResetPin = async () => {
        const res = await authService.resendVerificationEmail({ email: user.email })
        if (res) {
            toast.success('Verification email sent to your email')
            return setIsChangePinOpen(true)
        }
    }

    useEffect(() => {
        if (!info?.nationality) {
            toast.warning("Kindly update your account info to continue ")
            navigate(`/auth/about-yourself?redirect=wallet`)
            return
        }
        // if (!info.isAuthenticate?.nin) {
        //     toast.warning("Kindly verify your nin to continue")
        //     return navigate(`/auth/verify-nin?redirect=wallet`)
        // }
        dispatch(getUserDetailsAction({ token }))
        if (info?.isAuthenticate?.bvn) {
            dispatch(getWalletAction({ token }))
            dispatch(getWalletTransactionsAction({ token }))
            dispatch(getBankInfoAction({ token }))
        }
        // setIsBVNVerified(info?.isAuthenticate?.bvn)
    }, [])

    return (
        <main className="w-full bg-[#FCFCFC]">
            {comingSoon && (<ComingSoon isOpen={comingSoon} setOpen={() => setComingSoon(!comingSoon)} />)}

            {!info?.isAuthenticate?.bvn && (
                <ModalLayout open={true} setOpen={() => navigate(-1)} showClose={true} title='Verify BVN'>
                    <BVNVerification setBVNVerificationModalOpen={setBVNVerificationModalOpen} />
                </ModalLayout>
            )}

            <ModalLayout open={isChangePinOpen} setOpen={setIsChangePinOpen} showClose={true} title={'Change Pin'}>
                <ResetPin />
            </ModalLayout>
            <ModalLayout open={isWithdrawFundsOpen} setOpen={setIsWithdrawFundsOpen} showClose={true} title={"Withdraw Funds"}>
                <WithdrawFunds />
            </ModalLayout>
            <ModalLayout open={isAddFundOpen} setOpen={setIsAddFundOpen} showClose={true} title='Fund Wallet'>
                <FundWallet />
            </ModalLayout>
            {/* <ModalLayout open={bvnVerificationModalOpen} setOpen={setBVNVerificationModalOpen} title={''}>
                <BVNVerification setBVNVerificationModalOpen={setBVNVerificationModalOpen} />
            </ModalLayout> */}



            <header>
                <Header />
            </header>


            <section className="mx-auto max-w-7xl flex flex-col gap-y-10 p-6">
                <span className="">
                    <h2 className="text-2xl font-bold text-[#292D32]">Wallet</h2>
                </span>

                {/* {user?.nationality === 'Nigerian' && !user?.isAuthenticate.nin && (<VerifyAccount />)} */}

                {/* {user?.nationality !== 'Nigerian' && !user?.isAuthenticate.nin && (<VerifyAccount />)} */}

                <div className="bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex flex-col justify-center gap-y-12 p-4">
                    <aside className="flex flex-col gap-y-6">
                        <span>
                            <h5 className="text-[#800020] text-xl font-medium">Wallet</h5>
                            <p className="text-[#696C70] text-xs font-normal">Current Balance</p>
                        </span>
                        <span>
                            <h4 className="text-[#292D32] text-3xl font-bold">₦ {walletInfo?.availableBalance ? formatMoney(Number(walletInfo?.availableBalance)) : 0.00}</h4>
                            <p className="text-[#696C70] text-xs font-normal">NGN(Nigerian Naira)</p>
                        </span>
                        <span className="w-full sm:max-w-[40%] flex flex-row items-center gap-x-2.5">
                            {
                                info?.accountType === 'Groovie' && (
                                    <button
                                        className='flex justify-center items-center text-xs font-medium 
                                    gap-x-2 bg-[#FFD61A] text-[#292D32] rounded-lg border-none outline-none py-2 px-4'
                                        onClick={() => setIsWithdrawFundsOpen(!isWithdrawFundsOpen)}
                                    >
                                        <RiExchangeDollarFill /> Withdraw Funds
                                    </button>
                                )
                            }

                            <button
                                id='addFunds'
                                className='flex justify-center items-center text-xs font-medium
                                     gap-x-2 bg-[#FFF] text-[#292D32] rounded-lg outline-none py-2 px-4 border-2 border-solid border-[#EAEAEB]'
                                onClick={() => handleFundWallet()}
                            >
                                <RiExchangeDollarFill /> Add Funds
                                <TooltipsComponent anchorSelect={'#addFunds'} content={'Add Funds To Wallet'} />
                            </button>

                            <button
                                id='changePin'
                                className="w-[40px] p-2 rounded-lg border-2 border-solid border-[#EAEAEB]"
                                onClick={() => handleResetPin()}
                            >
                                <RiLockPasswordLine />
                                <TooltipsComponent anchorSelect={'#changePin'} content={'Change Transaction Pin'} />
                            </button>
                        </span>
                    </aside>
                    <aside className="flex flex-col gap-y-4 sm:flex-row sm:justify-between sm:items-center">
                        <span
                            className="w-full sm:w-[265px] h-[140px] bg-gradient-1 rounded-md shadow-[0_4px_34px_0_rgba(255,246,230,0.02)] 
                            flex flex-col gap-y-2 p-4"
                        >
                            <div className="w-8 h-8 bg-[#FFF6E6] rounded-full relative">
                                <img
                                    src={require('../../assets/images/money-change.png')}
                                    alt="groove amount icon"
                                    className="w-6 h-6 absolute bottom-0 right-0" />
                            </div>
                            <>
                                <p className="text-[#54575B] text-xs font-normal capitalize mt-2">ongoing groove amount</p>
                            </>
                            <>
                                <p className="text-[#292D32] text-lg font-bold">₦ {walletInfo?.ledgerBalance ? formatMoney(Number(walletInfo?.ledgerBalance)) : 0.00}</p>
                            </>
                        </span>

                        <span
                            className="w-full sm:w-[265px] h-[140px] bg-gradient-2 rounded-md shadow-[0_4px_34px_0_rgba(255,246,230,0.02)] 
                            flex flex-col gap-y-2 p-4"
                        >
                            <div className="w-8 h-8 bg-[#FFF6E6] rounded-full relative">
                                <img
                                    src={require('../../assets/images/money-send.png')}
                                    alt="funds withdraw icon"
                                    className="w-6 h-6 absolute bottom-0 right-0" />
                            </div>
                            {
                                info?.accountType === "Groovie" ? (
                                    <>
                                        <>
                                            <p className="text-[#54575B] text-xs font-normal capitalize mt-2">funds withdraw</p>
                                        </>
                                        <>
                                            <p className="text-[#292D32] text-lg font-bold">₦ {transactions ? FilterAndGetTransactionSum(transactions, 'Withdrawal') : 0.00}</p>
                                        </>
                                    </>
                                ) : (
                                    <>
                                        <>
                                            <p className="text-[#54575B] text-xs font-normal capitalize mt-2">funds deposited</p>
                                        </>
                                        <>
                                            <p className="text-[#292D32] text-lg font-bold">₦ {transactions ? FilterAndGetTransactionSum(transactions, 'Wallet Top up') : 0.00}</p>
                                        </>
                                    </>
                                )
                            }

                        </span>

                        <span
                            className="w-full sm:w-[265px] h-[140px] bg-gradient-3 rounded-md shadow-[0_4px_34px_0_rgba(255,246,230,0.02)] 
                            flex flex-col gap-y-2 p-4"
                        >
                            <div className="w-8 h-8 bg-[#FFF6E6] rounded-full relative">
                                <img
                                    src={require('../../assets/images/money-4.png')}
                                    alt="total income icon"
                                    className="w-6 h-6 absolute bottom-0 right-0" />
                            </div>
                            <>
                                {
                                    info?.accountType === 'Groovie' ? (
                                        <p className="text-[#54575B] text-xs font-normal capitalize mt-2">total earn income</p>
                                    ) : (
                                        <p className="text-[#54575B] text-xs font-normal capitalize mt-2">total ordered grooves</p>
                                    )
                                }
                            </>
                            <>
                                <p className="text-[#292D32] text-lg font-bold">₦ {transactions ? FilterAndGetTransactionSum(transactions, 'Groove Order') : "0"} </p>
                            </>
                        </span>


                        <span
                            onClick={() => setComingSoon(!comingSoon)}
                            className="relative w-full sm:w-[265px] h-[140px] bg-[#292D32] rounded-md  cursor-pointer
                            shadow-[0_4px_34px_0_rgba(255,246,230,0.02)] flex flex-col gap-y-4 p-4 items-center justify-center"
                        >
                            <div className="absolute left-0 top-9">
                                <img
                                    src={require('../../assets/images/Debit-Card-PNG-Image 1.png')}
                                    alt="total income icon"
                                    className="w-[102.173px] h-[102.173px]" />
                            </div>
                            <article className="flex flex-col gap-y-2 cursor-pointer">
                                <>
                                    <h4 className="text-[#FFFFFF] text-xs font-bold">Get Yaboo ATM Card</h4>
                                </>
                                <>
                                    <p className="max-w-[127px] text-[#D4D5D6] text-[8px] font-normal">
                                        Withdraw from any ATM or POS terminal with Yaboo Card
                                    </p>
                                </>
                                <NavLink to='#' className='flex flex-row items-center gap-x-2'>
                                    <p className="mt-3 text-[#EAEAEB] text-[10px] font-bold">
                                        Get started
                                    </p>
                                    <>
                                        <BsArrowUpRight className="mt-3 w-4 h-4 text-[#EAEAEB] text-[10px] font-black" />
                                    </>
                                </NavLink>
                            </article>
                        </span>
                    </aside>
                </div>
            </section>

            <section className="mx-auto max-w-7xl flex flex-col gap-y-10 p-6">
                <WalletTabs />
            </section>
        </main>
    )
}
export default Wallet