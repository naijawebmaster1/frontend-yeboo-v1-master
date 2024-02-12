import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


interface PhoneNumberInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean
    handleBlur?: any
    name?:string
}


const PhoneNumerInput: React.FC<PhoneNumberInputProps> = ({ value, disabled, handleBlur, onChange, name }) => {
    const handlePhoneChange = (value: string) => {
        onChange(value)
    }

    return (
        <PhoneInput 
            country={'ng'}
            regions={'africa'}
            autoFormat={true}
            onlyCountries={['ng']}
            countryCodeEditable	={false}
            value={value}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            disabled={disabled}
            inputProps={{
                name: name,
                required: true,
                autoFocus: true
            }}
            defaultErrorMessage	="Invalid Phone Number"
            // defaultMask="70******"
            placeholder='703******'
            inputStyle={{
            color: '#7F8184', 
            paddingLeft: '40px',
            height: '50px', 
            width: "100%",
            

            // border: '2px' ,
            // borderColor: '#EAEAEB',
            // boxShadow: '10px'
        }}

        containerStyle={{
            // paddingTop: '10px',
            // paddingBottom: '5px'
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#EAEAEB',
            boxShadow: "inherit"
        }}
            // className={"block w-full rounded-md outline-none border-[1px] border-solid border-[#EAEAEB] py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-charleston placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"}
        />
    )
}
export default PhoneNumerInput