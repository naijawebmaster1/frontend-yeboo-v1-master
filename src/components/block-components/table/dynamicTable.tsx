import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition, Menu } from '@headlessui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsDownload } from 'react-icons/bs'
import { HiOutlineFlag } from 'react-icons/hi'
import InvoiceDetails from '../modal/InvoiceDetails'
import ModalLayout from '../../../layout/modal/modalLayout'
import RaiseADispute from '../modal/raiseDispute'



const headers = [
    { text: 'Date', className: 'py-3.5 pl-4 pr-3 text-left text-sm font-bold text-textPrimary sm:pl-0' },
    { text: 'Time', className: 'px-3 py-3.5 text-left text-sm font-bold text-textPrimary' },
    // Add more header definitions as needed
];

const data = [
    { date: '2023-10-13', time: '12:00 PM', /* Add more data fields as needed */ },
    { date: '2023-10-14', time: '1:00 PM', /* Add more data fields as needed */ },
    // Add more data rows as needed
];



function DynamicTable() {
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
                                    {headers.map((header, index) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className={header.className}
                                        >
                                            {header.text}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item: any, rowIndex: any) => (
                                    <tr key={rowIndex}>
                                        {headers.map((header, colIndex) => (
                                            <>
                                                <td key={colIndex} className={header.className}>
                                                    {item[header.text]}
                                                </td>
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
                                            </>

                                        ))}
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

export default DynamicTable
