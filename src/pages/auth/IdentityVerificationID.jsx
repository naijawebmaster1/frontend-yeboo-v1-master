import React from 'react';
import style from '../../assets/CSS/style.module.css';
import uploadImg from './img/document-upload.png';
import myLogo from './img/yeboo.png';
import verifyImg from './img/verify.png';
import { Link } from 'react-router-dom';

function IdentityVerificationID() {
  return (
    <section className={style.congrats}>
      <img className="yeboo" src={myLogo} alt="yeboo" style={{ marginBottom: '10px', marginTop: '20px' }} />
      <div className={style.congratulations}>
        <img src={verifyImg} alt="processing" />
        <p style={{ fontSize: '14px', fontWeight: 300 }}>Step 2/2</p>
        <h4>Verify your identity</h4>
        <hr style={{ color: '#eaeaea', width: '100%', height: '0.5px', marginTop: '10px', opacity: 0.5 }} />
      </div>
      <div className={style.congratulations} style={{ marginTop: '10px' }}>
        <h2>Upload Document</h2>
        <p>To ensure the security and legitimacy of our platform, we offer the option to verify your account using your National Identification Number (NIN).</p>
      </div>
      <form className={style.upload}>
        <input type="file" accept="image/png, image/jpeg" className="file" />
        <img src={uploadImg} alt="" />
        <p>Drop file here or <span>Browse</span></p>
        <p>Only Support JPEG & PNG File</p>
      </form>
      <div className={style.inputBx}>
        <span>Document ID</span>
        <input type="text" name="" placeholder="Input Document ID" required />
      </div>
      <Link to='/auth/processing'>
        <div className={style.inputBx}>
          <input type="submit" value="Continue"/>
        </div>
      </Link>
    </section>
  );
}

export default IdentityVerificationID;
