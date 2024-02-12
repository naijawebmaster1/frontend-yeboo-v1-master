import React from 'react'


interface IEmptyOrderState {
    imageSrc?: string
    message: string
}

function EmptyOrderState({message, imageSrc}: IEmptyOrderState) {
  return (

    <div className='flex justify-center items-center my-10 flex-col w-full'>
      <img
      className='h-40 w-40'
       src = {require("../../../assets/images/empty-heart-moF4uWM3Jx.png")} alt=''/>
       <p className='text-sm pb-4'>{message}</p>
    </div>
  )
}

export default EmptyOrderState
