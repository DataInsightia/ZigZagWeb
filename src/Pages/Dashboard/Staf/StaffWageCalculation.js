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
  const [staff, setStaff] = useState([])
  const [staffsalarytype, setStaffSalarytype] = useState([])
  const [worktype, setWorktype] = useState([])

  // get staff_id from local storage
  var login_id =  localStorage.getItem('login_id')
  var staff_id =  localStorage.getItem('login_id')
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
      .then((res) => {setWorktype(res.data.data.work_type)
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
  }, [])

  return (
    <div>
      <div className="bg-white p-10 mt-10">
        <div className="p-3 bg-white shadow bg-opacity-25">
          <h1 className={styles.title}>Wage Details</h1>

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

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xl font-extrabold tracking-wider text-left text-black uppercase "
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xl font-extrabold tracking-wider text-left text-black uppercase "
                        >
                          Work ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xl font-extrabold tracking-wider text-left text-black uppercase "
                        >
                          Wage
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xl font-extrabold tracking-wider text-left text-black uppercase "
                        >
                          Completion Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          ZR001
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                          ZW001
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                          300
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                          3000
                        </td>
                      </tr>
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
              <button className={styles.pinkbutton}>Update Wage Given</button>
            </div>
            <div className="w-1/6 px-2">
              <button className={styles.pinkbutton}>Back</button>
            </div>
            <div className="w-2/6"></div>
          </div>
          <div className="h-8"></div>
          <div className="flex">
            <div className="w-2/6"></div>
            <div className="w-1/6 px-2">
              <label htmlFor="fromdate" className={styles.auth_label}>
                Wage From
              </label>
              <input
                type="date"
                id="fromdate"
                name="fromdate"
                className={styles.auth_input}
              />
            </div>
            <div className="w-1/6 px-2">
              <label htmlFor="todate" className={styles.auth_label}>
                Wage To
              </label>
              <input
                type="date"
                id="todate"
                name="todate"
                className={styles.auth_input}
              />
            </div>
            <div className="w-1/6 px-2">
              <label htmlFor="wagetotal" className={styles.auth_label}>
                Total
              </label>
              <input
                type="text"
                id="wagetotal"
                name="wagetotal"
                className={styles.auth_input}
              />
            </div>
            <div className="w-2/6"></div>
          </div>
          <div className="h-8"></div>
          <div className="flex">
            <div className="w-2/6"></div>
            <div className="w-1/6 px-2">
              <label htmlFor="paymentdate" className={styles.auth_label}>
                Wage From
              </label>
              <input
                type="date"
                id="paymentdate"
                name="paymentdate"
                className={styles.auth_input}
              />
            </div>
            <div className="w-1/6 px-2">
              <label htmlFor="paymentrefno" className={styles.auth_label}>
                Payment Ref.No
              </label>
              <input
                type="text"
                id="paymentrefno"
                name="paymentrefno"
                className={styles.auth_input}
              />
            </div>
            <div className="w-1/6 px-2">
              <label htmlFor="proof" className={styles.auth_label}>
                Payment Proof
              </label>
              <input
                type="file"
                id="proof"
                name="proof"
                className={styles.auth_input}
              />
            </div>
            <div className="w-2/6"></div>
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
        </div>
      </div>
    </div>
  )
}

export default StaffWageCalculation