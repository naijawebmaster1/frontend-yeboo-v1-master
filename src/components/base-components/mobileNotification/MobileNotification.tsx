
import { IoCloseSharp } from "react-icons/io5"
import EmptyGrooveState from "../emptyState/emptyGrooveState"

interface NotificationProps {
    isOpen: boolean
    onClose: () => void
}

const MobileNotification: React.FC<NotificationProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null
    return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-full h-full shadow-lg rounded-lg">
                    <div className="relative py-6 px-4">
                        <h3 className="text-center text-base font-medium text-[#292D32]">
                            Notifications
                        </h3>
                        <IoCloseSharp 
                            className="absolute right-4 top-6 cursor-pointer text-[#1C1B1F]" 
                            onClick={onClose}
                        />
                        <div className="p-4 flex flex-col">
                            <span className='bg-[#FBFBFB] p-4 uppercase text-xs font-normal text-[#696C70]'>
                            <h3>Today</h3>
                            </span>

                            <EmptyGrooveState message="You currently have no notification" imageSrc=""/>

                            {/* <div className='flex items-center gap-x-4 py-4 px-2'>
                                <span>
                                    <img 
                                    src={require('../../../assets/images/notification-bing.png')} 
                                    alt='notification bing' 
                                    className='h-6 w-6' 
                                    />
                                </span>
                                <span className='flex flex-col'>
                                    <aside className='flex flex-row justify-between items-center'>
                                    <aside className='text-sm font-medium text-[#292D32]'>Fund Withdrawal</aside>
                                    <aside className='text-xs font-normal text-[#696C70] justify-self-end'>10:35:34 PM</aside>
                                    </aside>
                                    <aside className='flex flex-row justify-between items-center'>
                                    <aside className='text-xs font-normal text-[#696C70]'>You withdraw 10, 000 naira from...</aside>
                                    <aside></aside>
                                    </aside>
                                </span>
                            </div>

                            <div className='flex items-center gap-x-4 py-4 px-2'>
                                <span>
                                    <img 
                                    src={require('../../../assets/images/wallet.png')} 
                                    alt='wallet icon' 
                                    className='h-6 w-6' 
                                    />
                                </span>
                                <span className='flex flex-col'>
                                    <aside className='flex flex-row justify-between items-center'>
                                    <aside className='text-sm font-medium text-[#292D32] justify-self-start'>Fund Withdrawal</aside>
                                    <aside className='text-xs font-normal text-[#696C70] justify-self-end'>10:35:34 PM</aside>
                                    </aside>
                                    <aside className='flex flex-row justify-between items-center'>
                                    <aside className='text-xs font-normal text-[#696C70]'>You withdraw 10, 000 naira from...</aside>
                                    <aside></aside>
                                    </aside>
                                </span>
                            </div>

                            <div className='flex items-center gap-x-4 py-4 px-2'>
                                <span>
                                    <img 
                                    src={require('../../../assets/images/document.png')} 
                                    alt='bill' 
                                    className='h-6 w-6' 
                                    />
                                </span>
                                <span className='flex flex-col'>
                                    <aside className='flex flex-row justify-between items-center'>
                                    <aside className='text-sm font-medium text-[#292D32]'>Fund Withdrawal</aside>
                                    <aside className='text-xs font-normal text-[#696C70] justify-self-end'>10:35:34 PM</aside>
                                    </aside>
                                    <aside className='flex flex-row justify-between items-center'>
                                    <aside className='text-xs font-normal text-[#696C70]'>You withdraw 10, 000 naira from...</aside>
                                    <aside></aside>
                                    </aside>
                                </span>
                            </div>

                            <div className='flex items-center gap-x-4 py-4 px-2'>
                                <span>
                                    <img 
                                    src={require('../../../assets/images/user.png')} 
                                    alt='user' 
                                    className='h-6 w-6' 
                                    />
                                </span>
                                <span className='flex flex-col'>
                                    <aside className='flex flex-row justify-between items-center'>
                                    <aside className='text-sm font-medium text-[#292D32]'>Fund Withdrawal</aside>
                                    <aside className='text-xs font-normal text-[#696C70] justify-self-end'>10:35:34 PM</aside>
                                    </aside>
                                    <aside className='flex flex-row justify-between items-center'>
                                    <aside className='text-xs font-normal text-[#696C70]'>You withdraw 10, 000 naira from...</aside>
                                    <aside></aside>
                                    </aside>
                                </span>
                            </div> */}
                        </div> 
                    </div>
                </div>
            </div>
  
    )
}
export default MobileNotification