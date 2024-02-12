import { LiaFileDownloadSolid } from "react-icons/lia"
import { formatMoney } from '../../../services/utils/helpersFunc'
import { PDFDownloadLink} from '@react-pdf/renderer';
import OrdersInvoiceDownload from './../invoices/ordersInvoice';


const InvoiceDetails = ({ transactionDetails }) => {

    return (
        <section>
            <header>
                <span>Invoice Details</span>
            </header>
            <div className="flex flex-col gap-y-4 p-4 m-6 bg-[#FBFBFB] rounded-2xl">
                <div className="flex justify-between item-start">
                    <aside className="flex flex-col justify-center items-start gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">Issued on</span>
                        <span className="text-[#292D32] text-sm font-medium">{transactionDetails?.date}</span>
                    </aside>
                    <aside className="flex flex-col justify-center items-end gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">Due on</span>
                        <span className="text-[#292D32] text-sm font-medium">{transactionDetails?.date}</span>
                    </aside>
                </div>

                <div className="flex justify-between items-center border-b border-[#EAEAEB] border-solid border-1 pb-4">
                    <aside className="flex flex-col justify-center items-start gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">Bill From</span>
                        <span className="text-[#292D32] text-sm font-medium">{transactionDetails?.grooveRef?.customerRef?.firstname} {transactionDetails?.grooveRef?.customerRef?.lastname.charAt(0)}.</span>
                    </aside>
                    <aside className="flex flex-col justify-center items-end gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">To</span>
                        <span className="text-[#292D32] text-sm font-medium">{transactionDetails?.grooverRef?.username}</span>
                    </aside>
                </div>

                <div className="flex justify-between items-center">
                    <aside className="flex flex-col justify-center items-start gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">Description</span>
                        <span className="text-[#292D32] text-sm font-medium">One Night Stand</span>
                    </aside>
                    <aside className="flex flex-col justify-center items-end gap-y-2">
                        <span />
                    </aside>
                </div>

                <div className="flex justify-between items-center">
                    <aside className="flex flex-col justify-center items-start gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">Price</span>
                        <span className="text-[#292D32] text-sm font-medium">NGN {transactionDetails?.amount && formatMoney(Number(transactionDetails?.amount))}</span>
                    </aside>
                    <aside className="flex flex-col justify-center items-end gap-y-2">
                        <span />
                    </aside>
                </div>

                {/* <div className="flex justify-between items-center">
                    <aside className="flex flex-col justify-center items-start gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">Rate Per Hour</span>
                        <span className="text-[#292D32] text-sm font-medium">NGN 1, 000</span>
                    </aside>
                    <aside className="flex flex-col justify-center items-end gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">Hour</span>
                        <span className="text-[#292D32] text-sm font-medium">10 Hours</span>
                    </aside>
                </div> */}

                <div className="flex justify-between items-center">
                    <aside className="flex flex-col justify-center items-start gap-y-2">
                        <span className="text-[#54575B] text-xs font-normal">Status</span>
                        <span className="text-[#FFA500] text-sm font-medium">{transactionDetails?.status}</span>
                    </aside>
                    <aside className="flex flex-col justify-center items-end gap-y-2">
                        <span />
                    </aside>
                </div>
            </div>


            <PDFDownloadLink document={<OrdersInvoiceDownload details={transactionDetails } />} fileName={`invoice-#${transactionDetails?._id}-${transactionDetails?.grooverRef?.username}.pdf`}>
                {({ blob, url, loading, error }) =>
                    <button
                        type='submit'
                        className='w-full flex items-center justify-center gap-x-2 
                    p-4 bg-[#800020] text-white rounded-lg text-base font-medium mt-3 outline-none border-none'
                    >
                        <LiaFileDownloadSolid /> {loading ? 'Loading Invoice' : 'Download Invoice'}
                    </button>
                }

            </PDFDownloadLink>


        </section>
    )
}
export default InvoiceDetails

