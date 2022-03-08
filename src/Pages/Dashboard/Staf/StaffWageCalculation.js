import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../../Dashboard/Staf/Style/Styles'

export const StaffWageUpdate = async (order_id, work_id, staff_id) => {
  const response = await axios.post(
    API + '/api/staff_wage_update/',
    {
      order_id,
      work_id,
      staff_id,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
    { withCredentials: true },
  )
  console.log(response.data.details)
}

function StaffWageCalculation() {
  const [fetchstaffwage, setStaffWage] = useState([])
  const [total, setTotal] = useState(0)
  const [staff, setStaff] = useState([])
  const [staffsalarytype, setStaffSalarytype] = useState([])
  const [worktype, setWorktype] = useState([])
  const [wagepending, setWagepending] = useState([])
  const [wagependingbool, setWagependingbool] = useState(false)
  const [amount, setAmount] = useState(0)
  const [wagefromDate,setwagefromDate] = useState('')
  const [wagetoDate,setwagetoDate] = useState('')

  const [wagepaid, setWagepaid] = useState({
    from_date: '',
    to_date: '',
    payment_date: '',
    payment_ref: '',
    payment_image: '',
  })
  const { from_date, to_date,payment_date,payment_ref,payment_image } = wagepaid

  // get staff_id from local storage
  var login_id = localStorage.getItem('login_id')
  var staff_id = localStorage.getItem('login_id')
  useEffect(() => {
    axios
      .post(
        API + '/api/get_details/',
        {
          login_id,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
        { withCredentials: true },
      )
      .then((res) => {
        setWorktype(res.data.data.work_type)
        setStaffSalarytype(res.data.data.salary_type)
        setStaff(res.data.data.staff_name)
      })
    axios
      .post(
        API + '/api/staff_wage_calculation/',
        {
          staff_id,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
        { withCredentials: true },
      )
      .then((res) => setStaffWage(res.data))
    axios.post(API + '/api/pending_wage/', { staff_id }).then((res) => {
      if (res.data.status === true) {
        setWagepending(res.data.data)
        setWagependingbool(true)
      } else {
        setWagepending([])
        setWagependingbool(false)
      }
    })
  }, [])

  // const getTotalValue = (e) => {
  //   setwageftDate({ ...wageftDate, [e.target.name]: e.target.value })
  // }

  var staff_id = 'ZS001'
  const staff_wage_paid = (e) => {
    axios
      .post(API + '/api/get_wagetotal/', {
        from_date,
        to_date,
        payment_date,
        payment_ref,
        payment_image,
        staff_id,
      })

      .then((res) => {
        setTotal(res.data.total)
      })
      .catch((error) => console.log(error))
  }

  const updateWageGiven = (e) => {
    var id = []
    var dates = []
    e.preventDefault()
    for (var i = 0; i < wagepending.length; i++) {
      id.push(wagepending[i].id)
      dates.push(wagepending[i].work_staff_approval_date_time)
    }
    axios
      .post(API + '/api/staff_payment_update/', {
        staff_id,
        id,
        dates,
      })
      .then((res) => {
        setAmount(res.data.data.wage__sum)
        setwagefromDate(res.data.from_date)
        setwagetoDate(res.data.to_date)
      })
  }

  //  const staff_salary_type = localStorage.getItem('stype')

  return (
    <div>
      <div className="bg-white p-10 mt-10">
        <div className="p-3 bg-white shadow bg-opacity-25">
          {/* <h1 className={styles.title}>Wage Details</h1> */}
          <div className="flex justify-between">
            <div className="w-2/6 px-2 flex justify-center">
              <span className="font-extrabold uppercase">Staff Name :</span>
              <span>{staff}</span>
            </div>
            <div className="w-2/6 px-2 flex justify-center">
              <span className="font-extrabold uppercase">Staff ID :</span>
              <span>{localStorage.getItem('login_id')}</span>
            </div>
            <div className="w-2/6 px-2 flex justify-center">
              <span className="font-extrabold uppercase">Work Type :</span>
              <span>{worktype}</span>
            </div>
          </div>
          <div className="h-8"></div>
          <form onSubmit={updateWageGiven}>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-lg">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th scope="col" className={styles.tablehead}>
                            Order ID
                          </th>
                          <th scope="col" className={styles.tablehead}>
                            Work ID
                          </th>
                          <th scope="col" className={styles.tablehead}>
                            Wage
                          </th>
                          <th scope="col" className={styles.tablehead}>
                            Completion Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {wagepending.map((e) => (
                          <tr className="border-b">
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap">
                              {e.order}
                              <input
                                type="text"
                                name="order"
                                value={e.order}
                                hidden
                              />
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                              {e.work}
                              <input
                                type="text"
                                name="work"
                                value={e.work}
                                hidden
                              />
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                              {e.wage}
                              <input
                                type="text"
                                name="wage"
                                value={e.wage}
                                hidden
                              />
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                              {new Date(
                                e.work_staff_approval_date_time,
                              ).toLocaleString('en-GB')}
                              <input
                                type="text"
                                name="date"
                                value={new Date(
                                  e.work_staff_approval_date_time,
                                ).toLocaleString('en-GB')}
                                hidden
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-12"></div>
            <div className="flex">
              <div className="w-2/6"></div>
              <div className="w-1/6 px-2">
                <button type="submit" className={styles.pinkbutton}>
                  Update Wage Given
                </button>
              </div>
              <div className="w-1/6 px-2">
                <button className={styles.pinkbutton}>Back</button>
              </div>
              <div className="w-2/6"></div>
            </div>
          </form>
          <form onSubmit={staff_wage_paid}>
          <div className="h-8"></div>
          <div className="flex">
            <div className="w-1/3 px-2">
              <label htmlFor="fromdate" className={styles.tablehead}>
                Wage From
              </label>
              <input
                type="text"
                id="fromdate"
                name="from_date"
                className={styles.auth_input}
                value = {wagefromDate}
              />
            </div>
            <div className="w-1/3 px-2">
              <label htmlFor="todate" className={styles.tablehead}>
                Wage To
              </label>
              <input
                type="text"
                id="todate"
                name="to_date"
                className={styles.auth_input}
                value = {new Date(wagetoDate).toLocaleString('en-GB')}
              />
            </div>
            <div className="w-1/3 px-2">
              <label htmlFor="wagetotal" className={styles.tablehead}>
                Total
              </label>
              <input
                type="text"
                id="wagetotal"
                name="wagetotal"
                className={styles.auth_input}
                value={amount}
              />
            </div>
          </div>
          <div className="h-8"></div>
          <div className="flex">
            <div className="w-1/3 px-2">
              <label htmlFor="paymentdate" className={styles.tablehead}>
                Payment Date
              </label>
              <input
                type="datetime-local"
                id="paymentdate"
                name="paymentdate"
                className={styles.auth_input}
                value={payment_date}
              />
            </div>
            <div className="w-1/3 px-2">
              <label htmlFor="paymentrefno" className={styles.tablehead}>
                Payment Ref.No
              </label>
              <input
                type="text"
                id="paymentrefno"
                name="paymentrefno"
                className={styles.auth_input}
              />
            </div>
            <div className="w-1/3 px-2">
              <label htmlFor="proof" className={styles.tablehead}>
                Payment Proof
              </label>
              <input
                type="file"
                id="proof"
                name="proof"
                className={styles.auth_input}
              />
            </div>
          </div>
          <div className="h-8"></div>
          <div className="flex">
            <div className="w-2/6"></div>
            <div className="w-1/6 px-2">
              <button className={styles.pinkbutton}>Update</button>
            </div>
            <div className="w-1/6 px-2">
              <button className={styles.pinkbutton}>Reset</button>
            </div>
            <div className="w-2/6"></div>
          </div>
          <div className="h-8"></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StaffWageCalculation
