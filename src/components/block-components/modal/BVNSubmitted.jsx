import fund from '../../../assets/images/fund.svg'

const BVNSubmitted = () => {
    return (
        <section className='flex flex-col items-center justify-center gap-y-6'>
            <span className='text-[#292D32] text-base font-medium'>Fund Wallet</span>
            <span>
                <img src={fund} alt='bvn icon' />
            </span>
            <span className='text-[#292D32] text-sm font-bold'>BVN Verification Submitted</span>
            <span className='text-[#292D32] text-xs font-normal'>
                Please note that we're verifying your account, this process will be taking 5 minutes. Kindly check back.
            </span>
        </section>
    )
}
export default BVNSubmitted