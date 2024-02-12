import React, { useState } from 'react'
import VipUpgrade from '../../block-components/modal/vipUpgrade'
import ModalLayout from '../../../layout/modal/modalLayout'

interface IUpgradeAccount{
    title: string,
    subTitle: string
}

function UpgradeAccount({title, subTitle}: IUpgradeAccount) {
    const [upgrade, setUpgrade] = useState(false)
    return (
        <div>

            {
                upgrade && (
                    <ModalLayout open={upgrade} setOpen={() => setUpgrade(!upgrade)} title='Upgrade Account' showClose={true}>
                    <VipUpgrade/>
                    </ModalLayout>
                )
            }
            <div 
            onClick = {() => setUpgrade(!upgrade)}
            className='font-bold cursor-pointer h-16 w-full my-3 bg-white p-4 rounded-xl'>
                <div className=' flex items-center justify-start'>
                    <img
                        alt=''
                        src={require('../../../assets/images/Processing.png')}
                    />
                    <div className='ml-3'>
                        <p className='font-bold text-sm md:text-base'>{title}</p>
                        <p className='text-xs font-light'>{subTitle}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpgradeAccount
