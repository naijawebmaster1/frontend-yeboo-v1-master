import React from 'react'

interface ISelectInputField {
    name: string,
    onChange: any,
    onFocus?: any,
    options?: any,
    placeholder?: string,
    label: string,
    data: any,
    onBlur? : any
    value?: any
}

function SelectInputField({ name, onChange, onFocus, options, placeholder, label, data, onBlur, value }: ISelectInputField) {
    return (
        <div>
            <label htmlFor={name} className="flex flex-start text-sm font-bold leading-6 text-charleston">
                {label}
            </label>

            <select
                id={name}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                className="mt-2 block w-full rounded-md border-[1px] border-solid border-#EAEAEB outline-none py-3 px-4 text-gray-900 ring-1 ring-charleston ring-inset sm:text-sm sm:leading-6"
            >
                <option value='' disabled selected>{placeholder}</option>
                {
                    data.map((item: any, i:any) => (
                        <option key={i} value={item?.value || item.name || item}>{item.name || item}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectInputField
