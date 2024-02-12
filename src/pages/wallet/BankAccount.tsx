import { useEffect, useState } from 'react'
import Header from "../../components/block-components/header/header"
import { RiDeleteBin5Line } from 'react-icons/ri'
import { CiSquarePlus } from 'react-icons/ci'
import ModalLayout from '../../layout/modal/modalLayout'
import SetupAccount from '../../components/block-components/modal/SetupAccount'
import { useSelector, useDispatch } from 'react-redux';
import { getWalletAction } from '../../services/reducers/walletReducer/getWalletReducer'
import BVNVerification from '../../components/block-components/modal/BVNVerification'

const BankAccount = () => {
    const [hasSavedAccounts, setHasSavedAccounts] = useState(true)
    const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
    const { info } = useSelector((state: any) => state.userInfo)
    const { token } = useSelector((state: any) => state.login);
    const { walletInfo } = useSelector((state: any) => state.wallet);
    const [verifyBVN, setVerifyBVN] = useState(false)


    const dispatch = useDispatch<any>()
    const handleDelete = () => {
        const shouldDelete = window.confirm("Are you sure you want to delete this item?")
        if (shouldDelete) {
            //   deleteItem(itemId)
        }
    }

    useEffect(() => {
        if (info?.bvn) {
            dispatch(getWalletAction({ token }))
        } else {
            setVerifyBVN(true)
        }
    }, [])

    return (
        <main className='w-full'>
            <ModalLayout open={isAddAccountOpen} setOpen={setIsAddAccountOpen} showClose={true} title='Setup Bank Account'>
                <SetupAccount amount={''} setVerifyAuthAccess={''} bankDetails={''} />
            </ModalLayout>
            {
                verifyBVN &&
                <ModalLayout open={verifyBVN} setOpen={() => setVerifyBVN(!verifyBVN)} title="" showClose={true}>
                    <>
                        <BVNVerification setBVNVerificationModalOpen={true} />
                    </>
                </ModalLayout>
            }
            <header>
                <Header />
            </header>

            <section className="mx-auto max-w-7xl flex flex-col gap-y-10 p-6">
                <span className="">
                    <h2 className="text-2xl font-bold text-[#292D32]">Bank Accounts</h2>
                </span>

                {
                    info?.accountType === 'Groovie' && (
                        <div className="bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex justify-between items-center p-4">
                            <span>Saved Bank Account</span>
                            <button
                                className='bg-wine text-white px-5 py-2 font-bold text-sm rounded-lg'
                                onClick={() => {
                                    setIsAddAccountOpen(!isAddAccountOpen)
                                }}
                            >
                                Add New Bank Account
                            </button>
                        </div>
                    )
                }


                {
                    info.accountType === 'Groover' && (

                        <table className="bg-white w-full border-collapse shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg">
                            <p className='text-charleston italic my-4 text-sm ml-3'>All transfers to the account below will be deposited automatically on your wallet account.</p>
                            <thead>
                                <tr className="flex justify-between items-center">
                                    <th className="w-[25%] p-4 text-[#292D32] text-left text-sm font-bold">Bank Name</th>
                                    <th className="w-[25%] p-4 text-[#292D32] text-left text-sm font-bold">Account Name</th>
                                    <th className="w-[25%] p-4 text-[#292D32] text-left text-sm font-bold">Account Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    <tr className='flex justify-between items-center mt-2'>
                                        <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal">{walletInfo?.bankName}</td>
                                        <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal uppercase">{walletInfo?.accountName}</td>
                                        <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal">{walletInfo?.accountNumber}</td>
                                    </tr>
                                </>
                            </tbody>
                        </table>
                    )
                }


                {
                    info.accountType === 'Groovie' && (
                        <table className="bg-white w-full border-collapse shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg">
                            <thead>
                                <tr className="flex justify-between items-center">
                                    <th className="w-[25%] p-4 text-[#292D32] text-left text-sm font-normal">Bank Name</th>
                                    <th className="w-[25%] p-4 text-[#292D32] text-left text-sm font-normal">Account Name</th>
                                    <th className="w-[25%] p-4 text-[#292D32] text-left text-sm font-normal">Account Number</th>
                                    <th className="w-[25%] p-4 text-[#292D32] text-left text-sm font-normal">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hasSavedAccounts ? (
                                    <>
                                        <tr className='flex justify-between items-center mt-2'>
                                            <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal">GT Bank</td>
                                            <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal">Zainab Ore</td>
                                            <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal">1234567890</td>
                                            <td
                                                className="w-[25%] p-4 text-[#EE4139] text-left text-sm font-normal cursor-pointer"
                                                onClick={handleDelete}
                                            >
                                                <RiDeleteBin5Line className='w-6 h-6' />
                                            </td>
                                        </tr>

                                        <tr className='flex justify-between items-center mt-2'>
                                            <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal">GT Bank</td>
                                            <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal">Zainab Ore</td>
                                            <td className="w-[25%] p-4 text-[#696C70] text-left text-sm font-normal">1234567890</td>
                                            <td
                                                className="w-[25%] p-4 text-[#EE4139] text-left text-sm font-normal cursor-pointer"
                                                onClick={handleDelete}
                                            >
                                                <RiDeleteBin5Line className='w-6 h-6' />
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <div className='h-[428px] flex flex-col justify-center items-center gap-y-4'>
                                        <span>
                                            <p className='max-w-[203px] text-center text-[#54575B] text-[10px] font-normal'>
                                                You don’t have any account yet, Please add one to withdraw funds directly
                                            </p>
                                        </span>
                                        <button
                                            className='flex justify-center items-center gap-x-2'
                                            onClick={() => {
                                                setIsAddAccountOpen(!isAddAccountOpen)
                                            }}
                                        >
                                            <CiSquarePlus /> Add New Bank Account
                                        </button>
                                    </div>
                                )}
                            </tbody>
                        </table>
                    )
                }


            </section>





        </main>
    )
}
export default BankAccount
