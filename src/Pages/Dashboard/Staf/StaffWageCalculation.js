import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../../Dashboard/Staf/Style/Styles'
import { useParams } from 'react-router-dom'

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
}

function StaffWageCalculation() {
  const { id } = useParams()

  const get_staff_id = id
  const [fetchstaffwage, setStaffWage] = useState([])
  const [total, setTotal] = useState(0)
  const [staff, setStaff] = useState([])
  const [staffsalarytype, setStaffSalarytype] = useState([])
  const [worktype, setWorktype] = useState([])
  const [wagepending, setWagepending] = useState([])
  const [wagependingbool, setWagependingbool] = useState(false)
  const [amount, setAmount] = useState(0)
  const [wagefromDate, setwagefromDate] = useState('')
  const [wagetoDate, setwagetoDate] = useState('')

  // get staff_id from local storage
  var login_id = get_staff_id
  var staff_id = get_staff_id
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

  const [file, setFile] = useState('')

  const onFileChange = (e) => setFile(e.target.files[0])

  var staff_id = get_staff_id
  const staff_wage_paid = (e) => {
    e.preventDefault()

    var ids = []
    e.preventDefault()
    for (var i = 0; i < wagepending.length; i++) {
      ids.push(wagepending[i].id)
  
    }

    var payment_date = e.target.payment_date.value
    var from_date = e.target.fromdate.value
    var to_date = e.target.todate.value
    var payment_date = e.target.payment_date.value
    var payment_ref = e.target.payment_ref.value
    var w_total = e.target.wage_total.value

    const data = new FormData()
    data.append('file', file)
    data.append('from_date', JSON.stringify(from_date))
    data.append('to_date', JSON.stringify(to_date))
    data.append('payment_date', JSON.stringify(payment_date))
    data.append('payment_ref', JSON.stringify(payment_ref))
    data.append('w_total', JSON.stringify(w_total))
    data.append('staff_id', JSON.stringify(staff_id))
    data.append('ids', JSON.stringify(ids))

    axios
      .put(API + '/api/staff_wage_calculation/', data)

      .then((res) => {
        if (res.data.status) {
          alert('wage paid Sucessfully')

        } else {
          alert('Not paid or Already Paid')
        }
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
  const auth = localStorage.getItem('role')
  return (
    <div>
      {(() => {
        if (auth === 'admin') {
          return (
            <div>
              <div className=" p-10 mt-10 border-none">
                {/* <h1 className={styles.title}></h1> */}
                <div className="flex justify-between bg-white shadow-lg rounded-lg p-2 text-black">
                  <div className="w-2/6 px-2 flex justify-center">
                    <span className="font-extrabold text-lg uppercase">
                      Staff Name -
                    </span>
                    <span className="text-lg uppercase">{staff}</span>
                  </div>
                  <div className="w-2/6 px-2 flex justify-center">
                    <span className="font-extrabold text-lg uppercase">
                      Staff ID -
                    </span>
                    <span className="text-lg uppercase">{get_staff_id}</span>
                  </div>
                  <div className="w-2/6 px-2 flex justify-center">
                    <span className="font-extrabold text-lg uppercase">
                      Work Type -
                    </span>
                    <span className="text-lg uppercase">{worktype}</span>
                  </div>
                </div>
                <div className="h-8"></div>

                <form onSubmit={updateWageGiven}>
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-lg">
                          <table className="min-w-full rounded-lg p-2 text-black text-xl font-bold">
                            <thead className="bg-white">
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
                                <tr className="border-b bg-white">
                                  <td className="py-4 px-6 text-sm text-black uppercase whitespace-nowrap text-center">
                                    {e.order}
                                    <input
                                      type="text"
                                      name="order"
                                      value={e.order}
                                      hidden
                                    />
                                  </td>
                                  <td className="py-4 px-6 text-sm text-black uppercase whitespace-nowrap text-center">
                                    {e.work}
                                    <input
                                      type="text"
                                      name="work"
                                      value={e.work}
                                      hidden
                                    />
                                  </td>
                                  <td className="py-4 px-6 text-sm text-black uppercase whitespace-nowrap text-center">
                                    {e.wage}
                                    <input
                                      type="text"
                                      name="wage"
                                      value={e.wage}
                                      hidden
                                    />
                                  </td>
                                  <td className="py-4 px-6 text-sm text-black uppercase whitespace-nowrap text-center">
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
                  {wagependingbool ? (
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
                  ) : (
                    ''
                  )}
                </form>
                {wagependingbool ? (
                  <form onSubmit={staff_wage_paid} className="shadow-lg mt-10">
                    <div className="flex flex-col">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden shadow-lg">
                            <table className="min-w-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-md p-2 text-white text-xl font-bold">
                              <thead>
                                <tr>
                                  <th scope="col" className={styles.tablehead}>
                                    Wage From
                                  </th>
                                  <th scope="col" className={styles.tablehead}>
                                    Wage To
                                  </th>
                                  <th scope="col" className={styles.tablehead}>
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-4 px-6 text-sm text-white whitespace-nowrap text-center">
                                    <input
                                      type="text"
                                      id="fromdate"
                                      name="from_date"
                                      className="text-black border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-rose-500 w-full ease-linear transition-all duration-150"
                                      value={new Date(
                                        wagefromDate,
                                      ).toLocaleString('en-GB')}
                                      required
                                    />
                                  </td>
                                  <td className="py-4 px-6 text-sm text-white whitespace-nowrap text-center">
                                    <input
                                      type="text"
                                      id="todate"
                                      name="to_date"
                                      className="text-black border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-rose-500 w-full ease-linear transition-all duration-150"
                                      value={new Date(
                                        wagefromDate,
                                      ).toLocaleString('en-GB')}
                                      required
                                    />
                                  </td>
                                  <td className="py-4 px-6 text-sm text-white whitespace-nowrap text-center">
                                    <input
                                      type="text"
                                      id="wagetotal"
                                      name="wage_total"
                                      className="text-black border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-rose-500 w-full ease-linear transition-all duration-150"
                                      value={amount}
                                      required
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table className="mt-10 w-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-md p-2 text-white text-xl font-bold">
                              <thead>
                                <tr className="flex flex-wrap justify-evenly">
                                  <div className="w:1/3">
                                    <th
                                      scope="col"
                                      className={styles.tablehead}
                                    >
                                      Payment Date
                                    </th>
                                  </div>
                                  <div className="w:1/3">
                                    <th
                                      scope="col"
                                      className={styles.tablehead}
                                    >
                                      Payment Reference No
                                    </th>
                                  </div>
                                  <div className="w:1/3">
                                    <th
                                      scope="col"
                                      className={styles.tablehead}
                                    >
                                      Payment Proof
                                    </th>
                                  </div>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="flex justify-evenly">
                                  <div className="w:1/3">
                                    <td className="py-4 px-6 text-sm text-white whitespace-nowrap text-center w-full">
                                      <input
                                        type="datetime-local"
                                        id="paymentdate"
                                        name="payment_date"
                                        required
                                        className="text-black border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-rose-500 w-full ease-linear transition-all duration-150"
                                      />
                                    </td>
                                  </div>
                                  <div className="w:1/3">
                                    <td className="py-4 px-6 text-sm text-white whitespace-nowrap text-center">
                                      <input
                                        type="text"
                                        id="paymentrefno"
                                        name="payment_ref"
                                        className="text-black border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-rose-500 w-full ease-linear transition-all duration-150"
                                      />
                                    </td>
                                  </div>
                                  <div className="w:1/3">
                                    <td className="py-4 px-6 text-sm text-white whitespace-nowrap text-center">
                                      <input
                                        type="file"
                                        id="proof"
                                        name="file"
                                        onChange={onFileChange}
                                        className="text-black border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-rose-500 w-full ease-linear transition-all duration-150"
                                      />
                                    </td>
                                  </div>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="h-8"></div> */}
                    {/* <div className="flex">
                      <div className="w-1/3 px-2">
                        <label htmlFor="fromdate" className={styles.tablehead}>
                          Wage From
                        </label>
                        <input
                          type="text"
                          id="fromdate"
                          name="from_date"
                          className={styles.auth_input}
                          value={new Date(wagefromDate).toLocaleString('en-GB')}
                          required
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
                          value={new Date(wagefromDate).toLocaleString('en-GB')}
                          required
                        />
                      </div>
                      <div className="w-1/3 px-2">
                        <label htmlFor="wagetotal" className={styles.tablehead}>
                          Total
                        </label>
                        <input
                          type="text"
                          id="wagetotal"
                          name="wage_total"
                          className={styles.auth_input}
                          value={amount}
                          required
                        />
                      </div>
                    </div> */}
                    {/* <div className="h-8"></div> */}
                    {/* <div className="flex">
                      <div className="w-1/3 px-2">
                        <label
                          htmlFor="paymentdate"
                          className={styles.tablehead}
                        >
                          Payment Date
                        </label>
                        <input
                          type="date"
                          id="paymentdate"
                          name="payment_date"
                          required
                        />
                      </div>
                      <div className="w-1/3 px-2">
                        <label
                          htmlFor="paymentrefno"
                          className={styles.tablehead}
                        >
                          Payment Ref.No
                        </label>
                        <input
                          type="text"
                          id="paymentrefno"
                          name="payment_ref"
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
                          name="file"
                          onChange={onFileChange}
                          className={styles.auth_input}
                        />
                      </div>
                    </div> */}
                    {/* <div className="h-8"></div> */}
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
                ) : (
                  ''
                )}
              </div>
            </div>
          )
        } else if (auth === 'staff') {
          return (
            <div>
              <div className="bg-white p-10 mt-10">
                <div className="p-3 bg-white shadow bg-opacity-25">
                  {/* <h1 className={styles.title}>Wage Details</h1> */}
                  <div className="flex justify-between">
                    <div className="w-2/6 px-2 flex justify-center">
                      <span className="font-extrabold uppercase">
                        Staff Name :
                      </span>
                      <span>{staff}</span>
                    </div>
                    <div className="w-2/6 px-2 flex justify-center">
                      <span className="font-extrabold uppercase">
                        Staff ID :
                      </span>
                      <span>{get_staff_id}</span>
                    </div>
                    <div className="w-2/6 px-2 flex justify-center">
                      <span className="font-extrabold uppercase">
                        Work Type :
                      </span>
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
                  </form>
                </div>
              </div>
            </div>
          )
        } else if (auth === 'customer') {
          return <div></div>
        }
      })()}
    </div>
  )
}

export default StaffWageCalculation
