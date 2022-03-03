import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../Staf/Style/Styles'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Order_Approval = async (order_id, work_id, staff_id, stage,state,order_work_label) => {
  const response = await axios.post(
    '/api/staff_work_assign_completion_app/',
    {
      order_id,
      work_id,
      staff_id,
      stage,
      state,
      order_work_label
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
    { withCredentials: true },
  )
  window.location.reload()
}

function OrderWorkStaffApproval() {
  const [orderApproval, setorderApproval] = useState([])
  const [orderApprovalbool, setorderApprovalbool] = useState(false)

  useEffect(
    () =>
      axios
        .get('/api/staff_work_assign_completion_app/')
        .then((res) => {
          if (res.data.status === true) {
            setorderApproval(res.data.data)
            setorderApprovalbool(true)
          } else {
            setorderApproval([])
            setorderApprovalbool(false)
          }
          }),

    [],
  )

  const onSubmit = (e) => {
    e.preventDefault()
    Order_Approval(
      e.target.order_id.value,
      e.target.work_id.value,
      e.target.staff_id.value,
      e.target.stage.value,
      e.target.state.value,
      e.target.order_work_label.value
    )
  }

  return (
    <div>
      {orderApprovalbool?(
      <div className="bg-white p-10 mt-10">
        <div className="p-3 bg-white shadow-lg bg-opacity-25">
          <h1 className={styles.title}>Approval Orders</h1>

          <div class="flex flex-col">
            <div class="overflow-x-auto">
              <div class="inline-block py-2 min-w-full ">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <div className="flex flex-wrap">
                          <div className="lg:w-2/12">
                            <th scope="col" className={styles.tablehead}>
                              Order
                            </th>
                          </div>
                          <div className="lg:w-2/12">
                            <th scope="col" className={styles.tablehead}>
                              Work
                            </th>
                          </div>
                          <div className="lg:w-2/12">
                            <th scope="col" className={styles.tablehead}>
                              Reference
                            </th>
                          </div>
                          <div className="lg:w-1/12">
                            <th scope="col" className={styles.tablehead}>
                              Staff
                            </th>
                          </div>
                          <div className="lg:w-1/12">
                            <th scope="col" className={styles.tablehead}>
                              Stage
                            </th>
                          </div>
                          <div className="lg:w-2/12">
                            <th scope="col" className={styles.tablehead}>
                              Approval State
                            </th>
                          </div>
                          <div className="lg:w-2/12">
                            <th scope="col" className={styles.tablehead}></th>
                          </div>
                        </div>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {orderApproval.map((e) => (
            <form onSubmit={onSubmit}>
              <div className="flex flex-wrap">
                <div className="px-3 w-full md:w-1/2 lg:w-2/12">
                  <input
                    type="text"
                    id="order_id"
                    name="order_id"
                    value={e.order.order_id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                    disabled
                  />
                </div>
                <div className="px-3 w-full md:w-1/2 lg:w-2/12">
                  <input
                    type="text"
                    id="work_id"
                    name="work_id"
                    value={e.orderworkstaffassign.work.work_id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                    disabled
                  />
                </div>
                <div className="px-3 w-full md:w-1/2 lg:w-2/12">
                  <input
                    type="text"
                    id="order_work_label"
                    name="order_work_label"
                    value={e.orderworkstaffassign.order_work_label}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                    disabled
                  />
                </div>
                <div className="px-3 w-full md:w-1/2 lg:w-1/12">
                  <input
                    type="text"
                    id="staff_id"
                    name="staff_id"
                    value={e.staff.staff_id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                    disabled
                  />
                </div>
                <div className="px-3 w-full md:w-1/2 lg:w-1/12">
                  <input
                    type="text"
                    id="stage"
                    name="stage"
                    value={e.orderworkstaffassign.assign_stage}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                    disabled
                  />
                </div>
                <div className="px-3 w-full md:w-1/2 lg:w-2/12">
                  <select id="state" name="state" className={styles.select} required>
                    <option >Please select</option>
                    <option value={'approve'}>Approve</option>
                    <option value={'reassign'}>Re-Assign</option>
                  </select>
                </div>
                <div className="px-3 w-full md:w-1/2 lg:w-2/12">
                  <div className="flex justify-between">
                    <button type="submit" className={styles.pinkbutton}>
                      Sent
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-2"></div>
            </form>
          ))}
        </div>
      </div>
      ):''}
    </div>
  )
}

export default OrderWorkStaffApproval
