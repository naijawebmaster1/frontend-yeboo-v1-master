import React from 'react'

interface PageTitleProps{
    title:string;
}
function PageTitle({title}: PageTitleProps) {
  return (
    <div>
    <h2 className='font-bold my-5 text-xl md:block hidden'>{title}</h2>
    </div>
  )
}

export default PageTitle
