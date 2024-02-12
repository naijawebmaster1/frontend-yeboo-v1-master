import React from 'react'
import Header from '../../components/block-components/header/header'
import YebboBack from '../../components/base-components/back/yebooBack'
import SelectInputField from '../../components/block-components/input/selectInputField'
import { useNavigate } from 'react-router-dom'
import GrooveListingCard from '../../components/base-components/grooves/grooveListingCard'
import { sortBy } from '../../services/constants/dataConstants'

const groovies = [
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },
  {
    id: '1',
    name: 'Cutie Johnson',
    star: 4.5,
    favorite: 100,
  },

]
const screenDetails = ['My Orders']

function GrooveListing() {
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <section className='mx-auto max-w-7xl items-center p-6'>
      <h2 className='font-bold my-5 text-xl'>My Grooves</h2>
        <YebboBack
          title=''
          screenDetails={['Grooves', 'Grooves Listing']}
        />

        {/* SECTION STARTS HERE */}

        <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between '>
          <div className='w-full bg-white md:mt-5 md:ml-5 md:p-10 p-2'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <p className='font-bold text-gray-700 md:mb-0 mb-4'>All Listings</p>

              <div className='flex justify-start items-center'>
                <div className='ml-2 -mt-2'>
                  <SelectInputField data={sortBy} placeholder='Sort by Groove' name={''} onChange={undefined} label={''} />
                </div>
              </div>
            </div>

            {
              groovies.map((groovy: any) => (
                <div key={groovy.id} className='w-full mt-5'>
                  <div className=''>
                    <GrooveListingCard/>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>


    </div>
  )
}

export default GrooveListing

