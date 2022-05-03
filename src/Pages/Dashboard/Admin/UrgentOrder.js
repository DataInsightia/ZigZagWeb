import React, { Fragment,useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../Staf/Style/Styles'
import { Dialog, Transition } from '@headlessui/react'
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
// import { toast } from 'react-toastify'

function UrgentOrder() {

  const [formData, setFormData] = useState({
    order_id: '',
    mobile: '',
    staff_id: '',
    due_date: '',
    urgent_date: ''
  })

  // const notify = (detail) => toast(`${detail}`)
  const [staff, setStaff] = useState([])
  const [orderid,setOrderID] = useState('')
  const [orderPendingWork,setOrderPending] = useState([]);
  const [orderPendingWorkBool,setOrderWorkBool] = useState(false);
  const [openSearch,setOpenSearch] = useState(false);
  const [urgentOrders,setUrgentOrder] = useState([]);

  useEffect( () => {
    const get = async () => {
      await axios.get(API + '/api/staff/').then((res) => {
        setStaff(res.data);
        setOpenSearch(true);
      })
    }

    axios.get(`${API}/api/urgent_order/`).then(res => {
      setUrgentOrder(res.data.data);
      console.log(res.data.data);
    }).catch(err => console.log(err));

    get()
  }, [])

  
  // const { order_id, work_id, staff_id, assign_stage } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const fetch_pending_work = (orderid) => axios.post(API +'/api/customer_completed_orders_by_order/',{order_id : orderid}).then((res) => {
      if (res.data.status === true) {
        setOrderPending(res.data.data)
        setOrderWorkBool(true);
        if (res.data.data.length <= 0) {
            alert(res.data.message);
            setOrderWorkBool(false);
        }
        console.log(res.data);
      } else {
        alert("Order Not Found!")
        setOrderPending([]);
        setOrderWorkBool(false)
      }
    });

  const getPendingWork = (e) => {
    fetch_pending_work(e.target.order_id.value);
    e.preventDefault();
  }

  let [isOpen, setIsOpen] = useState(false)
  let [message, setMessage] = useState('')

  function closeModal () {
    setIsOpen(false)
    setMessage()
  }

  function openModal() {
    setIsOpen(true)
  }

  const onOrderChange = (e) => setOrderID(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault()

    axios.post(`${API}/api/urgent_order/`,{
      id : e.target.id.value,
      order_id : e.target.order_id.value,
      staff_id : e.target.staff_id.value,
      order_work_label : e.target.order_work_label.value,
      due_date : e.target.due_date.value,
      mobile : e.target.mobile.value,
     urgent_date : new Date(formData.urgent_date).toISOString().split('T')[0],
    }).then(res => {
      // e.target.id.value = ""
      // e.target.order_id.value = ""
      // e.target.work_id.value = ""
      // e.target.staff_id.value = ""
      // e.target.order_work_label.value = ""
      // e.target.due_date.value = ""
      // formData.urgent_date = ""
      alert(res.data.message);

      window.location.reload();

    }).catch(err => console.log(err));


    // openModal()
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
      {openSearch ? (
        <div className="p-10 mt-10">
          <div>
              <h1 className={'uppercase text-center text-4xl m-10'}>urgent delivery</h1>
              <div className='flex justify-center'>

                <div className={styles.title}>Search Orders</div>
                    <form onSubmit={(e) => {getPendingWork(e)}}>
                        <div className="flex">
                            <input type="text" name={'order_id'} className='uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2 mr-2' onChange={onOrderChange} value={orderid} placeholder={'Order ID'} />
                            <input type="submit" className={styles.check_button} value={'GET'} />
                        </div>
                    </form>
                </div>
              <div>
                <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block py-2 min-w-full">
                    <div className="overflow-hidden ">
                      {
                        orderPendingWorkBool ? (
                        <table className="min-w-full bg-white">
                          <thead>
                            <tr className="bg-gradient-to-r from-rose-600 to-rose-500">
                                <div className="flex flex-wrap">
                                  <div className="lg:w-1/6">
                                    <th scope="col" className={styles.tablehead}>
                                      ORDER ID
                                    </th>
                                  </div>
                                  <div className="lg:w-1/6">
                                    <th scope="col" className={styles.tablehead}>
                                      CUSTOMER MOBILE
                                    </th>
                                  </div>
                                  <div className="lg:w-1/6">
                                    <th scope="col" className={styles.tablehead}>
                                      Sub-Work
                                    </th>
                                  </div>
                                  <div className="lg:w-1/6">
                                    <th scope="col" className={styles.tablehead}>
                                      STAFF NAME
                                    </th>
                                  </div>
                                  <div className="lg:w-1/6">
                                    <th scope="col" className={styles.tablehead}>
                                      ACTUAL DUE DATE
                                    </th>
                                  </div>
                                  <div className="lg:w-1/6">
                                    <th scope="col" className={styles.tablehead}>
                                      URGENT DATE
                                    </th>
                                  </div>
                                  <div className="lg:w-1/6">
                                    <th scope="col" className={styles.tablehead}></th>
                                  </div>
                                </div>
                            </tr>
                          </thead>
                        </table>
                        ) : ""
                      }
                    </div>
                  </div>
                </div>
              </div>


                {orderPendingWork.map((e) => (
                  <form onSubmit={onSubmit} className="bg-white">
                    <div className="flex flex-wrap">
                      <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                        <input
                          type="text"
                          id="id"
                          name="id"
                          value={e.id}
                          disabled
                          hidden
                        />
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
                          id="mobile"
                          name="mobile"
                          value={e.order.customer.mobile}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                          disabled

                        />
                      </div>
                      <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                        <input
                          type="text"
                          id="order_work_label"
                          name="order_work_label"
                          value={e.order_work_label}
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

                          {staff.map((e) => (
                            <option value={e.staff_id}>{e.staff_name}</option>
                          ))}
                        </select>
                      </div>


                      <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                      <input
                          type="text"
                          id="due_date"
                          name="due_date"
                          value={e.order.due_date}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                          disabled

                        />
                      </div>


                      <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                  minDate={new Date()}
                                label="Due Date"
                                mask="__/__/____"
                                inputFormat="dd/MM/yyyy"
                                name={'urgent_date'}
                                value={formData.urgent_date}
                                onChange={(newValue) => {
                                  setFormData({...formData,'urgent_date' : newValue});
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                          </LocalizationProvider>
                      </div>

                      <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                        <div className="flex justify-between">
                          <button
                            onClick={onChange}
                            type="submit"
                            className={styles.pinkbutton}
                          >
                            INFORM
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="h-2"></div>
                  </form>
                ))}

              </div>
          </div>
        </div>
      ) : (
          <div className={'m-20 text-center'}>No Record Found!</div>
      )}



      <table className="min-w-full bg-white">
        {/*<thead>*/}
        {/*  <tr className="bg-gradient-to-r from-rose-600 to-rose-500">*/}
        {/*      <div className="flex flex-wrap">*/}
        {/*        <div className="lg:w-1/6">*/}
        {/*          <th scope="col" className={styles.tablehead}>*/}
        {/*            ORDER ID*/}
        {/*          </th>*/}
        {/*        </div>*/}
        {/*        <div className="lg:w-1/6">*/}
        {/*          <th scope="col" className={styles.tablehead}>*/}
        {/*            CUSTOMER MOBILE*/}
        {/*          </th>*/}
        {/*        </div>*/}
        {/*        <div className="lg:w-1/6">*/}
        {/*          <th scope="col" className={styles.tablehead}>*/}
        {/*            Sub-Work*/}
        {/*          </th>*/}
        {/*        </div>*/}
        {/*        <div className="lg:w-1/6">*/}
        {/*          <th scope="col" className={styles.tablehead}>*/}
        {/*            STAFF NAME*/}
        {/*          </th>*/}
        {/*        </div>*/}
        {/*        <div className="lg:w-1/6">*/}
        {/*          <th scope="col" className={styles.tablehead}>*/}
        {/*            ACTUAL DUE DATE*/}
        {/*          </th>*/}
        {/*        </div>*/}
        {/*        <div className="lg:w-1/6">*/}
        {/*          <th scope="col" className={styles.tablehead}>*/}
        {/*            URGENT DATE*/}
        {/*          </th>*/}
        {/*        </div>*/}
        {/*        <div className="lg:w-1/6">*/}
        {/*          <th scope="col" className={styles.tablehead}></th>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*  </tr>*/}


        {/*</thead>*/}
        {/*{*/}
        {/*    urgentOrders.map(e =>*/}
        {/*        <tr>*/}
        {/*          {JSON.stringify(e.order.order_id)}*/}
        {/*          <td>{e.order.order_id}</td>*/}
        {/*          <td>{e.order.customer.mobile}</td>*/}
        {/*          <td>{e.order.order_work_label}</td>*/}
        {/*          <td>{e.staff.staff_name}</td>*/}
        {/*          <td>{e.order.due_date}</td>*/}
        {/*          <td>{e.urgent_date}</td>*/}
        {/*        </tr>)*/}
        {/*  }*/}

        <tr className={'bg-rose-500 text-white text-lg font-bold text-center '}>
          <th>ORDER ID</th>
          <th>CUSTOMER MOBILE</th>
          <th>ORDER WORK LABEL</th>
          <th>STAFF NAME</th>
          <th>DUE DATE</th>
          <th>URGENT_DATE</th>
        </tr>

        {urgentOrders.length > 0 ? (
                 urgentOrders.map(e =>
                <tr className={'text-center text-sm'}>

                  <td>{e.order.order_id}</td>
                    <td>{e.order.customer.mobile}</td>
                    <td>{e.order_work_label}</td>
                    <td>{(e.staff !== null ? e.staff.staff_name : "No Staff")}</td>
                    <td>{e.order.due_date}</td>
                    <td>{e.urgent_date}
                        <span className="flex h-3 w-3">
                           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          <span className="animate-ping h-full w-full rounded-full bg-red-400 opacity-75">Urgent</span>
                        </span>
                </td>

                  {/*{JSON.stringify(e.order.order_id)}*/}

                </tr>)
        ) : ""}
      </table>

    </div>
  )
}

export default UrgentOrder
