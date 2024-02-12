import { useState } from "react"
interface IheightSizeInput {
    onChange: any
    onBlur: any,
    value: any,
    heightSizeValue: string,
    heightSizeName: string
    type: any,
    name: string,
    label: string,
    placeholder: string
    heightSizeChange: any
}

const heightSizes = [
    {
        id: 1,
        value: 'IN'
    },
    {
        id: 2,
        value: 'M'
    },
    {
        id: 3,
        value: 'CM'
    },
]



export default function HeightInputField({ onChange, heightSizeName, heightSizeChange, placeholder, onBlur, type, value, name, label, heightSizeValue }: IheightSizeInput) {


    return (
        <div className="">
            <label htmlFor={name} className="block text-sm font-bold leading-6 text-charleston">
                {label}
            </label>
            <div className="relative mt-2 rounded-md border-2  shadow-sm ring-1 ring-inset border-charleston ring-charleston text-gray-900  placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6 ">
                <input
                    type={type}
                    name={name}
                    id={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="block w-full rounded-md border-0 py-2 px-10"
                    placeholder={placeholder}
                />
                <div className="absolute inset-y-0 right-0 flex items-center ml-5">
                    <select
                        id="heightSize"
                        name={heightSizeName}
                        value={heightSizeValue}
                        onChange={heightSizeChange}
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-charleston sm:text-sm"
                    >
                        {
                            heightSizes.map((item: any) => (
                                <option key={item?.id}>{item?.value}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}