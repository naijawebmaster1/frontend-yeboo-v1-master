import { useEffect, useState } from 'react'
import Header from '../../components/block-components/header/header'
import YebboBack from '../../components/base-components/back/yebooBack'
import SelectInputField from '../../components/block-components/input/selectInputField'
import MyOrderCard from '../../components/base-components/order/myOrderCard'
import PageTitle from '../../layout/pageTitle/pageTitle'
import { useSelector } from 'react-redux';
import userService from '../../services/actions/userActions'
import { sortGrooveStatus } from '../../services/constants/dataConstants'
import Loader from '../../components/block-components/loader/loader'
import EmptyOrderState from '../../components/base-components/emptyState/emptyOrderState'
import { useLocation } from 'react-router-dom'
import { FilterUserOrderByStatus, formatOrderDate } from '../../services/utils/helpersFunc'


function Orders() {
  const location = useLocation()
  const { token } = useSelector((state: any) => state.login)
  const [orders, setOrders] = useState<any>()
  const searchParams = new URLSearchParams(location.search);

  const status = searchParams.get('status')
  useEffect(() => {
    window.scrollTo(0, 0)
    const getOrders = async () => {
      const res = await userService.getMyGrooveOrders({ token })
      if (res) {
        setOrders(res.data)
      }
    }

    getOrders()

  }, [])
  return (
    <div>
      <Header pageTitle='Orders' />
      {!orders && <Loader />}

      {orders && (
        <section className='mx-auto max-w-7xl items-center p-6'>

          <PageTitle title='Orders' />

          <YebboBack
            title=''
            screenDetails={['Grooves', 'Orders']}
          />

          {/* SECTION STARTS HERE */}

          {
            orders && (
              <div className='w-full mt-5 md:mt-10 flex flex-col md:flex-row justify-between '>
                <div className='w-full bg-white md:mt-5 md:ml-5 md:p-10 p-2'>
                  <div className='flex flex-row md:flex-row justify-between items-center'>
                    <p className='font-bold text-gray-700 md:mb-0 mb-4 uppercase block'>{status ? status : "All"} Orders</p>

                    {!status && orders?.length > 0 && (
                      <div className='flex justify-start items-center'>
                        <div className='ml-2 -mt-2'>
                          <SelectInputField value='' data={sortGrooveStatus} placeholder='Sort by Groove status' name={''} onChange={undefined} label={''} />
                        </div>
                      </div>
                    )}

                  </div>

                  {
                    status && orders.length > 0 && FilterUserOrderByStatus(orders, status).map((order: any) => (
                      <div key={order._id} className='w-full mt-5'>
                        <div className=''>
                          <MyOrderCard order={order} />
                        </div>
                      </div>
                    ))
                  }

                  {
                    orders && !status && orders?.map((order: any) => (
                      <div key={order.id} className='w-full mt-5'>
                        <div className=''>
                          <MyOrderCard order={order} />
                        </div>
                      </div>
                    ))
                  }

                  {orders && orders?.length === 0 && !status && <EmptyOrderState imageSrc={''} message={"There's currently no order"} />}
                  {status && FilterUserOrderByStatus(orders, status).length === 0 && <EmptyOrderState imageSrc={''} message={`There's currently no ${status} order`} />}


                </div>
              </div>
            )
          }


        </section>
      )}



    </div>
  )
}

export default Orders