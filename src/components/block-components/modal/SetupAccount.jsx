import React, { useState, useEffect } from 'react';
import ModalLayout from '../../../layout/modal/modalLayout';
import ConfirmTransactionPin from './ConfirmTransactionPin';
import InputField from '../input/inputField';
import SelectInputField from '../input/selectInputField';
import { useSelector } from "react-redux";
import { bankCodes } from '../../../services/constants/dataConstants';
import userService from '../../../services/actions/userActions';
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import authService from '../../../services/actions/authActions';

const SetupAccount = ({ amount, setVerifyAuthAccess, bankDetails }) => {
    const { token, user } = useSelector((state) => state.login);
    const { info } = useSelector((state) => state.userInfo);
    const [disableAcc, setDisableAcc] = useState(false)
    const [allBankCodes, setAllBankCodes] = useState([])
    const [values, setValues] = useState({
        bankCode: '',
        accountNumber: "",
        bankName: "",
        accountName: ""
    })

    const getBanksCode = async () => {
        const res = await userService.getBankCodes(token);
        if (res && res.data) {
            const modified = res.data.map((item) => ({
                ...item,
                name: item.name,
                value: item.code
            }));
            setAllBankCodes(modified);
        }

    };


    useEffect(() => {
        getBanksCode()

        if (values.accountNumber.length === 10 && values.bankName) {
            handleVerification();
        }

    }, [values.accountNumber, values.bankCode, values.bankName])

    const nationality = info.nationality;
    const [confirmTransaction, setConfirmTransaction] = useState(false);

    const handleVerification = async () => {
        setValues({ ...values, accountName: '' });
        setDisableAcc(true);

        const res = await userService.verifyBank({
            token,
            bankName: values.bankName,
            accountNumber: values.accountNumber,
            bankCode: values.bankCode,
        });

        if (res) {
            setValues({
                ...values,
                accountName: res?.data?.account_name,
            });
            // setConfirmTransaction(true);
            // setBankDetails(values)
            setDisableAcc(false);
        } else {
            setDisableAcc(false);
        }
    };

    const inputChangeHandler = async (e, name) => {

        if (name === 'bankName') {
            setValues({
                ...values,
                bankCode: e.target.value,
                bankName: e.target.selectedOptions[0].innerText
            })
        } else {
            setValues({
                ...values, [name]: e.target.value
            })
        }

        // if (values.accountNumber.length === 10 && values.bankCode && values.bankName) {
        //     setValues({ ...values, accountName: "" })
        //     setDisableAcc(true)
        //     const res = await userService.verifyBank({ token, bankName: values.bankName, accountNumber: values.accountNumber, bankCode: values.bankCode })
        //     if (res) {
        //         console.log(res, "THE RES BACK OPPP")
        //         setValues({
        //             ...values,
        //             accountName: res?.data?.account_name
        //         })
        //         // setConfirmTransaction(true);
        //         setDisableAcc(false)
        //     } else {
        //         setDisableAcc(false)
        //     }
        // }
    }
    const nextHandler = (e) => {
        e.preventDefault()
        if (!values.accountName) {
            return toast.warning("Please enter your account details")
        }
        // if (bankDetails?.accountNumber) {
        //     setVerifyAuthAccess(true)
        //     authService.resendVerificationEmail({ email: user?.email })
        // }
        setConfirmTransaction(true)
    }

    return (
        <section>
            <ModalLayout open={confirmTransaction} setOpen={setConfirmTransaction} showClose={true}>
                <ConfirmTransactionPin values={values} amount={amount} />
            </ModalLayout>
            <header>
                <h3 className='text-base font-medium text-[#292D32]'>Setup Bank Account</h3>
            </header>
            <form className='w-full flex flex-col gap-y-4 mt-4'>

                {
                    nationality !== 'Nigean' ? (
                        <>

                            <SelectInputField
                                name="bankName"
                                placeholder='Select Bank'
                                onChange={(e) => inputChangeHandler(e, 'bankName')}
                                label='Bank Name'
                                data={allBankCodes}
                            />

                            <InputField
                                label='Bank Account Number'
                                type='text'
                                value={values.accountNumber}
                                onChange={(e) => inputChangeHandler(e, "accountNumber")}
                                name='accountNumber'
                                placeholder='Add Bank Account Number'
                                maxLength={10}
                                disabled={disableAcc}
                            />

                            <InputField
                                label='Account Name'
                                type='text'
                                value={values.accountName}
                                name='accountName'
                                placeholder='Account Name'
                                disabled={true}
                            />

                            {
                                disableAcc && (
                                    <div className="flex justify-center items-center">
                                        <ThreeDots
                                            height="80"
                                            width="80"
                                            radius="9"
                                            color="#B11226"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClassName=""
                                            visible={true}
                                        />
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <InputField
                                label='Bank Routing Number'
                                type='text'
                                value={undefined}
                                name='routingNumber'
                                placeholder='e.g. 1234567890'
                            />

                            <InputField
                                label='Bank IBAN'
                                type='text'
                                value={undefined}
                                name='bankIBAN'
                                placeholder='Add Bank IBAN'
                            />

                            <InputField
                                label='Bank BIC/SWIFT Code'
                                type='text'
                                value={undefined}
                                name='bankCode'
                                placeholder='Add Bank BIC/SWIFT Code'
                            />
                        </>
                    )
                }

                <button
                    type='button'
                    className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
                    onClick={(e) => nextHandler(e)}
                >
                    Submit
                </button>
            </form>

        </section>
    );
};

export default SetupAccount;
