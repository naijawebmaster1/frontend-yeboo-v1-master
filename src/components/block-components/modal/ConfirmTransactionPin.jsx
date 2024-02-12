import { useState } from 'react'
import WithdrawConfirmation from './WithdrawConfirmation'
import ModalLayout from '../../../layout/modal/modalLayout'
import InputCodeField from '../input/inputCodeField'
import userService from '../../../services/actions/userActions'
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const ConfirmTransactionPin = ({ values, amount, bankDetails, verificationCode }) => {
    const [withdrawalConfirmation, setWithdrawalConfirmation] = useState(false)
    const [confirmCode, setConfirmCode] = useState('')
    const { token } = useSelector((state) => state.login);
    const [processing, setProcessing] = useState(false)

    const saveAccountDetailsHandler = async () => {
        if (!confirmCode || confirmCode.length < 4) {
            return toast.warning("Please enter a valid tranaction pin")
        }

        setProcessing(true)
        const res = await userService.saveBank({
            token,
            bankCode: values.bankCode,
            accountNumber: values.accountNumber,
            accountName: values.accountName,
            bankName: values.bankName,
        })

        if (res) {
            toast.success("Bank account saved successfully")
            setWithdrawalConfirmation(true)
            setProcessing(false)

            if (verificationCode ) {
               await withdrawMoney()
               return
            }
            window.location.reload()
        } else {
            setProcessing(false)
        }

    }

    const withdrawMoney = async () => {
        setProcessing(true)
        const withdrawalData = {
            beneficiaryAccountName: bankDetails.accountName,
            transactionAmount: amount,
            beneficiaryAccountNumber: bankDetails.accountNumber,
            beneficiaryBankCode: bankDetails.bankCode,
            otp: verificationCode,
            transactionPin: confirmCode
        }
        const res = await userService.withdrawFunds(token, withdrawalData)
        if (res){
            setWithdrawalConfirmation(true)
            toast.success("Withdrwal initiated successfully")
            setProcessing(false)
        }
        setProcessing(false)
    }


    return (
        <section>
            <ModalLayout open={withdrawalConfirmation} setOpen={setWithdrawalConfirmation} showClose={true}>
                <WithdrawConfirmation values={values} amount={amount} />
            </ModalLayout>
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
                                    Enter your transaction PIN to finalize and add your bank account details.
                                </p>
                            </span>
                        </aside>
                    </div>

                    <p className='mt-4'>Enter 4 Digits PIN</p>

                    <form>
                        <div className='w-full my-5 text-center flex justify-center items-center '>
                            <InputCodeField
                                placeholder='****'
                                type="password"
                                code={confirmCode} setCode={setConfirmCode} size={4} />
                        </div>

                        <div className='flex justify-between items-center'>
                            <button
                                type="button"
                                className='w-full h-12 bg-none text-[#800020] text-base font-medium mt-4 rounded-lg'
                                onClick={undefined}
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                disabled={processing}
                                className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
                                onClick={() => bankDetails?.accountNumber ? withdrawMoney() : saveAccountDetailsHandler()}
                            >
                                {processing ? "Processing..." : 'Confirm'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default ConfirmTransactionPin