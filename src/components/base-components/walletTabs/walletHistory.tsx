import { useState } from 'react'
import ModalLayout from "../../../layout/modal/modalLayout"
import InvoiceDetails from '../../block-components/modal/InvoiceDetails'
import Table from '../../block-components/table/table'

const WalletHistory = () => {
    const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false)
    return (
        <>
        <ModalLayout open={isInvoiceDetailsOpen} setOpen={setIsInvoiceDetailsOpen} showClose={true} title={''}>
            {/* <InvoiceDetails /> */} ''
        </ModalLayout>
        <div className="w-full flex flex-col gap-y-4">
            <span className='w-full bg-[#FBFBFB] p-4'>
                <h6 className='text-[#696C70] text-xs font-normal'>Today</h6>
            </span>


            <Table />
        </div>
        </>
    )
}
export default WalletHistory