import React, { useEffect, useState } from 'react'
import Header from '../../components/block-components/header/header'
import GrooveListCard from '../../components/base-components/grooves/grovesListCard'
import grooveService from '../../services/actions/grooveActions'
import { useSelector } from "react-redux"
import Loader from '../../components/block-components/loader/loader'
import EmptyStateComponent from '../../components/base-components/emptyState/emptyState'
import { useNavigate } from 'react-router-dom'

function MyFavourites() {
  const navigate = useNavigate()
  const { info } = useSelector((state: any) => state.userInfo)
  const { token } = useSelector((state: any) => state.login)
  const [favourites, setFavourites] = useState<any>()

  useEffect(() => {

    const getFavourites = async () => {
      const res = await grooveService.getFavouriteGrooves({ token })
      if (res) {
        setFavourites(res?.data)
      }
    }
    getFavourites()
  }, [])

  return (
    <div>
      <Header />

      {!favourites && <Loader />}

      {favourites && (
        <section className='mx-auto max-w-7xl items-center p-6'>
          <h2 className='font-bold my-5 text-xl'>Favourites</h2>
          <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between '>
            <div className='w-full bg-white md:mt-5 md:ml-5 md:p-10 p-2'>
              {
                favourites.map((groovy: any) => (
                  <div key={groovy.id} className='w-full mt-5'>
                    <div className=''>
                      <GrooveListCard groove={groovy?.groove} showCategory={true} />
                    </div>
                  </div>
                ))
              }

              {favourites?.length === 0 && <EmptyStateComponent message="You have no favourites yet." btnText={"See All Grooves Available"} onClick={()=> navigate(`/dashboard/grooves`)} imageSrc={''} /> }
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default MyFavourites

