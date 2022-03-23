import axios from 'axios'
import React, { useState } from 'react'
import API from '../../../api'
import Styles from '../../Dashboard/Staf/Style/Styles'

function Delivery() {
  const [data, setData] = useState({})
  const [staffs, setStaffs] = useState([])
  const [orderid, setOrderID] = useState('')
  const [workid, setWorkID] = useState('')
  const [balance, setBalance] = useState(0)
  const [amount2pay, setAmountToPay] = useState({})
  const [show,setShow] = useState(false)
  const handleEvent = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })
  const handleEventProceed = (e) =>
    setAmountToPay({ ...data, [e.target.name]: e.target.value })
  const checkButton = (e) => {
    e.preventDefault()
    axios
      .post(`${API}/api/is_order/`, data)
      .then((res) => {
        if (res.data.status) { setShow(true) } else { alert("Order ID not found !") }

      }).catch(err => console.log(err));
    axios
      .post(`${API}/api/is_order_completed/`, data)
      .then((res) => {
        if (res.data.status) {
          axios
            .post(`${API}/api/delivery/`, data)
            .then((res) => {
              alert(
                `₹ ${JSON.stringify(
                  res.data.order_work_staff_assign[0].order.balance_amount,
                )} to pay`
              )
              setOrderID(res.data.order_work_staff_assign[0].order.order_id)
              setWorkID(res.data.order_work_staff_assign[0].work.work_id)
              setBalance(
                res.data.order_work_staff_assign[0].order.balance_amount,
              )
            })
            .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
    axios
      .get(`${API}/api/staff/`)
      .then((res) => setStaffs(res.data))
      .catch((err) => console.log(err))
  }

  const checkout = (e) => {
    e.preventDefault()
    // Insert To Delivery Model
    const payload = {
      order_id: e.target.order_id.value,
      staff_id: e.target.staff_id.value,
      amount_to_pay: e.target.amount_to_pay.value,
    }
    axios
      .post(`${API}/api/proceed_delivery/`, payload)
      .then((res) => {
        alert('Amount Paid')
      })
      .catch((err) => console.log(err))
  }

  var curr = new Date()
  curr.setDate(curr.getDate())
  var date = curr.toISOString().substr(0, 10)

  return (
    <div>
      <div className="">
        <div className="md:mt-24">
          <h1 className={`text-center uppercase font-semibold font-2xl ${Styles.title}`}>Delivery</h1>
          <form onSubmit={checkButton} className="flex  justify-center">
            <div className="">
              <input
                type="text"
                name="order_id"
                onChange={handleEvent}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mx-2">
              <input
                type="submit"
                value="Search"
                className="rounded w-full py-2 px-3 bg-rose-500 text-white font-bold hover:shadow-lg"
              />
            </div>
          </form>
        </div>
        <div className="flex w-full p-10">
          {show ? (
            <form onSubmit={checkout}>
              <div className="flex flex-wrap shadow-xl bg-white mt-8 p-5">

                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">ORDER ID</div>
                  <div className="">
                    <input
                      name="order_id"
                      value={orderid}
                      disabled
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">WORK ID</div>
                  <div className="">
                    <input
                      name="work_id"
                      value={workid}
                      disabled
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">STAFFS</div>
                  <div className="">
                    <select
                      name="staff_id"
                      onChange={handleEventProceed}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option selected hidden>
                        Select Staff
                      </option>
                      {staffs.length > 0
                        ? staffs.map((e) => (
                            <option value={e.staff_id}>{e.staff_name}</option>
                          ))
                        : ''}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">DELIVERY DATE</div>
                  <div className="">
                    <input
                      name="blance_amount"
                      value={balance}
                      disabled
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">BALANCE</div>
                  <div className="">
                    <input
                      name="amount_to_pay"
                      onChange={handleEventProceed}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">AMOUNT TO PAY</div>
                  <div className="">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type={'date'}
                      defaultValue={date}
                    />
                  </div>
                </div>
                <div className="md:flex md:justify-end mb-5 px-5">
                <input type="submit" value="Checkout"  className="rounded w-full py-2 px-3 bg-rose-500 text-white font-bold hover:shadow-lg" />
                </div>
              </div>
            </form>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Delivery