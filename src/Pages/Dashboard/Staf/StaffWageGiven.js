import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../../Dashboard/Staf/Style/Styles'
import { Link } from 'react-router-dom'


function StaffWageGiven() {
  const [fetchstaff, setStaff] = useState([])
  const [fetchstaffbool, setStaffbool] = useState(false)
  const [fetchwageComplete, setfetchwageComplete] = useState([])
  const [fetchwageCompletebool, setfetchwageCompletebool] = useState(false)
  const staff_id = localStorage.getItem('login_id')
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
    axios.post(API + '/api/staff_wage_paid_not_completion/',
    {staff_id}).then((res) => {
      if (res.data != []) {
        setfetchwageComplete(res.data.data)
        setfetchwageCompletebool(true)
      } else {
        setfetchwageComplete([])
        setfetchwageCompletebool(false)
      }
    })
  }, [])

  //  const staff_salary_type = localStorage.getItem('stype')
  const auth = localStorage.getItem('role')
  return (
    <div>
      {(() => {
        if (auth === 'staff') {
          return (
            <div>
              <div className="container p-10">
                  
                <div className="flex flex-col mt-24 ">
                <h1> Wage Given</h1>
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow-lg">
                        <table className="min-w-full bg-white">
                          <thead className="bg-gradient-to-tr from-slate-900 to-pink-600 ">
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
                            {fetchwageComplete.map((e) => (
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
              <div className="bg-white p-10 mt-10">
                <div className="p-3 bg-white shadow bg-opacity-25">
                  {/* <h1 className={styles.title}>Wage Details</h1> */}

                  <div className="h-8"></div>
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-lg">
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th scope="col" className={styles.tablehead}>
                                  Staff ID
                                </th>
                                <th scope="col" className={styles.tablehead}>
                                  Staff Name
                                </th>
                                <th scope="col" className={styles.tablehead}>
                                  Staff Address
                                </th>
                                <th scope="col" className={styles.tablehead}>
                                  Image
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {fetchstaff.map((e) => (
                                <tr className="border-b">
                                  <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap">
                                    <Link
                                      to={`${e.staff_id}`}
                                      staff_id={e.staff_id}
                                    >
                                      {e.staff_id}
                                    </Link>
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                                    {e.staff_name}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                                    {e.address}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">
                                    <img src={e.photo} className="h-10" />
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
            </div>
          )
        } else if (auth === 'customer') {
          return <div></div>
        }
      })()}
    </div>
  )
}

export default StaffWageGiven
