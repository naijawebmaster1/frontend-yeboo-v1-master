import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BiRightArrowAlt } from 'react-icons/bi'
import { PiNumberOneFill } from 'react-icons/pi'
import { useNavigate, } from 'react-router-dom'
import { useSelector } from "react-redux"
import { formatMoney } from '../../../services/utils/helpersFunc';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import AlertModalLayout from '../../../layout/alert/alertLayout'
import grooveService from '../../../services/actions/grooveActions'
import { toast } from 'react-toastify'
import Switch from "react-switch";


interface IGrooveListCard {
    showCategory?: boolean
    myGroove?: any
}

function MyGrooveCard({ showCategory, myGroove }: IGrooveListCard) {
    const navigate = useNavigate()
    const { token, user } = useSelector((state: any) => state.login)

    const [deleteGroove, setDeleteGroove] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [groove, setGroove] = useState<any>()
    const [changeVisibility, setChangeVisibility] = useState(false)

    const deleteHandler = async () => {
        setProcessing(true)
        const id = groove?.id
        const res = await grooveService.deleteGroove(token, id)
        if (res) {
            setProcessing(false)
            toast.success("Groove deleted successfully")
            window.location.reload()
        }
        setProcessing(false)
    }

    const deleteClicked = (data: any) => {
        setGroove(data)
        setDeleteGroove(!deleteGroove)
    }

    const editGrooveHandler = () => {
        if (user.accountType === "Groovie") {
            navigate(`/dashboard/create-groove/?id=${myGroove?.id}`)
        } else {
            navigate(`/dashboard/request-groove/?id=${myGroove?.id}`)
        }
    }

    const changeVisibilityHandler = async () => {
        setProcessing(true)
        const id = groove?.id
        const data = {
            visibility: myGroove?.isAvailable === true ? "false" : "true"
        }
        const res = await grooveService.changeGrooveVisibility(token, id, data)
        if (res) {
            setProcessing(false)
            toast.success("Groove visibility changed successfully")
            window.location.reload()
        }
        setProcessing(false)
    }

    const changeVisibilityClicked = (data: any) => {
        setGroove(data)
        setChangeVisibility(!changeVisibility)
    }


    return (
        <>
            {
                deleteGroove && (
                    <AlertModalLayout title={'Delete Groove'}
                        processing={processing}
                        content={'Are Your Sure You Want To delete this Groove? This Action Cannot be undone.'}
                        open={deleteGroove} setOpen={setDeleteGroove}
                        actionText={'Delete Groove'}
                        actionFunc={deleteHandler}
                        btnColor='#00FF00'
                    />
                )
            }

            {
                changeVisibility && (
                    <AlertModalLayout title={'Make Groove Unavailable'}
                        processing={processing}
                        content={'Are Your Sure You Want To change this groove visibility? This will make the groove no longer available on the platform.'}
                        open={changeVisibility} setOpen={setChangeVisibility}
                        actionText={' Proceed'}
                        actionFunc={changeVisibilityHandler}
                        btnColor='#00FF00'
                    />
                )
            }

            <div className='w-full min-h-40 md:p-4 flex flex-col md:flex-row items-center overflow-x-hidden'>
                <div className='flex items-center'>
                    <div className='bg-gradient-to-t from-gray-800 h-32 w-80 rounded-lg'>
                    </div>
                </div>

                <div className="md:ml-10 ml-2 w-full">
                    <div className='flex justify-between items-center md:m-0 m-2'>
                        <div>
                            <p className=' text-wine text-xs cursor-pointer font-bold'>{myGroove?.category}</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <p className='text-xs text-gray-500 flex items-center '>
                                <AiFillStar
                                    color='#FCCF14'
                                    size={20}
                                />
                                <p className='ml-1'>4.5</p>
                            </p>

                            <p className='text-xs text-gray-500 flex items-center ml-2'>
                                <img
                                    alt=''
                                    className='object-cover'
                                    src={require('../../../assets/images/like.png')}
                                />
                                <p className='ml-1'>100</p>

                            </p>
                        </div>
                    </div>

                    <p className="text-sm font-bold text-gray-600 border-b-2 border-gray-100 py-2">{myGroove?.title}</p>


                    <div className='py-3 border-b-2 border-gray-100 md:m-0 m-2'>
                        <div className='flex justify-between items-center'>
                            <p className=' text-gray-400 text-xs'>Price</p>
                            <p className=' text-gray-400 text-sm'>Status</p>
                        </div>

                        <div className='flex justify-between items-center'>
                            <p className=' text-[#292D32] text-sm font-bold'>NGN {myGroove?.price && formatMoney(myGroove?.price)}</p>
                            <p className=' text-green-600 text-xs py-4 font-bold'>{myGroove?.status}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='py-4 border-b-2 border-gray-100 md:m-0 m-2 flex flex-col md:flex-row items-center justify-between'>

                <div className='flex items-center'>
                    <div
                        onClick={() => editGrooveHandler()}
                        className='flex items-center cursor-pointer'>
                        <FaRegEdit
                            size={30}
                            className='shadow-lg p-2 rounded-lg'
                        />
                        <p className=' text-gray-400 text-sm ml-4'>Edit Groove</p>
                    </div>

                    <div
                        onClick={() => deleteClicked(myGroove)}
                        className='flex items-center text-[#EE4139] ml-4 cursor-pointer'>
                        <MdOutlineDeleteSweep
                            size={30}
                            className='shadow-lg p-2 rounded-lg'
                        />
                        <p className=' text-sm ml-4'>Delete Groove </p>
                    </div>

                    <div className='flex items-center mx-3'>
                        <Switch
                            className='mr-3'
                            onChange={() => changeVisibilityClicked(myGroove)} checked={myGroove.isAvailable}
                        />
                        {/* <p className='ml-2 text-gray-400 text-sm'>On / Off</p> */}
                    </div>

                </div>

                <div
                    onClick={() => navigate(`/$dashboard/groove/${myGroove?.id}`)}
                    className='flex justify-start items-center text-[#800020] cursor-pointer md:mt-0 mt-3 '>
                    <p className='text-sm font-bold'>View Groove Details</p>
                    <PiNumberOneFill className='mx-3 rounded-full' />
                    <BiRightArrowAlt />
                </div>
            </div>
        </>
    )
}

export default MyGrooveCard