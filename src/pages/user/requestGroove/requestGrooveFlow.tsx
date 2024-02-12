import React, { useState, useEffect} from 'react'
import RequestGroove from '../../../components/base-components/grooves/RequestGroove';
import GrooveBudget from '../../../components/base-components/grooves/GrooveBudget';
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams  } from 'react-router-dom'
import {toast} from 'react-toastify'
import grooveService from '../../../services/actions/grooveActions';

function RequestGrooveFlow() {
    const { info } = useSelector((state: any) => state.userInfo) 
    const navigate = useNavigate()
    const [stage, setStage] = useState('basic')
    const [search, setSearch] = useSearchParams();
    const [details, setDetails] = useState<any>()

    const id:any = search.get('id')

    useEffect(()=> {
        if (!info.isAuthenticate.bvn){
            toast.warning('"Please verify your account and top-wallet to continue')
            return navigate(`/dashboard/wallet?verify=bvn`)
        }

        if (!info.nationality) {
            toast.warning("Please complete your profile before requesting a groove")
            navigate(`/dashboard/auth/about-yourself?redirect=/request-groove`)
            return
        }
    })
    const getGrooveDetails = async () => {
        const res = await grooveService.getGroove(id)
        if (res) {
            setDetails(res?.data?.groove)
        }
    }

    useEffect(() => {
        if (id){
            getGrooveDetails()
        }
    }, [])

    return (
        <section>

            {
                stage === 'basic' && (
                    <RequestGroove details={details} setStage={setStage}/>
                )
            }

            {
                stage === 'pricing' && (
                    < GrooveBudget setStage={setStage}  />
                )
            }
        </section>
    )
}

export default RequestGrooveFlow