import React, { useState } from 'react'
import SelectInputField from '../../block-components/input/selectInputField'
import Slider from 'rc-slider';
import InputFieldWithIcon from '../../block-components/input/inputFieldWithIcon'
import CheckbookInputField from '../../block-components/input/checkboxInputField';
import { grooveCategories, ages, states, sortBy } from '../../../services/constants/dataConstants';
import "rc-slider/assets/index.css";

interface ISearch {
  showSearchInput: boolean
  showAge: boolean
  showCategories: boolean
  showLocation: boolean
  showState: boolean
  showPriceRange: boolean
  showSortBy: boolean
  setFilters: any
  filters: any
  onChangeHandler:any
  checked?: any
  selectedCategory?:any
  selectedAge: any
  locationArr? : any
}

function SearchFilter({ showSearchInput, locationArr, selectedAge, selectedCategory, onChangeHandler, filters, showAge, showCategories, showLocation, showState, showPriceRange, showSortBy }: ISearch) {
 
 
  return (
    <section>

      {/* <Formik
      initialV
      >

      </Formik> */}
      {
        showSearchInput && (
          <InputFieldWithIcon
            placeholder="What are you looking for?"
            type="text"
            value={filters.search}
            onChange={(e: any) => onChangeHandler(e, 'search')}
            // onChange={(e: any) => setFilters({ ...filters, search: e.target.value })}
          />
        )
      }

      {
        showSortBy && (
          <div className='py-2'>
            <SelectInputField
              name={"Sort By"}
              placeholder='New'
              onChange={(e: any) => onChangeHandler(e, 'sortBy')}
              label='Sort By'
              data={sortBy}
            />
          </div>
        )
      }

      {
        showCategories && (
          <div className='py-5'>
            <p className="font-bold text-gray-700">Sort by Categories</p>

            <div className='p-4 flex flex-col'>
              {
                grooveCategories.map((category: any) => (
                  <div key={category.id}>
                    <CheckbookInputField
                      name={category.name}
                      value={filters.category}
                      checked={category.name === selectedCategory}
                      setValue={() => onChangeHandler(category.name, 'category')}
                    />

                  </div>
                ))
              }
            </div>
          </div>
        )
      }

      {
        showAge && (
          <div className='py-3'>
            <p className="font-bold text-gray-700">Sort by Age</p>

            <div className='p-4 flex flex-col'>
              {
                ages.map((age: any) => (
                  <div key={age.id}>
                    <CheckbookInputField
                      name={age.age}
                      value={filters.age}
                      checked = {age.age === selectedAge}
                      setValue={() => onChangeHandler(age.age, 'age')}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        )
      }

      {
        showState && (
          <div className='py-2'>
            <SelectInputField
              name="state"
              placeholder='Select State'
              onChange={(e:any) => onChangeHandler(e, 'state')}
              label='State'
              data={states}
            />
          </div>
        )
      }

      {
        showLocation && (
          <div className='py-2'>
            <SelectInputField
              name={"Location"}
              placeholder='Select Location'
              onChange={(e:any) => onChangeHandler(e, 'location')}
              label='Location'
              data={locationArr}
            />
          </div>
        )
      }

      {
        showPriceRange && (
          <div className='py-2'>
            <label className="block text-sm font-medium leading-6 text-gray-900">Price Range</label>
            <div className='flex my-3 justify-between items-center font-bold text-gray-600'>
              <p>₦20,000</p>
              <p>₦1,000,000</p>
            </div>
            <Slider
              className=''
              range
              // value={[100000]}
              defaultValue={[0, 100]}
              tabIndex={[20000, 800000]}
              draggableTrack={true}
              pushable={true}
              trackStyle={{ backgroundColor: "#B11226", height: 10 }}
              railStyle={{ backgroundColor: "#000", height: 10 }}
              // onChange={(value) => console.log("i deyyyyy", value)}
              handleStyle={{
                borderColor: "red",
                height: 20,
                width: 20,
                marginLeft: -10,
                marginTop: -5,
                backgroundColor: "red"
              }}
            />
          </div>
        )
      }

      <button 
      type ='button'
      onClick={(e) => onChangeHandler(e, 'clear')}
      className='font-bold text sm text-white rounded-md w-full mt-10 px-3 py-2 bg-wine flex justify-center items-center'>
        Clear Filter
      </button>
    </section>
  )
}

export default SearchFilter
