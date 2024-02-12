import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import InputField from "../../components/block-components/input/inputField";
import { toast } from 'react-toastify'
import AuthLayout from "../../layout/auth/authLayout";
import { signupAction } from "../../services/reducers/authReducer.ts/signupReducer";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PhoneNumerInput from "../../components/block-components/input/PhoneNumberInput2";

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

interface IRegistrationForm {
  accountType: string
}

function RegistrationForm({ accountType }: IRegistrationForm) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const signUpHandler = async (values: any, setSubmitting: any) => {

    const newValues = {
      username: values.username,
      password: values.password,
      accountType: values.accountType,
      sex: values.sex,
      email: values.email,
      phone: `${'0' + values.phone.slice(3)}`,
      firstname: values.firstname,
      lastname: values.lastname,
    }


    await dispatch(signupAction(newValues)).then(({ payload }: any) => {
      if (payload.status === true) {
        localStorage.setItem('email', values.email)
        localStorage.setItem('username', values.username)
        localStorage.setItem('phone', newValues.phone)
        toast.success(payload.data)
        navigate(`/auth/verify-email`);
        setSubmitting(false)
      }

      setSubmitting(false)
    })

  }
  return (

    <section>

      <AuthLayout title='Create an Account' subTitle="Seamless Sign-Up: Your Gateway to Exclusive Benefits and Features!">
        {/* //FORMIK STARTS HERE */}
        <Formik
          initialValues={{
            username: "",
            password: "",
            accountType: accountType,
            sex: "",
            email: "",
            phone: "",
            firstname: "",
            lastname: "",
            confirmPassword:"",
            termsAndConditions: false
          }}

          validationSchema={Yup.object({
            email: Yup.string().email("Invalid Email Address").required("Email is required").min(5, "Too Short!"),
            password: Yup.string()
            .required("Password is required")
            .matches(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Invalid Password. must be at least 8 characters,  include at least one capital letter, one number, and one special character."
            ),
            confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
            firstname: Yup.string().required("First name is required"),
            lastname: Yup.string().required("Last name is required"),
            phone: Yup.string().required("Phone Number is required").min(13, "Invalid phone number. ensure the digits are 10 and doesn't start with the leading zero").max(13, "Invalid phone number. ensure the digits are 10 and doesn't start with the leading zero"),
            username: Yup.string().required("Username is required"),
            sex: Yup.string().required("Sex is required"),
            termsAndConditions: Yup.boolean().required("Please agree to our terms and conditions").isTrue("Please agree to our terms and conditions")
          })}

          onSubmit={(values, { setSubmitting }) => signUpHandler(values, setSubmitting)}
        >
          {({
            values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
            <form onSubmit={handleSubmit} className="w-full">
              <div>

                <InputField
                  label='Display Name'
                  id='username'
                  name='username'
                  type='text'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Add Display Name"
                  error={errors.username}
                />

                <div className="text-wine pt-2 text-xs font-bold text-start text">
                  <ErrorMessage name="username" />
                </div>
              </div>

              <div>
                <InputField
                  label='First Name'
                  id='firstname'
                  name='firstname'
                  type='text'
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstname}
                  placeholder="Enter First Name"
                />

                <div className="text-wine pt-2 text-xs font-bold text-start text">
                  <ErrorMessage name="firstname" />
                </div>

              </div>

              <div>
                <InputField
                  label='Last Name'
                  id='lastname'
                  name='lastname'
                  type='text'
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastname}
                  placeholder="Enter Last Name"
                />

                <div className="text-wine pt-2 text-xs font-bold text-start text">
                  <ErrorMessage name="lastname" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold leading-6 text-charleston">Gender</label>

                <div className="flex justify-evenly items-center text-sm">
                  <div className="flex items-center">
                    <input
                      name='sex'
                      id='sex'
                      onChange={() => setValues({ ...values, sex: 'M' })}
                      value='M'
                      checked={values.sex === 'M'}
                      type="radio" className='h-5 w-5' />

                      <p className="ml-3">Male</p>

                  </div>

                  <div className="ml-5 flex justify-evenly items-center text-sm">
                    <input
                      name='sex'
                      id='sex'
                      value='F'
                      onChange={() => setValues({ ...values, sex: 'F' })}
                      type="radio" className='h-5 w-5' />
                      <p className="ml-3">Female</p>

                  </div>
                </div>


                <div className="text-wine pt-2 text-xs font-bold text-start text">
                  <ErrorMessage name="sex" />
                </div>
              </div>


              <div>
                <InputField
                  label='Email'
                  id='email'
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  placeholder="example@yahoo.com"
                />

                <div className="text-wine pt-2 text-xs font-bold text-start text">
                  <ErrorMessage name="email" />
                </div>

              </div>


              <div>
                <label htmlFor="Phone Number" className="flex mb-2 flex-start text-sm font-bold leading-6 text-charleston">
                  Phone Number
                </label>
                <PhoneNumerInput
                  value={values.phone}
                  handleBlur={handleBlur}
                  name='phone'
                  onChange={(value) => {
                    setValues({ ...values, phone: value })
                  }}
                />
                {
                  errors.phone && (
                    <div className="text-wine pt-2 text-xs font-bold text-start text">
                    {errors?.phone}
                  </div>
                  )
                }

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
                    placeholder="Create A Strong Password"
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

              <div className="w-full relative flex items-center min-w-full max-w-full ">
                <div className="w-full min-w-full max-w-full">
                  <InputField
                    label='Confirm Password'
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirmPassword}
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="absolute right-5 bottom-3 cursor-pointer z-50">
                  {
                    showConfirmPassword ? (
                      <AiFillEyeInvisible
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        size={20}
                      />
                    ) : (
                      <AiFillEye
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        size={20}
                      />
                    )
                  }

                </div>
              </div>

              <div className="text-wine pt-2 text-xs font-bold text-start text">
                <ErrorMessage name="confirmPassword" />
              </div>

              <div>
                <div className="flex justify-start items-center my-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    name='termsAndConditions'
                    checked={values.termsAndConditions}
                    onChange={(e) => { setValues({ ...values, termsAndConditions: e.target.checked }) }}
                  />
                  <label className="font-bold text-charleston ml-3">
                    I have read and agree to all&nbsp;
                    <Link to='/terms' target="_blank" className="hover:text-wine">Terms & Conditions</Link>
                  </label>
                </div>

                <div className="text-wine pt-2 text-xs font-bold text-start text">
                  <ErrorMessage name="termsAndConditions" />
                </div>
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold my-2">
                {isSubmitting ? 'Please wait...' : 'Continue'}
              </button>

              <div className="my-3 text-center">
                <p>Already have an account? <span className="reset font-bold"><Link target= "_blank"  to='/auth/login'>Sign-in</Link></span></p>
              </div>

            </form>
          )
          }

        </Formik>
      </AuthLayout>

    </section>
  );
}

export default RegistrationForm;
