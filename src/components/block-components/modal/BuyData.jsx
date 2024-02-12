import React, { useState } from 'react';
// import airtel from '../../../pages/paybills/img/airtel.png';
// import glo from '../../../pages/paybills/img/Glo.png';
// import mtn from '../../../pages/paybills/img/MTN.png';
// import mobile from '../../../pages/paybills/img/9mobile.png';
import walletImg from '../../../pages/paybills/img/Processing.png';
import SelectInputField from '../input/selectInputField';
import InputField from '../input/inputField';
import Button from '../button/button';
import { network } from '../../../services/constants/dataConstants';

function BuyData() {
  const [amount, setAmount] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // const networks = [
  //   { name: 'Airtel', imageSrc: airtel },
  //   { name: 'MTN', imageSrc: mtn },
  //   { name: 'Glo', imageSrc: glo },
  //   { name: '9mobile', imageSrc: mobile},
  // ];

  const dataPlans = [
    { name: 'N100 - 100MB' },
    { name: 'N200 - 200MB' },
    { name: 'N300 - 1GB' },
    { name: 'N500 - 2.5GB' },
  ];

  // const [selectedNetwork, setSelectedNetwork] = useState(null);
  // const [selectedDataPlan, setSelectedDataPlan] = useState(null);
  // const [mobileNumber, setMobileNumber] = useState('');

  // const handleNetworkSelect = (network) => {
  //   setSelectedNetwork(network);
  // };

  // const handleDataPlanSelect = (dataPlan) => {
  //   setSelectedDataPlan(dataPlan);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform actions with the selected network, data plan, and mobile number here
  // }

  const handleInputChange = (e) => {
    setAmount(e.target.value)
  }

  const handleInputClick = () => {
    setIsEditing(true)
  }

  // const handleInputBlur = () => {
  //   setIsEditing(false)
  // }

  return (
    <section>
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
          label='Network' 
          placeholder='Select Network' 
          name="network" 
          data={network} 
          // onChange={handleChange}
        />
        
        <SelectInputField 
          label='Network' 
          placeholder='Select Data Plan' 
          name="data-plan" 
          data={dataPlans} 
          // onChange={handleChange}
        />

        <InputField 
          label='Mobile Number' 
          // onBlur={handleBlur} 
          // onChange={handleChange}
          name='number' 
          type='text' 
          placeholder='Add Mobile Number' 
        />

        <div className='flex flex-col justify-center items-center gap-y-2 mt-4'>
          <span>Estimated Amount</span>
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
        </div>

        <div className='mt-4'>
          <Button text='Continue' textColor='#FFF' backgroundColor='#800020' />
        </div>
      </form>
    </section>
  );
}

export default BuyData;
