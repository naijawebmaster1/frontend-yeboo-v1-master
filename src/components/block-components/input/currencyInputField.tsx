import { useState } from "react"
interface ICurrencyInput{
    onChange: any
    currencySign: string,
    onBlur: any,
    value: any,
    currencyValue: string,
    currencyName:string
    type:any,
    name: string,
    label: string,
    placeholder: string
    currencyChange:any
}

const currencyAndSign = [
    {
        id: 1,
        sign: '$',
        value: 'NGN'
    },
    {
        id: 2,
        sign: '$',
        value: 'USD'
    },
    {
        id: 3,
        sign: '$',
        value: 'GBP'
    },
    {
        id: 4,
        sign: '$',
        value: 'EUR'
    },
    {
        id: 5,
        sign: '$',
        value: 'CAD'
    }
]



export default function CurrencyInputField({onChange, currencyName, currencySign, currencyChange, placeholder, onBlur, type, value, name, label, currencyValue}: ICurrencyInput) {

   
    return (
      <div className="">
        <label htmlFor={name} className="block text-sm font-bold leading-6 text-charleston">
          {label}
        </label>
        <div className="relative mt-2 rounded-md border-2  shadow-sm ring-1 ring-inset border-charleston ring-charleston text-gray-900  placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6 ">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm ">{currencySign}</span>
          </div>
          <input
            type={type}
            name={name}
            id={name}
            onChange={onChange}
            onBlur={onBlur}
            className="block w-full rounded-md border-0 py-2.5 px-10"
            placeholder={placeholder}
          />
          <div className="absolute inset-y-0 right-0 flex items-center ml-5">
            <select
              id="currency"
              name={currencyName}
              value={currencyValue}
              onChange={currencyChange}
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-charleston sm:text-sm"
            >
                {
                    currencyAndSign.map((item:any) => (
                        <option key={item?.id}>{item?.value}</option>
                    ))
                }
            </select>
          </div>
        </div>
      </div>
    )
  }