import InputCodeField from '../input/inputCodeField'

const VerifyWithdraw = ({ setConfirmTransactionPin, setVerifyAuthAccess, verificationCode, setVerificationCode }) => {

    return (
        <section>
            <div>
                <div>
                    <p style={{ fontWeight: 600 }}>Verify OTP Code</p>

                    <div className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center gap-x-4 p-4 mt-4'>
                        <aside>
                            <img alt='' src={require('../../../assets/images/Processing.png')} className="w-[62.052px] h-[40px]" />
                        </aside>
                        <aside className="flex flex-col items-start justify-start">
                            <span>
                                <b className="text-[#292D32] text-sm text-left font-bold">OTP Code</b>
                            </span>
                            <span className=''>
                                <p className="max-w-[247.95px] text-[#292D32] text-xs text-left font-normal">
                                    Enter the verification code sent to your email
                                </p>
                            </span>
                        </aside>
                    </div>

                    <p className='mt-4'>Enter 6 Digits OTP</p>

                    <form>
                        <div className='w-full my-5 text-center flex justify-center items-center '>
                            <InputCodeField
                                placeholder='****'
                                type="password"
                                code={verificationCode} setCode={setVerificationCode} size={6} />
                        </div>

                        <div className='flex justify-between items-center'>
                            <button
                                type="button"
                                className='w-full h-12 bg-none text-[#800020] text-base font-medium mt-4 rounded-lg'
                                onClick={() => setVerifyAuthAccess(false)}
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 rounded-lg'
                                onClick={() => setConfirmTransactionPin(true)}
                            >
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default VerifyWithdraw