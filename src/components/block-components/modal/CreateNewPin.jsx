import React from 'react';
import style from '../../../assets/CSS/settings.module.css';

function CreateNewPin() {
  return (
    <section>
      <div className={style.contentBx}>
        <div className={style.formBx}>
          <p style={{ fontWeight: 500 }}>Reset Pin</p>
          <p>Create New Pin.</p>
          <form>
            <div className={style.otpInputs}>
              <input type="password" name="" maxLength={1} placeholder="" />
              <input type="password" name="" maxLength={1} placeholder="" />
              <input type="password" name="" maxLength={1} placeholder="" />
              <input type="password" name="" maxLength={1}placeholder="" />
            </div>

            <p>Repeat 4 Digits Pin.</p>

            <div className={style.otpInputs}>
              <input type="password" name="" maxLength={1} placeholder="" />
              <input type="password" name="" maxLength={1}placeholder="" />
              <input type="password" name="" maxLength={1} placeholder="" />
              <input type="password" name="" maxLength={1} placeholder="" />
            </div>

            <div className={style.inputBx}>
              <input type="submit" className={style.updatePassword} value="Continue" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateNewPin;
