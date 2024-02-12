import { useState, useEffect } from 'react'
import Header from '../../components/block-components/header/header'
import YebboBack from '../../components/base-components/back/yebooBack'
import SelectInputField from '../../components/block-components/input/selectInputField'
import MyGrooveCard from '../../components/base-components/grooves/myGrooveCard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import Loader from '../../components/block-components/loader/loader'
import grooveService from '../../services/actions/grooveActions'
import EmptyGrooveState from '../../components/base-components/emptyState/emptyGrooveState'
function MyGrooves() {
  const navigate = useNavigate()
  const [userType, setUserType] = useState<any>()
  const { token, user } = useSelector((state: any) => state.login)
  const [myGrooves, setMyGrooves] = useState<any>()

  const getMyGrooves = async () => {
    const res = await grooveService.getGrooveByCustomerId({ id: user?._id, token })
    if (res) {
      setMyGrooves(res?.data)
    }
  }

  
  useEffect(() => {
    const user_type = localStorage.getItem('user_type')
    setUserType(user_type)
    getMyGrooves()
  }, [token, user?._id])


  return (
    <div>
      <Header />
      <section className='mx-auto max-w-7xl items-center p-6'>
        <h2 className='font-bold my-5 text-xl'>My Grooves</h2>
        <YebboBack
          title=''
          screenDetails={['Grooves', 'My Grooves']}
        />

        {/* SECTION STARTS HERE */}
        {!myGrooves && <Loader />}

        {myGrooves && (
            <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between '>
              <div className='w-full bg-white md:mt-5 md:ml-5 md:p-10 p-2'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                  <p className='font-bold text-gray-700 md:mb-0 mb-4'>All Grooves</p>

                  <div className='flex justify-start items-center'>
                    {
                      userType === 'Groover' && (
                        <div
                          onClick={() => navigate(`/dashboard/request-groove`)}
                          className='bg-[#FFD101] text-[#292D32] justify-between cursor-pointer flex items-center text-xs md:text-sm font-bold px-4 md:px-8 py-2 rounded-lg'>
                          <span className='mr-2 text-xl'>+</span> <span>Request Groove</span>
                        </div>
                      )
                    }

                    {
                      userType === 'Groovie' && (
                        <div
                          onClick={() => navigate(`/dashboard/create-groove`)}
                          className='bg-[#FFD101] text-[#292D32] justify-between cursor-pointer flex items-center text-sm font-bold px-4 md:px-8 py-2 rounded-lg'>
                          <span className='mr-2 text-xl'>+</span> <span>Create Groove</span>
                        </div>
                      )
                    }

                    {/* <div className='ml-2 -mt-2'>
                      <SelectInputField data={[]} placeholder='Sort by Groove' name={''} onChange={undefined} label={''} />
                    </div> */}
                  </div>
                </div>
                {
                  myGrooves?.length > 0 && myGrooves.map((groovy: any, index: any) => (
                    <div key={`groove-${index}`} className='w-full mt-5'>
                      <div className=''>
                        <MyGrooveCard myGroove={groovy} />
                      </div>
                    </div>
                  ))
                }

                {
                  myGrooves?.length === 0 && (
                    <EmptyGrooveState imageSrc={''} message='You currently have no available grooves.' />
                  )
                }
              </div>
            </div>
          )
        }

      </section>


    </div>
  )
}

export default MyGrooves
