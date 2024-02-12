import React from 'react'
import Header from '../../components/block-components/header/header'
import YebboBack from '../../components/base-components/back/yebooBack'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
  const { info } = useSelector((state: any) => state.userInfo)

    return (
        <>
            <Header pageTitle='Page Not Found' />
            <div className='md:mx-20'>
            <YebboBack title={''} />
            </div>
            <div className='flex justify-center items-center w-screen h-96  flex-col'>

                <div className="text-center">
                    <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
                    <p className="mb-4 text-lg text-gray-600">Oops! Looks like you can't find what you are looking for.</p>
                    <div className="animate-bounce">
                        <svg className="mx-auto h-16 w-16 text-red-500" fill="#800020" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </div>
                    <p className="mt-4 text-gray-600">Let's get you back <span
                    onClick={()=> navigate(`/dashboard`)}
                     className="text-wine underline font-extrabold cursor-pointer">home</span>.</p>
                </div>
            </div >
        </>

    )
}

export default NotFound
