import React, { useEffect } from 'react'
import Header from '../../components/block-components/header/header'
import PageTitle from '../../layout/pageTitle/pageTitle'
import InvoiceTable from '../../components/block-components/table/invoiceTable'
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/block-components/loader/loader';
import EmptyStateComponent from '../../components/base-components/emptyState/emptyState';
import { useNavigate } from 'react-router-dom';
import { getWalletTransactionsAction } from '../../services/reducers/walletReducer/getwalletTransactions'
import EmptySearchState from '../../components/base-components/emptyState/emptySearchState';

function Invoices() {
    const { transactions } = useSelector((state: any) => state.transactions)
    const { info } = useSelector((state: any) => state.userInfo)
    const { token } = useSelector((state: any) => state.login)

    const dispatch = useDispatch<any>()

    const navigate = useNavigate()

    useEffect(() => {
        if(info?.isAuthenticate?.bvn){
            dispatch(getWalletTransactionsAction({ token }))
        }
    }, [dispatch, token])

    return (
        <div>
            <Header pageTitle='Invoices' />
            <section className='mx-auto max-w-7xl items-center p-6'>

                <PageTitle title='Invoices' />

                {/* SECTION STARTS HERE */}
                <div className='w-full bg-white md:mt-5 md:ml-5 md:px-10 p-2'>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <p className='font-bold text-gray-700 md:mb-0 mb-4'>All Invoices</p>
                    </div>
                </div>

                <div className='w-full bg-white md:mt-5 md:ml-5 md:p-10 p-2'>
                    {/* <p className='text-sm text-charleston font-bold'>Today</p> */}

                    {/* { !transactions && (<Loader/>)} */}
                    {
                        transactions && (
                            <InvoiceTable invoices={transactions} />
                        )
                    }

                    {
                        !transactions && (
                            <EmptySearchState imageSrc={''} message={'No invoice currently Available'}/>
                            // <EmptyStateComponent btnText="Search Grooves Available" onClick={() => navigate(`/dashboard/grooves`)} imageSrc={''} message={'No invoice currently Available'}/>
                        )
                    }
                </div>

            </section>


        </div>
    )
}

export default Invoices
