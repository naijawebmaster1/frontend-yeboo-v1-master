import { useState } from 'react';
import style from '../../assets/CSS/settings.module.css';
import ModalLayout from '../../layout/modal/modalLayout';
import ChangePassword from '../../components/block-components/modal/ChangePassword';
import ConfirmActivity from '../../components/block-components/modal/ConfirmActivity';
import CreateNewPin from '../../components/block-components/modal/CreateNewPin';
import ResetPin from '../../components/block-components/modal/ResetPin';
import Header from '../../components/block-components/header/header';
import { BiLockAlt } from 'react-icons/bi';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoExitOutline } from 'react-icons/io5';
import userService from '../../services/actions/userActions';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import authService from '../../services/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { getUserDetailsAction } from '../../services/reducers/userReducer.ts/getUserDetailsReducer';

function Settings() {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch()
  const { info } = useSelector((state) => state.userInfo);
  const [isActiveAccount, setIsActiveAccount] = useState(info?.accountStatus === "ACTIVE" ? false : true)
  const [isDeactivateChecked, setIsDeactivateChecked] = useState(info?.availability);
  const [ConfirmActivityOpen, setConfirmActivityOpen] = useState(false);
  const [ChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [CreateNewPinOpen, setCreateNewPinOpen] = useState(false);
  const [ResetPinOpen, setResetPinOpen] = useState(false);
  const [disableAccount, setDisableAccount] = useState(false)

  const navigate = useNavigate()

  const handleDeactivateChange = async () => {
    setIsDeactivateChecked(!isDeactivateChecked);
    const res = await userService.changeVisibility({ token, status: !info?.availability });
    if (res) {
      dispatch(getUserDetailsAction({ token }))
      toast.success(res.data)
    }
  };

  const logOutAccountHandler = async () => {
    const res = await authService.logOutUserAccount({ token })
    if (res) {
      localStorage.clear()
      toast.success("Account Logged Out Sucessfully")
      navigate('/auth/login')
    }
  }


  const resetTransactionPinHandler = () => {
    authService.resendVerificationEmail({ email: info?.email })
    toast.success('Kindly enter the OTP code sent to your email')
    setResetPinOpen(!ResetPinOpen)
  }

  const disableAccountHandler = async () => {
    const res = await userService.deactivateAccount(token)
    if (res) {
      toast.success("We are sorry to see you go. Account Deactivated Successfully.")
      navigate('/auth/login')
      localStorage.clear()
    }
  }

  return (
    <div className='bg-white'>
      <ModalLayout open={ChangePasswordOpen} setOpen={setChangePasswordOpen} showClose={true}>
        <ChangePassword setOpen={setChangePasswordOpen} open={ChangePasswordOpen} />
      </ModalLayout>
      <ModalLayout open={ConfirmActivityOpen} setOpen={setConfirmActivityOpen} showClose={true} title='Confirm Activity'>
        <ConfirmActivity />
      </ModalLayout>
      <ModalLayout open={CreateNewPinOpen} setOpen={() => setCreateNewPinOpen(!CreateNewPinOpen)} showClose={true} title='Change Pin'>
        <CreateNewPin />
      </ModalLayout>
      <ModalLayout open={ResetPinOpen} setOpen={() => setResetPinOpen(!ResetPinOpen)} showClose={true} title="Reset Pin">
        <ResetPin />
      </ModalLayout>

      <ModalLayout open={disableAccount} setOpen={() => setDisableAccount(!disableAccount)} title="Disable Account Temporarily" showClose={true}>
        <div>
          <p className=''>
          Are you sure you want to disable your account temporarily? You can always reach out to us to rectivate your account. 
          </p>

          <div className='grid gap-3 md:grid-cols-2'>
            <button
            onClick={() => setDisableAccount(!disableAccount)}
              className='w-full h-12 bg-white text-[#800020] text-base font-medium mt-4 py-3 px-4 rounded-lg'
            >
              Cancel
            </button>

            <button
            onClick={() => disableAccountHandler ()}
              className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 py-3 px-4 rounded-lg'
            >
              Confirm
            </button>
          </div>

        </div>
      </ModalLayout>

      <Header pageTitle='Setting' />

      <section className={style.settings}>
        <h2 style={{ fontWeight: 'bold' }}>Settings</h2>
        <div className={style.settingsItems}>
          <div className={style.settingsItem}>
            <div className={style.content}>
              <BiLockAlt className={style.checkIcon} />
              <div className={style.settingsText}>
                <small>Password</small>
                <p onClick={() => setChangePasswordOpen(!ChangePasswordOpen)} style={{ cursor: 'pointer' }}>
                  Change Password
                </p>
              </div>
            </div>
          </div>

          <div className={style.settingsItem}>
            <div className={style.content}>
              <RiShieldKeyholeLine className={style.checkIcon} />
              <div className={style.settingsText}>
                <small>Transaction Pin</small>
                <p onClick={() => resetTransactionPinHandler()} style={{ cursor: 'pointer' }}>
                  Change Transaction Pin
                </p>
              </div>
            </div>
          </div>

          {/* <div className={style.settingsItem}>
            <div className={style.content}>
              <AiOutlineEye className={style.checkIcon} />
              <div className={style.settingsText}>
                <small>Privacy</small>
                <p>Account Visibility</p>
              </div>
            </div>
            <div className={style.settingsSwitch}>
              <p>Make account visible to friends and everyone</p>
              <div className={style.settingsToggle}>
                <label htmlFor='visibilityToggle' className={style.togglerSwitch}>

                  <input
                    type='checkbox'
                    id='visibilityToggle'
                    onChange={handleDeactivateChange}
                    value={info?.availability}
                    checked={info?.availability}
                  />
                  <span className={style.switchSlider}></span>
                </label>
              </div>
            </div>
          </div> */}

          <div className={style.settingsItem}>
            <div className={style.content}>
              <IoExitOutline className={style.checkIcon} />
              <div className={style.settingsText}>
                <small>Take a break</small>
                <p>Disable Account Temporarily</p>
              </div>
            </div>
            <div className={style.settingsSwitch}>
              <p>I want to take a break from yeboo</p>
              <div className={style.settingsToggle}>
                <label htmlFor='deactivateCheck' className={style.togglerSwitch}>
                  <input
                    type='checkbox'
                    id='deactivateCheck'
                    value={isActiveAccount}
                    checked={isActiveAccount}
                    onChange={() => setIsActiveAccount(!isActiveAccount)}
                  />
                  <span className={style.switchSlider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
          <button
            type='button'
            id='deactivate'
            disabled={!isActiveAccount}
            style={{
              background: isActiveAccount ? '#800020' : '#cd6f85',
              cursor: isActiveAccount ? 'pointer' : 'not-allowed',
            }}
            onClick={() => setDisableAccount(!disableAccount)}
            className='w-full mx-10 h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
          >
            Deactivate Now
          </button>
          <button
            onClick={() => logOutAccountHandler()}
            className='flex justify-center items-center my-10' type='submit' id='logOut'>
            <IoExitOutline 
            className='mr-5'
            style={{ fontSize: '18px' }} /> Logout Of Account
          </button>
          <button className=' flex justify-center items-center' type='submit' id='logOut' style={{ color: 'red' }}>
            <AiOutlineDelete 
            className='mr-5'
            style={{ fontSize: '18px' }} /> Delete Yeboo Account
          </button>
        </div>
      </section>
    </div>
  );
}

export default Settings;
