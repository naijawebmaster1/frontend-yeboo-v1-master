import React, { useState } from 'react';
import style from '../../../assets/CSS/payBills.module.css';
import dstv from '../../../pages/paybills/img/dstv.png';
import gotv from '../../../pages/paybills/img/gotv.png';
import startimes from '../../../pages/paybills/img/startimes.png';
import cableTv from '../../../pages/paybills/img/tv.png';
import walletImg from '../../../pages/paybills/img/Processing.png';
import {AiOutlineCheck} from "react-icons/ai";
import {AiOutlineCaretDown} from "react-icons/ai";
import SelectInputField from '../input/selectInputField';
import InputField from '../input/inputField';
import Button from '../button/button';

function BuyCableTv() {
  const [amount, setAmount] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const providers = [
    { name: 'DSTV', imageSrc: dstv },
    { name: 'Gotv', imageSrc: gotv },
    { name: 'Startimes', imageSrc: startimes},
    { name: 'Cable tv', imageSrc: cableTv},
  ];

  const plans = ['N3500', 'N9000', 'N12000', 'N18000']

  const handleInputChange = (e) => {
    setAmount(e.target.value)
  }

  const handleInputClick = () => {
    setIsEditing(true)
  }

  const handleInputBlur = () => {
    setIsEditing(false)
  }

  return (
    <section>
      <header className='flex flex-col justify-center items-center gap-y-2 mt-6'>
        <span>Tap to Input Amount</span>
        <div className="relative text-center">
          <div
              onClick={handleInputClick}
              className={`flex justify-center items-center p-2 rounded w-32 text-5xl text-center font-normal cursor-pointer ${isEditing ? 'hidden' : 'flex'}`}
          >
              ₦0.00
          </div>
          <input
              type="text"
              value={amount}
              onChange={handleInputChange}
              className={`border border-gray-300 p-2 rounded w-32 outline-none ${isEditing ? 'flex' : 'hidden'}`}
              placeholder="0.00"
              autoFocus={isEditing}
          />
        </div>
        <span>NGN (Nigerian Naira)</span>
      </header>

      <div 
        className='w-full flex items-center gap-x-4 mt-6 p-4 rounded-md border border-[#FBFBFB] 
        shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] bg-[#FFF]'
      >
        <span className=''>
          <img src={walletImg} alt='wallet icon' />
        </span>
        <span className='flex flex-col items-start'>
          <aside className='text-[#292D32] text-sm text-left font-bold'>Wallet Balance</aside>
          <aside className='max-w-[247.95px] text-[#292D32] text-xs text-left font-normal'>N1,000,000</aside>
        </span>
      </div>

      <form className='flex flex-col gap-y-4 mt-6'>
        <SelectInputField 
          label='Provider' 
          placeholder='Select Providers' 
          name="providers" 
          data={providers} 
          // onChange={handleChange}
        />
        
        <InputField 
          label='Smart Card Number' 
          // onBlur={handleBlur} 
          // onChange={handleChange}
          name='smart-card-number' 
          type='text' 
          placeholder='Add Smart Card Number' 
        />

        <SelectInputField 
          label='Plan' 
          placeholder='Select Plan' 
          name="plans" 
          data={plans} 
          // onChange={handleChange}
        />

        <div className='mt-4'>
          <Button text='Continue' textColor='#FFF' backgroundColor='#800020' />
        </div>
      </form>
    </section>
  );
}

export default BuyCableTv;