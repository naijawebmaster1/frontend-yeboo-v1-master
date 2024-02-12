import { Rating } from '@smastrom/react-rating'
import { useState } from 'react'
import '@smastrom/react-rating/style.css'
import grooveService from '../../../services/actions/grooveActions'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface IreviewModal{
    orderRef: any
    setReviewOrder: any
}

function ReviewOrderModal({orderRef, setReviewOrder}: IreviewModal) {
    const { token } = useSelector((state: any) => state.login)
    const [rating, setRating] = useState(0) 
    const [review, setReview] = useState('')
    const [processing, setProcessing] = useState(false)

    const reviewOrderHandler = async() => {
        if (rating === 0){
            return toast.warning("Please choose your rating")
        }
        if (!review){
            return toast.warning("Please share your experience about the groove")
        }
        setProcessing(true)
        const res = await grooveService.reviewGroove({token, review, rating, orderRef})
        
        if (res){
            setProcessing(false)
            toast.success('Groove reviewed successfully')
            setReviewOrder(false)
        }
        setProcessing(false)
    }

    return (
        <div>
            <h3 className='font-bold text-charleston  text-xl my-5'>How was your Experience</h3>

            
            <div className='flex justify-center items-center my-5'>
            <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
            </div>

            <textarea
            onChange={(e) => setReview(e.target.value)}
                className="w-full h-[119px] rounded-[8px] border-solid border-[0.5px] p-[14px] outline-none"
                placeholder="Share your experience ..."
            />

            <div className='grid grid-cols-2 gap-3 my-5'>
                <button
                    type='button'
                    onClick={() => setReviewOrder(false)}
                    className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-white text-[#800020] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    Cancel
                </button>

                <button
                    type='button'
                    disabled={processing}
                    onClick={() => reviewOrderHandler()}
                    className="text-center w-full items-center gap-x-2 rounded-md px-4 py-2 md:text-base text-sm font-semibold shadow-sm bg-[#800020] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {processing ? "Pkease wait ..." : "Submit"}
                </button>
            </div>
        </div>
    )
}

export default ReviewOrderModal
