import { BsArrowLeftShort } from "react-icons/bs"
import { LiaFileDownloadSolid } from "react-icons/lia"
import { NavLink, useNavigate } from "react-router-dom"
import { formatMoney } from "../../../services/utils/helpersFunc"
import { formatOrderDate2 } from "../../../services/utils/helpersFunc"

const WithdrawConfirmation = ({values, amount}: any) => {
    const navigate = useNavigate()
    return (
        <section>
            <header className="flex flex-col items-center justify-center gap-y-6">
                <span className="text-[#292D32] text-base font-medium">Withdraw Confirmation</span>
                <span className="text-[#696C70] text-xs font-normal">Withdraw Amount</span>
                <span className="text-[#292D32] text-5xl font-medium">N{amount && formatMoney(Number(amount))}</span>
            </header>

            <div className="flex flex-col gap-y-4 p-4 m-6 bg-[#FBFBFB] rounded-2xl">
                <aside className="flex justify-between items-center py-2 border-b border-[#EAEAEB] border-solid border-1">
                    <span className="font-sm font-medium text-[#292D32]">Date</span>
                    <span className="font-sm font-normal text-[#3E4247]">{formatOrderDate2(`${new Date()}`)}</span>
                </aside>
                <aside className="flex justify-between items-center py-2 border-b border-[#EAEAEB] border-solid border-1">
                    <span className="font-sm font-medium text-[#292D32]">Amount</span>
                    <span className="font-sm font-normal text-[#3E4247]">NGN {amount && formatMoney(Number(amount))}</span>
                </aside>
                <aside className="flex justify-between items-center py-2 border-b border-[#EAEAEB] border-solid border-1">
                    <span className="font-sm font-medium text-[#292D32]">Tax</span>
                    <span className="font-sm font-normal text-[#3E4247]">0.5%</span>
                </aside>
                <aside className="flex justify-between items-center py-2 border-b border-[#EAEAEB] border-solid border-1">
                    <span className="font-sm font-medium text-[#292D32]">Total Charge</span>
                    <span className="font-sm font-normal text-[#3E4247]">NGN {amount && formatMoney(Number(amount) + 50)}</span>
                </aside>
                <aside className="flex justify-between items-center py-2 border-b border-[#EAEAEB] border-solid border-1">
                    <span className="font-sm font-medium text-[#292D32]">Bank</span>
                    <span className="font-sm font-normal text-[#3E4247]">{values?.bankName}</span>
                </aside>
                <aside className="flex justify-between items-center py-2 border-b border-[#EAEAEB] border-solid border-1">
                    <span className="font-sm font-medium text-[#292D32]">Account Number</span>
                    <span className="font-sm font-normal text-[#3E4247]">{values?.accountNumber}</span>
                </aside>
                <aside className="flex justify-between items-center py-2 border-b border-[#EAEAEB] border-solid border-1">
                    <span className="font-sm font-medium text-[#292D32]">Account Name</span>
                    <span className="font-sm font-normal text-[#3E4247]">{values?.accountName}</span>
                </aside>
                <aside className="flex justify-between items-center py-2 border-b border-[#EAEAEB] border-solid border-1">
                    <span className="font-sm font-medium text-[#292D32]">Status</span>
                    <span className="font-sm font-normal text-[#FFA500]">Processing</span>
                </aside>

                <button 
                    className='flex items-center justify-center gap-x-2 mt-4'
                    onClick={undefined}
                >
                    <LiaFileDownloadSolid /> Download Receipt
                </button>
                <button 
                    type='submit' 
                    className='w-full flex items-center justify-center gap-x-2 
                    p-4 bg-[#800020] text-white rounded-lg text-base font-medium mt-3 outline-none border-none'
                    onClick={() => window.location.reload()}
                >
                    <BsArrowLeftShort /> Go back to Wallet
                </button>
            </div>
        </section>
    )
}
export default WithdrawConfirmation