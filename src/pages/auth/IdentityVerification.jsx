import React, { useState } from 'react';
import myLogo from './img/yeboo.png';
import { Link } from 'react-router-dom';
import InputField from "../../components/block-components/input/inputField";
import verifyImg from './img/verify.png';
import { FileUploader } from "react-drag-drop-files";
import { Formik } from "formik";
import ErrorMsg from '../../components/block-components/error/errorMessage';
import * as Yup from "yup";
import { toast } from 'react-toastify'
import userService from '../../services/actions/userActions';
import { getFileBase64 } from '../../services/utils/helpersFunc';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUserDetailsAction } from './../../services/reducers/userReducer.ts/getUserDetailsReducer';


const fileTypes = ["JPEG", "PNG", "JPG", "PDF"];

function IdentityVerification() {
  const [search, setSearch] = useSearchParams();
  const redirectUrl = search.get('redirect')
  const { token, user } = useSelector((state) => state.login)
  const { info} = useSelector((state) => state.userInfo);
  
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

  const dispatch = useDispatch()


  const verifyHandler = async (values, setSubmitting) => {



    if (!values.nin) {
      toast.warning("Please enter your NIN No to verify your account")

      setSubmitting(false)
      return
    }


    const data = {
      ninNumber: values.nin,
      token: token
    }

    const res = await userService.verifyNIN(data)

    if (res) {
      setSubmitting(false)
      dispatch(getUserDetailsAction({token}))
      if(redirectUrl){
        return navigate(`/dashboard/${redirectUrl}`)
      }
      navigate(`/auth/verifying?status=success`)
    }

  }

  const skipNinHandler = () => {
    navigate(`/dashboard/home`)
  }

  return (
    <section className='flex justify-center items-center flex-1 flex-col'>
      <img
        className='flex text-center justify-center items-center'
        src={myLogo}
        alt="yeboo"
      />
      <div className='w-full md:w-[400px] p-5 md:p-0'>
        <div className=' text-charleston justify-center flex flex-col items-center'>
          <img src={verifyImg} alt="processing" className='mt-10 mb-3' />
          <p style={{ fontSize: '14px', fontWeight: 300 }}>Step 2/2</p>
          <h4 className='text-sm font-bold'>Verify Your Identity</h4>
          <hr
            style={{
              color: '#eaeaea',
              width: '100%',
              height: '0.5px',
              marginTop: '10px',
              opacity: 0.5,
            }}
          />
        </div>
        <div
          className=' text-center text-charleston mb-32 '
          style={{ marginTop: '10px', marginBottom: '30px' }}
        >
          <h2 className='text-2xl font-bold'>Verification</h2>
          <p className='text-sm my-5'>
            Kindly input your National Identification Number <br /> (NIN) to verify your account.
          </p>
        </div>
        <Formik
          initialValues={{
            nin: '',
          }}

          validationSchema={Yup.object({
            nin: Yup.string().min(11, "Invalid NIN No.").max(11, "Invalid NIN No."),
          })}
          onSubmit={(values, { setSubmitting }) => verifyHandler(values, setSubmitting)}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, setValues }) => (
            <form onSubmit={handleSubmit}>

              <div className='my-5'>
                <InputField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nin}
                  name='nin'
                  label={"NIN"}
                  placeholder="Input 11 Digits NIN Number" />
                <ErrorMsg name='nin' />
              </div>

              <div className='grid md:grid-cols-2 gap-3 mt-5 text-center w-full'>
                <div>
                  <button
                    onClick={() => skipNinHandler()}
                    type="button"
                    className='cursor-pointer rounded-xl py-3 text-center bg-white text-[#800020] font-bold w-full' >
                    Skip
                  </button>
                </div>

                <div className='w-full'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='cursor-pointer rounded-xl py-3 text-center min-w-full bg-[#800020] text-white font-bold w-full' >
                    {isSubmitting ? 'Please wait...' : 'Continue'}
                  </button>
                </div>

              </div>
              {/* </Link> */}
            </form>
          )}
        </Formik>

      </div>

    </section>
  );
}

export default IdentityVerification;
