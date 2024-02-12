import { useEffect, useState } from "react";
import myLogo from './img/yeboo.png';
import { Link, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginAction } from "../../services/reducers/authReducer.ts/loginReducer";
import InputField from "../../components/block-components/input/inputField";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from 'react-toastify'
import ModalLayout from '../../layout/modal/modalLayout';
import { unwrapResult } from "@reduxjs/toolkit";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import authService from "../../services/actions/authActions";
import { getUserDetailsAction } from "../../services/reducers/userReducer.ts/getUserDetailsReducer";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


function LoginForm() {
  // const slide1 = require('../../assets/images/imgAuth/p0.jpg')
  // const slide2 = require('../../assets/images/imgAuth/p1.jpg')
  // const slide3 = require('../../assets/images/imgAuth/p2.jpg')
  // const slide4 = require('../../assets/images/imgAuth/p3.jpg')
  // const slide5 = require('../../assets/images/imgAuth/p4.jpg')
  // const slide6 = require('../../assets/images/imgAuth/p5.jpg')
  // const slide7 = require('../../assets/images/imgAuth/p6.jpg')
  // const slide8 = require('../../assets/images/imgAuth/p7.jpg')
  // const slide9 = require('../../assets/images/imgAuth/p8.jpg')
  // const slide10 = require('../../assets/images/imgAuth/p9.jpg')
  // const slide11 = require('../../assets/images/imgAuth/p10.jpg')


  const slidesArr = [
    require('../../assets/images/imgAuth/p0.jpg'),
    require('../../assets/images/imgAuth/p1.jpg'),
    require('../../assets/images/imgAuth/p2.jpg'),
    require('../../assets/images/imgAuth/p3.jpg'),
    require('../../assets/images/imgAuth/p4.jpg'),
    require('../../assets/images/imgAuth/p5.jpg'),
    require('../../assets/images/imgAuth/p7.jpg'),
    require('../../assets/images/imgAuth/p8.jpg'),
    require('../../assets/images/imgAuth/p9.jpg'),
    require('../../assets/images/imgAuth/p10.jpg')
  ]
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [modalClosed, setModalClosed] = useState(true);
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    localStorage.clear()
  }, [])


  const loginHandler = async (values, setSubmitting) => {
    await dispatch(loginAction(values))
      .then(unwrapResult)
      .then(({ data }) => {

        if (data) {
          localStorage.setItem('user_type', data.accountType)
          dispatch(getUserDetailsAction({ token: data.auth.accessToken }))

          if (!data.isAuthenticate.phone) {
            localStorage.setItem('phone', data.phone)
            toast.success(`Welcome Back ${data.firstname}. Please verify your phone number to continue`);
            authService.resendVerificationPhone({ phone: data.phone })
            return navigate('/auth/verify-phone')
          }

          if (!data.isAuthenticate.email) {
            toast.success(`Welcome Back ${data.firstname}. Please verify your email to continue`);
            localStorage.setItem('email', data.email)
            authService.resendVerificationEmail({ email: data.email })
            return navigate('/auth/verify-email')
          }

          // if (!data.isAuthenticate.nin){
          //   toast.success(`Welcome Back ${data.firstname}. Please verify your NIN to continue`);
          //   return navigate('/auth/verify-nin')
          // }

          if (!data.nationality) {
            toast.success(`Welcome Back ${data.firstname}. Kindly update your account details`);
            return navigate('/auth/about-yourself')
          }

          navigate(`/dashboard/home`);
          setSubmitting(false);
          toast.success(`Welcome Back ${data.firstname}`);
          return;
        }
        setSubmitting(false);
      });
  };

  return (
    <section className="w-screen h-screen justify-between items-center flex">
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
            Our <a href="/parental-control" target="_blank" className="text-wine cursor-pointer font-bold">Parental Control Page</a> explains how you can easily
            block access to the site.
          </p>
        </div>
      </ModalLayout>

      <div className=" hidden md:block h-screen w-full md:w-1/2 bg-black">
        <Carousel
          showDots={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}
          responsive={responsive}
          customLeftArrow={<div></div>}
          customRightArrow={<div></div>}
        >
          {
            slidesArr.map((item) => (
              <div key={item} className="w-full h-screen">
                <img src={item} alt="" id="slide-1" className="object-cover h-screen w-full" />
              </div>
            ))
          }
        </Carousel>
      </div>


      <div className="flex justify-center md:w-1/2 w-full items-center flex-col h-screen text-charleston p-5 lg:px-40" >
        <Link to='/'>
          <img src={myLogo} alt="LOGO" />
        </Link>
        <h2 className="my-3 font-bold text-charleston text-xl">Login to your account</h2>
        <p className="text-center my-3">Welcome Back: Access Your Account and Embark on Your Journey!</p>

        {/* //FORMIK STARTS HERE */}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}

          validationSchema={Yup.object({
            email: Yup.string().required("Email or username is required"),
            password: Yup.string().required("Password is required").min(2, 'Invalid Password')
          })}
          onSubmit={(values, { setSubmitting }) => loginHandler(values, setSubmitting)}
        >
          {({
            values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
            <form onSubmit={handleSubmit} className="w-full">
              <div>

                <InputField
                  label='Email Address / Username'
                  id='email'
                  name='email'
                  type='text'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="example@gmail.com or username"
                  error={errors.email}
                />

                <div className="text-wine pt-2 text-xs font-bold text-start text">
                  <ErrorMessage name="email" />
                </div>

              </div>

              <div className="w-full relative flex items-center min-w-full max-w-full ">
                <div className="w-full min-w-full max-w-full">
                  <InputField
                    label='Password'
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    placeholder="Enter account password"
                  />
                </div>

                <div className="absolute right-5 bottom-3 cursor-pointer z-50">
                  {
                    showPassword ? (
                      <AiFillEyeInvisible
                        onClick={() => setShowPassword(!showPassword)}
                        size={20}
                      />
                    ) : (
                      <AiFillEye
                        onClick={() => setShowPassword(!showPassword)}
                        size={20}
                      />
                    )
                  }

                </div>
              </div>

              <div className="text-wine pt-2 text-xs font-bold text-start text">
                <ErrorMessage name="password" />
              </div>


              <div className="my-3 text-center">
                <p>Forgotten Password? <span className="reset font-bold"><Link to='/auth/reset'>Reset Now</Link></span></p>
              </div>



              <button
                type='submit'
                disabled={isSubmitting}
                className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold">
                {isSubmitting ? 'Please wait...' : 'Login'}
              </button>

              <Link to='/auth/sign-up'>
                <button className='bg-[#F2E6E9] py-2.5 rounded-md w-full font-sm'>
                  Don't have an account? <span className="text-wine font-bold">Sign Up</span>
                </button>
              </Link>
            </form>
          )
          }

        </Formik>

      </div>
    </section>
  );
}

export default LoginForm;
