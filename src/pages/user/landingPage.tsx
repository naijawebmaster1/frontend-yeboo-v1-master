import Discover from "../../components/base-components/discover/discover"
import Hero from "../../components/base-components/hero/hero"
import Nav from "../../components/base-components/nav/nav"
import Verified from "../../components/base-components/verified/verified"
import Offers from "../../components/base-components/offers/offers"
import Resources from "../../components/base-components/resources/resources"
import Experiences from "../../components/base-components/experiences/experiences"
import GetStarted from "../../components/base-components/getStarted/getStarted"
import Footer from "../../components/base-components/footer/footer"
import { Helmet } from 'react-helmet';
import { getGroovesAction } from "../../services/reducers/groovesReducer.ts/getGroovesReducer"
import { getAllUsersAction } from "../../services/reducers/userReducer.ts/getAllUsersReducer"
import { useDispatch} from "react-redux"
import { useEffect } from "react"


const LandingPage = () => {

    const dispatch = useDispatch<any>()
    
    useEffect(() => {
        dispatch(getGroovesAction({}))
        dispatch(getAllUsersAction({}))
    },[])

    return (
        <>
            <Helmet>
                <title>Yeboo - Africa’s Largest Adult Entertainment Platform </title>
                <meta name="description" content="Yeboo opens the door to a world of unparalleled enjoyment. Whether you're in search of a meaningful hookup, a delightful dinner date, an erotic massage, a holiday companion, or a travel partner, we've got you covered. Our platform is meticulously crafted to fulfill your desires, guaranteeing that every experience is unforgettable." />
                <meta property="og:image" content="../../assets/images/imgAuth/Slide-2.png" />
                <meta property="og:url" content="/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Yeboo - Africa’s Largest Adult Entertainment Platform " />
                <meta name="twitter:description" content="Yeboo opens the door to a world of unparalleled enjoyment. Whether you're in search of a meaningful hookup, a delightful dinner date, an erotic massage, a holiday companion, or a travel partner, we've got you covered. Our platform is meticulously crafted to fulfill your desires, guaranteeing that every experience is unforgettable." />
                <meta name="twitter:image"  content="../../assets/images/imgAuth/Slide-2.png"  />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <div className="w-screen bg-[#fff] overflow-x-hidden">
                <Nav />
                <Hero />
                <Discover />
                {/* <Verified /> */}
                <Offers />
                {/* <Resources /> */}
                <Experiences />
                <GetStarted />
                <Footer />
            </div>
        </>

    )
}
export default LandingPage