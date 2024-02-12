import React from 'react'


interface IEmptySearchState {
    imageSrc: string
    message: string
}

function EmptySearchState({message, imageSrc}: IEmptySearchState) {
  return (

    <div className='flex justify-center items-center my-10 flex-col w-full'>
      <img
      className='h-40 w-40 object-cover'
       src = {require("../../../assets/images/empty-RBIL0twm1B.png")} alt=''/>
       <p className='text-sm pb-4'>{message}</p>
    </div>
  )
}

export default EmptySearchState
