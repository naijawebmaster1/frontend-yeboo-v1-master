import React, { Suspense, lazy } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/block-components/loader/loader';
import PrivateRoute from '../src/routes//user/protected';
import { useSelector } from 'react-redux';


const NotFound = lazy(() => import('../src/pages/user/404'))


// AUTHENTICATION ROUTES STARTS HERE
const Login = lazy(() => import('../src/pages/auth/LoginForm'))
const SignUp = lazy(() => import('../src/pages/auth/signUp/signup'))
const Reset = lazy(() => import('../src/pages/auth/ResetPassword'))
const EmailConfirmation = lazy(() => import('../src/pages/auth/EmailConfirmationForm'))
const PhoneConfirmation = lazy(() => import('../src/pages/auth/PhoneConfirmationForm'))
const CreateTransactionPin = lazy(() => import('../src/pages/auth/CreateTransactionPin'))
const AboutYourself = lazy(() => import('../src/pages/auth/AboutYourself'))
const IdentityVerification = lazy(() => import('../src/pages/auth/IdentityVerification'))
const AccountVerification = lazy(() => import('../src/pages/auth/AccountVerification'))
const Congratulations = lazy(() => import('../src/pages/auth/Congratulations'))
const EditEmail = lazy(() => import('../src/pages/auth/editEmail'))
const EditPhoneNumber = lazy(() => import('../src/pages/auth/EditPhone'))
const ResetPasswordForm = lazy(() => import('../src/pages/auth/../../pages/auth/ResetPasswordForm'))

// AUTHENTICATION ROUTES ENDS HERE

// HOME ROUTES STARTS HERE
const LandingPage = lazy(() => import('../src/pages/user/landingPage'))
const PrivacyPolicy = lazy(() => import('../src/pages/home/privacyPolicy'));
const TermsAndCondition = lazy(() => import('../src/pages/home/terms'));
const ParentalControl = lazy(() => import('../src/pages/home/parentalControl'));
const Investors = lazy(() => import('../src/pages/home/investors'));
const AboutUs = lazy(() => import('../src/pages/home/aboutUs'));
const ContactUs = lazy(() => import('../src/pages/home/contactUs'));
const FAQ = lazy(() => import('../src/pages/home/faq'))
const AntiSlavery = lazy(() => import('../src/pages/home/antiSlavery'))
const NotFoundPage = lazy(() => import('../src/pages/home/notFound'))

// HOME ROUTES ENDS HERE


// USERS ROUTES STARTS HERE
const Dashboard = lazy(() => import('../src/pages/user/dashboard'));
const Wallet = lazy(() => import('../src/pages/wallet/wallet'));
const Home = lazy(() => import('../src/pages/user/home'))
const Groovies = lazy(() => import('../src/pages/user/groovies'))
const Grooves = lazy(() => import('../src/pages/user/grooves'))
const GrooveDetails = lazy(() => import('../src/pages/user/grooveDetails/grooveDetails'))
const ProfileDetails = lazy(() => import('../src/pages/user/profileDetails'))
const CreateANewGroove = lazy(() => import('../src/pages/user/createGroove/createGrooveFlow'))
const MyGrooves = lazy(() => import('../src/pages/user/mygrooves'))
const Orders = lazy(() => import('../src/pages/user/orders'))
const Profile = lazy(() => import('../src/pages/profile/UserProfile'))
const Vip = lazy(() => import('../src/pages/profile/VipProfile'))
const OrderDetails = lazy(() => import('../src/pages/user/orderDetails/orderDetails'))
const GrooveListing = lazy(() => import('../src/pages/user/grooveListing'))
const Reviews = lazy(() => import('../src/pages/user/review/reviews'))
const Settings = lazy(() => import('../src/pages/settings/Settings'))
const Paybills = lazy(() => import('../src/pages/paybills/PayBills'))
const Chat = lazy(() => import('../src/pages/messages/Chat'))
const MyFavourites = lazy(() => import('../src/pages/user/favourites'))
const Invoices = lazy(() => import('../src/pages//user/invoices'))
const RequestGrooveFlow = lazy(() => import('../src/pages/user/requestGroove/requestGrooveFlow'))
const Requests = lazy(() => import('../src/pages/user/requests'))
const Proposals = lazy(() => import('../src/pages/user/proposal'))
const Disputes = lazy(() => import('../src/pages/user/disputes'))
const SendOffer = lazy(() => import('../src/pages/user/sendOfferGroover/SendOfferGroover'))
const SendProposal = lazy(() => import('../src/pages/user/sendProposalGroovie/SendProposal'))
const BankAccount = lazy(() => import('../src/pages/wallet/BankAccount'))
// USERS ROUTES ENDS HERE

