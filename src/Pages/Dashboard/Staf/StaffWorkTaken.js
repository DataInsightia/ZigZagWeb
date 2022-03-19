import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../Staf/Style/Styles'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Taken_Work = async (
  order_id,
  work_id,
  staff_id,
  assigned_stage,
  order_work_label
) => {
  const response = await axios.post(API +
    '/api/staff_work_take/',
    {
      order_id,
      work_id,
      staff_id,
      assigned_stage,
      order_work_label
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
    { withCredentials: true },
  )
  notify(response.data.details)
  window.location.reload()
}
const notify = (detail) => toast(`${detail}`)

function StaffWorkTaken() {
  const [order, setOrders] = useState([])
  const [assingedworks, setAssingedWorks] = useState([])
  const [assingedworksbool, setAssingedWorksbool] = useState(false)
  const [takenworks, settakenworks] = useState([])
  const [takenworksbool, settakenworksbool] = useState(false)

  // get staff_id from local storage
  var staff_id = localStorage.getItem('login_id')

  useEffect(() => {
    axios.get(API +'/api/orders/').then((res) => setOrders(res.data))
    axios
      .post(API +
        '/api/staff_work_assigned/',
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
          setAssingedWorks(res.data.data)
          setAssingedWorksbool(true)
        } else {
          setAssingedWorks([])
          setAssingedWorksbool(false)
        }
      })
    axios
      .post(API +
       '/api/staff_work_taken/',
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
          settakenworks(res.data.data)
          settakenworksbool(true)
        } else {
          settakenworks([])
          settakenworksbool(false)
        }
      })
  }, [])

  const [formData, setFormData] = useState({
    order_id: '',
    work_id: '',
    assigned_stage: '',
  })

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    var staff_id = localStorage.getItem('login_id')
    Taken_Work(
      e.target.order_id.value,
      e.target.work_id.value,
      staff_id,
      e.target.assign_stage.value,
      e.target.order_work_label.value,
    )
  }

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      {assingedworksbool ? (
        <div className=" p-10 mt-10">
          <div className="p-3">
            <h1 className={styles.title}>Take Orders</h1>
            <div class="flex flex-col bg-white shadow-lg text-black">
              <div class="overflow-x-auto">
                <div class="inline-block py-2 min-w-full ">
                  <div class="overflow-hidden">
                    <table class="min-w-full ">
                      <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                        <tr>
                          <div className="flex flex-wrap">
                            <div className="lg:w-1/5">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase">
                                Order
                              </th>
                            </div>
                            <div className="lg:w-1/5">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase">
                                Work
                              </th>
                            </div>
                            <div className="lg:w-1/5">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase">
                                Reference
                              </th>
                            </div>
                            <div className="lg:w-1/5">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase">
                                Stage
                              </th>
                            </div>
                            <div className="lg:w-1/5">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase"></th>
                            </div>
                          </div>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {assingedworks.map((e) => (
              <form onSubmit={onSubmit} className="bg-white shadow-lg">
                <div className="flex flex-wrap">
                  <div className="px-3 w-full md:w-1/2 lg:w-1/5">
                    <input
                      type="text"
                      id="order_id"
                      name="order_id"
                      value={e.orderworkstaffassign.order.order_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/5">
                    <input
                      type="text"
                      id="work_id"
                      name="work_id"
                      value={e.orderworkstaffassign.work.work_name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/5">
                    <input
                      type="text"
                      id="order_work_label"
                      name="order_work_label"
                      value={e.orderworkstaffassign.order_work_label}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/5">
                    <input
                      type="text"
                      id="assign_stage"
                      name="assign_stage"
                      value={e.taken_stage}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/5">
                    <div className="flex justify-between">
                      <button
                        onClick={onChange}
                        type="submit"
                        className={styles.pinkbutton}
                      >
                        Take
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-2"></div>
              </form>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
      {/* taken orders */}

      {takenworksbool ? (
        <div className="p-10 mt-10">
          <div className="p-3 bg-opacity-25">
            <h1 className={styles.title}>Taken Orders</h1>

            <div class="flex flex-col bg-white shadow-lg">
              <div class="overflow-x-auto">
                <div class="inline-block py-2 min-w-full ">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                        <tr>
                          <div className="flex flex-wrap">
                            <div className="lg:w-1/4">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase">
                                Order
                              </th>
                            </div>
                            <div className="lg:w-1/4">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase">
                                Work
                              </th>
                            </div>
                            <div className="lg:w-1/4">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase">
                                reference
                              </th>
                            </div>
                            <div className="lg:w-1/4">
                              <th scope="col" className="py-3 px-3 text-xl font-bold tracking-wider  text-black uppercase">
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
            {takenworks.map((e) => (
              <form onSubmit={onSubmit} className="bg-white shadow-lg">
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
                      value={e.orderworkstaffassign.work.work_name}
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
                      value={e.taken_stage}
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
      ) : (
        ''
      )}
    </div>
  )
}

export default StaffWorkTaken
