import React, {useState, useEffect} from "react";
import myLogo from './img/yeboo.png';
import { Link, useNavigate} from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../../components/block-components/input/inputField";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from 'react-toastify'
import authService from "../../services/actions/authActions";

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



function ResetPassword() {
  const slide3 = 'https://images.unsplash.com/photo-1645736279976-59f8fd22720c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  const slide2 = require('../../assets/images/imgAuth/Slide-2.png')
  const slide1 = 'https://images.unsplash.com/photo-1620794107728-9c2592575f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'

  const slidesArr = [slide1, slide2, slide3]
  const navigate = useNavigate();
  const [resetWithPhone, setResetWithPhone] = useState(true) 


  const resetPasswordHandler = async (values, setSubmitting) => {


    if (!values.phone && !values.email){
      return toast.warning("Please enter your phone number or email to continue")
    }

    if (values.phone){
      const res = await authService.resendVerificationPhone({phone:values.phone})
      if (res) {
        toast.success(`Verification code sent sucessfully to ${values.phone}`)
        localStorage.setItem('phone', values.phone)
        navigate('/auth/reset-password')
      }
    }

    if (values.email){
      const res = await authService.resendVerificationEmail({email:values.email})
      if (res) {
        toast.success(`Verification code sent sucessfully to ${values.email}`)
        localStorage.setItem('email', values.email)
        navigate('/auth/reset-password')
      }
    }
  }
  
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <section className="w-screen h-screen justify-between items-center flex">
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
          <h2 className="my-3 font-bold text-charleston text-xl">Reset Password</h2>
          <p className="text-center my-3">Verify and reset your acccount password with {resetWithPhone? 'Phone' : 'Email'}</p>

          {/* //FORMIK STARTS HERE */}
          <Formik
            initialValues={{
              phone: "",
              email: "",
            }}

            validationSchema={Yup.object({
              phone: Yup.string().min(9, "Invalid Phone Number"),
              email: Yup.string().email("Invalid Email Address")
            })}

            onSubmit={(values, { setSubmitting, setErrors }) => resetPasswordHandler(values, setSubmitting)}
          >
            {({
              values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
              <form onSubmit={handleSubmit} className="w-full">

                {
                  resetWithPhone && (
                    <div>
                    <InputField
                      label='Phone Number'
                      id='phone'
                      name='phone'
                      type='number'
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+(234)000-0000"
                      error={errors.phone}
                    />
                    <div className="text-wine pt-2 text-xs font-bold text-start text">
                      <ErrorMessage name="phone" />
                    </div>
  
                  </div>
                  )
                }

              {
                !resetWithPhone && (
                  <div>
                  <InputField
                    label='Email'
                    id='email'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="example@gmail.com"
                    error={errors.email}
                  />

                  <div className="text-wine pt-2 text-xs font-bold text-start text">
                    <ErrorMessage name="email" />
                  </div>

                </div>
                )
              }


                <div className="my-3 text-center">
                  <p className="text-sm">Reset Password With <span className="reset font-bold cursor-pointer text-wine" onClick={() => setResetWithPhone(!resetWithPhone)}>{resetWithPhone? "Email Address": "Phone Number"}</span></p>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold">
                  {isSubmitting ? 'Please wait...' : 'Reset Password'}
                </button>

                <button
                onClick={()=> navigate(-1)}
                  type='button' className=" bg-white text-wine w-full mb-3 rounded-md py-2.5 font-bold">
                  Go Back
                </button>

              </form>
            )
            }

          </Formik>

        </div>
    </section>
  );
}

export default ResetPassword;