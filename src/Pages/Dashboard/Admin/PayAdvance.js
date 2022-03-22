import axios from 'axios'
import React, { useState } from 'react'
import API from '../../../api'
import Styles from '../../Dashboard/Staf/Style/Styles'

function PayAdvance() {
  const [data, setData] = useState({})
  const [staffs, setStaffs] = useState([])
  const [orderid, setOrderID] = useState('')
  const [workid, setWorkID] = useState('')
  const [balance, setBalance] = useState(0)
  const [amount2pay, setAmountToPay] = useState({})
  const [address, setAddress] = useState('')
  const handleEvent = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })
  const handleEventProceed = (e) =>
    setAmountToPay({ ...amount2pay, [e.target.name]: e.target.value })
  const handleEventAddress = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value })
  const checkButton = (e) => {
    e.preventDefault()
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
                )} to pay !`,
              )
              setOrderID(res.data.order_work_staff_assign[0].order.order_id)
              setWorkID(res.data.order_work_staff_assign[0].work.work_id)
              setBalance(
                res.data.order_work_staff_assign[0].order.balance_amount,
              )
            })
            .catch((err) => console.log(err))

          axios
            .get(`${API}/api/find_order/${data.order_id}`)
            .then((res) => {
              setAddress(res.data.courier_address)
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
  const fix_address = (e) =>
    axios
      .get(`${API}/api/find_order/${data.order_id}`)
      .then((res) => {
        setAddress(res.data.courier_address)
      })
      .catch((err) => console.log(err))

  const checkout = (e) => {
    e.preventDefault()
    // Insert To Delivery Model
    const order_id = e.target.order_id.value
    const amount_to_pay = e.target.amount_to_pay.value
    const pickup_type = e.target.pickup_type.value
    const payment_mode = e.target.payment_mode.value
    const payment_ref_no = e.target.payment_ref_no.value
    const payment_date = e.target.payment_date.value
    const payment_ref_proof = e.target.payment_ref_proof.files[0]

    const formData = new FormData()
    const other_delivery = {
      order_id: order_id,
      payment_mode: payment_mode,
      amount_to_pay: amount_to_pay,
      pickup_type: pickup_type,
      payment_ref_no: payment_ref_no,
      payment_date: payment_date,
    }
    formData.append('data', JSON.stringify(other_delivery))
    formData.append('payment_ref_proof', payment_ref_proof)

    axios
      .post(`${API}/api/proceed_pay_advance/`, formData)
      .then((res) => {
        alert(JSON.stringify(res.data))
        // axios.put(`${API}/api/find_order/`,{"order_id" : e.target.order_id.value,"address" : address}).then(res => console.log(res.data)).catch(err => console.log(err))
        alert(amount2pay.courier_address)
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
          <h1
            className={`text-center uppercase font-semibold font-2xl ${Styles.title}`}
          >
            Pay Advance
          </h1>
          <form onSubmit={checkButton} className="flex  justify-center">
            <div className="">
              <input
                type="text"
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
          {staffs.length > 0 ? (
            <form onSubmit={checkout}>
              <div className="flex flex-wrap shadow-xl bg-white mt-8 p-5">
                <div className="w-full md:w-1/2 lg:w-1/3 mb-5 px-5">
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
                <div className="w-full md:w-1/2 lg:w-1/3 mb-5 px-5">
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
                <div className="w-full md:w-1/2 lg:w-1/3 mb-5 px-5">
                  <div className="font-bold mb-2">Pickup Type</div>
                  <div className="">
                    <select
                      name={'pickup_type'}
                      onChange={(e) => {
                        handleEventProceed(e)
                      }}
                      onBlur={fix_address}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option selected hidden value={''}>
                        Select Pickup Type
                      </option>
                      <option value={'courier'}>COURIER</option>
                      <option value={'other'}>OTHER</option>
                    </select>
                  </div>
                </div>
                <div className="w-full mb-5 px-5">
                  {amount2pay.pickup_type === 'courier' ? (
                    <>
                      <div className="font-bold mb-2">Address</div>
                      <div className="">
                        <textarea
                          name={'courier_address'}
                          defaultValue={address}
                          onChange={handleEventAddress}
                          placeholder={'Your Address'}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                    </>
                  ) : amount2pay.pickup_type === 'other' ? (
                    <>
                      <div className="font-bold mb-2">Address</div>
                      <div className="">
                        <textarea
                          name={'courier_address'}
                          onChange={handleEventAddress}
                          placeholder={'Enter Alternative address'}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>

                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">Payment Method</div>
                  <div className="">
                    <select
                      name={'payment_mode'}
                      onChange={handleEventProceed}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option selected hidden value={''}>
                        Select Payment Mode
                      </option>
                      <option value={'self'}>SELF</option>
                      <option value={'other'}>OTHER</option>
                      <option value={'online'}>ONLINE</option>
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">STAFF</div>
                  <div className="">
                    <select
                      name="staff_id"
                      onChange={handleEventProceed}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option selected hidden value={''}>
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
                  <div className="font-bold mb-2">Date</div>
                  <div className="">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type={'date'}
                      defaultValue={date}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">Balance</div>
                  <div className="">
                    <input
                      type="text"
                      name="blance_amount"
                      value={balance}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">Amount To Pay</div>
                  <div className="">
                    <input
                      type="text"
                      name="amount_to_pay"
                      placeholder={'amount to pay'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">Payment Ref.No</div>
                  <div className="">
                    <input
                      type="text"
                      name="payment_ref_no"
                      placeholder={'payment ref no'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">Payment Date</div>
                  <div className="">
                    <input
                      type="date"
                      name="payment_date"
                      placeholder={'payment_date'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 mb-5 px-5">
                  <div className="font-bold mb-2">Payment Proof</div>
                  <div className="">
                    <input
                      type="file"
                      name="payment_ref_proof"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="md:flex md:justify-end mb-5 px-5">
                  <input
                    type="submit"
                    value="Checkout"
                    className="rounded w-full py-2 px-3 bg-rose-500 text-white font-bold hover:shadow-lg"
                  />
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

export default PayAdvance
