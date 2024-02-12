import React, { useState } from 'react';
import '../../assets/CSS/profile.css';
import badge from './img/Badges.png'
import verificationBadge from './img/vipbadge.png';
import profilePicture from './img/profile-5.jpg';
import { BsPerson } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import Header from '../../components/block-components/header/header';
import PhoneNumerInput from '../../components/block-components/input/SignUpPhoneNumber';

function VipProfile() {
  const [activeTab, setActiveTab] = useState('basic')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value)
  }

  return (
    <div>
        <Header/>

        <section className="profile">
      <div className="header"></div>

      <div className="colContainer">
        <div className="leftCol">
          <div className="imgContainer">
            <img src={profilePicture} alt="zainab" className="vipImage" />
            <img className="badge" src={verificationBadge} alt="" />
          </div>
          <div className="profileDetails">
            <div className="verified">
              <img src={badge} alt="" className='object-contain' />
              <span>KYC VERIFIED - VIP</span>
            </div>
            <h2>Cutie Johnson (Zainab Ore)</h2>
            <p>MEMBER SINCE <span></span> 2023</p>
          </div>
        </div>
      </div>

      <form className="profileInfo">
        <div className="infoHeading">
            <select className='w-[358px] h-[44px] rounded-md outline-none'>
              <option data-circle-color="red">
                Available
              </option>
              <option data-circle-color="green">Unavailable</option>
            </select>

          <div className="w-[358px] h-[44px] flex justify-between items-center rounded-lg bg-[#FBFBFB] p-6">
            <div
              className={` ${activeTab === 'basic' ? 'active' : ''}`}
              id="basic"
              onClick={() => handleTabClick('basic')}
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer', 
                borderRadius: '10px', 
                padding: '10px 15px' 
              }}
              >
                <BsPerson style={{color: '#800020'}}/>
              Basic Info
            </div>
            <div
              className={` ${activeTab === 'media' ? 'active' : ''}`}
              id="media"
              onClick={() => handleTabClick('media')}
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer', 
                borderRadius: '10px', 
                padding: '10px 15px' 
              }}>
              <img src={require('../../assets/images/media.png')} /> Media
            </div>
          </div>
        </div>
        <div className={`editInfo ${activeTab === 'basic' ? 'active' : ''}`}>
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
            {/* <div className="inputItem">
              <label>Phone Number</label>
              <div className="phone">
                <select>
                  <option>NG</option>
                </select>
                <input type="text" placeholder="+(234) 000-0000" />
              </div>
              <AiOutlineEdit className='icon'/>
            </div> */}
              <div className='inputItem'>
                <label>Phone Number</label>
                <div className='h-[68px]'>
                  <PhoneNumerInput value={phoneNumber} onChange={setPhoneNumber} />
                </div>
              </div>
          </div>

          <p className="profileInfoTitleSecond">More Details</p>

          <div className="inputGroup">
            <div className="inputItem">
              <label>Age</label>
              <div className="age">
                <input type="date" className="bigger" />
                <input type="text" placeholder="24 Years" className="smaller" />
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

        <div className={`editInfoMedia ${activeTab === 'media' ? 'active' : ''}`}>
          <p className="profileInfoTitle">Upload Media</p>
          <div className="uploadGroup">
            <div className="vipImages">
              <div className="uploadBx">
              <FaImage className='iconImage'/>
                <input type="file" />
                <p>Add Image</p>
                <span>Only JPEG/PNG</span>
              </div>

              <div className="uploadBx">
              <FaImage className='iconImage'/>
                <input type="file" />
                <p>Add Image</p>
                <span>Only JPEG/PNG</span>
              </div>

              <div className="uploadBx">
              <FaImage className='iconImage'/>
                <input type="file" />
                <p>Add Image</p>
                <span>Only JPEG/PNG</span>
              </div>

              <div className="uploadBx">
              <FaImage className='iconImage'/>
                <input type="file" />
                <p>Add Image</p>
                <span>Only JPEG/PNG</span>
              </div>

              <div className="uploadBx">
              <FaImage className='iconImage'/>
                <input type="file" />
                <p>Add Image</p>
                <span>Only JPEG/PNG</span>
              </div>

              <div className="uploadBx">
              <FaImage className='iconImage'/> 
                <input type="file" />
                <p>Add Image</p>
                <span>Only JPEG/PNG</span>
              </div>
            </div>

            <div className="vipvideo">
                <FaVideo className='fa-video-camera'/>
              <input type="file" />
              <p>Upload Presentation Video</p>
              <span>Only Mp4 file and 30 seconds</span>
            </div>
          </div>
        </div>

        <div className='p-[25px]'>
          <input 
            type="submit" 
            value="Update"
            className='cursor-pointer'
          />
        </div>
      </form>
    </section>
    </div>
  );
}



export default VipProfile;