function App() {
  const { info } = useSelector((state: any) => state.userInfo);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* HOME ROUTES STARTS HERE */}
        <Route path="/" element={<LandingPage />} />
        <Route path="home2" element={<LandingPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsAndCondition />} />
        <Route path="parental-control" element={<ParentalControl />} />
        <Route path="investors" element={<Investors />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="anti-slavery" element={<AntiSlavery />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* HOME ROUTES ENDS HERE */}




        {/* AUTH ROUTES STARTES HERE */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path={'sign-up'} element={<SignUp />} />
          <Route path={'reset'} element={<Reset />} />
          <Route path={'verify-email'} element={<EmailConfirmation />} />
          <Route path={'verify-phone'} element={<PhoneConfirmation />} />
          <Route path={'create-pin'} element={<CreateTransactionPin />} />
          <Route path={'about-yourself'} element={<AboutYourself />} />
          <Route path={'verify-nin'} element={<IdentityVerification />} />
          <Route path={'verifying'} element={<AccountVerification />} />
          <Route path={'congratulations'} element={<Congratulations />} />
          <Route path={'edit-email'} element={<EditEmail />} />
          <Route path={'edit-phone'} element={<EditPhoneNumber />} />
          <Route path={'reset-password'} element={<ResetPasswordForm />} />
        </Route>

        {/* AUTH ROUTES END HEREEE */}


        {/* USER LOGGED IN ACCESS ROUTES STARTS HERE */}
        <Route path={`/dashboard`}>

          <Route path='' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

          <Route path='home' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

          <Route path='disputes' element={
            <PrivateRoute>
              <Disputes />
            </PrivateRoute>
          } />

          <Route path='requests' element={
            <PrivateRoute>
              <Requests />
            </PrivateRoute>
          } />

          <Route path='proposals' element={
            <PrivateRoute>
              <Proposals />
            </PrivateRoute>
          } />

          <Route path='overview' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path='groovies' element={
            <PrivateRoute>
              <Groovies />
            </PrivateRoute>
          } />

          <Route path='grooves' element={
            <PrivateRoute>
              <Grooves />
            </PrivateRoute>
          } />

          <Route path='groove/:id' element={
            <PrivateRoute>
              <GrooveDetails />
            </PrivateRoute>
          } />

          <Route path='groove/listing' element={
            <PrivateRoute>
              <GrooveListing />
            </PrivateRoute>
          } />

          <Route path='reviews' element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          } />

          <Route path='settings' element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />

          <Route path='paybills' element={
            <PrivateRoute>
              <Paybills />
            </PrivateRoute>
          } />

          <Route path='chat' element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />

          <Route path='favorites' element={
            <PrivateRoute>
              <MyFavourites />
            </PrivateRoute>
          } />

          <Route path='request-groove' element={
            <PrivateRoute>
              <RequestGrooveFlow />
            </PrivateRoute>
          } />

          <Route path='wallet' element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          } />

          <Route path='bank-accounts' element={
            <PrivateRoute>
              <BankAccount />
            </PrivateRoute>
          } />

          <Route path='invoices' element={
            <PrivateRoute>
              <Invoices />
            </PrivateRoute>
          } />

          <Route path='orders' element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          } />

          <Route path='order/:id' element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          } />

          <Route path='profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          <Route path='vip' element={
            <PrivateRoute>
              <Vip />
            </PrivateRoute>
          } />

          <Route path='create-groove' element={
            <PrivateRoute>
              <CreateANewGroove />
            </PrivateRoute>
          } />

          <Route path='edit-groove/:id' element={
            <PrivateRoute>
              <CreateANewGroove />
            </PrivateRoute>
          } />

          <Route path='my-grooves' element={
            <PrivateRoute>
              <MyGrooves />
            </PrivateRoute>
          } />

          <Route path=':userType/:id' element={
            <PrivateRoute>
              <ProfileDetails />
            </PrivateRoute>
          } />

          <Route path='grooves/send-offer' element={
            <PrivateRoute>
              <SendOffer />
            </PrivateRoute>
          } />

          <Route path='grooves/send-proposal' element={
            <PrivateRoute>
              <SendProposal />
            </PrivateRoute>
          } />



          <Route path="*" element={
            <PrivateRoute>
              <NotFound />
            </PrivateRoute>
          } />

        </Route>




        {/* USER LOGGED IN ACCESS ENDS HERE  */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  );
}


export default App;