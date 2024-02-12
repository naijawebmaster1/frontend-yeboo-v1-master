import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

interface IPerDay {
    setOpen?: any
}

const PayPerDay = ({ setOpen }: IPerDay) => {
    return (
        <section className="flex flex-col justify-center items-center gap-4">
            <header className="text-sm font-medium text-[#292D32]">What is Pay per Day</header>
            <span>
                <p className="text-xs italic font-normal leading-4 text-[#696C70] max-w-[312px]">
                    In the "pay per day" system on YeBoo platforms, you are charged only for the specific number of days you choose to use the Groovie service. The cost for the selected number of days is deducted from your Yeboo wallet automatically.
                </p>
            </span>
            <button
                type='button'
                className='w-full sm:w-[358px] h-12 bg-[#800020] 
                text-white text-base font-medium mt-4 rounded-lg outline-none border-none'
                onClick={() => setOpen(false)}
            >
                I understand
            </button>
        </section>
    )
}
export default PayPerDay