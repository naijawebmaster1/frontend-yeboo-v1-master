import { useState, useEffect } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsCheck } from 'react-icons/bs'
import { PiCrownSimpleLight } from 'react-icons/pi'
import ModalLayout from '../../../layout/modal/modalLayout'
import InputCodeField from '../input/inputCodeField'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { getWalletAction } from '../../../services/reducers/walletReducer/getWalletReducer'
import userService from '../../../services/actions/userActions'
import authService from '../../../services/actions/authActions'
import { getUserDetailsAction } from '../../../services/reducers/userReducer.ts/getUserDetailsReducer'

const benefits = [
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet.'
    },
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet.'
    },
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet.'
    },
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet.'
    },
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet.'
    }
]

function VipUpgrade() {
    const [code, setCode] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const [confirmPin, setConfirmPin] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [sendOtp, setSendOtp] = useState(false)
    const { walletInfo } = useSelector((state: any) => state.wallet)
    const { info } = useSelector((state: any) => state.userInfo)
    const { token } = useSelector((state: any) => state.login)

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const upgradeAccountHandler = async () => {
        if (!code) {
            return toast.warning("Please enter your transaction pin")
        }
        if (code.length < 4) {
            return toast.warning("Invalid transaction pin")
        }

        setSubmitting(true)

        const res = await userService.vipSubscription(token, code, otpCode)
        if (res){
            dispatch(getUserDetailsAction({token}))
            setSubmitting(false)
            window.location.reload()
        }

        setSubmitting(false)
    }

    const verifyOtpHandler = () => {
        if (!otpCode) {
            return toast.warning("Please enter your OTP code")
        }
        if (otpCode.length < 6) {
            return toast.warning("Invalid OTP code")
        }
        setConfirmPin(true)
    }



    const confirmAccountUpgradeHandler = async() => {

        // if (!info.isAuthenticate?.nin) {
        //     toast('Please verify your account to enjoy more exclusive benefits on Yebbo')
        //     navigate(`/auth/verify-nin`)
        //     return
        // }

        if (!info.isAuthenticate?.bvn) {
            toast('Please verify your BVN to generate a wallet for your account')
            navigate(`/dashboard/wallet`)
            return
        }

        if (!info.nationality) {
            toast('Please verify your account to continue')
            navigate(`/auth/about-yourself?redirect=/home`)
            return
        }
        const email = info.email
        const res = await authService.resendVerificationEmail({email})
        if(res){
            toast.success("Enter the verification code sent to your email")
        }

        setSendOtp(true)
    }

    useEffect(() => {
        if (info.isAuthenticate?.bvn) {
            dispatch(getWalletAction({ token }))
        }
    }, [dispatch, token])


    return (
        <>
            {
                confirmPin && (
                    <ModalLayout open={confirmPin} setOpen={() => setConfirmPin(!confirmPin)} title={''} >
                        <div>
                            <div>
                                <p style={{ fontWeight: 600 }}>Confirm Transaction</p>

                                <div className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center gap-x-4 p-4 mt-4'>
                                    <aside>
                                        <img alt='' src={require('../../../assets/images/Processing.png')} className="w-[62.052px] h-[40px]" />
                                    </aside>
                                    <aside className="flex flex-col items-start justify-start">
                                        <span>
                                            <b className="text-[#292D32] text-sm text-left font-bold">Transaction Pin</b>
                                        </span>
                                        <span className=''>
                                            <p className="max-w-[247.95px] text-[#292D32] text-xs text-left font-normal">
                                                Enter your transaction PIN to finalize and upgrade your account to VIP.
                                            </p>
                                        </span>
                                    </aside>
                                </div>

                                <p className='mt-4'>Enter 4 Digits PIN</p>

                                <form>
                                    <div className='w-full my-5 text-center flex justify-center items-center '>
                                        <InputCodeField code={code} setCode={setCode} size={4} />
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <button
                                            type='button'
                                            className='w-full h-12 bg-none text-[#800020] text-base font-medium mt-4 rounded-lg'
                                            onClick={() => setConfirmPin(!confirmPin)}
                                        >
                                            Back
                                        </button>
                                        <button
                                        disabled={submitting}
                                            onClick={() => upgradeAccountHandler()}
                                            type='button'
                                            className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
                                        >
                                            {submitting? "Processing..." : "Upgrade"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalLayout>
                )
            }

            {
                sendOtp && (
                    <ModalLayout open={sendOtp} setOpen={() => setSendOtp(!sendOtp)} title={''} >
                        <div>
                            <div>
                                <p style={{ fontWeight: 600 }}>Verify OTP Code</p>

                                <div className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center gap-x-4 p-4 mt-4'>
                                    <aside>
                                        <img alt='' src={require('../../../assets/images/Processing.png')} className="w-[62.052px] h-[40px]" />
                                    </aside>
                                    <aside className="flex flex-col items-start justify-start">
                                        <span>
                                            <b className="text-[#292D32] text-sm text-left font-bold">Enter OTP Code</b>
                                        </span>
                                        <span className=''>
                                            <p className="max-w-[247.95px] text-[#292D32] text-xs text-left font-normal">
                                                Enter the OTP code sent to your email to  upgrade your account to VIP.
                                            </p>
                                        </span>
                                    </aside>
                                </div>

                                <p className='mt-4'>Enter 6 Digits OTP Code </p>

                                <form>
                                    <div className='w-full my-5 text-center flex justify-center items-center '>
                                        <InputCodeField code={otpCode} setCode={setOtpCode} size={6} />
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <button
                                            type='button'
                                            className='w-full h-12 bg-none text-[#800020] text-base font-medium mt-4 rounded-lg'
                                            onClick={() => setSendOtp(!sendOtp)}
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() =>verifyOtpHandler()}
                                            type='button'
                                            className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalLayout>
                )
            }


            <div className='p-10'>
                <div className='flex justify-center items-center'>
                    <img
                        className='object-cover'
                        alt=''
                        src={require('../../../assets/images/vip.png')}
                    />
                </div>

                <div className='text-center'>
                    <p className='font-bold text-center'>Become A VIP Member</p>
                    <p className='my-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p className='font-bold'>Benefits of VIP</p>
                </div>


                {
                    benefits.map((benefit) => (
                        <div key={benefit.id} className='flex items-center justify-center my-5'>
                            <BsCheck />
                            <p className='ml-5 text-sm'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    ))
                }

                <p className='font-bold'>Upgrade for just ₦40,000.00</p>

                <div
                    onClick={() =>confirmAccountUpgradeHandler()}
                    className='bg-[#FFD101] text-[#292D32] justify-between cursor-pointer mt-8 flex items-center text-sm font-bold px-4 py-3 rounded-lg'>
                    <span className='mr-2 text-xl'><PiCrownSimpleLight /></span> <span>Upgrade To VIP</span> <span className='ml-2'><AiOutlineArrowRight /></span>
                </div>

            </div>
        </>

    )
}

export default VipUpgrade
