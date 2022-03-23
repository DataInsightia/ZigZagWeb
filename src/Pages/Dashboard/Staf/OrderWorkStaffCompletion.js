import React, {Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../Staf/Style/Styles'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { Nav } from '@material-tailwind/react'
import { Dialog, Transition } from '@headlessui/react'

export const Stage_Completion_Request = async (
  order_id,
  work_id,
  staff_id,
  date,
  stage,
  order_work_label,
) => {
  const response = await axios.post(
    API + '/api/staff_stage_completion/',
    {
      order_id,
      work_id,
      staff_id,
      date,
      stage,
      order_work_label,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
    { withCredentials: true },
  )
  return response
}


function OrderWorkStaffCompletion() {
  const [redirect,setRedirect] = useState(false);
  const [completion, setcompletion] = useState([])
  const [completionbool, setcompletionbool] = useState(false)
  const [completionreview, setcompletionreview] = useState([])
  const [completionreviewbool, setcompletionreviewbool] = useState(false)
  const staff = localStorage.getItem('login_id')
  let [isOpen, setIsOpen] = useState(false)
  let [message, setMessage] = useState('')

  function closeModal () {
    fetchStaffCompletion()
    setIsOpen(false)
    setMessage()
  }

  function openModal() {
    setIsOpen(true)
  }

  const fetchStaffCompletion = () =>{
    axios
    .post(
      API + '/api/staff_work_assign_completion/',
      {
        staff,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
      { withCredentials: true },
    )
    .then((res) => {
      if (res.data.status === true) {
        setcompletion(res.data.data)
        setcompletionbool(true)
      } else {
        setcompletion([])
        setcompletionbool(false)
      }
    })
  axios
    .post(
      API + '/api/staff_work_completion_review/',
      {
        staff,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
      { withCredentials: true },
    )
    .then((res) => {
      if (res.data.status === true) {
        setcompletionreview(res.data.data)
        setcompletionreviewbool(true)
      } else {
        setcompletionreview([])
        setcompletionreviewbool(false)
      }
    })
  }
  useEffect(() => {
    fetchStaffCompletion()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    var staff_id = localStorage.getItem('login_id')
   const res = await Stage_Completion_Request(
      e.target.order_id.value,
      e.target.work_id.value,
      staff_id,
      e.target.date.value,
      e.target.assign_stage.value,
      e.target.order_work_label.value,
    )



    // Stroring MaterialLocation in Backend

    axios
      .post(API + '/api/material/', {
        material_location: e.target.material_location.value,
        staff_id: staff_id,
        order_id: e.target.order_id.value,
      })
      .then((res) => {
        if (res.data.status) { 
          openModal()
            setMessage("Material Location Updated")
          // alert("Material Location Updated");
            // setRedirect(true);
         }
      })
      .catch((err) => console.log(err))
  }

  const current = new Date()
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`

  return (redirect) ? (<Navigate to="/dashboard/dhome/" />) : (
    <div>
      {completionbool ? (
        <div className=" p-10 md:mt-10">
          <div className="p-3">
            <h1 className={styles.title}>Staff Stage Completion</h1>
            <div class="flex flex-col bg-white shadow-lg">
              <div class="overflow-x-auto">
                <div class="inline-block py-2 min-w-full ">
                  <div class="overflow-hidden sm:rounded-lg">
                    <table class="min-w-full overflow-auto">
                      <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                        <tr>
                          <div className="flex flex-wrap">
                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}>
                                Order
                              </th>
                            </div>
                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}>
                                Work
                              </th>
                            </div>
                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}>
                                Sub-works
                              </th>
                            </div>
                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}>
                                Completion Date
                              </th>
                            </div>
                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}>
                                Stage
                              </th>
                            </div>

                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}>
                                Material Location
                              </th>
                            </div>
                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}></th>
                            </div>
                            <div className="lg:w-1/6">
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
            {completion.map((e) => (
              <form onSubmit={onSubmit} className="bg-white shadow-lg">
                <div className="flex flex-wrap">
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="order_id"
                      name="order_id"
                      value={e.order.order_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      value={e.orderworkstaffassign.work.work_name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2"
                      disabled
                    />
                    <input
                      type="text"
                      id="work_id"
                      name="work_id"
                      value={e.orderworkstaffassign.work.work_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hidden w-full p-2"
                      hidden
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="order_work_label"
                      name="order_work_label"
                      value={e.orderworkstaffassign.order_work_label}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      name="date"
                      value={date}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="assign_stage"
                      name="assign_stage"
                      value={e.orderworkstaffassign.assign_stage}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="material_location"
                      name="material_location"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      required
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <div className="flex justify-between">
                      <button type="submit" className={styles.pinkbutton}>
                        Complete Order
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
      {/* reviews page  */}
      {completionreviewbool ? (
        <div className=" p-10 mt-10">
          <div className="p-3 bg-white shadow-xl">
            <h1 className={styles.title}>Review Works</h1>
            <div class="flex flex-col">
              <div class="overflow-x-auto">
                <div class="inline-block py-2 min-w-full ">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead>
                        <tr>
                          <div className="flex flex-wrap">
                            <div className="lg:w-1/5">
                              <th scope="col" className={styles.tablehead}>
                                Order
                              </th>
                            </div>
                            <div className="lg:w-1/5">
                              <th scope="col" className={styles.tablehead}>
                                Work
                              </th>
                            </div>
                            <div className="lg:w-1/5">
                              <th scope="col" className={styles.tablehead}>
                                Sub-works
                              </th>
                            </div>
                            <div className="lg:w-1/5">
                              <th scope="col" className={styles.tablehead}>
                                Completion Date
                              </th>
                            </div>
                            <div className="lg:w-1/5">
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
            {completionreview.map((e) => (
              <form onSubmit={onSubmit}>
                <div className="flex flex-wrap">
                  <div className="px-3 w-full md:w-1/2 lg:w-1/5">
                    <input
                      type="text"
                      id="order_id"
                      name="order_id"
                      value={e.order.order_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/5">
                    <input
                      type="text"
                      id="work_id"
                      name="work_id"
                      value={e.orderworkstaffassign.work.work_id}
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
                      name="date"
                      value={date}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/5">
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
                    Go ahead
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

export default OrderWorkStaffCompletion
