import React, { Fragment,useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../Staf/Style/Styles'
import { Dialog, Transition } from '@headlessui/react'
// import { toast } from 'react-toastify'

function OrderWorkStaffAssign() {

  const [formData, setFormData] = useState({
    order_id: '',
    work_id: '',
    staff_id: '',
    assign_stage: '',
  })

  const Assign_Work = async (
    id,
    order_id,
    work_id,
    staff_id,
    assign_stage,
    order_work_label,
    material_location
  
  ) => {
    console.log(material_location)
    const response = await axios.post(API + '/api/staff_work_assign/',
      {
        id,
        order_id,
        work_id,
        staff_id,
        assign_stage,
        order_work_label,
        material_location
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
      { withCredentials: true },
    )
    // notify(response.data.details)
    console.log(response.data);
    return response
    // window.location.reload()
  }
  // const notify = (detail) => toast(`${detail}`)
  const [staff, setStaff] = useState([])
  const [orderid,setOrderID] = useState('')
  const [pendingworks, setPendingworks] = useState([])
  const [orderPendingWork,setOrderPending] = useState([])
  const [orderPendingWorkBool,setOrderWorkBool] = useState(false);
  const [pendingworksbool, setPendingworksbool] = useState(false)


  const fetchUnAssignedWorks = async () =>{
  await axios.get(API +'/api/staff_work_assign/').then((res) => {
      if (res.data.status === true) {
        console.log(res.data.data)
        setPendingworks(res.data.data)
        setPendingworksbool(true)
      } else {
        setPendingworks([])
        setPendingworksbool(false)
      }
    })
  }
  useEffect(() => {
      const get = async () => {
      await fetchUnAssignedWorks()
      await  axios.get(API +'/api/staff/').then((res) => setStaff(res.data))
      }
      get()
  }, [])

  
  // const { order_id, work_id, staff_id, assign_stage } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const fetch_pending_work = (orderid) => axios.post(API +'/api/staff_work_assign_by_order/',{order_id : orderid}).then((res) => {
      if (res.data.status === true) {
        setOrderPending(res.data.data)
        setOrderWorkBool(true);
        if (res.data.data.length <= 0) {
            alert("Order ID Not Found!");
        }
      } else {
        setOrderPending([]);
        setOrderWorkBool(false)
      }
    });

  const getPendingWork = (e) => {
    fetch_pending_work(e.target.order_id.value)
    e.preventDefault()
  }

  let [isOpen, setIsOpen] = useState(false)
  let [message, setMessage] = useState('')

  function closeModal () {
    fetchUnAssignedWorks()
    setIsOpen(false)
    setMessage()
  }

  function openModal() {
    setIsOpen(true)
  }

  const onOrderChange = (e) => setOrderID(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target.material_location.value)
   const res = await Assign_Work(
      e.target.id.value,
      e.target.order_id.value,
      e.target.work_id.value,
      e.target.staff_id.value,
      e.target.assign_stage.value,
      e.target.order_work_label.value,
      e.target.material_location.value,
    )
     e.target.id.value = ""
      e.target.order_id.value = ""
      e.target.work_id.value = ""
      e.target.staff_id.value = ""
      e.target.assign_stage.value = ""
      e.target.order_work_label.value = ""
      e.target.material_location.value = ""
    openModal()
    // setMessage(res.data.details)
  }

  return (
    <div>
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
      {pendingworksbool ? (
        <div className="p-10 mt-10">
          <div className="p-3 bg-white shadow-xl">
            <div className='flex justify-center'>

              <div className={styles.title}>Search Orders</div>
              <form onSubmit={(e) => {getPendingWork(e)}}>
                <div className="flex">
                <input type="text" name={'order_id'} className='uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2 mr-2' onChange={onOrderChange} value={orderid} placeholder={'Order ID'} />
                <input type="submit" className={styles.check_button} value={'Check'} />
                </div>
              </form>
            </div>
            <div>
              <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block py-2 min-w-full ">
                  <div className="overflow-hidden">
                    {
                      orderPendingWorkBool ? (<table className="min-w-full">
                      <thead>
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
                                Reference
                              </th>
                            </div>
                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}>
                                Staff
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
                          </div>
                        </tr>
                      </thead>
                    </table>) : ""
                    }
                  </div>
                </div>
              </div>
            </div>

            {orderPendingWork.map((e) => (
              <form onSubmit={onSubmit}>
                <div className="flex flex-wrap">
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={e.data.id}
                      disabled
                      hidden
                    />
                    <input
                      type="text"
                      id="order_id"
                      name="order_id"
                      value={e.data.order.order_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="work_id"
                      name="work_id"
                      value={e.data.work.work_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled

                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="order_work_label"
                      name="order_work_label"
                      value={e.data.order_work_label}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled

                    />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <select
                      id="staff_id"
                      name="staff_id"
                      onChange={onChange}
                      className={styles.select}
                    >
                      <option selected>Please select</option>
                        {
                            // (T - {e.takenOrders}) | (A - {e.assignOrders})  | (N - {e.nottakenOrders})
                        }
                      {staff.map((e) => (
                        <option value={e.staff_id}>{e.staff_name} (T - {e.takenOrders}) | (A - {e.assignOrders})  | (N - {e.nottakenOrders})</option>
                      ))}
                    </select>
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <select
                      id="assign_stage"
                      name="assign_stage"
                      onChange={onChange}
                      className={styles.select}
                      required
                    >
                      <option selected value={''}>
                        Please select
                      </option>
                      {e.nextstage.finishedassign.map((c) => (
                        <option value={c.stage} disabled>
                          {c.stage}
                        </option>
                      ))}
                      {e.nextstage.nextassign.map((c) => (
                        <option value={c.stage}>{c.stage}</option>
                      ))}
                    </select>
                  </div>


                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                        type="text"
                        name="material_location"
                        value={e.data.material_location}
                        className="uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                        required
                      />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <div className="flex justify-between">
                      <button
                        onClick={onChange}
                        type="submit"
                        className={styles.pinkbutton}
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-2"></div>

                <div></div>
              </form>
            ))}

              </div>
            <h1 className={styles.title}>Pending Orders to Assign</h1>

            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block py-2 min-w-full ">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead>
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
                                Reference
                              </th>
                            </div>
                            <div className="lg:w-1/6">
                              <th scope="col" className={styles.tablehead}>
                                Staff
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
                          </div>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {pendingworks.map((e) => (
              <form onSubmit={onSubmit}>
                <div className="flex flex-wrap">
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={e.data.id}
                      disabled
                      hidden
                    />
                    <input
                      type="text"
                      id="order_id"
                      name="order_id"
                      value={e.data.order.order_id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">

                    <input
                      type="text"

                      value={e.data.work.work_name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled

                    />
                     <input
                      type="text"
                      id="work_id"
                      name="work_id"
                      value={e.data.work.work_id}


                      hidden
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                      type="text"
                      id="order_work_label"
                      name="order_work_label"
                      value={e.data.order_work_label}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                      disabled

                    />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <select
                      id="staff_id"
                      name="staff_id"
                      onChange={onChange}
                      className={styles.select}
                    >
                      <option selected>Please select</option>
                      {staff.map((e) => (
                        <option value={e.staff_id}>{e.staff_name} (T - {e.takenOrders}) | (A - {e.assignOrders})  | (N - {e.nottakenOrders})</option>
                      ))}
                    </select>
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <select
                      id="assign_stage"
                      name="assign_stage"
                      onChange={onChange}
                      className={styles.select}
                    >
                      <option selected value={''}>
                        Please select
                      </option>
                      {e.nextstage.finishedassign.map((c) => (
                        <option value={c.stage} disabled>
                          {c.stage}
                        </option>
                      ))}
                      {e.nextstage.nextassign.map((c) => (
                        <option value={c.stage}>{c.stage}</option>
                      ))}
                    </select>
                  </div>


                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                        type="text"
                        name="material_location"
                        onChange={onChange}
                        className="uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                        required
                      />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className={styles.pinkbutton}
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-2"></div>

                <div></div>
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

export default OrderWorkStaffAssign
