import React from 'react'
import ModalLayout from '../../../layout/modal/modalLayout'
import { formatMoney } from '../../../services/utils/helpersFunc'


interface IHireNow {
  open: boolean,
  setOpen: any
  selectedPlan: string
  confirmTransaction: boolean
  setConfirmTransaction: any
}

function HireNow({ open, setOpen, selectedPlan, confirmTransaction, setConfirmTransaction }: IHireNow) {

  const payNowHandler = () => {
    setConfirmTransaction(true);
    setOpen(false)
  }

  return (
    <div>
      <ModalLayout open={open} setOpen={setOpen} title='Make Payment' showClose={true}>
        <section className='p-10'>
          <p className='text-charleston text-sm'>Pay an Escrow</p>

          <p className='font-bold text-4xl py-5'>₦ {formatMoney(Number(selectedPlan))}</p>
          <p className='text-charleston'>NGN (Nigeria Naira)</p>

          <p className='text-charleston py-4 italic'>We ensure the security of your payment and guarantee a seamless transaction between you and the commercial user.</p>

          <button
            onClick={() => payNowHandler()}
            className='w-full py-2.5 bg-wine text-center rounded-lg text-white mt-5 font-bold'>
            Pay Now
          </button>
        </section>
      </ModalLayout>
    </div>
  )
}

export default HireNow
