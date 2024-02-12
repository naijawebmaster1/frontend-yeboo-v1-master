import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../../components/block-components/loader/loader';



const Login = lazy(() => import('../../pages/auth/LoginForm'))
const SignUp = lazy(() => import('../../pages/auth/signUp/signup'))
const Reset = lazy(() => import('../../pages/auth/ResetPassword'))
const EmailConfirmation = lazy(() => import('../../pages/auth/EmailConfirmationForm'))
const PhoneConfirmation = lazy(() => import('../../pages/auth/PhoneConfirmationForm'))
const CreateTransactionPin = lazy(() => import('../../pages/auth/CreateTransactionPin'))
const AboutYourself = lazy(() => import('../../pages/auth/AboutYourself'))
// const IdentityVerificationID = lazy(() => import('../../pages/auth/IdentityVerificationID'))
const IdentityVerification = lazy(() => import('../../pages/auth/IdentityVerification'))
const AccountVerification = lazy(() => import('../../pages/auth/AccountVerification'))
const Congratulations = lazy(() => import('../../pages/auth/Congratulations'))
const EditEmail = lazy(() => import('../../pages/auth/editEmail'))
const EditPhoneNumber = lazy(() => import('../../pages/auth/EditPhone'))
const ResetPasswordForm = lazy(() => import('../../pages/auth/../../pages/auth/ResetPasswordForm'))

const defaultPath = 'auth/'

function AuthRoute() {
    return (
        <>
            <Route path={'login'} element={<Login />} />
            <Route path={'sign-up'} element={<SignUp />} />
            <Route path={'reset'} element={<Reset />} />
            <Route path={'verify-email'} element={<EmailConfirmation />} />
            <Route path={'verify-phone'} element={<PhoneConfirmation />} />
            <Route path={'create-pin'} element={<CreateTransactionPin />} />
            <Route path={'about-yourself'} element={<AboutYourself />} />
            <Route path={'verify-nin'} element={<IdentityVerification />} />
            {/* <Route path={defaultPath +'verify-id'} element ={<IdentityVerificationID/>} /> */}
            <Route path={'verifying'} element={<AccountVerification />} />
            <Route path={'congratulations'} element={<Congratulations />} />
            <Route path={'edit-email'} element={<EditEmail />} />
            <Route path={'edit-phone'} element={<EditPhoneNumber />} />
            <Route path={'reset-password'} element={<ResetPasswordForm />} />
        </>
        // <Suspense fallback={<Loader/>}>
        //     <Routes>
        //         <Route path={defaultPath +'login'} element={<Login />} />
        //         <Route path={defaultPath +'sign-up'} element ={<SignUp/>} />
        //         <Route path={defaultPath +'reset'} element ={<Reset/>} />
        //         <Route path={defaultPath +'verify-email'} element ={<EmailConfirmation/>} />
        //         <Route path={defaultPath +'verify-phone'} element ={<PhoneConfirmation/>} />
        //         <Route path={defaultPath +'create-pin'} element ={<CreateTransactionPin/>} />
        //         <Route path={defaultPath +'about-yourself'} element ={<AboutYourself/>} />
        //         <Route path={defaultPath +'verify-nin'} element ={<IdentityVerification/>} />
        //         {/* <Route path={defaultPath +'verify-id'} element ={<IdentityVerificationID/>} /> */}
        //         <Route path={defaultPath +'verifying'} element ={<AccountVerification/>} />
        //         <Route path={defaultPath +'congratulations'} element ={<Congratulations/>} />
        //         <Route path={defaultPath +'edit-email'} element ={<EditEmail/>} />
        //         <Route path={defaultPath +'edit-phone'} element ={<EditPhoneNumber/>} />
        //         <Route path={defaultPath +'reset-password'} element ={<ResetPasswordForm/>} />
        //     </Routes>
        // </Suspense>
    );
}

export default AuthRoute