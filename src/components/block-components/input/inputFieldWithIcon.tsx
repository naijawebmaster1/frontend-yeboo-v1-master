import {FiSearch} from 'react-icons/fi'

interface IField {
    placeholder?: string,
    name?:string;   
    type: string;
    id?: string;
    onBlur?: any;
    onFocus?: any;
    onChange: any;
    value?: string;
}

export default function InputFieldWithIcon({placeholder, value, name, type, onChange, onFocus, onBlur,id}: IField) {
  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}