import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../Staf/Style/Styles'
import API from '../../../api'

function OrderWorkCompleted() {
  const [workcompleted, setworkcompleted] = useState([])

  // get staff_id from local storage
  var staff_id = localStorage.getItem('login_id')

  useEffect(() => {
    axios
      .post(API +
        '/api/work_completed/',
        {
          staff_id,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.status === true) {
          console.log(res.data.data)
          setworkcompleted(res.data.data)
        } else {
        setworkcompleted([])
        }
      })
  }, [])

  return (
    <div>
      
        <div className="bg-white p-10 mt-10">
          <div className="p-3 bg-white shadow-lg bg-opacity-25">
            <h1 className={styles.title}>Completed Works</h1>

            <div class="flex flex-col">
              <div class="overflow-x-auto">
                <div class="inline-block py-2 min-w-full ">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead>
                        <tr>
                          <div className="flex flex-wrap">
                            <div className="lg:w-1/4">
                              <th scope="col" className={styles.tablehead}>
                                Order
                              </th>
                            </div>
                            <div className="lg:w-1/4">
                              <th scope="col" className={styles.tablehead}>
                                Work
                              </th>
                            </div>
                            <div className="lg:w-1/4">
                              <th scope="col" className={styles.tablehead}>
                                reference
                              </th>
                            </div>
                            <div className="lg:w-1/4">
                              <th scope="col" className={styles.tablehead}>
                                Stage
                              </th>
                            </div>
                          </div>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {workcompleted.map((e) => (
              <form>
                <div className="flex flex-wrap">
                  <div className="px-3 w-full md:w-1/2 lg:w-1/4">
                    <input
                      type="text"
                      id="order_id"
                      name="order_id"
                      value={e.orderworkstaffassign.order.order_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/4">
                    <input
                      type="text"
                      id="work_id"
                      name="work_id"
                      value={e.orderworkstaffassign.work.work_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/4">
                    <input
                      type="text"
                      id="work_id"
                      name="work_id"
                      value={e.orderworkstaffassign.order_work_label}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/4">
                    <input
                      type="text"
                      id="assign_stage"
                      name="assign_stage"
                      value={e.orderworkstaffassign.assign_stage}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                </div>
                <div className="h-2"></div>
              </form>
            ))}
          </div>
        </div>
     
    </div>
  )
}

export default OrderWorkCompleted
