import React, { useState, useEffect } from 'react'
import Header from '../../components/block-components/header/header'
import YebboBack from '../../components/base-components/back/yebooBack'
import GrooveCard from '../../components/base-components/grooves/grooveCard'
import GrooveListCard from '../../components/base-components/grooves/grovesListCard'
import Button from '../../components/block-components/button/button'
import { AiOutlineReload } from 'react-icons/ai'
import SearchFilter from '../../components/base-components/filter/searchFilter'
import { getGroovesAction } from '../../services/reducers/groovesReducer.ts/getGroovesReducer'
import { useDispatch, useSelector } from "react-redux"
import { filterGroovesByType } from '../../services/utils/helpersFunc'
import EmptySearchState from '../../components/base-components/emptyState/emptySearchState'
import LoadingState from '../../components/block-components/loader/loading'
import { states } from '../../services/constants/dataConstants'
import { useLocation } from 'react-router-dom';

function Grooves() {
  const dispatch = useDispatch<any>()
  const { grooves, loading } = useSelector((state: any) => state.grooves)
  const { info } = useSelector((state: any) => state.userInfo)
  const [next, setNext] = useState(1)
  const filterGrooveBy = info?.accountType === 'Groover' ? "Post" : "Request"
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState('')
  const [locationArr, setLocationArr] = useState<any>([])

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const [filters, setFilters] = useState<any>({
    grooveType: filterGrooveBy,
    search: `${search ? search : ""}`
  })


  useEffect(() => {
    dispatch(getGroovesAction({ filters }))
    if (category) {
      setFilters({ ...filters, category })
      setSelectedCategory(category)
    }

    if (search) {
      setFilters({ ...filters, search })
    }

  }, [dispatch])

  // console.log(filters, "THE FILTER")

  const filterGroovesHandler = (e: any, key: string) => {

    if (key === 'category') {
      setSelectedCategory(e);
      setFilters({ ...filters, category: e })
      dispatch(getGroovesAction({ filters: { ...filters, [key]: e } }));
      return
    }

    if (key === 'state') {
      const filteredArr = states.find((state: any) => state.name === e.target.value)
      setLocationArr(filteredArr?.lgas)
    }

    if (key === 'age') {
      setSelectedAge(e)
      const parts = e.split('-');
      if (parts.length === 2) {
        const start = parseInt(parts[0].trim(), 10);
        const end = parseInt(parts[1].trim(), 10);
        setFilters({
          ...filters,
          minAge: start,
          maxAge: end,
        })
        dispatch(getGroovesAction({ filters }));
        return
      }
    }

    if (key === 'clear') {
      setFilters({})
      setSelectedCategory("");
      setSelectedAge("");
      setLocationArr([]);
      dispatch(getGroovesAction({ filters: {
        grooveType: filterGrooveBy,
      } }));
      return;
    }

    const value = e.target.value;

    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: value,
    }));

    dispatch(getGroovesAction({ filters: { ...filters, [key]: value } }));
  };


  return (
    <div>
      <Header pageTitle="Grooves" />
      <section className='mx-auto max-w-7xl items-center p-6'>
        <YebboBack
          title='Search for "Cutie"'
          screenDetails={[]}
        />

        {/* SECTION STARTS HERE */}

        <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between '>
          <div className='w-full md:w-1/3 bg-white md:p-10 p-2'>

            <SearchFilter
              setFilters={setFilters}
              filters={filters}
              showSearchInput={true}
              showAge={true}
              showCategories={true}
              showLocation={true}
              showState={true}
              showPriceRange={true}
              showSortBy={true}
              onChangeHandler={filterGroovesHandler}
              selectedCategory={selectedCategory}
              selectedAge={selectedAge}
              locationArr={locationArr}
            />

          </div>

          <div className='w-full md:w-2/3 bg-white md:mt-5 md:ml-5 md:p-10 p-2'>
            <p className="font-extrabold pb-3 text-gray-700 hidden md:block">All Grooves</p>

            <div>

            </div>
            {loading && <LoadingState />}

            {
              grooves && grooves.length > 0 ? grooves?.map((groovy: any, index: any) => (
                <div key={`groove-${index}`} className='w-full'>
                  <div className='md:block hidden'>
                    <GrooveListCard groove={groovy} />
                  </div>
                </div>
              )) : (
                <EmptySearchState message="There's currently no groove that matches your search" imageSrc={''} />
              )
            }

            <div className='md:hidden grid grid-cols-2 gap-1'>
              {
                grooves && filterGroovesByType(filterGrooveBy, grooves).map((groovy: any, index: any) => (
                  <div key={`groove-${index}`} className='w-full'>
                    <div className='md:hidden block'>
                      <GrooveCard groove={groovy} />
                    </div>
                  </div>
                ))
              }

              {/* {loading && <LoadingState />} */}

              {/* {grooves && grooves?.length === 0 && <EmptySearchState message="There's currently no groove that matches your search" imageSrc={''} />} */}

            </div>

            {
              grooves && grooves.length > 18 && (
                <div className='w-full md:w-1/3'>
                  <Button
                    icon={<AiOutlineReload />}
                    text="Show More" onClick={() => setNext(next + 1)} backgroundColor='#800020' textColor='#fff' />
                </div>
              )
            }

          </div>
        </div>
      </section>


    </div>
  )
}

export default Grooves
