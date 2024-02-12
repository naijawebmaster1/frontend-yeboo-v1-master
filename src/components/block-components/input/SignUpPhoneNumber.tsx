import { useState } from "react"
import countries from'../../../services/utils/country.json'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


interface PhoneNumberInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean
}


const PhoneNumerInput: React.FC<PhoneNumberInputProps> = ({ value, disabled, onChange }) => {
    const handlePhoneChange = (value: string) => {
        onChange(value)
    }

    return (
        <PhoneInput 
            country={'ng'}
            regions={'africa'}
            value={value}
            onChange={handlePhoneChange}
            disabled={disabled}
            inputStyle={{color: '#7F8184', paddingLeft: '40px', height: '43px'}}
        />
    )
}
export default PhoneNumerInput