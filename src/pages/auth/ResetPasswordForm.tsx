import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../../components/block-components/input/inputField";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from 'react-toastify'
import userService from "../../services/actions/userActions";
import InputCodeField from "../../components/block-components/input/inputCodeField";

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



function ResetPasswordForm() {
    const slide3 = 'https://images.unsplash.com/photo-1645736279976-59f8fd22720c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
    const slide2 = require('../../assets/images/imgAuth/Slide-2.png')
    const slide1 = 'https://images.unsplash.com/photo-1620794107728-9c2592575f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'

    const slidesArr = [slide1, slide2, slide3]
    const navigate = useNavigate();
    const [code, setCode] = useState('')
    const email = localStorage.getItem('email')
    const phone = localStorage.getItem('phone')

    const ResetPasswordFormHandler = async (values: any, setSubmitting: any) => {

        if (!code) {
            return toast.warning("Please your otp verification code to continue")
        }
        if (code.length < 6) {
            return toast.warning('Invalid OTP Code')
        }



        if (email) {
            const newValues = {
                password: values.password,
                contact: email,
                otp: code,
                client: 'email'
            }

            const res = await userService.resetPassword(newValues)
            if (res) {
                toast.success('Password reset sucessfully. Please login to continue')
                navigate('/auth/login')
                localStorage.clear()
            }
        }

        if (phone) {
            const newValues = {
                password: values.password,
                contact: phone,
                otp: code,
                client: 'phone'
            }

            const res = await userService.resetPassword(newValues)
            if (res) {
                toast.success('Password reset sucessfully. Please login to continue')
                navigate('/auth/login')
                localStorage.clear()
            }
        }
    }

    useEffect(() => {
        if (!email && !phone) {
            navigate('/auth/login')
        }
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
                    <img src={require('./img/yeboo.png')} alt="LOGO" />
                </Link>
                <h2 className="my-3 font-bold text-charleston text-xl">Verify Your Password Reset Request</h2>
                <p className="text-center my-3">Verify and reset your password reset request with the verification code sent.</p>

                {/* //FORMIK STARTS HERE */}
                <Formik
                    initialValues={{
                        password: "",
                        confirmPassword: ""
                    }}

                    validationSchema={Yup.object({
                        password: Yup.string()
                            .required("New password is required")
                            .test(
                                "password",
                                "New password must be at least 8 characters long and contain one uppercase, one lowercase, and one numeric character",
                                (value) => {
                                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
                                }
                            ),
                        confirmPassword: Yup.string().oneOf([Yup.ref("password"), ""], 'Passwords must match'),
                    })}

                    onSubmit={(values, { setSubmitting, setErrors }) => ResetPasswordFormHandler(values, setSubmitting)}
                >
                    {({
                        values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
                        <form onSubmit={handleSubmit} className="w-full">

                            <div className="my-5">
                                <label htmlFor='code' className="flex flex-start text-sm font-bold leading-6 text-charleston"> Enter otp Code</label>
                                <InputCodeField code={code} setCode={setCode} size={6} type='number' placeholder='000000' />
                            </div>

                            <div className='mb-5'>
                                <InputField
                                    label='New Password'
                                    id='password'
                                    name='password'
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="**********"
                                    error={errors.password}
                                />

                                <div className="text-wine pt-2 text-xs font-bold text-start text">
                                    <ErrorMessage name="password" />
                                </div>
                            </div>

                            <div className='mb-5'>
                                <InputField
                                    label='Confirm New Password'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type='password'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="**********"
                                    error={errors.confirmPassword}
                                />

                                <div className="text-wine pt-2 text-xs font-bold text-start text">
                                    <ErrorMessage name="confirmPassword" />
                                </div>
                            </div>


                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold">
                                {isSubmitting ? 'Please wait...' : 'Reset Password'}
                            </button>

                            <button
                                type='submit'
                                onClick={() => navigate(-1)}
                                className=" bg-white  text-wine w-full mb-3 rounded-md py-2.5 font-bold">
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

export default ResetPasswordForm;