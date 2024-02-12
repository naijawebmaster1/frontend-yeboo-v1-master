import React from 'react';
import '../../assets/CSS/profile.css';
import badge from './img/Badges.png'
import verificationBadge from './img/verification.png';
import profilePicture from './img/profile-1.jpg';
import { BsPerson } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { FaImage } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import {FaArrowRight } from "react-icons/fa6";
import Header from '../../components/block-components/header/header';

function ProfileWithImage() {
  const handleTabClick = (e, tabId) => {
    e.preventDefault();
    const mediaContent = document.querySelector('.editInfoMedia');
    const basicInfo = document.querySelector('.editInfo');

    if (tabId === 'basic') {
      if (mediaContent.classList.contains('active')) {
        mediaContent.classList.remove('active');
      }

      basicInfo.classList.add('active');
    } else if (tabId === 'media') {
      if (basicInfo.classList.contains('active')) {
        basicInfo.classList.remove('active');
      }

      mediaContent.classList.add('active');
    }
  };

  return (
    <div>
        <Header/>
        <section className="profile">
      <div className="header"></div>

      <div className="colContainer">
        <div className="leftCol">
          <div className="imgContainer">
            <img src={profilePicture} alt="zainab" className="standardImg" />
            <img className="badge" src={verificationBadge} alt="" />
          </div>
          <div className="profileDetails">
            <div className="verified">
              <img src={badge} alt="" />
              <span>KYC Verified</span>
            </div>
            <h2>Cutie Johnson (Zainab Ore)</h2>
            <p>MEMBER SINCE <span></span> 2023</p>
          </div>
        </div>
      </div>

      <form className="profileInfo">
        <div className="infoHeading">
          <select>
            <option>Available</option>
            <option>Unavailable</option>
          </select>

          <div className="tabs">
            <div
              className="active"
              id="basic"
              onClick={(e) => handleTabClick(e, 'basic')}
              style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#eaeaeb', borderRadius: '10px', padding: '10px 15px'}}>
              <BsPerson style={{color: '#800020'}}/>
              Basic Info
            </div>
            <div
              id="media"
              onClick={(e) => handleTabClick(e, 'media')}
              style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#eaeaeb', borderRadius: '10px', padding: '10px 15px'}}>
              Media
            </div>
          </div>
        </div>
        <div className="editInfo active">
          <p className="profileInfoTitle">Edit Basic Details</p>
          <div className="inputGroup">
            <div className="inputItem">
              <label>Display Name</label>
              <input type="text" placeholder="Cutie Johnson" />
            </div>

            <div className="inputItem">
              <label>First Name</label>
              <input type="text" placeholder="Zainab" />
            </div>

            <div className="inputItem">
              <label>Last Name</label>
              <input type="text" placeholder="Ore" />
            </div>

            <div className="inputItem">
              <label>Email</label>
              <input type="email" placeholder="Example@mail.com" />
              <AiOutlineEdit className='icon'/>
            </div>
            <div className="inputItem">
              <label>Phone Number</label>
              <div className="phone">
                <select>
                  <option>NG</option>
                </select>
                <input type="text" placeholder="+(234) 000-0000" />
              </div>
              <AiOutlineEdit className='icon'/>
            </div>
          </div>

          <p className="profileInfoTitleSecond">More Details</p>

          <div className="inputGroup">
            <div className="inputItem">
              <label>Age</label>
              <div className="age">
                <input type="date" className="bigger" />
                <input
                  type="text"
                  placeholder="24 Years"
                  className="smaller"
                />
              </div>
            </div>

            <div className="inputItem">
              <label>Do you drink?</label>
              <div className="basicGroup radio">
                <div className="half">
                  <input type="radio" />
                  <span>YES</span>
                </div>
                <div className="half left">
                  <input type="radio" />
                  <span>NO</span>
                </div>
              </div>
            </div>

            <div className="inputItem">
              <label>Do you smoke?</label>
              <div className="basicGroup radio">
                <div className="half">
                  <input type="radio" />
                  <span>YES</span>
                </div>
                <div className="half left">
                  <input type="radio" />
                  <span>NO</span>
                </div>
              </div>
            </div>

            <div className="inputItem">
              <label>Zodiac Sign</label>
              <select className="moreInfoSelect">
                <option>Sagitarius</option>
                <option>Aeries</option>
                <option>Gemini</option>
              </select>
            </div>

            <div className="inputItem">
              <label>Height</label>
              <select className="moreInfoSelect">
                <option>20</option>
              </select>
            </div>

            <div className="inputItem">
              <label>Body Type</label>
              <select className="moreInfoSelect">
                <option>Curvy</option>
              </select>
            </div>

            <div className="inputItem">
              <label>Ethnicity</label>
              <select className="moreInfoSelect">
                <option>African</option>
              </select>
            </div>
          </div>
        </div>

        <div className="editInfoMedia">
          <p className="profileInfoTitle">Upload Media</p>
          <div className="uploadGroup">
            <div className="uploadBx bgImage">
            <FaImage className='iconImage'/>
              <p> <a href="#" style={{ color: '#fff' }}>Remove Image</a></p>
            </div>

            <div className="uploadBx bgImage">
            <FaImage className='iconImage'/>
              <p> <a href="#" style={{ color: '#fff' }}>Remove Image</a></p>
            </div>

            <div className="uploadBx bgImage">
            <FaImage className='iconImage'/>
              <p> <a href="#" style={{ color: '#fff' }}>Remove Image</a></p>
            </div>

            <div className="uploadVideoBx">
              <FaVideo/>
              <p>Upgrade To VIP member to upload video</p>
              <button type="submit" className="upgrade"> <FaCrown/> Upgrade To VIP <FaArrowRight/></button>
            </div>
          </div>
        </div>

        <input type="submit" value="Update" />
      </form>
    </section>
    </div>
  );
}

export default ProfileWithImage;
