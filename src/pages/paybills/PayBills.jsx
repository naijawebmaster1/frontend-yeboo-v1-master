import React, { useState } from 'react';
import Header from '../../components/block-components/header/header';
import ModalLayout from '../../layout/modal/modalLayout';
import PayBillsTable from '../../components/block-components/table/PaybillsTable';
import BuyAirtime from '../../components/block-components/modal/BuyAirtime';
import BuyData from '../../components/block-components/modal/BuyData';
import BuyCableTV from '../../components/block-components/modal/BuyCableTv';
import BuyElectricity from '../../components/block-components/modal/BuyElectricity';
import airtime from './img/airtime.png';
import cable from './img/cable.png';
import electricity from './img/electricity.png';
import PageTitle from '../../layout/pageTitle/pageTitle';
import EmptyOrderState from './../../components/base-components/emptyState/emptyOrderState';


function PayBills() {
    const [buyAirtimeOpen, setBuyAirtimeOpen] = useState(false)
    const [buyDataOpen, setBuyDataOpen] = useState(false)
    const [buyCableTvOpen, setBuyCableTvOpen] = useState(false)
    const [buyElectricityOpen, setBuyElectricityOpen] = useState(false)
    return (
        <>
            <ModalLayout open={buyAirtimeOpen} setOpen={setBuyAirtimeOpen} title="Buy Airtime" showClose={true}>
                <BuyAirtime />
            </ModalLayout>

            <ModalLayout open={buyDataOpen} setOpen={setBuyDataOpen} title="Buy Data" showClose={true}>
                <BuyData />
            </ModalLayout>

            <ModalLayout open={buyCableTvOpen} setOpen={setBuyCableTvOpen} title="Cable & TV" showClose={true}>
                <BuyCableTV />
            </ModalLayout>

            <ModalLayout open={buyElectricityOpen} setOpen={setBuyElectricityOpen} title="Electricity Bills" showClose={true}>
                <BuyElectricity />
            </ModalLayout>
            <Header />


            <section className='mx-auto max-w-7xl items-center p-6'>
                <PageTitle title='Pay Bills' />

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4' >
                    <div onClick={() => setBuyAirtimeOpen(!buyAirtimeOpen)}
                        className=' bg-white  h-40 flex justify-start items-center flex-col cursor-pointer p-5 rounded-md'>
                        <p className='text-charleston font-bold mb-3'>Airtime</p>
                        <img alt='' src={airtime} />
                        <p className='text-xs text-charleston mt-3'>Buy airtime for your <br /> mobile number</p>
                    </div>

                    <div onClick={() => setBuyDataOpen(!buyDataOpen)}
                        className=' bg-white  h-40 flex justify-start items-center flex-col cursor-pointer p-5 rounded-md'>
                        <p className='text-charleston font-bold mb-3'>Mobile Data</p>
                        <img alt='' src={airtime} />
                        <p className='text-xs text-charleston mt-3'>Buy mobile data for <br /> your mobile number</p>
                    </div>


                    <div onClick={() => setBuyCableTvOpen(!buyCableTvOpen)}
                        className=' bg-white  h-40 flex justify-start items-center flex-col cursor-pointer p-5 rounded-md'>
                        <p className='text-charleston font-bold mb-3'>Cable Tv</p>
                        <img alt='' src={cable} className='object-cover' />
                        <p className='text-xs text-charleston mt-3'>Get TV subscriptions <br /> for your decoder</p>
                    </div>

                    <div onClick={() => setBuyElectricityOpen(!buyElectricityOpen)}
                        className=' bg-white  h-40 flex justify-start items-center flex-col cursor-pointer p-5 rounded-md'>
                        <p className='text-charleston font-bold mb-3'>Electricity</p>
                        <img alt='' src={electricity} />
                        <p className='text-xs text-charleston mt-3'>Buy electricity units for <br /> your meter at home</p>
                    </div>

                </div>

                <div className='w-full bg-white md:mt-5  md:p-10 p-2'>
                    {/* <p className='text-sm text-charleston font-bold'>Today</p> */}
                    <EmptyOrderState message="You currently have bills payment completed" />
                    {/* <PayBillsTable /> */}
                </div>

            </section>
        </>

    );
}

export default PayBills;
