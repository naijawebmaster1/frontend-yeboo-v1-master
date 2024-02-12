import { useState } from "react"
import InputCodeField from "../input/inputCodeField"
interface IPayment {
    price: any
    code: string,
    setCode: any,
    processing: boolean
    submitHandler: any
}
const MakePayment = ({ price, code, setCode, processing, submitHandler }: IPayment) => {
    const [isConfirmTransaction, setIsConfirmTransaction] = useState(false)
    return (
        <section className="flex flex-col justify-center items-center gap-4">
            {
                isConfirmTransaction ? (
                    <>
                        <div>
                            <div>
                                <p style={{ fontWeight: 600 }}>Confirm Transaction</p>

                                <div className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center gap-x-4 p-4 mt-4'>
                                    <aside>
                                        <img alt='' src={require('../../../assets/images/Processing.png')} className="w-[62.052px] h-[40px]" />
                                    </aside>
                                    <aside className="flex flex-col items-start justify-start">
                                        <span>
                                            <b className="text-[#292D32] text-sm text-left font-bold">Transaction Pin</b>
                                        </span>
                                        <span className=''>
                                            <p className="max-w-[247.95px] text-[#292D32] text-xs text-left font-normal">
                                                Enter your transaction PIN to finalize and complete your groove order
                                            </p>
                                        </span>
                                    </aside>
                                </div>

                                <p className='mt-4'>Enter 4 Digits PIN</p>

                                <form>
                                    <div className='w-full my-5 text-center flex justify-center items-center '>
                                        <InputCodeField
                                            placeholder='****'
                                            type="password"
                                            code={code}
                                            setCode={setCode}
                                            size={4} />
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <button
                                            type="button"
                                            className='w-full h-12 bg-none text-[#800020] text-base font-medium mt-4 rounded-lg'
                                            onClick={undefined}
                                        >
                                            Back
                                        </button>

                                        <button
                                            type="button"
                                            className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
                                            onClick={() => submitHandler()}
                                        >
                                            {processing ? "Processing..." : 'Confirm'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>) : (
                    <>
                        <header className="text-sm font-medium text-[#292D32]">Make Payment</header>
                        <span>
                            <p className="text-xs font-normal leading-4 text-[#696C70] max-w-[312px]">
                                Pay an Escrow
                            </p>
                        </span>
                        <span>
                            <p className="text-5xl font-normal leading-12">N {price}</p>
                        </span>
                        <span>
                            <p className="text-xs font-normal leading-4">NGN (Nigeria Naira)</p>
                        </span>
                        <span>
                            <p className="italic text-xs font-normal leading-4 text-[#696C70] max-w-[312px]">
                                We ensure the security of your payment and guarantee a seamless transaction
                                experience between you and the commercial user.
                            </p>
                        </span>
                        <button
                            type='button'
                            className='w-full sm:w-[358px] h-12 bg-[#800020] 
                text-white text-base font-medium mt-4 rounded-lg outline-none border-none'
                            onClick={() => setIsConfirmTransaction(!isConfirmTransaction)}
                        >
                            Pay Now
                        </button>
                    </>
                )
            }

        </section>
    )
}
export default MakePayment