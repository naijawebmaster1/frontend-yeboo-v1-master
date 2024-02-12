import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../../components/block-components/loader/loader';
import PrivacyPolicy from '../../pages/home/privacyPolicy';
import TermsAndCondition from '../../pages/home/terms';
import ParentalControl from '../../pages/home/parentalControl';
import Investors from '../../pages/home/investors';
import AboutUs from '../../pages/home/aboutUs';
import ContactUs from '../../pages/home/contactUs';



const LandingPage = lazy(() => import('../../pages/user/landingPage'))

function HomeRoute() {

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms' element={<TermsAndCondition />} />
                <Route path='/parental-control' element={<ParentalControl />} />
                <Route path='/investors' element={<Investors />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/contact-us' element={<ContactUs />} />
            </Routes>
        </Suspense>
    );
}

export default HomeRoute