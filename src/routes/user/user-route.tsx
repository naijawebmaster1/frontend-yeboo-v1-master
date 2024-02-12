import React, { Suspense, lazy } from 'react';
import { Routes, Route, } from 'react-router-dom';
import Loader from '../../components/block-components/loader/loader';
import Wallet from '../../pages/wallet/wallet';
import BankAccount from '../../pages/wallet/BankAccount';
import PrivateRoute from './protected';
import { useSelector } from "react-redux";
import SendOffer from '../../pages/user/sendOfferGroover/SendOfferGroover';
import SendProposal from '../../pages/user/sendProposalGroovie/SendProposal';


const Home = lazy(() => import('../../pages/user/home'))
const Groovies = lazy(() => import('../../pages/user/groovies'))
const Grooves = lazy(() => import('../../pages/user/grooves'))
const GrooveDetails = lazy(() => import('../../pages/user/grooveDetails/grooveDetails'))
const ProfileDetails = lazy(() => import('../../pages/user/profileDetails'))
const Dashboard = lazy(() => import('../../pages/user/dashboard'))
const CreateANewGroove = lazy(() => import('../../pages/user/createGroove/createGrooveFlow'))
const MyGrooves = lazy(() => import('../../pages/user/mygrooves'))
const Orders = lazy(() => import('../../pages/user/orders'))
const Profile = lazy(() => import('../../pages/profile/UserProfile'))
const Vip = lazy(() => import('../../pages/profile/VipProfile'))
const OrderDetails = lazy(() => import('../../pages/user/orderDetails/orderDetails'))
const GrooveListing = lazy(() => import('../../pages/user/grooveListing'))
const Reviews = lazy(() => import('../../pages/user/review/reviews'))
const Settings = lazy(() => import('../../pages/settings/Settings'))
const Paybills = lazy(() => import('../../pages/paybills/PayBills'))
const Chat = lazy(() => import('../../pages/messages/Chat'))
const MyFavourites = lazy(() => import('../../pages/user/favourites'))
const Invoices = lazy(() => import('../../pages//user/invoices'))
const RequestGrooveFlow = lazy(() => import('../../pages/user/requestGroove/requestGrooveFlow'))
const Requests = lazy(() => import('../../pages/user/requests'))
const Proposals = lazy(() => import('../../pages/user/proposal'))
const Disputes = lazy(() => import('../../pages/user/disputes'))



function UserRoute() {
    const { info } = useSelector((state: any) => state.userInfo);


    // const defaultPath = '/:username/'
    const defaultPath = `/dashboard`


    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={defaultPath}>
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

                    <Route path='dashboard' element={
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

                    <Route path='*' element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } />


                </Route>
                {/* <Route path={defaultPath + '*'} element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } /> */}

{/* 
                <Route path={defaultPath + 'home'} element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />

                <Route path={defaultPath + 'disputes'} element={
                    <PrivateRoute>
                        <Disputes />
                    </PrivateRoute>
                } />

                <Route path={defaultPath + 'requests'} element={
                    <PrivateRoute>
                        <Requests />
                    </PrivateRoute>
                } />

                <Route path={defaultPath + 'proposals'} element={
                    <PrivateRoute>
                        <Proposals />
                    </PrivateRoute>
                } />

                <Route path={defaultPath + 'dashboard'} element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + ':userType'} element={
                    <PrivateRoute>
                        <Groovies />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + 'grooves'} element={
                    <PrivateRoute>
                        <Grooves />

                    </PrivateRoute>
                } />
                <Route path={defaultPath + `groove/:id`} element={
                    <PrivateRoute>
                        <GrooveDetails />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `:userType/:id`} element={
                    <PrivateRoute>
                        <ProfileDetails />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `create-groove`} element={
                    <PrivateRoute>
                        <CreateANewGroove />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `edit-groove/:id`} element={
                    <PrivateRoute>
                        <CreateANewGroove />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `my-grooves`} element={
                    <PrivateRoute>
                        <MyGrooves />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `orders`} element={
                    <PrivateRoute>
                        <Orders />
                    </PrivateRoute>
                }
                />
                <Route path={defaultPath + `profile`} element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `vip`} element={
                    <PrivateRoute>
                        <Vip />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `order/:id`} element={
                    <PrivateRoute>
                        <OrderDetails />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `groove/listing`} element={
                    <PrivateRoute>
                        <GrooveListing />

                    </PrivateRoute>
                } />
                <Route path={defaultPath + `reviews`} element={
                    <PrivateRoute>
                        <Reviews />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `settings`} element={
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>

                } />
                <Route path={defaultPath + `paybills`} element={
                    <PrivateRoute>
                        <Paybills />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `chat`} element={
                    <PrivateRoute>
                        <Chat />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `favorites`} element={
                    <PrivateRoute>
                        <MyFavourites />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `request-groove`} element={
                    <PrivateRoute>
                        <RequestGrooveFlow />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `wallet`} element={
                    <PrivateRoute>
                        <Wallet />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `bank-accounts`} element={
                    <PrivateRoute>
                        <BankAccount />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `invoices`} element={
                    <PrivateRoute>
                        <Invoices />
                    </PrivateRoute>
                } />
                <Route path={defaultPath + `grooves/send-offer`} element={
                    <PrivateRoute>
                        <SendOffer />
                    </PrivateRoute>
                } />

                <Route path={defaultPath + `grooves/send-proposal`} element={
                    <PrivateRoute>
                        <SendProposal />
                    </PrivateRoute>
                } /> */}

            </Routes>
        </Suspense>
    );
}

export default UserRoute