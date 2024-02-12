import React from 'react'
import ModalLayout from '../../../layout/modal/modalLayout'

interface IComingSoon{
    isOpen: boolean,
    setOpen: any

}
function ComingSoon({isOpen, setOpen}:IComingSoon) {
  return (
    <ModalLayout open={isOpen} setOpen={setOpen} title={''} showClose={true}>
    <div>
        <h1 className='font-bold'>ATM CARD COMING SOON ON YEBOO. ANTICIPATE</h1>      
      </div>
    </ModalLayout>

  )
}

export default ComingSoon
