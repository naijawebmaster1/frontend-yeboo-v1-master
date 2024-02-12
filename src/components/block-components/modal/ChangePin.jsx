import { useState } from 'react'
import InputCodeField from '../input/inputCodeField'
import authService from '../../../services/actions/authActions'
import { useSelector} from "react-redux";
import { toast } from 'react-toastify';

const ChangePin = ({otp}) => {
    const { token } = useSelector((state) => state.login);

    const [code, setCode] = useState('')
    const [code2, setCode2] = useState('')
    const { info } = useSelector((state) => state.userInfo)
    const [submitting, setSubmitting] = useState(false)

    const changePinHandler = async () => {
        if (code !== code2) {
            return toast.warning("Transaction pin doesn't match")
        }
        setSubmitting(true)
        const res = await authService.resetTransactionPin(token, { otp: otp.toString(), newTransactionPin: Number(code) })
        if (res) {
            toast.warning("Transaction pin changed sucessfully")
            setSubmitting(false)
            window.location.reload()
            return
        }
        setSubmitting(false)
    }

    return (
        <section>
            <div>
                <div>
                    <div className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center gap-x-4 p-4 mt-4'>
                        <aside>
                            <img alt='' src={require('../../../assets/images/Processing.png')} className="w-[62.052px] h-[40px]" />
                        </aside>
                        <aside className="flex flex-col items-start">
                            <span>
                                <b className="text-[#292D32] text-sm text-left font-bold">Transaction Pin</b>
                            </span>
                            <span>
                                <p className="max-w-[247.95px] text-[#292D32] text-xs text-left font-normal">
                                    Generate a 4-digit PIN for secure and safe account transactions.
                                </p>
                            </span>
                        </aside>
                    </div>
                    <p className='mt-2 text-sm font-medium text-[#344054]'>Create new pin</p>
                    <form>
                        <div className='w-full my-5 text-center flex justify-center items-center '>
                            <InputCodeField code={code} setCode={setCode} size={4} type='password' />
                        </div>

                        <p className='text-sm font-medium text-[#344054]'>Repeat 4 Digits Pin.</p>

                        <div className='w-full my-5 text-center flex justify-center items-center '>
                            <InputCodeField code={code2} setCode={setCode2} size={4} type='password' shouldAutoFocus={false} />
                        </div>

                        <button
                            disabled={submitting}
                            type='button'
                            className='w-full h-12 bg-[#800020] text-white text-base font-medium mt-4 py-3 px-4 rounded-lg'
                            onClick={() => changePinHandler()}
                        >
                            {submitting? 'Processing' : 'Save'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default ChangePin