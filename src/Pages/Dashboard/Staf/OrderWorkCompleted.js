import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../Staf/Style/Styles'
import API from '../../../api'

function OrderWorkCompleted() {
  const [workcompleted, setworkcompleted] = useState([])
  const [filteredData, setFilteredData] = useState(workcompleted)


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
        if (res.data.status === true) {
          setworkcompleted(res.data.data)
          setFilteredData(res.data.data)
        } else {
        setworkcompleted([])
        }
      })
  }, [])

  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = workcompleted.filter((data) => {
      return data.orderworkstaffassign.order.order_id.search(value) != -1
    })
    setFilteredData(result)
  }

  return (
    <div>
      
        <div className="p-10 md:mt-10">
        <div className="flex overflow-auto  justify-between mb-10">
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => handleSearch(event)}
            className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
          />
        </div>
          <div>
            <h1 className={styles.title}>Completed Works</h1>

            <div class="flex flex-col shadow-lg bg-white">
              <div class="overflow-x-auto">
                <div class="inline-block min-w-full ">
                  <div class="overflow-hidden">
                    <table class="min-w-full bg-white">
                      <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
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
                                Sub-works
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
            {filteredData.map((e) => (
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
