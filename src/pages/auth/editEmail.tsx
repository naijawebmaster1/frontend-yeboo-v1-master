import AuthLayout from '../../layout/auth/authLayout';
import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from '../../components/block-components/input/inputField';
import authService from '../../services/actions/authActions';
import { toast } from 'react-toastify';
import { useState } from 'react';


function EditEmailForm() {
  const email = localStorage.getItem('email')
  const navigate = useNavigate()

  const changeEmailHandler = async (values: any, setSubmitting: any) => {
    const changeValues = {
      client: 'email',
      contact: email,
      newContact: values.email,
    }
    const res = await authService.changeUserContact(changeValues)
    if (res){
      localStorage.setItem('email', values.email)
      toast.success('Email changed successfully. Please verify your new email.')
      navigate('/auth/verify-email')
      setSubmitting(false)
    }

    setSubmitting(false)

    return
  }

  return (
    <section>
      <AuthLayout title='Update Your Email' subTitle='Secure Access: A Verification OTP code will be sent to your email.'>
        <section className='text-charleston w-full !important'>
          <div className='w-full my-5 text-center flex justify-center items-center '>
            <Formik
              initialValues={{
                email: email,
              }}

              validationSchema={Yup.object({
                email: Yup.string().required("Email is required").min(5, "Too Short!").email("Invalid email"),
              })}

              onSubmit={(values, { setSubmitting }) => changeEmailHandler(values, setSubmitting)}
            >
              {({
                values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
                <form onSubmit={handleSubmit} className="w-full">
                  <div>

                    <InputField
                      label='Email Address'
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


                  <div className=' cursor-pointer'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold my-2">
                      {isSubmitting ? 'Please wait...' : 'Update Email'}
                    </button>
                  </div>

                </form>
              )
              }

            </Formik>
          </div>

        </section>

      </AuthLayout>
    </section>
  );
}

export default EditEmailForm
