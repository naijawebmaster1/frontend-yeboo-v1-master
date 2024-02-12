import React from "react";
import style from '../../assets/CSS/style.module.css';
import myLogo from './img/yeboo.png';
import slide1 from './img/Slide-1.png';
import slide2 from './img/Slide-2.png';
import slide3 from './img/Slide-3.jpg';

function PasswordResetForm() {
    return (
      <section>
        <div className={style.sliderWrapper}>
          <div className={style.slider}>
            <img src={slide1} alt="" id="slide-1" />
            <img src={slide2} alt="" id="slide-2" />
            <img src={slide3} alt="" id="slide-3" />
          </div>
          <div className={style.sliderNav}>
            <a href="#slide-1"></a>
            <a href="#slide-2"></a>
            <a href="#slide-3"></a>
          </div>
        </div>
  
        <div className={style.contentBx}>
          <div className={style.formBx}>
            <img src={myLogo} alt="LOGO" />
            <h2>Reset Password</h2>
            <p>Verify and secure account with your email.</p>
            <form>
              <div className={style.inputBx}>
                <span>Email</span>
                <input type="email" name="" placeholder="Example@mail.com" />
              </div>
  
              <div className={style.inputBx}>
                <p>Reset password with <a href="#" className="reset">Mobile Number</a></p>
              </div>
  
              <div className={style.inputBx}>
                <input type="submit" value="Reset Now" name="" />
              </div>
              <div className={style.inputBx}>
                <a href="#" className="goback">Go back</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
  
  export default PasswordResetForm;
  