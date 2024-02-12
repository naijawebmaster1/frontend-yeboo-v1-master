import { useState, useEffect } from 'react'
import Header from '../../components/block-components/header/header'
import YebboBack from '../../components/base-components/back/yebooBack'
import Groovie from '../../components/base-components/members/groovie'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsersAction } from '../../services/reducers/userReducer.ts/getAllUsersReducer'
import Loader from '../../components/block-components/loader/loader'
import SearchFilter from '../../components/base-components/filter/searchFilter'
import EmptySearchState from '../../components/base-components/emptyState/emptySearchState'
import LoadingState from '../../components/block-components/loader/loading'
import { filterUserByAccountType } from '../../services/utils/helpersFunc'
import { states } from '../../services/constants/dataConstants'

function Groovies() {
  const [filters, setFilters] = useState<any>({
  })

  const { users, loading } = useSelector((state: any) => state.users)
  const dispatch = useDispatch<any>()
  const { info } = useSelector((state: any) => state.userInfo)
  const [selectedAge, setSelectedAge] = useState('')
  const [locationArr, setLocationArr] = useState<any>([])

  const filterGrooveBy = info?.accountType === 'Groover' ? "Groovie" : "Groover"

  useEffect(() => {
    dispatch(getAllUsersAction({}))
  }, [])

  const filterGroovesHandler = (e: any, key: string) => {

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
        dispatch(getAllUsersAction({ filters }))
        return
      }
    }

    if (key === 'state'){
      const filteredArr = states.find((state: any) => state.name === e.target.value)
      setLocationArr(filteredArr?.lgas)
    }

    if (key === 'clear'){
      setFilters({})
      setSelectedAge("");
      setLocationArr([]);
      dispatch(getAllUsersAction({ filters: {} }))
      return;
    }

    const value = e.target.value;

    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: value,
    }));

    // Dispatch your action with updated filters
    dispatch(getAllUsersAction({ filters: { ...filters, [key]: value } }));
  };

  return (
    <div>
      <Header />
      {!users && (<Loader />)}
      {
        users && (
          <section className='mx-auto max-w-7xl items-center p-6'>
            <YebboBack
              title='Search Result "Cutie"'
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
                  showCategories={false}
                  showLocation={true}
                  showState={true}
                  showPriceRange={false}
                  showSortBy={true}
                  onChangeHandler={filterGroovesHandler}
                  selectedAge={selectedAge}
                  locationArr={locationArr}
                />
              </div>

              <div className='w-full md:w-2/3 bg-white md:mt-5 md:ml-5 md:p-10 p-2'>
                <p className="font-extrabold pb-3 text-gray-700 hidden md:block">Search Result "{filters.search}"</p>
                {loading && <LoadingState />}
                {users && filterUserByAccountType(users, filterGrooveBy).length > 0 ? filterUserByAccountType(users, filterGrooveBy)?.map((user: any) => (
                    <div key={user?._id}>
                      <Groovie details={user} />
                    </div>
                  )) : (
                    <EmptySearchState imageSrc={""} message={"There's currently no groove that matches your search"}/>
                  )
                }

              </div>
            </div>
          </section>
        )
      }



    </div>
  )
}

export default Groovies
