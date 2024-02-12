import React from 'react'


interface IEmptyState {
    btnText: string;
    onClick: any,
    imageSrc: string
    message: string
}

function EmptyStateComponent({message, onClick, btnText, imageSrc}: IEmptyState) {
  return (

    <div className='flex justify-center items-center my-10 flex-col w-full'>
      <img
      className='h-80 w-80'
       src = {require("../../../assets/images/Empty.png")} alt=''/>
       <p className='text-sm pb-4'>{message}</p>
      <button 
      onClick={onClick}
      className='bg-wine px-5 py-2 rounded-md text-white text-sm font-bold'>
        {btnText}
      </button>
    </div>
  )
}

export default EmptyStateComponent
