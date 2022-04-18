import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../api'
import { useParams } from 'react-router-dom'

export default function DisplayList() {
  const { state } = useParams()
  const [nottakenworkstate, setNotTakenState] = useState(false)
  const [todayduedelivery, setTodayDueDeliveryState] = useState(false)
  const [weekduedelivery, setWeekDueDeliveryState] = useState(false)
  const [totalworks, setTotalWorksState] = useState(false)
  const [todaydueworks, setTodayDueworksState] = useState(false)
  const [weekdueworks, setWeekDueworksState] = useState(false)
  const [completedorders, setCompletedOrdersState] = useState(false)
  const [pendingorders, setPendingOrdersState] = useState(false)
  const [deliveryreadyorders, setDeliveryReadyOrdersState] = useState(false)
  const [customerorders, setCustomerOrdersState] = useState(false)
  const [takenworks, setTakenWorksState] = useState(false)


  

  const [fetch, setFetch] = useState()

  // const getList = async () => {
  //   const res = await axios.get(`${API}/api/display_dashboard/${state}/`)
  //   return res
  // }

  useEffect(async () => {
    if (state == 'not_taken_works') {
      const res = await axios.get(`${API}/api/display_dashboard/${state}/`)
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setNotTakenState(true)
    }
    else if (state == 'today_due_delivery') {
      const res = await axios.get(`${API}/api/display_dashboard/${state}/`)
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setTodayDueDeliveryState(true)
    } else if (state == 'week_due_delivery') {
      const res = await axios.get(`${API}/api/display_dashboard/${state}/`)
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setWeekDueDeliveryState(true)
    } else if (state == 'total_works') {
      const login_id = localStorage.getItem('login_id')
      const res = await axios.post(`${API}/api/display_dashboard/${state}/`, {
        login_id,
      })
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setTotalWorksState(true)
    } else if (state == 'taken_works') {
      const login_id = localStorage.getItem('login_id')
      const res = await axios.post(`${API}/api/display_dashboard/${state}/`, {
        login_id,
      })
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setTakenWorksState(true)
    } 
     else if (state == 'today_due_works') {
      const login_id = localStorage.getItem('login_id')
      const res = await axios.post(`${API}/api/display_dashboard/${state}/`, {
        login_id,
      })
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setTodayDueworksState(true)
    } else if (state == 'week_due_works') {
      const login_id = localStorage.getItem('login_id')

      const res = await axios.post(`${API}/api/display_dashboard/${state}/`, {
        login_id,
      })
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setWeekDueworksState(true)
    } else if (state == 'completed_orders') {
      const login_id = localStorage.getItem('login_id')

      const res = await axios.post(`${API}/api/display_dashboard/${state}/`, {
        login_id,
      })
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setCompletedOrdersState(true)
    } else if (state == 'pending_orders') {
      const login_id = localStorage.getItem('login_id')

      const res = await axios.post(`${API}/api/display_dashboard/${state}/`, {
        login_id,
      })
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setPendingOrdersState(true)
    } else if (state == 'delivery_ready_orders') {
      const login_id = localStorage.getItem('login_id')

      const res = await axios.post(`${API}/api/display_dashboard/${state}/`, {
        login_id,
      })
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setDeliveryReadyOrdersState(true)
    }
    else if (state == 'customer_orders') {
      const login_id = localStorage.getItem('login_id')

      const res = await axios.post(`${API}/api/display_dashboard/${state}/`, {
        login_id,
      })
      if (res.data.status) {
        setFetch(res.data.data)
      } else {
        setFetch([])
      }
      setCustomerOrdersState(true)
    }
    
  }, [])

  return (
    <div>
      {nottakenworkstate ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Not Taken Works
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Tailor Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assigned Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.staff.staff_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderworkstaffassign.assign_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {/* today due delivery */}
      {todayduedelivery ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Today Due Delivery
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                         Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Mobile
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Tailor Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assign Date 
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderwork.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderwork.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderwork.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderwork.customer.mobile}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.staff.staff_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderwork.order.booking_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderwork.order.due_date}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
      {/* week due delivery */}
      {weekduedelivery ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Week Due Delivery
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                         Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Mobile
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Tailor Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assign Date 
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderwork.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderwork.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderwork.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderwork.customer.mobile}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.staff.staff_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderwork.order.booking_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderwork.order.due_date}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

       {/* staff not taken works */}
       {takenworks ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Not Taken Works
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Tailor Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assigned Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.staff.staff_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderworkstaffassign.assign_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

        
      {/* staff total works */}
      {totalworks ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Total Works
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Tailor Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assigned Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.staff.staff_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderworkstaffassign.assign_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {/* today due work */}
      {todaydueworks ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Today Due Works
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                         Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Mobile
                        </th>

                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Tailor Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assign Date 
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.customer.mobile}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.staff.staff_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderworkstaffassign.order.booking_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderworkstaffassign.order.due_date}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {/* week due work */}
      {weekdueworks ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Week Due Works
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                         Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Mobile
                        </th>

                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Tailor Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assign Date 
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.order.customer.mobile}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.orderworkstaffassign.staff.staff_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderworkstaffassign.order.booking_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.orderworkstaffassign.order.due_date}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {/* delivery ready orders */}
      {deliveryreadyorders ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Delivery Ready Orders
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full  overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                         Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Mobile
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assign Date 
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.customer.mobile}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.order.booking_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.order.due_date}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {/* completed orders */}
      {completedorders ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Completed Orders
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Tailor Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assigned Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.staff.staff_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.assign_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {/*pending orders */}
      {pendingorders ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="w-full overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Pending Orders
                  </h2>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                         Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Mobile
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assign Date 
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.customer.mobile}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.order.booking_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.order.due_date}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {/* customer orders/ */}
      {customerorders ? (
        <>
          <div className="flex scroll md:mt-10 justify-center min-h-screen">
            <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
              <div className="py-4">
                <div>
                  <h2 className="text-2xl justify-center font-semibold uppercase">
                    Total Orders
                  </h2>
                </div>
                <div className="w-full  overflow-x-auto">
                  <table className="w-full  overflow-x-auto md:mt-3 shadow-lg">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                         Customer Name
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Customer Mobile
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Assign Date 
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetch.map((e) => (
                        <tr>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.order_id}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.work.work_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.customer.cust_name}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {e.order.customer.mobile}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.order.booking_date_time}`,
                            ).toDateString('en', 'TN')}
                          </td>
                          <td className="px-5 py-3 text-center text-xs font-light text-black bg-white uppercase tracking-wider">
                            {new Date(
                              `${e.order.due_date}`,
                            ).toDateString('en', 'TN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}
