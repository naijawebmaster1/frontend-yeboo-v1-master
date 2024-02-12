import React from 'react';
import InputField from '../input/inputField';
import { Formik, ErrorMessage } from "formik";
import ErrorMsg from '../error/errorMessage';
import * as Yup from "yup";
import { useSelector } from 'react-redux'
import userService from '../../../services/actions/userActions';
import { toast } from 'react-toastify';

function ChangePassword({ setOpen, open }) {
  const { token } = useSelector((state) => state.login)

  const changePasswordHandler = async (values, setSubmitting) => {
    const newData = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
      token: token
    }

    const res = await userService.changePassword(newData)

    if (res) {
      toast.success("Password updated sucessfully")
      setOpen(!open)
    }


  }
  return (
    <section>
      <header>
        <h3 className='text-base font-medium text-[#292D32]'>Change Password</h3>
      </header>

      <Formik
        initialValues={{
          newPassword: "",
          oldPassword: "",
          confirmPassword: "",
        }}

        validationSchema={Yup.object({
          newPassword: Yup.string()
            .required("New password is required")
            .test(
              "password",
              "New password must be at least 8 characters long and contain one uppercase, one lowercase, and one numeric character",
              (value) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
              }
            ),
          oldPassword: Yup.string().required("Old password is required"),
          confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
        })}
        onSubmit={(values, { setSubmitting }) => changePasswordHandler(values, setSubmitting)}
      >
        {
          ({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-4 mt-4'>
              <InputField
                label='Old Password'
                type='password'
                value={values.oldPassword}
                name='oldPassword'
                id='oldPassword'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Old Password'
              />

              <ErrorMsg name='oldPassword' />


              <InputField
                label='New Password'
                type='password'
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name='newPassword'
                id='newPassword'
                placeholder='Create Strong Password'
              />

              <ErrorMsg name='newPassword' />


              <InputField
                label='Repeat New Password'
                name='confirmPassword'
                id='confirmPassword'
                type='password'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Repeat new Password'
              />

              <ErrorMsg name='confirmPassword' />

              <button
                type="submit"
                disabled={isSubmitting}
                className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
              >
                {isSubmitting ? "Processing..." : "Update Password"}
              </button>
            </form>
          )
        }
      </Formik>


    </section>
  );
}

export default ChangePassword;
