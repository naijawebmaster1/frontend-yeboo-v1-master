import React, {useState} from 'react';
import style from '../../../assets/CSS/settings.module.css';
import InputCodeField from '../input/inputCodeField';


function ConfirmActivity() {

  const [code, setCode] = useState('')




  return (
    <section>
      <div className={style.contentBx}>
        <div className={style.formBx}>
          <p>Enter your 4 Digits Pin.</p>

          <form>
        <div className='w-full my-5 text-center flex flex-col justify-center items-center '>
          <InputCodeField code={code} setCode={setCode} size={4} />
        </div>

        <button
          className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 py-3 px-4 rounded-lg'
          onClick={(e) => {
            // setReceivedOtp(!receivedOtp)
            e.preventDefault()
          }
          }
        >
          Confirm
        </button>
      </form>
        </div>
      </div>
    </section>
  );
}

export default ConfirmActivity;
