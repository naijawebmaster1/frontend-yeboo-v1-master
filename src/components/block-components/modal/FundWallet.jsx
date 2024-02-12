import { useState, useEffect } from 'react'
import fund from '../../../assets/images/fund.svg'
import { RiCheckFill } from 'react-icons/ri'
import { BiCopy } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { getWalletAction } from '../../../services/reducers/walletReducer/getWalletReducer'

const FundWallet = () => {
    const { info } = useSelector((state) => state.userInfo)
    const { token } = useSelector((state) => state.login)
    const { loading, walletInfo } = useSelector((state) => state.wallet)

    const dispatch = useDispatch()

    const [accountNameCopied, setAccountNameCopied] = useState(false)
    const [bankNameCopied, setBankNameCopied] = useState(false)
    const [accountNumberCopied, setAccountNumberCopied] = useState(false)
    const [allCopied, setAllCopied] = useState(false)

    useEffect(() => {
        dispatch(getWalletAction({token}))
    }, [])

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            return true
        } catch (err) {
            console.error('Error copying text: ', err)
            return false
        }
    }

    const handleCopyAccountName = () => {
        const textToCopy = `${walletInfo?.accountName}`
        copyToClipboard(textToCopy).then((success) => {
            if (success) {
                setAccountNameCopied(true)
                setTimeout(() => setAccountNameCopied(false), 2000)
            }
        })
    }

    const handleCopyBankName = () => {
        const textToCopy = `Kuda MFB`
        copyToClipboard(textToCopy).then((success) => {
            if (success) {
                setBankNameCopied(true)
                setTimeout(() => setBankNameCopied(false), 2000)
            }
        })
    }

    const handleCopyAccountNumber = () => {
        const textToCopy = `${walletInfo?.accountNumber}`
        copyToClipboard(textToCopy).then((success) => {
            if (success) {
                setAccountNumberCopied(true)
                setTimeout(() => setAccountNumberCopied(false), 2000)
            }
        })
    }

    const handleCopyAll = () => {
        const textToCopy = `Account Name: ${walletInfo?.accountName}\nBank Name: Kuda MFB \nAccount Number: ${walletInfo?.accountNumber}`

        copyToClipboard(textToCopy).then((success) => {
            if (success) {
                setAllCopied(true)
                setTimeout(() => setAllCopied(false), 2000)
            }
        })
    }


    return (
        <section>
            <header>
                <span>Fund Wallet</span>
                <div className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center gap-x-4 p-4 mt-4'>
                    <aside>
                        <img src={fund} alt='add fund icon' className="w-[62.052px] h-[40px]" />
                    </aside>
                    <aside className="flex flex-col items-start">
                        <span>
                            <b className="text-[#292D32] text-sm text-left font-bold">Fund Wallet With Virtual Account</b>
                        </span>
                        <span>
                            <p className="max-w-[247.95px] text-[#292D32] text-xs text-left font-normal">
                                Please remember, only deposits into this Virtual account will promptly reflect in your account.
                            </p>
                        </span>
                    </aside>
                </div>
            </header>

            <div className='flex flex-col gap-y-4 mt-4'>
                <label htmlFor='Account Name' className='flex flex-col items-start justify-center gap-y-2'>
                    <span className='text-[#3E4247] text-sm font-medium '>Account Name</span>
                    <span className='w-full flex justify-between items-center py-2.5 px-3.5 bg-[#F9FAFB] rounded-lg'>
                        <aside className='text-[#7F8184] text-base font-normal uppercase'>{walletInfo?.accountName}</aside>
                        <aside className='w-4 h-4 text-[#7F8184] cursor-pointer'>
                            {accountNameCopied ? (
                                <RiCheckFill />
                            ) : (
                                <button onClick={handleCopyAccountName} className='focus:outline-none'>
                                    <BiCopy />
                                </button>
                            )}
                        </aside>
                    </span>
                </label>

                <label htmlFor='Account Name' className='flex flex-col items-start justify-center gap-y-2'>
                    <span className='text-[#3E4247] text-sm font-medium'>Bank</span>
                    <span className='w-full flex justify-between items-center py-2.5 px-3.5 bg-[#F9FAFB] rounded-lg'>
                        <aside className='text-[#7F8184] text-base font-normal'>Kuda MFB</aside>
                        <aside className='w-4 h-4 text-[#7F8184] cursor-pointer'>
                            {bankNameCopied ? (
                                <RiCheckFill />
                            ) : (
                                <button onClick={handleCopyBankName} className='focus:outline-none'>
                                    <BiCopy />
                                </button>
                            )}
                        </aside>
                    </span>
                </label>

                <label htmlFor='Account Name' className='flex flex-col items-start justify-center gap-y-2'>
                    <span className='text-[#3E4247] text-sm font-medium'>Account Number</span>
                    <span className='w-full flex justify-between items-center py-2.5 px-3.5 bg-[#F9FAFB] rounded-lg'>
                        <aside className='text-[#7F8184] text-base font-normal'>{walletInfo?.accountNumber}</aside>
                        <aside className='w-4 h-4 text-[#7F8184] cursor-pointer'>
                            {accountNumberCopied ? (
                                <RiCheckFill />
                            ) : (
                                <button onClick={handleCopyAccountNumber} className='focus:outline-none'>
                                    <BiCopy />
                                </button>
                            )}
                        </aside>
                    </span>
                </label>

                <button
                    className='flex justify-center items-center gap-x-2 text-[#800020] text-base font-medium'
                    onClick={handleCopyAll}
                >
                    <BiCopy /> Copy Account Details
                </button>
                {allCopied && <span className="flex justify-center items-center text-green-500 ml-2">All Copied!</span>}
            </div>
        </section>
    )
}
export default FundWallet