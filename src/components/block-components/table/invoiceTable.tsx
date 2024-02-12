import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition, Menu } from '@headlessui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsDownload } from 'react-icons/bs'
import {HiOutlineFlag} from 'react-icons/hi'
import InvoiceDetails from '../modal/InvoiceDetails'
import ModalLayout from '../../../layout/modal/modalLayout'
import RaiseADispute from '../modal/raiseDispute'
import { formatMoney, formatDate, formatTime } from '../../../services/utils/helpersFunc'

const people = [
  { date: '20th Aug. 2023', time: '10:34:21 PM', name: 'Jenny Frank', amount: '₦10, 000', status: 'Completed' },
  { date: '20th Aug. 2023', time: '10:34:21 PM', name: 'Jenny Frank', amount: '₦10, 000', status: 'Ongoing' },
  { date: '20th Aug. 2023', time: '10:34:21 PM', name: 'Jenny Frank', amount: '₦10, 000', status: 'Failed' },
  { date: '20th Aug. 2023', time: '10:34:21 PM', name: 'Jenny Frank', amount: '₦10, 000', status: 'Ongoing' },
  { date: '20th Aug. 2023', time: '10:34:21 PM', name: 'Jenny Frank', amount: '₦10, 000', status: 'Ongoing' },

  // More people...
]

interface IinvoiceTable {
  invoices?: any[] | undefined;
}

export default function InvoiceTable({invoices}:IinvoiceTable ) {
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false)

  const [dispute, setDispute] = useState(false)

  return (
    <div className="text-orange-yellow">
      {dispute && (<RaiseADispute open={dispute} setOpen={() => setDispute(!dispute)} />)}
      <ModalLayout open={isInvoiceDetailsOpen} setOpen={() => setIsInvoiceDetailsOpen(!isInvoiceDetailsOpen)} showClose={true} title={''}>
            {/* <InvoiceDetails /> */}''
        </ModalLayout>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-textPrimary sm:pl-0">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-textPrimary">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-textPrimary">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-textPrimary">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-textPrimary">
                    Amount
                  </th>
                  <th scope="col" className="relative text-left py-3.5 pl-3 pr-4 sm:pr-0 text-textPrimary">
                    <span className="">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {invoices?.map((invoice:any) => (
                  <tr key={invoice?._id} >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                    {formatDate(invoice?.transactionDate)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatTime(invoice?.transactionDate)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice?.walletTransactionType}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-50">
                      <span
                        style={{
                          backgroundColor: invoice.status === 'Completed' ? '#EBF8F1' : invoice.status === "Ongoing" ? "#FFF6E6" : "#FDECEB",
                          color: invoice.status === 'Completed' ? '#33BB77' : invoice.status === "Ongoing" ? "#FFA500" : "#33BB77"
                        }}
                        className='px-4 py-2 bg-textPrimary rounded-lg text-sm font-bold'>
                        {/* {invoice.status} */} Completed
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice?.currency}  {formatMoney(Number(invoice?.transactionAmount))}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                      <Popover className="relative">
                        <Popover.Button className="flex items-center cursor-pointer gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <BiDotsHorizontalRounded
                            className='text-gray-500 cursor-pointer'
                            size={25}
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

                          <Popover.Panel className="absolute md:-left-16 -left-32 top-full z-10 mt-3 w-[180px] max-w-md  overflow-hidden rounded-2xl bg-white shadow-lg ">
                            <div className="p-4">
                              <div
                                className="relative flex items-center cursor-pointer  rounded-lg text-sm py-1 leading-6 hover:bg-gray-50"
                              >
                                <span className="absolute " />
                                <div 
                                onClick={() => setIsInvoiceDetailsOpen(!isInvoiceDetailsOpen)}
                                className='flex justify-start items-center cursor-pointer text-[#3B7]'>
                                  <BsDownload size={17} />
                                  <p className='ml-4'>Download Invoice</p>
                                </div>
                              </div>

                              <div
                                className="relative flex items-center cursor-pointer  rounded-lg text-sm py-1 leading-6 hover:bg-gray-50"
                              >
                                <span className="absolute " />
                                <div
                                  onClick={() => setDispute(!dispute)}
                                  className='flex justify-start items-center cursor-pointer text-[#EE4139]'>
                                  <HiOutlineFlag size={17} />
                                  <p className='ml-4'>Report Issue</p>
                                </div>
                              </div>

                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
