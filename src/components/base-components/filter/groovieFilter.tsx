import React, { useState } from 'react'
import SelectInputField from '../../block-components/input/selectInputField'
import Slider from 'rc-slider';
import InputFieldWithIcon from '../../block-components/input/inputFieldWithIcon'
import CheckbookInputField from '../../block-components/input/checkboxInputField';
import { grooveCategories, ages, states, sortBy } from '../../../services/constants/dataConstants';
import { Formik, ErrorMessage } from "formik";
import { useDispatch} from "react-redux";
import * as Yup from "yup";

interface ISearch {
  setFilters: any
  filters: any
}

function GroovieSearchFilter({ setFilters, filters}: ISearch) {
  return (
    <section>

          <InputFieldWithIcon
            placeholder="What are you looking for?"
            type="text"
            onChange={(e: any) => setFilters({ ...filters, search: e.target.value })}
          />


          <div className='py-3'>
            <p className="font-bold text-gray-700">Sort by Age</p>

            <div className='p-4 flex flex-col'>
              {
                ages.map((age: any) => (
                  <div key={age.id}>
                    <CheckbookInputField
                      name={age.age}
                      value={filters.age}
                      setValue={(e: any) => setFilters({ ...filters, age: e.target.value })}
                    />
                  </div>
                ))
              }
            </div>
          </div>



          <div className='py-2'>
            <SelectInputField
              name="state"
              placeholder='Select State'
              onChange={undefined}
              label='State'
              data={states}
            />
          </div>

 
          <div className='py-2'>
            <SelectInputField
              name={"Location"}
              placeholder='Select Ethnicity'
              onChange={undefined}
              label='Location'
              data={states}
            />
          </div>
    </section>
  )
}

export default GroovieSearchFilter
