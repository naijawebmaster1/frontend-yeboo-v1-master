import AuthLayout from '../../layout/auth/authLayout';
import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from '../../components/block-components/input/inputField';
import authService from '../../services/actions/authActions';
import { toast } from 'react-toastify';


function EditPhoneNumberForm() {
  // const [isSubmitting, setIsSubmitting] = useState(false)
  const phone = localStorage.getItem('phone')
  const navigate = useNavigate()

  const changeEmailHandler = async (values: any, setSubmitting: any) => {

    const changeValues = {
      client: 'phone',
      contact: phone,
      newContact: values.phone,
    }
    const res = await authService.changeUserContact(changeValues)

    if (res){
      localStorage.setItem('phone', values.phone)
      toast.success('Email changed successfully. Please verify your new email.')
      navigate('/auth/verify-phone')
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
                phone: phone,
              }}

              validationSchema={Yup.object({
                phone: Yup.string().required("Phone is required")
                .min(11, "Invalid phone number")
                .matches(/^0\d{4,10}$/, "Invalid phone number, must start with 0 and be 11 digits")
                .max(11, "Invalid phone number"),
              })}

              onSubmit={(values, { setSubmitting }) => changeEmailHandler(values, setSubmitting)}
            >
              {({
                values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
                <form onSubmit={handleSubmit} className="w-full">
                  <div>

                    <InputField
                      label='Phone Number'
                      id='phone'
                      name='phone'
                      type='text'
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.phone}
                      placeholder=""
                      maxLength={11}
                    />

                    <div className="text-wine pt-2 text-xs font-bold text-start text">
                      <ErrorMessage name="phone" />
                    </div>
                  </div>


                  <div className=' cursor-pointer'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className=" bg-[#800208] text-white w-full mb-3 rounded-md py-2.5 font-bold my-2">
                      {isSubmitting ? 'Please wait...' : 'Update Phone'}
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

export default EditPhoneNumberForm