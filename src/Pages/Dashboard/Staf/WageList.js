import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../../Dashboard/Staf/Style/Styles'
import { Link } from 'react-router-dom'

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

function StaffList() {
  const [fetchstaff, setStaff] = useState([])
  const [fetchstaffbool, setStaffbool] = useState(false)
  const [fetchwageComplete, setfetchwageComplete] = useState([])
  const [fetchwageCompletebool, setfetchwageCompletebool] = useState(false)
  const [fetchiwageComplete, setfetchiwageComplete] = useState([])
  const [fetchiwageCompletebool, setfetchiwageCompletebool] = useState(false)
  const [fetchwageCompletei, setfetchwageCompletei] = useState([])
  const [fetchwageCompleteibool, setfetchwageCompleteibool] = useState(false)

  useEffect(() => {
    axios.get(API + '/api/staff/').then((res) => {
      if (res.data != []) {
        setStaff(res.data)
        setStaffbool(true)
      } else {
        setStaff([])
        setStaffbool(false)
      }
    })
    axios.get(API + '/api/staff_wage_paid_completion/').then((res) => {
      if (res.data != []) {
        setfetchwageComplete(res.data.data)
        setfetchwageCompletebool(true)
      } else {
        setfetchwageComplete([])
        setfetchwageCompletebool(false)
      }
    })
    const auth = localStorage.getItem('role')
    if (auth == 'staff') {
      const staff_id = localStorage.getItem('login_id')
      axios
        .post(API + '/api/staff_wage_status/notpaid', { staff_id })
        .then((res) => {
          if (res.data != []) {
            setfetchiwageComplete(res.data.data)
            setfetchiwageCompletebool(true)
          } else {
            setfetchiwageComplete([])
            setfetchiwageCompletebool(false)
          }
        })
      axios
        .post(API + '/api/staff_wage_status/paid', { staff_id })
        .then((res) => {
          if (res.data != []) {
            setfetchwageCompletei(res.data.data)
            setfetchwageCompleteibool(true)
          } else {
            setfetchwageCompletei([])
            setfetchwageCompleteibool(false)
          }
        })
    }
  }, [])

  const auth = localStorage.getItem('role')
  return (
    <div>
      {(() => {
        if (auth === 'staff') {
          return (
            <div>
              <div className="container p-10">
                <div className="flex flex-col mt-24 ">
                  <h1> Wage Pending</h1>
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow-lg">
                        <table className="min-w-full rounded-md p-2 text-white text-xl font-bold">
                          <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
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
                              <th scope="col" className={styles.tablehead}>
                                Approval Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {fetchiwageComplete.map((e) => (
                              <tr className="border-b bg-white">
                                <td className="py-4 px-6 text-sm text-black text-center whitespace-nowrap">
                                  {e.order}
                                </td>
                                <td className="py-4 px-6 text-sm text-black text-center whitespace-nowrap ">
                                  {e.work}
                                </td>
                                <td className="py-4 px-6 text-sm text-black text-center whitespace-nowrap ">
                                  {e.wage}
                                </td>
                                <td className="py-4 px-6 text-sm text-black text-center whitespace-nowrap ">
                                  {new Date(
                                    e.completion_date_time,
                                  ).toLocaleString('en-GB')}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                                  {new Date(
                                    e.work_staff_approval_date_time,
                                  ).toLocaleString('en-GB')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container p-10">
                <div className="flex flex-col">
                  <h1> Wage Given</h1>
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow-lg">
                        <table className="min-w-full bg-white">
                          <thead className="bg-gradient-to-r from-rose-600 to-rose-400 ">
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
                              <th scope="col" className={styles.tablehead}>
                                Approval Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {fetchwageCompletei.map((e) => (
                              <tr className="border-b">
                                <td className="py-4 px-6 text-sm text-black text-center whitespace-nowrap">
                                  {e.order}
                                </td>
                                <td className="py-4 px-6 text-sm text-black text-center whitespace-nowrap ">
                                  {e.work}
                                </td>
                                <td className="py-4 px-6 text-sm text-black text-center whitespace-nowrap ">
                                  {e.wage}
                                </td>
                                <td className="py-4 px-6 text-sm text-black text-center whitespace-nowrap ">
                                  {new Date(
                                    e.completion_date_time,
                                  ).toLocaleString('en-GB')}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                                  {new Date(
                                    e.work_staff_approval_date_time,
                                  ).toLocaleString('en-GB')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        } else if (auth === 'admin') {
          return (
            <div>
              <div className=" p-10 mt-10">

                <div className="h-8"></div>
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow-lg">
                        <table className="min-w-full  rounded-md p-2 text-xl font-bold">
                          <thead className="bg-gradient-to-r from-rose-600 to-rose-400 rounded">
                            <tr>
                              <th
                                scope="col"
                                className="py-4 px-6 text-sm text-white whitespace-nowrap"
                              >
                                Staff ID
                              </th>
                              <th
                                scope="col"
                                className="py-4 px-6 text-sm text-white whitespace-nowrap"
                              >
                                Staff Name
                              </th>
                              <th
                                scope="col"
                                className="py-4 px-6 text-sm text-white whitespace-nowrap"
                              >
                                Staff Address
                              </th>
                              <th
                                scope="col"
                                className="py-4 px-6 text-sm text-white whitespace-nowrap"
                              >
                                Salary Type
                              </th>
                              <th
                                scope="col"
                                className="py-4 px-6 text-sm text-white whitespace-nowrap"
                              >
                                Image
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            {fetchstaff.map((e) => (
                              <>
                                <tr className="border-b border-x-0 border-8 border-white bg-white">
                                  <td className="py-4 px-6 text-sm text-white whitespace-nowrap text-center uppercase ">
                                 
                                    <Link
                                    className="bg-rose-600 py-2 px-4 border-2 border-rose-600 hover:bg-transparent hover:border-rose-600 hover:text-rose-600"
                                      to={`${e.staff_id}`}
                                      staff_id={e.staff_id}
                                    >
                                      {e.staff_id}
                                    </Link>
                                  </td>
                                  <td className="py-4 px-6 text-sm text-black whitespace-nowrap text-center uppercase ">
                                    {e.staff_name}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-black whitespace-nowrap text-center uppercase ">
                                    {e.address}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-black whitespace-nowrap text-center uppercase ">
                                    {e.salary_type}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-black whitespace-nowrap text-center flex justify-center">
                                    <img
                                      src={`${process.env.REACT_APP_BASE_URL}${e.photo}`}
                                      className="h-12"
                                    />
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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

export default StaffList
