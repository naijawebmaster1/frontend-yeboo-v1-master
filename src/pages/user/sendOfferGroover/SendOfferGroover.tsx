import { useState } from "react"
import YebboBack from "../../../components/base-components/back/yebooBack"
import Header from "../../../components/block-components/header/header"
import FirstStepProposal from "./SendOffer"
import { useSelector } from 'react-redux';
import grooveService from "../../../services/actions/grooveActions"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { hireAndProposalAction } from "../../../services/reducers/orderDetailsReducer/hireAndProposalReducer";
import { useDispatch } from "react-redux";
const SendProposal = () => {
    const { orderDetails } = useSelector((state: any) => state.hireAndProposal)
    const { user, token } = useSelector((state: any) => state.login)
    const [processing, setProcessing] = useState(false)
    const [code, setCode] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const submitHandler = async () => {
        if(!code){
            return toast.warning("Please enter your transaction pin")
        }
        if(code.length <4){
            return toast.warning("Please enter a valid transaction pin")
        }
        setProcessing(true)
        console.log(orderDetails, "HEHHEHEHEHE")

        const { price, orderDate, ...values } = Object.assign({}, orderDetails)
        const newOrderDetails = {
            ...values,
            transactionPin: Number(code)
        }
        const res = await grooveService.newGrooveOrder(token, newOrderDetails)

        if (res) {
            dispatch(hireAndProposalAction({}))
            toast.success("Order placed successfully. Pending groovie acceptance")
            navigate(`/dashboard/orders`)
            setProcessing(false)
        }
        setProcessing(false)
    }

    return (
        <>
            <header>
                <Header pageTitle="Send Offer" />
            </header>
            <section className='mx-auto max-w-7xl items-center p-6'>
                <h2 className='font-bold my-5 text-xl md:block hidden'>Send Offer</h2>
                <YebboBack
                    title=''
                    screenDetails={['Grooves', 'Grooves Details', 'Hire Me']}
                />
                <section className='mx-auto max-w-7xl items-center p-8 my-6 bg-white rounded-[10px]'>
                    <FirstStepProposal code={code} setCode={setCode} processing={processing} submitHandler={submitHandler} />
                </section>
            </section>
        </>
    )
}
export default SendProposal