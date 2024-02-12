import { useState, useEffect } from 'react';
import '../../assets/CSS/profile.css';
import badge from './img/Badges.png'
import verificationBadge from './img/verification.png';
import { BsPerson } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import Header from '../../components/block-components/header/header';
import VipUpgrade from '../../components/block-components/modal/vipUpgrade';
import ModalLayout from '../../layout/modal/modalLayout';
import PhoneNumerInput from '../../components/block-components/input/SignUpPhoneNumber';
import { Formik } from 'formik';
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux";
import { getUserDetailsAction } from '../../services/reducers/userReducer.ts/getUserDetailsReducer';
import { availability, nationalities, zodiacSigns, bodyTypes, heights } from '../../services/constants/dataConstants';
import { toast } from 'react-toastify';
import userService from '../../services/actions/userActions';
import { FileUploader } from "react-drag-drop-files";
import { IoCameraOutline } from "react-icons/io5";
import ProfileImages from './profileImages';


function UserProfile() {
  const { info } = useSelector((state) => state.userInfo);
  const fileTypes = ["JPG", "JPEG", "PNG", "PNG"];
  const [media, setMedia] = useState([])

  const [activeTab, setActiveTab] = useState('basic')
  const [phoneNumber, setPhoneNumber] = useState(info?.phone)
  const [upgradeVIP, setUpgradeVip] = useState(false)
  const { token } = useSelector((state) => state.login);
  const [displayImage, setDisplayImage] = useState('')

  const onUploadImage = (file) => {
    if (file.files[0]?.size > 2000000) {
      return toast.warning("Image size must not be greater than 2MB")
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(file.files[0]);
      reader.onloadend = async () => {
        setDisplayImage(reader?.result)
        const apiData = {
          contentType: 'image',
          format: 'png',
          media: reader.result
        }

        const res = await userService.uploadProfileImage(token, apiData)
        if (res) {
          toast.success("Profile image uploaded sucessfully")
          dispatch(getUserDetailsAction({ token }))
        }
      }
    }
  }

  const submitHandler = async (values, setSubmitting) => {

    const datas = {
      dateOfBirth: values?.dateOfBirth,
      isSmoke: values?.isSmoke === "false" ? false : true,
      availability: values?.availability,
      bodyType: values?.bodyType,
      isDrink: values?.isDrink === "false" ? false : true,
      zodiacSign: values?.zodiacSign,
      height: values?.height,
      nationality: values?.nationality,
    }

    const updateRes = await userService.updateUser(datas, token)
    if (updateRes) {
      toast.success("Profile updated sucessfully")
      dispatch(getUserDetailsAction({ token }))
    }
  }

  let mediaArray = []
  const handleChanges = (addedFile) => {
    console.log('i deye nowwww')
    const parts = addedFile[0].type.split('/');
    let uploadParams = {
      format: parts[1],
      contentType: parts[0],
      media: ''
    }
    let reader = new FileReader();
    reader.readAsDataURL(addedFile[0]);
    reader.onloadend = async () => {
      uploadParams = {
        ...uploadParams,
        media: reader?.result
      }
      mediaArray.push(uploadParams)
      setMedia([...media, uploadParams])


       const res =  await userService.uploadMultipleFiles(token, [uploadParams])
       if (res){
        toast.success("uploaded successfully")
        window.location.reload()
       }
      //Upload the file
    };

  }

  const dispatch = useDispatch()

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const uploadCoverImage = async (file) => {
    if (file.size > 2000000) {
      return toast.warning("Cover image size must not be greater than 2MB")
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const apiData = {
          contentType: 'image',
          format: 'png',
          media: reader.result
        }

        const res = await userService.uploadCoverImage(token, apiData)
        if (res) {
          toast.success("Cover image uploaded sucessfully")
          dispatch(getUserDetailsAction({ token }))
          window.location.reload()
        }
      }
    }

  }


  useEffect(() => {
    dispatch(getUserDetailsAction({ token }))
  }, [dispatch, token])

  return (
    <div>
      <ModalLayout open={upgradeVIP} setOpen={() => setUpgradeVip(!upgradeVIP)} showClose={true} title='Upgrade To VIP'>
        <VipUpgrade />
      </ModalLayout>
      <Header />
      <section className="profile">
        <div className='w-full rounded-lg h-48 relative'>
          {info?.coverImage
            ? (<img className='h-48 min-w-full rounded-lg object-cover ' src={info?.coverImage} alt="" />) : (<img className='h-48 min-w-full rounded-lg object-cover ' src={require("../../assets/images/yeboobg.jpeg")} alt="" />)}

          <div className='absolute top-0 left-0 w-full h-full bg-black  pr-10 bg-opacity-50 rounded-lg flex justify-end  cursor-pointer items-center'>
            <div className='flex flex-col justify-center items-center'>
              <FileUploader
                types={fileTypes}
                multiple={false}
                name="coverImage"
                handleChange={uploadCoverImage}
                children={
                  <div className='flex justify-center items-center gap-x-2 font-bold cursor-pointer'>
                    <IoCameraOutline className='text-white text-2xl' />
                    <p className='text-white text-sm font-bold'>{info?.coverImage ? "Update cover Image" : "Upload cover Image"}</p>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <div className="colContainer">
          <div className="leftCol">
            <div className="imgContainer">
              {displayImage ? <img
                className="rounded-full h-24 w-24"
                src={displayImage} alt="" /> : <img
                className="rounded-full object-cover h-28 w-28"
                src={info?.profileImage || (info?.sex === 'M' ? require('../../assets/images/yeboo-male-placeholder.jpg') : require('../../assets/images/yeboo-placeholder.jpg'))}
                alt="profile" />}
              <input
                type="file"
                name=""
                id="profileImage"
                accept="image/x-png,image/gif,image/jpeg,image/jpg"
                onChange={(e) => onUploadImage(e.target)}
                className="cursor-pointer absolute top-0 w-full h-full opacity-0 z-50"
              />

              <img className="badge" src={verificationBadge} alt="" />
            </div>
            <div className="profileDetails">
              {
                info?.isVerified && (
                  <div className="verified">
                    <img src={badge} alt="" className='object-contain' />
                    <span>KYC VERIFIED</span>
                  </div>
                )
              }

              <h2>{info?.firstname} {info?.lastname} ({info?.username})</h2>
              <p>MEMBER SINCE <span></span>{info?.createdAt && new Date(info?.createdAt).getFullYear()}</p>
            </div>
          </div>
        </div>

        <Formik
          initialValues={{
            dateOfBirth: info?.dateOfBirth,
            isSmoke: info?.isSmoke,
            availability: info?.availability,
            bodyType: info?.bodyType,
            isDrink: info?.isDrink,
            zodiacSign: info?.zodiacSign,
            height: info?.height,
            nationality: info?.nationality,
            firstname: info?.firstname,
            lastname: info?.lastname,
            email: info?.email,
            phone: info?.phone,
            username: info?.username,
            age: info?.age,
          }}

          validationSchema={Yup.object({
            email: Yup.string().email("Invalid Email Address").required("Email is required").min(5, "Too Short!"),
            firstname: Yup.string().required("First name is required"),
            lastname: Yup.string().required("Last name is required"),
            phone: Yup.string().required("Phone Number is required").min(10, "Invalid Phone Number"),
            username: Yup.string().required("Username is required"),
          })}

          onSubmit={(values, { setSubmitting }) => submitHandler(values, setSubmitting)}
        >
          {({
            values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
            <form onSubmit={handleSubmit} className="profileInfo h-full">
              <div className="p-[10px] flex sm:justify-between justify-center items-center gap-x-2">
                <select
                  id='availability'
                  name='availability'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.availability}
                  className='w-[60px] sm:w-[358px] h-[44px] rounded-md outline-none'>
                  <option value='' disabled selected>Select Availability</option>
                  {
                    availability.map((item, i) => (
                      <option key={item} value={item?.value}>{item.name}</option>
                    ))
                  }

                  {/* <option data-circle-color="red">
                    Available
                  </option>
                  <option data-circle-color="green">Unavailable</option> */}
                </select>

                <div className="w-[100%] sm:w-[358px] sm:h-[44px] h-[44px] flex justify-between items-center rounded-lg bg-[#FBFBFB] p-6">
                  <p
                    className={` ${activeTab === 'basic' ? 'active' : ''} text:xs font-normal sm:text-sm sm:font-medium `}
                    id="basic"
                    onClick={() => handleTabClick('basic')}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      borderRadius: '10px',
                      padding: '10px 15px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <BsPerson style={{ color: '#800020' }} />
                    Basic Info
                  </p>
                  <p
                    className={` ${activeTab === 'media' ? 'active' : ''} text-sm font-medium`}
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
                    }}
                  >
                    <img src={require('../../assets/images/media.png')} /> Media
                  </p>
                </div>
              </div>

              <details className="relative w-full">
                <summary className="cursor-pointer p-3 list-none">
                  <span className='profileInfoTitle ml-[10px]'>Edit Basic Details</span>
                  <div className="summary-chevron-up float-right ml-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </summary>
                <div className={`editInfo ${activeTab === 'basic' ? 'active' : ''}`}>
                  <div className="inputGroup">
                    <div className="inputItem">
                      <label>Display Name</label>
                      <input type="text" placeholder="Cutie Johnson" disabled={true} id='username' name='usernname' value={values.username} onChange={handleChange} onBlur={handleBlur} />
                    </div>

                    <div className="inputItem">
                      <label>First Name</label>
                      <input type="text" disabled placeholder="Zainab" id='firstname' name='firstname' value={values.firstname} onChange={handleChange} onBlur={handleBlur} />
                    </div>

                    <div className="inputItem">
                      <label>Last Name</label>
                      <input type="text" disabled placeholder="Ore" id='lastname' name='lastname' value={values.lastname} onChange={handleChange} onBlur={handleBlur} />
                    </div>

                    <div className="inputItem">
                      <label>Email</label>
                      <input type="email" disabled placeholder="Example@mail.com" id='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                      <AiOutlineEdit className='checkIcon' />
                    </div>
                    {/* <div className="inputItem">
                    <label>Phone Number</label>
                    <div className="phone">
                      <select>
                        <option>NG</option>
                      </select>
                      <input type="text" placeholder="+(234) 000-0000" />
                    </div>
                    <AiOutlineEdit className='checkIcon' />
                  </div> */}
                    <div className='inputItem'>
                      <label>Phone Number</label>
                      <PhoneNumerInput disabled={true} value={values.phone} onChange={setPhoneNumber} />
                    </div>
                  </div>
                </div>
                <div className="summary-chevron-down absolute top-0 right-0 mt-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </div>
              </details>

              <details className="relative w-full">
                <summary className="cursor-pointer p-3 list-none">
                  <span className="profileInfoTitleSecond ml-[10px]">Additional Details</span>
                  <div className="summary-chevron-up float-right ml-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </summary>

                <div className="inputGroup p-4">
                  <div className="inputItem">
                    <label>Date of birth</label>
                    <div className="age">
                      <input
                        value={info?.dateOfBirth}
                        id='dateOfBirth' name='dateOfBirth' onChange={handleChange} onBlur={handleBlur}
                        type="date" className="bigger" />
                      {/* <input
                        disabled={true}
                        id='age' name='age' value={values.age} onChange={handleChange} onBlur={handleBlur}
                        type="text"
                        placeholder="24 Years"
                        className="smaller"
                      /> */}
                    </div>
                  </div>

                  <div className="inputItem">
                    <label>Do you drink?</label>
                    <div className="basicGroup radio">
                      <div className="half">
                        <input
                          name='isDrink'
                          value="true"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultChecked={values?.isDrink === true && true}
                          type="radio" />
                        <span>YES</span>
                      </div>
                      <div className="half left">
                        <input
                          name='isDrink'
                          value="false"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultChecked={values?.isDrink === false && true}
                          type="radio" />
                        <span>NO</span>
                      </div>
                    </div>
                  </div>

                  <div className="inputItem">
                    <label>Do you smoke?</label>
                    <div className="basicGroup radio">
                      <div
                        name='isSmoke'
                        value="true"
                        defaultChecked={values?.isSmoke === true && true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="half">
                        <input type="radio" />
                        <span>YES</span>
                      </div>
                      <div className="half left">
                        <input
                          name='isSmoke'
                          value="false"
                          defaultChecked={values?.isSmoke === false && true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="radio" />
                        <span>NO</span>
                      </div>
                    </div>
                  </div>

                  <div className="inputItem">
                    <label>Zodiac Sign</label>
                    <select
                      id='zodiacSign'
                      name='zodiacSign'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zodiacSign}
                      className="moreInfoSelect">
                      <option value='' disabled selected>Select Zodaic Sign</option>
                      {
                        zodiacSigns.map((item, i) => (
                          <option key={i} value={item?.value || item.name || item}>{item.name || item}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="inputItem">
                    <label>Height</label>
                    <select
                      id='height'
                      name='height'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.height}
                      className="moreInfoSelect">
                      <option value='' disabled selected>Select Height</option>

                      {
                        heights.map((item, i) => (
                          <option key={item.value} value={item?.value || item.name || item}>{item.name || item}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="inputItem">
                    <label>Body Type</label>
                    <select
                      id='zodiacSign'
                      name='zodiacSign'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bodyType}
                      className="moreInfoSelect">
                      <option value='' disabled selected>Select BodyType</option>

                      {
                        bodyTypes.map((item, i) => (
                          <option key={item.value} value={item?.value || item.name || item}>{item.name || item}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="inputItem">
                    <label>Nationality</label>
                    <select
                      name='nationality'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nationality}
                      className="moreInfoSelect">
                      <option value='' disabled selected>Select Nationality</option>
                      {
                        nationalities.map((item, i) => (
                          <option key={item.value} value={item?.value || item.name || item}>{item.name || item}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="summary-chevron-down absolute top-0 right-0 mt-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </div>
              </details>

              <ProfileImages 
                values={values}
                setUpgradeVip={setUpgradeVip}
                info={info}
                media={media}
                handleChanges={handleChanges}
                setMedia={setMedia}
                activeTab={activeTab}
              />



              <div className='p-[25px]'>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className='cursor-pointer bg-wine font-bold text-white rounded-lg px-3 py-2'
                > {isSubmitting ? "Updating..." : "Update Profile"}</button>
              </div>
            </form>
          )}

        </Formik>

      </section>
    </div>
  );
}

export default UserProfile;