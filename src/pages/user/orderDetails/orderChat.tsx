import React, { useEffect, useState } from 'react'
import { TbFlag3, TbSend } from 'react-icons/tb'
import { FiPhoneCall } from 'react-icons/fi'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux';
import { HiBadgeCheck } from 'react-icons/hi'
import { CHAT_BASE_URL } from '../../../services/constants/apiConstants';
import { toast } from 'react-toastify'
import { chatMessagesAction } from '../../../services/reducers/chatReducer/chatMessagesReducer'
import { formatChatTimestamp } from '../../../services/utils/helpersFunc';

interface IChat {
    screen: string,
    orderDetails: any
    setDispute: any
    dispute: boolean
}


function OrderChat({ screen, orderDetails, setDispute, dispute }: IChat) {

    const { info } = useSelector((state: any) => state.userInfo)

    const dispatch = useDispatch<any>()

    const { allChats } = useSelector((state: any) => state.allMessages)
    const socket = io(CHAT_BASE_URL, { autoConnect: false })
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageArray, setMessageArray] = useState<any>(orderDetails?.chat)
    const [offlineMsg, setOfflineMsg] = useState<any>([])
    const [chatter, setChatter] = useState(false)
    const [socketState, setSocketState] = useState<any>()

    const sendMessage = async (e: any) => {
        e.preventDefault()
        if (!currentMessage.trim()) return;
        const messageData: any = {
            username: `${info._id}`,
            message: currentMessage,
            time: new Date(Date.now())
        }

        setMessageArray([...messageArray, messageData])
        dispatch(chatMessagesAction([...allChats, messageData]))
        await socketState.emit("sendMessage", [messageData])
        setOfflineMsg([...offlineMsg, messageData])
        setCurrentMessage("")
    }


    useEffect(() => {
        socket.auth = {
            username: `${info._id}`,
            room: `${orderDetails._id}`
        }
        try {
            socket.connect()
            setSocketState(socket)
        } catch (error) {
            console.log(error)
        }

        dispatch(chatMessagesAction(orderDetails?.chat))
        socket.on("connect_error", (err: any) => {
            toast.error(err.message)
        });

        socket.on('join_room_success', (data) => {
            // console.log(data, "JOINED ROOM ")
        })

    }, [])

    useEffect(() => {
        socket.on('Mate Online', async (data) => {
            // console.log(`User is currently: ${data}`)
            data && setChatter(true)
        })

        socket.on("receiveMessage", (message) => {
            setMessageArray([...messageArray, ...message])
            dispatch(chatMessagesAction([...allChats, message]))
        })

        socket.on('User Connected', async (data) => {
            offlineMsg.length > 0  && await socket.emit("sendMessage", offlineMsg)
            setOfflineMsg([])
            setChatter(true)
        })
    }, [])

    return (
        <div>
            {
                screen === 'chat' && (
                    <div>{
                        orderDetails?.status !== 'Completed' && (
                            <div className=' h-92 rounded-xl border-2 my-5'>
                                <div className='h-16 bg-white flex justify-between items-center p-4'>

                                    <div className='flex items-center'>
                                        <div className='relative'>
                                            <img
                                                className="h-8 w-8 object-cover rounded-full border-4 border-yellow"
                                                src='https://images.unsplash.com/photo-1583900985737-6d0495555783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNleHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
                                                alt="profile"
                                            />
                                            <HiBadgeCheck
                                                color='#E0AA3E'
                                                size={15}
                                                className=' bg-white p-0.5 rounded-full absolute top-4 left-5'
                                            />
                                        </div>
                                        {
                                            info?.accountType === "Groover" ? (
                                                <p className='ml-3 font-bold text-sm text-[#292D32]'>{orderDetails?.grooveRef?.customerRef?.username}</p>

                                            ) : (
                                                <p className='ml-3 font-bold text-sm text-[#292D32]'>{orderDetails?.grooverRef?.username}</p>
                                            )
                                        }
                                    </div>

                                    <div
                                        onClick={() => setDispute(!dispute)}
                                        className='flex justify-between cursor-pointer items-center text-sm text-[#EE4139]'>
                                        <TbFlag3
                                            size={30}
                                            className='rounded-md shadow-md p-2 bg-white '
                                        />
                                        <p className='ml-5'>Report</p>
                                    </div>
                                </div>

                                {/* CHAT BOX START HERE */}
                                <div className='bg-[#EAEAEB] h-60 p-4 overflow-y-auto flex flex-col'>

                                    {messageArray && messageArray?.map((chat: any) => (
                                        <div key={chat?._id}>
                                            {
                                                chat?.username !== info?._id && (
                                                    <div className='text-sm w-auto flex flex-col'>
                                                    <p className='p-2 bg-white text-xs w-48 shadow-md rounded-lg font-bold text-start rounded-r-2xl rounded-t-2xl rounded-b-2xl rounded-bl-none'>{chat?.username !== info?._id && chat?.message}</p>
                                                    <p className='text-xs mt-2'>{chat?.username !== info?._id && formatChatTimestamp(chat?.time)}</p>
                                                </div>
                                                )
                                            }


                                            {
                                                chat?.username === info?._id && (
                                                    <div className='text-sm w-auto flex flex-col justify-end items-end'>
                                                    <p className='p-2 bg-yellow w-48 text-xs shadow-md rounded-r-2xl rounded-t-2xl rounded-b-2xl rounded-br-none font-bold text-end'>{chat?.username === info?._id && chat.message}</p>
                                                    <p className='text-xs mt-2'>{chat?.username === info?._id && formatChatTimestamp(chat?.time)}</p>
                                                </div>
                                                )
                                            }
                                        </div>
                                    ))}
                                </div>

                                <div className='m-4'>
                                    <div className='flex justify-between items-center w-full'>
                                        <form onSubmit={(e) => sendMessage(e)} className='flex justify-between items-center w-full'>
                                            <input
                                                value={currentMessage}
                                                onChange={(e) => setCurrentMessage(e.target.value)}
                                                className='border-2 focus:border-none rounded-md px-4 py-1.5 text-sm w-4/5 mr-2'
                                                type='text' placeholder='Type here....' />

                                            <div className='flex items-start w-1/5 justify-between'>
                                                <TbSend
                                                    onClick={(e) => sendMessage(e)}
                                                    size={30}
                                                    className='rounded-md shadow-md p-2 bg-yellow cursor-pointer'
                                                />
                                                <FiPhoneCall
                                                    size={30}
                                                    className='rounded-md shadow-md p-2 bg-white cursor-pointer'
                                                />

                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        )
                    }

                    </div>

                )
            }
        </div>
    )
}

export default OrderChat