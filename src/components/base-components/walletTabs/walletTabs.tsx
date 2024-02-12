import { SetStateAction, useState } from 'react'
import EarningDetails from './earningDetails'
import { useSelector } from "react-redux";
import WalletTable from './walletTable';
import { IoWalletOutline } from 'react-icons/io5'
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'
import EmptyOrderState from '../emptyState/emptyOrderState';
import LoadingState from '../../block-components/loader/loading';

const WalletTabs = () => {
    const { info } = useSelector((state: any) => state.userInfo)
    const { loading, transactions } = useSelector((state: any) => state.transactions)
    const [activeIndex, setActiveIndex] = useState(1)

    const handleClick = (index: SetStateAction<number>) => setActiveIndex(index)
    const checkActive = (index: number | undefined, className: string) => activeIndex === index ? className : ""

    return (
        <section className='bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex flex-col gap-y-4 p-4'>
            <div className='bg-[#FBFBFB] rounded-lg w-[358px] p-2 flex flex-row items-center justify-center gap-x-2'>
                <button
                    style={{
                        color: activeIndex === 1 ? '#B11226' : '',
                        fontWeight: activeIndex === 1 ? 'bold' : '',
                    }}
                    className={`tab ${checkActive(1, "active")} w-[157px] font-sm font-normal text-sm text-[#696C70]`}
                    onClick={
                        () => handleClick(1)
                    }
                >
                    <div className='flex justify-center items-center space-x-2'>
                        <IoWalletOutline />
                        <p>Wallet History</p>
                    </div>
                </button>

                {
                    info?.accountType === 'Groovie' && (
                        <button
                            style={{
                                color: activeIndex === 2 ? '#B11226' : '',
                                fontWeight: activeIndex === 2 ? 'bold' : '',
                            }}
                            className={`tab ${checkActive(2, "active")} w-[157px] font-sm font-normal text-[#696C70]`}
                            onClick={() => handleClick(2)}
                        >
                            <div className='flex justify-center items-center space-x-2'>
                                <HiOutlineChatBubbleBottomCenterText />
                                <p>Earning Details</p>
                            </div>
                        </button>
                    )
                }
            </div>

            <div className={`panel ${checkActive(1, "active")} w-full`}>
                {loading && <LoadingState />}
                {!loading && transactions && transactions?.length > 0 && (<WalletTable transactions={transactions} />)}
                {!loading && transactions?.length <= 0 && <EmptyOrderState message={"You currently have no recent wallet transactions"} />}
                {!loading && !transactions && <EmptyOrderState message={"You currently have no recent wallet transactions"} />}

            </div>
            <div className={`panel ${checkActive(2, "active")}`}>
                {loading && <LoadingState />}
                {!loading && !transactions && <EmptyOrderState message={"You currently have no earnings"} />}
                {!loading && transactions?.length <= 0 && <EmptyOrderState message={"You currently have no earnings"} />}

                {!loading && transactions && transactions?.length > 0 && (<EarningDetails />)}
            </div>
        </section>
    )
}
export default WalletTabs