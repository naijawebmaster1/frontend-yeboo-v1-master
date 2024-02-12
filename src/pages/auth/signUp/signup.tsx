import { useState } from 'react'
import RegistrationForm from '../RegistrationForm'
import UserTypeSelection from '../UserTypeSelection'

function SignUp() {
    const [stage, setStage] = useState('1')
    const [accountType, setaccountType] = useState('')
    // const [userType, setUser]

  return (
    <div>
        {stage === '1' && (<UserTypeSelection setStage={setStage} setaccountType={setaccountType} accountType={accountType}/>)}
        {stage === '2' && (<RegistrationForm accountType={accountType}/>)}
    </div>
  )
}

export default SignUp
