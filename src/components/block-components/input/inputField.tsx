

interface InputFieldProps{
    label: string,
    onChange: any,
    onFocus?: any,
    onBlur?: any,
    value: any,
    name: string,
    type: string,
    placeholder: string,
    error?: string,
    id?:string
    disabled?: boolean
    maxLength?: any
    maxAge?: number
    min?: any
    checked?:boolean
}

const DEFAULT_MAX_AGE = 18

export default function InputField({
  label, 
  maxLength, 
  disabled, 
  onChange, 
  onFocus, 
  placeholder, 
  onBlur, 
  value, 
  name, 
  type, 
  error, 
  id, 
  maxAge = DEFAULT_MAX_AGE,
  min,
  checked
}: InputFieldProps) {

    // Calculate the maximum date based on the maximum age
    const today = new Date();
    today.setFullYear(today.getFullYear() - maxAge)
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const maxDate = `${year}-${month}-${day}`

    
    return (
      <div>
        <label htmlFor={name} className="flex flex-start text-sm font-bold leading-6 text-charleston">
          {label}
        </label>
        <div className="mt-2">
          <input
          value={value}
          onBlur={onBlur}
          maxLength={maxLength}
          onChange={onChange}
          // autoComplete={name}
          disabled={disabled}
          onFocus={onFocus}
            type={type}
            name={name}
            id={id}
            checked={checked}
            style={{
              borderColor: error? '#800208': '',
              border: error ? 3: 1
            }}
            className="block w-full rounded-md outline-none border-[1px] border-solid border-[#EAEAEB] py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-charleston placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
            placeholder={placeholder}
            min={min}
            // max={maxDate}
          />
        </div>
      </div>
    )
  }