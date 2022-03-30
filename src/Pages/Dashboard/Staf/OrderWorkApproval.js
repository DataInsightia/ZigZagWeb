import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../Staf/Style/Styles'
import { Dialog, Transition } from '@headlessui/react'
import Constants from '../../../constants/Constants'
import PaginationBar from '../../../widget/PaginationBar'

export const Order_Approval = async (
  order_id,
  work_id,
  staff_id,
  stage,
  state,
  order_work_label,
) => {
  const response = await axios.post(
    API + '/api/staff_work_assign_completion_app/',
    {
      order_id,
      work_id,
      staff_id,
      stage,
      state,
      order_work_label,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
    { withCredentials: true },
  )
  return response
  // window.location.reload()
}

function OrderWorkStaffApproval() {
  const [orderApproval, setorderApproval] = useState([])
  const [orderApprovalbool, setorderApprovalbool] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  let [message, setMessage] = useState('')
  const [filteredData, setFilteredData] = useState(orderApproval)

  const fetch_pending_completion_works = () => {
    axios.get(API + '/api/staff_work_assign_completion_app/').then((res) => {
      if (res.data.status === true) {
        setorderApproval(res.data.data)
        setFilteredData(res.data.data)
        setorderApprovalbool(true)
      } else {
        setorderApproval([])
        setorderApprovalbool(false)
      }
    })
  }

  useEffect(() => fetch_pending_completion_works(), [])

  function closeModal() {
    fetch_pending_completion_works()
    setIsOpen(false)
  }

  const openModal = () => setIsOpen(true)
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await Order_Approval(
      e.target.order_id.value,
      e.target.work_id.value,
      e.target.staff_id.value,
      e.target.stage.value,
      e.target.state.value,
      e.target.order_work_label.value,
    )

     // e.target.order_id.value = ""
     //  e.target.work_id.value = ""
     //  e.target.staff_id.value = ""
     //  e.target.stage.value = ""
     //  e.target.state.value = ""
     //  e.target.order_work_label.value =""

    if (res.data.status === true){
      openModal()
      setMessage('Order Approved Sucessfully')
      window.location.reload()
    }
    else{
      openModal()
      setMessage('Unable to Approve')
      window.location.reload()
    }
    
  }

  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = orderApproval.filter((data) => {
      return data.order.order_id.search(value) != -1
    })
    setFilteredData(result)
  }

  return (
    <div>
      {orderApprovalbool ? (
        <div className="p-10 mt-10">
          <div className="flex overflow-auto  justify-between mb-10">
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => handleSearch(event)}
            className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
          />
        </div>
          <div className="p-3 bg-white shadow-lg">
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
                                Sub Work
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
            {filteredData.map((e) => (
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
                    <select
                      id="state"
                      name="state"
                      className={styles.select}
                      required
                    >
                      <option>Please select</option>
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
      ) : (
        ''
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {message}
                </Dialog.Title>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default OrderWorkStaffApproval
