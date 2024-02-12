import React, { useState } from 'react'
import { AiFillStar, AiOutlineDelete } from 'react-icons/ai'
import { RiDeleteBinLine, RiShieldCheckLine } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Switch from "react-switch";
import ModalLayout from '../../../layout/modal/modalLayout'
import {toast} from 'react-toastify'


function GrooveListingCard() {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(true);
    const [deleteGroove, setDeleteGroove] = useState(false)

    const handleChange = (nextChecked: any) => {
        setChecked(nextChecked);
    };


    return (
        <div>

            {/* //DELETE MODAL STARTS HERE */}

            <ModalLayout open={deleteGroove} setOpen={setDeleteGroove} title={''}>
                <div className='flex flex-col justify-center items-center p-4'>
                    <RiDeleteBinLine
                    size={60}
                    className='p-5 rounded-lg text-[#EE4139]  bg-[#FCD9D7]'
                    />

                    <div className='my-4'>
                        <p className='font-bold text-charleston'>Delete Groove</p>
                        <p className='text-charleston mt-4 text-sm px-6'>Are you sure you want to delete <span className='font-bold'>“I’m Available for one night”</span></p>
                    </div>


                    <div 
                   
                    className='grid grid-cols-2 gap-5 w-full mt-5'>
                        <button 
                         onClick={() =>setDeleteGroove(!deleteGroove)}
                        className='px-2 py-3 text-center font-bold text-wine rounded-lg w-full'>
                            Cancel
                        </button>

                        <button 
                         onClick={() =>{
                            toast.success('Groove Deleted Successfully')
                            setDeleteGroove(!deleteGroove)
                         }}
                        className='px-2 py-3 bg-wine font-bold text-center text-white rounded-lg w-full'>
                            Confirm
                        </button>
                    </div>

                </div>

            </ModalLayout>





            <>
                <div className='w-full min-h-40 md:p-4 flex flex-col md:flex-row items-center overflow-x-hidden'>
                    <div className='flex items-center'>
                        <div className='bg-gradient-to-t from-gray-800 h-32 w-80 rounded-lg'>
                        </div>
                    </div>


                    <div className="md:ml-10 ml-2 w-full">
                        <div className='flex justify-between items-center md:m-0 m-2'>
                            <div>
                                <p className=' text-wine text-xs cursor-pointer font-bold'>One Night Stand</p>
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
                                    {/* <RiShieldCheckLine
                                        color='#EE4139'
                                        size={18}
                                    /> */}
                                                            <img
                        alt=''
                        className='object-cover'
                        src={require('../../../assets/images/like.png')}
                        />
                                    <p className='ml-1'>100</p>

                                </p>
                            </div>
                        </div>

                        <p className="text-sm font-bold text-gray-600 border-b-2 border-gray-100 py-2">I’m Available for One Night</p>


                        <div className='py-3 border-b-2 border-gray-100 md:m-0 m-2'>
                            <div className='flex justify-between items-center'>
                                <p className=' text-gray-400 text-xs'>Price</p>
                                <p className=' text-gray-400 text-sm'>Availability</p>
                            </div>

                            <div className='flex justify-between items-center'>
                                <p className=' text-[#292D32] text-sm font-bold'>NGN 50, 000</p>
                                <p className=' text-[#292D32] text-xs py-4 font-bold'>Available</p>
                            </div>
                        </div>
                    </div>




                </div>


                <div className='py-4 border-b-2 border-gray-100 md:m-0 m-2 flex flex-col md:flex-row items-center justify-between'>

                    <div
                        className='flex justify-start items-center text-charleston cursor-pointer md:mt-0 mt-3 '>
                        <Switch
                            onChange={handleChange}
                            checked={checked}
                            className="react-switch"
                            height={24}
                            width={48}
                        />
                        <p className='text-MS ml-5'>Groove On/Off</p>
                    </div>

                    <div className='flex items-center'>
                        <div
                            onClick={() => navigate('/dashboard/user/edit-groove/1234666')}
                            className='flex items-center cursor-pointer'>
                            <BiEdit
                                size={30}
                                className='shadow-lg p-2 rounded-lg'
                            />
                            <p className=' text-[#3E4247] text-sm ml-4'>Edit Groove</p>
                        </div>

                        <div 
                        onClick={() => setDeleteGroove(!deleteGroove)}
                        className='flex items-center text-[#EE4139] ml-4 cursor-pointer'>
                            <AiOutlineDelete
                                size={30}
                                className='shadow-lg p-2 rounded-lg'
                            />
                            <p className=' text-sm ml-4'>Delete Groove</p>
                        </div>
                    </div>

                </div>
            </>
        </div>
    )
}

export default GrooveListingCard
