import React, { Fragment,useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../Staf/Style/Styles'
import { Dialog, Transition } from '@headlessui/react'


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
  return response
}

function StaffWorkTaken() {
  const [order, setOrders] = useState([])
  const [assingedworks, setAssingedWorks] = useState([])
  const [assingedworksbool, setAssingedWorksbool] = useState(false)
  const [takenworks, settakenworks] = useState([])
  const [takenworksbool, settakenworksbool] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  let [message, setMessage] = useState('')
  const [filteredData, setFilteredData] = useState(assingedworks)
  const [ongoingfilteredData, setongoingFilteredData] = useState(takenworks)


  function closeModal () {
    fetchStaffOrders()
    setIsOpen(false)
    setMessage()
  }

  function openModal() {
    setIsOpen(true)
  }

  // get staff_id from local storage
  var staff_id = localStorage.getItem('login_id')

  const fetchStaffOrders = () =>{
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
          setFilteredData(res.data.data)
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
          setongoingFilteredData(res.data.data)
          settakenworksbool(true)
        } else {
          settakenworks([])
          settakenworksbool(false)
        }
      })
  }

  useEffect(() => {
    fetchStaffOrders()
  }, [])

  const [formData, setFormData] = useState({
    order_id: '',
    work_id: '',
    assigned_stage: '',
  })

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    var staff_id = localStorage.getItem('login_id')
   const res = await Taken_Work(
      e.target.order_id.value,
      e.target.work_id.value,
      staff_id,
      e.target.assign_stage.value,
      e.target.order_work_label.value,
    )
    openModal()
    setMessage(res.data.details)
  }

  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = assingedworks.filter((data) => {
      return data.orderworkstaffassign.order.order_id.search(value) != -1
    })
    setFilteredData(result)
  }
  const ongoinghandleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = takenworks.filter((data) => {
      return data.orderworkstaffassign.order.order_id.search(value) != -1
    })
    setFilteredData(result)
  }
  return (
    <div>
    
      {assingedworksbool ? (
        <div className=" p-10 md:mt-10">
           <div className="flex overflow-auto  justify-between  md:mt-10 p-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => handleSearch(event)}
          className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
        />
      </div>
          <div className="p-3">
            <h1 className={styles.title}>Pending Work</h1>

            <div class="flex flex-col bg-white shadow-lg ">
              <div class="overflow-x-auto">
                <div class="inline-block py-2 min-w-full ">
                  <div class="overflow-hidden">
                    <table class="min-w-full ">
                      <thead className="">
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
                                Sub Work
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
            {filteredData.map((e) => (
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
            <div className="flex overflow-auto  justify-between  md:mt-10 p-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => ongoinghandleSearch(event)}
          className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
        />
      </div>
          <div className="p-3">
            <h1 className={styles.title}>On Going Works</h1>

            <div class="flex flex-col bg-white shadow-lg">
              <div class="overflow-x-auto">
                <div class="inline-block py-2 min-w-full ">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead className="">
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
                                Sub Work
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
            {ongoingfilteredData.map((e) => (
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

export default StaffWorkTaken
