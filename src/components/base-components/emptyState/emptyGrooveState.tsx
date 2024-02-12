import React from 'react'


interface IEmptyGrooveState {
    imageSrc: string
    message: string
}

function EmptyGrooveState({message, imageSrc}: IEmptyGrooveState) {
  return (

    <div className='flex justify-center items-center my-10 flex-col w-full'>
      <img
      className='h-40 w-40'
       src = {require("../../../assets/images/empty-cart-s0j1ugXb9c.png")} alt=''/>
       <p className='text-sm pb-4'>{message}</p>
    </div>
  )
}

export default EmptyGrooveState
