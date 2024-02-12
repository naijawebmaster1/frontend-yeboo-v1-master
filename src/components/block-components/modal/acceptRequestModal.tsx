import React from 'react'
import ModalLayout from '../../../layout/modal/modalLayout'

interface IComingSoon {
    isOpen: boolean,
    setOpen: any,
    action: string,
    acceptHandler : any,
    declineHandler: any,
    processing:boolean

}
function AcceptRejectReqestModal({ isOpen, setOpen, action, processing, acceptHandler, declineHandler }: IComingSoon) {
    return (
        <ModalLayout open={isOpen} setOpen={setOpen} title={''} showClose={true}>
            <div className='p-10'>
                {
                    action === 'accept' ? (
                        <h1 className='font-bold text-charleston text-xl'>Ready to accept this Request?</h1>

                    ) : (
                        <h1 className='font-bold text-charleston text-xl'>Considering rejecting this Request?</h1>
                    )
                }

                {
                    action === 'accept' ? (
                        <p className='text-charleston text-sm py-5 '>Once accepted, the project cost will be credited to your wallet account but held until completion. The project will automatically move to your 'Orders' page for easy client communication. Any questions? Feel free to ask. Thanks!</p>
                    ) : (
                        <p className='text-charleston text-sm py-5 '>No worries. If declined, there won't be any charge to your account. Feel free to explore other opportunities. Questions? Reach out anytime. Thanks!</p>
                    )
                }

                {
                    action === 'accept' ? (
                        <button 
                        onClick={acceptHandler}
                        disabled={processing}
                        className='font-bold w-full  rounded-lg px-3 py-2 bg-burgundy text-white'>{processing? 'Please wait...' : "Accept Request"}</button>
                    ) : (
                        <button 
                        onClick = {declineHandler}
                        disabled={processing}
                        className='font-bold w-full rounded-lg px-3 py-2 bg-[#EE4139] text-white'>{processing? 'Please wait...' : "Reject Request"}</button>
                    )
                }

            </div>
        </ModalLayout>

    )
}

export default AcceptRejectReqestModal
