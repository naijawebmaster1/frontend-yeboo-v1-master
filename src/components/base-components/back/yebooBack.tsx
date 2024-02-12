import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import {GrFormNext} from 'react-icons/gr'

interface IYebooBack {
  title : string,
  screenDetails?: any
  hideBack?: boolean
}
function YebboBack({title, screenDetails, hideBack }: IYebooBack) {
  const navigate = useNavigate()

  return (
    <div className='w-full bg-white h-10 rounded-lg '>
      <div
        className='flex justify-start items-center px-4 pt-2 '>
        <AiOutlineLeft
          onClick={() => navigate(-1)}
          className="font-bold mr-3 cursor-pointer"
          color='#B11226'
          size={20}
        />
        <p
          onClick={() => navigate(-1)}
          className='font-bold text-wine md:block hidden mr-10 cursor-pointer'>
          Back
        </p>

        {/* <p className='font-bold  md:hidden block'>
          {title}
        </p> */}

        {
          screenDetails?.length > 0 && screenDetails?.map((screenDetail:any, i:any) => (
            <div key={i} className='hidden md:flex items-center  text-[#3E4247]'>
            <GrFormNext className='mx-4'/>
            <p>{screenDetail}</p>
          </div>
          ))
        }
        
      </div>

    </div>
  )
}

export default YebboBack
