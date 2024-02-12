import React, { useState } from 'react'
import CreateANewGroove from './createANewGroove'
import GroovePricing from './groovePricing'
import { useSearchParams } from 'react-router-dom'

function CreateGrooveFlow() {
    const [stage, setStage] = useState('basic')
    const [search, setSearch] = useSearchParams();

    const id:any = search.get('id')



    return (
        <section>

            {stage === 'basic' && (
                <CreateANewGroove setStage={setStage} />
            )}

            {stage === 'pricing' && (
                <GroovePricing setStage={setStage} />
            )}

        </section>
    )
}

export default CreateGrooveFlow
