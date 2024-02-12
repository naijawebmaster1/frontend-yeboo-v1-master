import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import ModalLayout from '../../../layout/modal/modalLayout'
import SetupAccount from './SetupAccount'
import ConfirmTransactionPin from './ConfirmTransactionPin'
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'
import { formatMoney } from './../../../services/utils/helpersFunc';
import VerifyWithdraw from './verifyWithdraw'
import userService from '../../../services/actions/userActions'
import authService from '../../../services/actions/authActions'

const WithdrawFunds = () => {
    const [amount, setAmount] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [addNewAccount, setAddNewAccount] = useState(false)
    const [confirmTransactionPin, setConfirmTransactionPin] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState()
    const { bankInfo } = useSelector((state) => state.bankInfo);
    const { walletInfo } = useSelector((state) => state.wallet)
    const [bankDetails, setBankDetails] = useState({})
    const [verifyAuthAccess, setVerifyAuthAccess] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')

    const { token, user } = useSelector((state) => state.login);

    console.log(bankDetails, "BANK DETAILSSS")

    const handleInputChange = (e) => {
        setAmount(e.target.value)
    }

    const handleInputClick = () => {
        setIsEditing(true)
    }

    console.log(selectedAccount, "THE SELECTED ACCOUNT")


    const handleSetupAccountClick = (e) => {
        e.preventDefault()

        if (!amount) {
            return toast.warning("Please enter withdraw amount")
        }
        // if (!selectedAccount){
        //     return toast.warning("Please select bank account to use or enter a add a new bank account")
        // }
        setAddNewAccount(!addNewAccount)
    }

    const handlewithdrwalNow = async (e) => {
        e.preventDefault()
        if (!amount) {
            return toast.warning("Please enter withdrawal amount")
        }
        if (!selectedAccount) {
            return toast.warning("Please select bank account to use or add a new bank account")
        }

        if (Number(amount) > Number(walletInfo?.availableBalance)) {
            return toast.warning("Insufficient Balance")
        }
        if (Number(amount) === 0) {
            return toast.warning("Insufficient Balance")
        }
        authService.resendVerificationEmail({ email: user?.email })
        setVerifyAuthAccess(!verifyAuthAccess)
    }

    return (
        <section>
            <ModalLayout open={addNewAccount} setOpen={setAddNewAccount} showClose={true}>
                <SetupAccount amount={amount} setVerifyAuthAccess={setVerifyAuthAccess} bankDetails={bankDetails} />
            </ModalLayout>
            <ModalLayout open={confirmTransactionPin} setOpen={setConfirmTransactionPin} showClose={true}>
                <ConfirmTransactionPin amount={amount} bankDetails={bankDetails} verificationCode={verificationCode} />
            </ModalLayout>
            <ModalLayout open={verifyAuthAccess} setOpen={setVerifyAuthAccess} showClose={true}>
                <VerifyWithdraw verificationCode={verificationCode} setVerificationCode={setVerificationCode} setConfirmTransactionPin={setConfirmTransactionPin} setVerifyAuthAccess={setVerifyAuthAccess} />
            </ModalLayout>
            <form className='flex flex-col justify-center items-center gap-y-2'>
                <span>Tap to input amount</span>
                <div className="relative text-center">
                    <div
                        onClick={handleInputClick}
                        className={`p-2 rounded w-32 text-5xl text-center font-normal cursor-pointer ${isEditing ? 'hidden' : 'block'}`}
                    >
                        ₦0.00
                    </div>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleInputChange}
                        className={`border border-gray-300 text-center p-2 text-3xl font-bold rounded w-60 outline-none ${isEditing ? 'block' : 'hidden'}`}
                        placeholder="₦ 0.00"
                        autoFocus={isEditing}
                    />
                    <p className={`font-bold my-3  ${isEditing ? 'block' : 'hidden'}`}>
                        ₦ {formatMoney(Number(amount))}
                    </p>
                </div>
                {/* <span>NGN (Nigeria Naira)</span> */}


                <div className='my-3 w-full gap-y-4 grid px-5'>
                    {
                        bankInfo && bankInfo.length > 0 && bankInfo?.map((info) => (
                            <div
                                key={info._id}
                                onClick={() => {
                                    setSelectedAccount(info?._id)
                                    setBankDetails(info)
                                }}
                                style={{
                                    backgroundColor: selectedAccount === info?._id && '#800020',
                                    color: selectedAccount === info?._id && '#fff',
                                }}
                                className='w-full p-2 bg-gray-100 rounded-lg  px-4 cursor-pointer  '>
                                <p className='font-bold text-lg '>{info?.bankName}</p>
                                <p className=''>{info?.accountNumber}</p>
                                <p className=''>{info?.accountName}</p>

                            </div>
                        ))
                    }

                    {bankInfo?.length === 0 && ("No Account on Record. Add a new account")}

                </div>

                <button
                    className='flex items-center justify-center gap-x-2 my-5 text-sm font-bold text-wine'
                    onClick={handleSetupAccountClick}
                >
                    <CiSquarePlus size={20} /> Add New Bank Account
                </button>
                <button
                    type='button'
                    className='w-[358px] py-3 px-4 bg-[#800020] text-white rounded-lg text-base font-medium mt-3'
                    onClick={(event) => handlewithdrwalNow(event)}
                >
                    Withdraw Now
                </button>
            </form>
        </section>
    )
}
export default WithdrawFunds