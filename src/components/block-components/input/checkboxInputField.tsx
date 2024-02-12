import React, { useState } from 'react'

interface ICheckbox{
  name: string
  value: string,
  setValue: any
  checked?: boolean
}

function CheckbookInputField({name, value, setValue, checked}: ICheckbox) {
  return (
    <fieldset>
      <div className="space-y-5 my-3">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id={name}
              aria-describedby="age-description"
              name={name}
              type="checkbox"
              value={value}
              checked={checked}
              className="h-4 w-4 rounded border-gray-300 text-wine focus:ring-wine"
              onChange={()=> setValue()}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="age" className="font-medium text-gray-700">
              {name}
            </label>
          </div>
        </div>
      </div>
    </fieldset>
  )
}

export default CheckbookInputField
