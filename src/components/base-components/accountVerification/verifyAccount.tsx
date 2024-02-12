import React from 'react'
import { useNavigate } from 'react-router-dom'

function VerifyAccount() {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate('/auth/verify-nin')}
            className='font-bold h-16 w-full my-3 bg-white p-4 rounded-xl cursor-pointer'>
            <div className=' flex items-center justify-start'>
                <img
                    alt=''
                    src={require('../../../assets/images/Processing.png')}
                />
                <div className='ml-3'>
                    <p className='font-bold text-sm md:text-base'>Verify Your Account</p>
                    <p className='text-xs font-light'>Kindly verify your account to enjoy more exclusive benefits and features on Yebbo</p>
                </div>
            </div>

        </div>
    )
}

export default VerifyAccount
