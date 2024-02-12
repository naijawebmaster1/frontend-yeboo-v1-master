import React from 'react';
import style from '../../assets/CSS/style.module.css';
import myLogo from './img/yeboo.png';
import failedImg from './img/failed.png';


function AccountVerificationFailed() {
    return (
      <section className={`${style.congrats} ${style.congratsMobile}`}>
        <img className="yeboo" src={myLogo} alt="yeboo" />
        <div className={style.congratulations}>
          <img src={failedImg} alt="yeboo2" />
          <h2>Account Verification Failed</h2>
          <p>Oops! Account Verification Unsuccessful. Please Double-check Your information and Try Again</p>
        </div>
        <div className={style.inputBx}>
          <input type="submit" value="Retry" />
        </div>
      </section>
    );
  }
  
  export default AccountVerificationFailed;
  