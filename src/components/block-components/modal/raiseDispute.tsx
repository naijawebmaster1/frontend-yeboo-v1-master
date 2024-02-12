import React from 'react'
import ModalLayout from '../../../layout/modal/modalLayout'


interface IraiseADispute {
    open: boolean,
    setOpen: any
}

function RaiseADispute({ open, setOpen }: IraiseADispute) {

    // const issues 

    return (
        <div>
            <ModalLayout open={open} setOpen={setOpen} title='Raise a Dispute' showClose={true}>
                <form className='flex flex-col item-center justify-start text-charleston'>
                    <p className='font-bold text-left my-3 text-sm'>Choose Issue you want to hightlight</p>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => (
                        <div key={item} className='flex justify-start p-2 items-center'>
                            <input
                                className='mr-3 p-1'
                                type='radio'
                            />
                            <p className=''>Issue {item}</p>
                        </div>
                    ))
                    }

                    <div className='my-4 flex flex-col justify-start'>
                        <label className='font-bold text-left text-sm mb-3'>Add dispute details</label>

                        <textarea
                            className='p-4 border-2 border-gray-200 focus:border-none rounded-md'
                            autoFocus={true}
                            required={true}
                            placeholder='Enter a description...'
                            rows={4} cols={50} />

                    </div>

                    <button className='bg-wine flex justify-center items-center my-5 font-bold rounded-lg text-white text-center py-2 px-3 md:mx-10 '>
                        Submit
                    </button>

                </form>
            </ModalLayout>

        </div>
    )
}

export default RaiseADispute
