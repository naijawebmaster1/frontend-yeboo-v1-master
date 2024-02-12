import React, { useState } from 'react';
import style from '../../../assets/CSS/payBills.module.css';
import airtel from '../../../pages/paybills/img/airtel.png';
import glo from '../../../pages/paybills/img/Glo.png';
import mtn from '../../../pages/paybills/img/MTN.png';
import mobile from '../../../pages/paybills/img/9mobile.png';
import walletImg from '../../../pages/paybills/img/Processing.png';
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import SelectInputField from '../input/selectInputField';
import { network } from '../../../services/constants/dataConstants';
import InputField from '../input/inputField';
import Button from '../button/button';

function BuyAirtime() {
  const [amount, setAmount] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');

  const networks = [
    { name: 'Airtel', imageSrc: airtel },
    { name: 'MTN', imageSrc: mtn },
    { name: 'Glo', imageSrc: glo },
    { name: '9mobile', imageSrc: mobile },
  ];

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the selected network and mobile number here
  };

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
          label='Network' 
          placeholder='Select Network' 
          name="network" 
          data={network} 
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

        <div className='mt-4'>
          <Button text='Continue' textColor='#FFF' backgroundColor='#800020' />
        </div>
      </form>
    </section>









    // <section className={style.buyAirtime}>
    //   <p className={style.buyAirtimeText}>Tap to input Amount</p>
    //   <span className={style.amount}>0.00</span>
    //   <p className={style.buyAirtimeText}> NGN (Nigerian Naira)</p>
    //   <div className={style.balance}>
    //     <img src={walletImg} alt="" />
    //     <div className={style.balanceText}>
    //       <p>Wallet Balance</p>
    //       <h5>1,000,000</h5>
    //     </div>
    //   </div>

    //   <div className={style.AirtimeOptions}>
    //     <h5>Network</h5>
    //     <div className={style.selectNetwork}>
    //       <div className={style.selectBtn}>
    //         <div className={style.sBcontent}>
    //           {selectedNetwork ? (
    //             <>
    //               <img className={style.sImage} src={selectedNetwork.imageSrc} alt="" />
    //               <span className={style.sBtnText}>{selectedNetwork.name}</span>
    //             </>
    //           ) : (
    //             <>
    //               <span className={style.sBtnText}>Select Network</span>
    //             </>
    //           )}
    //         </div>
    //         <AiOutlineCaretDown className={style.icon} />
    //       </div>
    //       <ul className={style.options}>
    //         {networks.map((network, index) => (
    //           <li
    //             key={index}
    //             className={`option ${selectedNetwork === network ? 'active' : ''}`}
    //             onClick={() => handleNetworkSelect(network)}
    //           >
    //             <div className={style.optionContent}>
    //               <img src={network.imageSrc} alt={network.name} />
    //               <span className={style.optionText}>{network.name}</span>
    //             </div>
    //             {selectedNetwork === network && <AiOutlineCheck className='fa' />}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    //   <div className={style.inputBox}>
    //     <label>Mobile Number</label>
    //     <input
    //       type="text"
    //       placeholder="Add Mobile Number"
    //       required
    //       value={mobileNumber}
    //       onChange={(e) => setMobileNumber(e.target.value)}
    //     />
    //   </div>
    //   <button type="submit" onClick={handleSubmit}>Continue</button>
    // </section>
  );
}

export default BuyAirtime;
