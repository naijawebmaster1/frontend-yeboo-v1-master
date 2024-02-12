import { useState } from "react"
import { MdOutlineCircleNotifications } from "react-icons/md"
import { useSelector, useDispatch } from 'react-redux';
import { hireAndProposalAction } from "../../../services/reducers/orderDetailsReducer/hireAndProposalReducer";
import { formatMoney } from "../../../services/utils/helpersFunc";
import MakePayment from "../../../components/block-components/modal/MakePayment";
import ModalLayout from "../../../layout/modal/modalLayout";
import { toast } from "react-toastify";
import { dateDifference } from "../../../services/utils/helpersFunc";


interface StepProps {
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>, step: string) => void;
    submitHandler: (event: React.FormEvent) => void;
    processing: boolean,
    setCode: any,
    code: string
}
const sessions = [
    "Morning",
    "Afternoon",
    "Night"
]

const FirstStepProposal = ({ submitHandler, code, setCode, processing }: StepProps) => {
    const { orderDetails } = useSelector((state: any) => state.hireAndProposal)
    // const [checkedValue, setCheckedValue] = useState<any>([]);
    const dispatch = useDispatch<any>()

    const [paymentModal, setPaymentModal] = useState(false)

    const dateChangeHandler = (e: any) => {
        dispatch(hireAndProposalAction({ ...orderDetails, [e.target.name]: e.target.value }))
    }

    const onSessionSelect = (value: string) => {
        // if (!checkedValue.includes(value)) {
        //     setCheckedValue([...checkedValue, value]);
        //     dispatch(hireAndProposalAction({ ...orderDetails, "sessionTime": checkedValue }))
        // } else {
        //     let filteredValues = checkedValue.filter((res: any) => res !== value);
        //     setCheckedValue(filteredValues);
        //     dispatch(hireAndProposalAction({ ...orderDetails, "sessionTime": filteredValues }))
        // }
        dispatch(hireAndProposalAction({ ...orderDetails, "sessionTime": [value] }))
    }

    const handleSubmitHandler = () => {
        if (orderDetails.orderType === 'perSession') {
            if (orderDetails?.sessionTime?.length === 0) {
                return toast.warning("Please choose the session time. ")
            }
            if (!orderDetails.orderDate) {
                return toast.warning("Please choose the groove date. ")
            }
        }

        if (orderDetails.orderType === 'perDay'){
            if (!orderDetails.startDate){
                return toast.warning("Please choose the groove start date. ")
            }

            if (!orderDetails.endDate){
                return toast.warning("Please choose the groove end date. ")
            }
        }

        if (!orderDetails?.comment){
            return toast.warning("Please enter some messages or notes for your offer")
        }

        

        if (orderDetails?.price <=0){
            return toast.warning("Please ensure you selected a valid started end date.")
        }




        setPaymentModal(!paymentModal)
    }

    return (
        <main className="flex flex-col justify-center gap-6">
            <ModalLayout open={paymentModal} setOpen={setPaymentModal} showClose={true} title={''}>
                <MakePayment submitHandler={submitHandler}
                    price={`${orderDetails?.orderType === "perSession" ? `${formatMoney(Number(orderDetails?.price))}` : `${formatMoney(orderDetails?.price * dateDifference(orderDetails.startDate, orderDetails.endDate))}`}`}
                    code={code}
                    setCode={setCode} processing={processing} />
            </ModalLayout>

            {
                orderDetails?.orderType === 'perSession' ? (
                    <>
                        <section className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6">
                            <div className="w-full rounded-[8px] w-[358px] h-[119px] border-solid border-[0.5px] flex flex-col justify-center items-center gap-6 p-2">
                                <span>
                                    <h5 className="text-sm font-medium leading-4 text-[#292D32]">Select Session</h5>
                                </span>
                                <span className="flex flex-row justify-between items-center gap-[8px]">
                                    {
                                        sessions?.map((session: string) => (
                                            <p
                                                key={session}
                                                className={`${orderDetails?.sessionTime && orderDetails?.sessionTime[0] === session ? 'border-[#800020]' : 'border-[#EAEAEB]'
                                                    } text-sm font-medium leading-4 text-[#292D32] py-2 px-4 rounded inline-flex 
                                items-center border border-solid`}
                                                onClick={() => onSessionSelect(session)}
                                            >
                                                {/* <input
                                                    type="radio"
                                                    className="hidden"
                                                    name="radio_group"
                                                    id="radio_button_1"
                                                    min={new Date().toISOString().split('T')[0]}
                                                /> */}
                                                <label htmlFor="radio_button_1" className="cursor-pointer">
                                                    {session}
                                                </label>
                                            </p>
                                        ))
                                    }
                                </span>
                            </div>
                            <textarea
                                className="w-full h-[119px] rounded-[8px] border-solid border-[0.5px] p-[14px] outline-none"
                                placeholder="Add a message or note ..."
                            />

                        </section>
                        <div className="w-full">
                            <label className="text-sm font-medium leading-4 text-[#3E4247]">Date</label>
                            <input
                                type="date"
                                onChange={dateChangeHandler}
                                name="orderDate"
                                min={new Date().toISOString().split('T')[0]}
                                className="rounded-[8px] border border-solid border-[#EAEAEB] 
                bg-white outline-none bg-gray-100 p-2 rounded w-full"
                                placeholder="16th Nov 2023"
                            />
                        </div>
                    </>

                ) : (
                    <section>
                        <aside className="w-full flex justify-between items-center gap-6">
                            <div className="w-full">
                                <label className="text-sm font-medium leading-4 text-[#3E4247]">Start Date</label>
                                <input
                                    name="startDate"
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={dateChangeHandler}
                                    className="rounded-[8px] border border-solid border-[#EAEAEB] 
                            bg-white outline-none  p-2 rounded w-full"
                                    placeholder={`${new Date().toISOString().split('T')[0]}`}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-sm font-medium leading-4 text-[#3E4247]">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    onChange={dateChangeHandler}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="rounded-[8px] border bg-white border-solid border-[#EAEAEB] 
                            outline-none  p-2  w-full"
                                    placeholder={`${new Date().toISOString().split('T')[0]}`}
                                />
                            </div>
                        </aside>
                        <textarea
                            value={orderDetails.comment}
                            onChange={(e) => dispatch(hireAndProposalAction({ ...orderDetails, comment: e.target.value }))}
                            className="w-full mt-5  h-[119px] rounded-[8px] border-solid border-[0.5px] p-[14px] outline-none"
                            placeholder="Add a message or note ..."
                        />
                    </section>)
            }



            <form className="w-full flex flex-col gap-6">

                <div className="flex flex-col justify-start items-start bg-[#F3F4F6] w-full px-3 rounded-[8px]">
                    <label className="text-xs font-normal leading-4 text-[#696C70]">{orderDetails?.orderType === "perSession" ? "session" : "Day"}</label>
                    <input
                        type="text"
                        disabled
                        className=" bg-[#F3F4F6] border-none outline-none py-2 rounded w-full"
                        placeholder={`${orderDetails?.orderType === "perSession" ? `${orderDetails?.orderDate || "Order Date"}` : `${orderDetails?.startDate || "Start Date"} - ${orderDetails?.endDate || "End Date"}`}`}
                    />
                </div>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-start items-start bg-[#F3F4F6] w-full px-3 rounded-[8px]">
                        <label className="text-xs font-normal leading-4 text-[#696C70]">Amount</label>
                        <input
                            type="text"
                            placeholder={`₦ ${formatMoney(orderDetails?.price)} / ${orderDetails?.orderType === 'perSession' ? "Session" : 'Day'}`}
                            disabled
                            className=" bg-[#F3F4F6] border-none outline-none py-2 rounded w-full"
                        />
                    </div>
                    <div className="flex flex-col justify-start items-start bg-[#F3F4F6] w-full px-3 rounded-[8px]">
                        <label className="text-xs font-normal leading-4 text-[#696C70]">Plan</label>
                        <input
                            type="text"
                            disabled
                            placeholder={orderDetails?.groovePackage}
                            className=" bg-[#F3F4F6] border-none outline-none bg-gray-100 py-2 rounded w-full"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-start items-start bg-[#F3F4F6] w-full px-3 rounded-[8px]">
                        <label className="text-xs font-normal leading-4 text-[#696C70]">Total Charges</label>
                        <input
                            type="text"
                            disabled
                            className=" bg-[#F3F4F6] border-none outline-none  py-2 rounded w-full"
                            placeholder={`₦ ${orderDetails?.orderType === "perSession" ? `${formatMoney(Number(orderDetails?.price))}` : `${formatMoney(orderDetails?.price * dateDifference(orderDetails.startDate, orderDetails.endDate))}`}`}
                        />
                    </div>
                    <div className="flex flex-col justify-start items-start bg-[#F3F4F6] w-full px-3 rounded-[8px]">
                        <label className="text-xs font-normal leading-4 text-[#696C70]">Date</label>
                        <input
                            type="text"
                            disabled
                            className=" bg-[#F3F4F6] border-none outline-none py-2 rounded w-full"
                            placeholder={orderDetails?.orderDate || orderDetails?.startDate || "Choose Date"}
                        />
                    </div>
                </div>
            </form>


            <div
                className="w-full h-[89px] flex gap-4 rounded-[8px] border border-solid 
                bg-white shadow-[0_4px_36px_0px_rgba(0, 0, 0, 0.02)] p-4">
                <MdOutlineCircleNotifications style={{ color: 'gray' }} />
                <aside className="flex flex-col gap-2">
                    <span className="text-sm font-bold leading-4 text-[#292D32]">
                        Notifications
                    </span>
                    <span className="max-w-[271px] text-xs font-normal leading-4 text-[#292D32]">
                        Cost is calculated based on Groove duration. Each day contributes to the total.
                    </span>
                </aside>
            </div>
            <button
                className="w-full sm:w-[355px] disabled:bg-gray-100 justify-self-center self-center sm:justify-self-end sm:self-end 
                px-3 py-4 bg-[#800020] rounded-md outline-none border-none capitalize text-base font-medium leading-6 text-white"
                onClick={() => handleSubmitHandler()}
            >
                Continue
            </button>
        </main>
    )
}
export default FirstStepProposal