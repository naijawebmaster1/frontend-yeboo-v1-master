import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/auth/authLayout';
import ModalLayout from '../../layout/modal/modalLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


interface IUserTypeSelection {
  setStage: any,
  setaccountType: any,
  accountType: string
}
function UserTypeSelection({ setStage, accountType, setaccountType }: IUserTypeSelection) {
  const [modalClosed, setModalClosed] = useState(true);
  const navigate = useNavigate()
  let error = ''

  const nextStageHandler = () => {
    if (!accountType) {
      toast.warning("Select Account Type ")
      return
    }

    setStage('2')
  }

  return (
    <div>
      <ModalLayout open={modalClosed} setOpen={() => navigate('/')} showClose={true} title='Warning!!!'>
        <div className=" text-charleston text-sm p-10">
          <h3 className="font-bold text-xl my-3">Age Verification</h3>
          <p className="my-3">
            Yeboo is an adult entertainment community that contains sexually explicit content.
            You must be 18 years old or over to enter.
          </p>
          <button
            onClick={() => setModalClosed(!modalClosed)}
            className='w-full px-4 py-2.5 bg-[#800020] text-white rounded-md my-6 font-bold'>
            I am 18 or Older - Enter
          </button>
          <p className="">
            Our <a href='/parental-control' target= "_blank" className="text-wine cursor-pointer font-bold">Parental Control Page</a> explains how you can easily
            block access to the site.
          </p>
        </div>
      </ModalLayout>


      <AuthLayout title='What type of user are you?' subTitle='Choose an account type that suits your needs. Its free to sign up.'>
        <section>
          <form className='w-full mt-10'>           <div className='bg-[#EAEAEB] rounded-md p-3 text-charleston'>
            <h4 className='font-bold'>Groovie</h4>
            <div className='flex justify-between items-center'>
              <p className='text-sm'>Are you here to get hired and have fun?</p>
              <input
                onChange={(e) => setaccountType(e.target.value)}
                value='Groovie'
                checked={accountType === 'Groovie'}
                type="radio" className='h-5 w-5' />
            </div>
          </div>

            <div className='bg-[#EAEAEB] rounded-md p-3 text-charleston mt-4'>
              <h4 className='font-bold'>Groover</h4>
              <div className='flex justify-between items-center'>
                <p className='text-sm'>Are you here to look for grooves?</p>
                <input
                  value='Groover'
                  onChange={(e) => setaccountType(e.target.value)}
                  checked={accountType === 'Groover'}
                  type="radio" className='h-5 w-5' />
              </div>
            </div>


            <div className="pt-2 text-xs font-bold text-start">
                  <p>{error}</p>
                </div>



            <button
              type='button'
              onClick={() => nextStageHandler()}
              className='w-full px-4 py-2.5 bg-[#800020] text-white rounded-xl my-6'>
              Get Started
            </button>

            <Link to='/auth/login'>
              <button
                type='button'
                // onClick={() => setModalClosed(!modalClosed)}
                className='w-full text-sm px-4 py-2.5 bg-[#F2E6E9] text-charleston rounded-md my-6'>
                Already have an account? <span className='text-wine font-bold'>Sign in</span>
              </button>
            </Link>
          </form>
        </section>
      </AuthLayout>

    </div>
  );
}

export default UserTypeSelection;
