import React, { useState } from 'react'
import ModalLayout from '../../../layout/modal/modalLayout'
import InputCodeField from '../input/inputCodeField'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { TbFlag3, TbFileDownload } from 'react-icons/tb'
import { BsArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'


interface IConfirmTransaction {
    open: boolean,
    setOpen: any,
    setPayNow: any
    confimHandler?: any
    code?: string
    setCode?: any
    loading:boolean
}

function ConfirmTransaction({ open, setOpen, setPayNow, confimHandler, code, setCode, loading }: IConfirmTransaction) {
    const [sucess, setSucess] = useState(false)
    const navigate = useNavigate()
    return (
        <div>
            <ModalLayout open={open} setOpen={setOpen} title='Confirm Transaction' showClose={true}>
                {
                    !sucess && (
                        <section className='p-10 text-center'>
                        <div className='flex justify-start items-center'>
                            <img
                                className='object-cover ml-3'
                                alt=''
                                src={require('../../../assets/images/confirmpin.png')}
                            />
                            <div className='text-start'>
                                <p className='font-bold text-charleston'>Transaction PIN</p>
                                <p className='text-xs text-charleston mt-1'>Enter your transaction PIN to finalize and complete your transaction</p>
                            </div>
                        </div>

                    <p className='mt-10 mb-2 font-bold text-charleston'>Enter 4 Digits PIN</p>

                    <div className='flex justify-center items-center'>
                        <InputCodeField code={code} setCode={setCode} type='password' size={4} />
                    </div>


                    <div className='grid grid-cols-2 gap-4 mt-5'>
                        <button 
                        onClick={() => setPayNow(true)}
                        className='w-full py-2.5 bg-white text-center rounded-lg text-wine mt-5 font-bold'>
                            Back
                        </button>

                        <button 
                        disabled={loading}
                        onClick={() => confimHandler()}
                        className='w-full py-2.5 bg-wine text-center rounded-lg text-white mt-5 font-bold'>
                            {loading ? 'Processing...' : 'Pay Now'}
                        </button>
                    </div>

                </section>
                    )
                }

                {
                    sucess && (
                        <section className='p-10 w-full bg-gray-50 rounded-xl my-5 flex flex-col justify-center items-center'>
                            <IoIosCheckmarkCircle size={80} color='#006400'/>

                            <p className='font-bold text-sm text-charleston'>Transaction Successful</p>
                            <p className='text-sm text-charleston my-3'>Your transaction has been successful</p>

                            <h2 className='text-4xl font-bold my-5 '>N 100, 000</h2>


                            <div className=' w-full text-charleston text-sm'>
                                <div className='flex justify-between items-center my-8'>
                                    <p className='font-bold'>Date</p>
                                    <p>10 Oct. 2023</p>
                                </div>

                                <div className='flex justify-between items-center my-8'>
                                    <p className='font-bold'>Amount</p>
                                    <p>NGN 100, 000</p>
                                </div>

                                <div className='flex justify-between items-center my-8'>
                                    <p className='font-bold'>Commercial User</p>
                                    <p>Cutie Johnson</p>
                                </div>

                                <div className='flex justify-between items-center my-8'>
                                    <p className='font-bold'>Groove Details</p>
                                    <p>I'm Available for escort Project</p>
                                </div>

                                <div className='flex justify-between items-center my-8'>
                                    <p className='font-bold'>Total Charge</p>
                                    <p>NGN 100, 000</p>
                                </div>

                                <div className='flex justify-between items-center my-8'>
                                    <p className='font-bold'>Status</p>
                                    <p>Successful</p>
                                </div>
                            </div>

                            <div  className='w-full grid text-sm font-bold'>
                                <button className='flex mr-3 justify-center text-xs items-center w-full text-wine py-2.5'>
                                <span className='mr-3'><TbFileDownload/></span> Download Receipt
                                </button>

                                <button 
                                onClick={() => navigate('/dashboard/user/my-grooves')}
                                className='w-full text-white py-2.5 my-3 bg-wine rounded-xl flex justify-center items-center'>
                                    Go to My Groove <span className='ml-5'><BsArrowRight size={20}/></span>
                                </button>

                                <button className='w-full text-wine text-xs py-2.5 flex justify-center items-center'>
                                    <span className='mr-3'><TbFlag3/></span>Report Transaction
                                </button>
                            </div>

                        </section>
                    )
                }



            </ModalLayout>

        </div>
    )
}

export default ConfirmTransaction
