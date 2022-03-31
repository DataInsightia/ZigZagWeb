import React, { Fragment,useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../Staf/Style/Styles'
import { Dialog, Transition } from '@headlessui/react'
import {faChessKnight} from "@fortawesome/fontawesome-free-solid";
import {checkboxClasses} from "@mui/material";
// import { toast } from 'react-toastify'

function Delivery() {

  const [formData, setFormData] = useState({
    order_id: '',
    work_id: '',
    staff_id: '',
    assign_stage: '',
  })

  const [tmpDelivery,setTmpDelivery] = useState([]);

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
    // notify(response..details)
    console.log(response.data);
    return response
    // window.location.reload()
  }
  // const notify = (detail) => toast(`${detail}`)
  const [staff, setStaff] = useState([])
  const [orderid,setOrderID] = useState('')
  const [currentOrder,setCurrentOrder] = useState({})
  const [pendingworks, setPendingworks] = useState([])
  const [orderPendingWork,setOrderPending] = useState([])
  const [orderPendingWorkBool,setOrderWorkBool] = useState(false);
  const [pendingworksbool, setPendingworksbool] = useState(false);
  const [checkout_data,setCheckoutData] = useState({
    balance_amount : 0,
    current_amount : 0,
    pending_amount : 0
  });

  const delete_tmp_delivery = (orderid) => {
    axios.delete(API +'/api/tmp_delivery/',{"order_id" : orderid}).then((res) => {
      console.log(res.data.meassage);
    }).catch(err => err);
  }
  const fetchUnAssignedWorks = async () =>{
  await axios.get(API +'/api/order_assign_completed/').then((res) => {
    console.log(res.data)
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
      await  axios.get(API +'/api/tmp_delivery/').then((res) => setTmpDelivery(res.data.data))
      await  axios.get(API +'/api/staff/').then((res) => setStaff(res.data))
      }
      get();
  }, [])

    var date = (new Date()).toLocaleDateString('en-GB')

  // const { order_id, work_id, staff_id, assign_stage } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleCheckout = (e) =>
    setCheckoutData({ ...checkout_data, [e.target.name]: parseInt(e.target.value) !== null && e.target.value.length !== 0 ? parseInt(e.target.value) : 0 })

  const fetch_pending_work = (orderid) => axios.post(API +'/api/order_assign_completed/',{order_id : orderid}).then((res) => {
    console.log(res.data)
      if (res.data.status === true) {
        setOrderPending(res.data.data)
        setCheckoutData({ ...checkout_data, ['balance_amount']: res.data.data[0].order.balance_amount })
        setOrderWorkBool(true)
      } else {
        setOrderPending([])
        setOrderWorkBool(false)
      }
    });

  const getPendingWork = (e) => {
    fetch_pending_work(e.target.order_id.value)
    e.preventDefault()
  }

  const getOrder = (e) => {
    axios.get(`${API}/api/find_order/${e.target.order_id.value}`)
        .then(res => {
          // setCheckoutData({...checkout_data,['balance_amount'] : currentOrder.balance_amount})
          console.log()
          setCurrentOrder(res.data)
          console.log(res.data)
        })
        .catch(err => console.log(err))
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


  const printDelivery = (e) => {
    const balance_amount = e.target.balance_amount.value;
    const current_amount = e.target.current_amount.value;
    const pending_amount = e.target.pending_amount.value;
    console.log(balance_amount,current_amount,pending_amount)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
   // const res = await Assign_Work(
   //    e.target.id.value,
   //    e.target.order_id.value,
   //    e.target.work_id.value,
   //    e.target.staff_id.value,
   //    e.target.assign_stage.value,
   //    e.target.order_work_label.value,
   //    e.target.material_location.value,
   //  )

    axios.post(`${API}/api/tmp_delivery/`,{
      "order_id" : e.target.order_id.value,
      "staff_id" : e.target.staff_id.value,
      "order_work_label" : e.target.order_work_label.value,
    }).then(res => {
        alert(JSON.stringify(res.data));
    }).catch(err => console.log(err))
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
                    onClick={(e) => {
                        closeModal(e);
                        window.location.reload();
                    }}
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
              <form onSubmit={(e) => {getPendingWork(e);getOrder(e)}}>
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
                                Date
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
                      required
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
                    <input
                        className="form-control block font-bold  w-full mb-8 px-3 py-3 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type={'text'}
                        defaultValue={date}
                        required
                        disabled
                    />
                  </div>

                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className={styles.pinkbutton}
                      >
                        Delivery
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-2"></div>

                <div></div>
              </form>
            ))}


              { orderPendingWorkBool ? (<div className={'text-lg m-10'}>
              <h1 className={styles.title}>Items to Deliver</h1>
              <div className={'flex'}>
                <table className={'border-collapse text-center'}>
                  <tr>
                    <th className={'border border-slate-600 p-2'}>ORDER ID</th>
                    <th className={'border border-slate-600 p-2'}>ORDER WORK LABEL</th>
                    <th className={'border border-slate-600 p-2'}>STAFF NAME</th>
                    <th className={'border border-slate-600 p-2'}>DATE</th>
                  </tr>
                  {
                  tmpDelivery.map(e => <tr>
                    <td className={'border border-slate-600 p-2'}>{e.order.order_id}</td>
                    <td className={'border border-slate-600 p-2'}>{e.order_work_label}</td>
                    <td className={'border border-slate-600 p-2'}>{e.staff.staff_name}</td>
                    <td className={'border border-slate-600 p-2'}>{new Date().toLocaleDateString()}</td>
                  </tr>)
                  }
                </table>
                <div className={'border-2 p-2 m-2'}>
                  <form onSubmit={printDelivery}>
                    <p className={'m-1'}>Old Balance : <input name={'balance_amount'} className={'border-2'} type={'text'} defaultValue={checkout_data.balance_amount} onChange={handleCheckout} disabled/></p>
                    <div className={'flex'}>
                      <p className={'m-1'}>Current Payment : <input name={'current_amount'} className={'border-2'} type={'text'} defaultValue={0} onChange={(e) => {
                        handleCheckout(e);
                        setCheckoutData({...checkout_data,['pending_amount'] : (checkout_data.balance_amount - e.target.value)})
                      }}/></p>
                      {/*<input type={'submit'} className={'bg-rose-500 text-white rounded-xl p-1 font-bold'} value={'Get Pending Amount'} onClick={(e) => {*/}
                      {/*          e.preventDefault();console.log(checkout_data.current_amount);*/}
                      {/*}}/>*/}
                    </div>
                    <p className={'m-1'}>Pending Amount : <input name={'pending_amount'} className={'border-2'} type={'text'} value={checkout_data.pending_amount} onChange={(e) => {
                      // handleCheckout(e);
                      setCheckoutData({...checkout_data,[e.target.name]: (parseInt(checkout_data.balance_amount) - parseInt(checkout_data.current_amount))})
                    }} /></p>

                    <input type={'submit'} className={'bg-rose-500 text-white rounded-xl p-1 font-bold'} value={'Print Delivery'} />
                    {JSON.stringify(checkout_data)}
                  </form>

                </div>
              </div>
            </div>) : "" }

              </div>


            <h1 className={styles.title}>Pending Orders to Delivery</h1>

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
                                Date
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
                      // value={e.data.id}
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
                      required
                    >
                      <option selected>Please select</option>
                      {staff.map((e) => (
                        <option value={e.staff_id}>{e.staff_name} (T - {e.takenOrders}) | (A - {e.assignOrders})  | (N - {e.nottakenOrders})</option>
                      ))}
                    </select>
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <input
                        className="form-control block font-bold  w-full mb-8 px-3 py-3 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type={'text'}
                        defaultValue={date}
                        required
                        disabled
                    />
                  </div>
                  <div className="px-3 w-full md:w-1/2 lg:w-1/6">
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className={styles.pinkbutton}
                      >
                        Delivery
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

export default Delivery