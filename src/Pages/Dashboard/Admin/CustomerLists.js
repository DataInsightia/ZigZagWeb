import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../../api'

import { Link } from 'react-router-dom'

export default function Customer() {
  const Styles = {
    TabHeadButton:
      'shadow-lg mx-4 py-1 uppercase font-bold px-3 font-xs bg-rose-500 border-2 border-rose-500 text-white hover:text-rose-500 hover:border-rose-500 hover:bg-transparent rounded-md',
    TabPanel: '',
    WorkFormInput:
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2',
  }

  const [customers, fetchcustomers] = useState([])
  const [customerstate, fetchcustomerstate] = useState(false)

  useEffect(() => {
    axios.get(`${API}/api/customers/`).then((res) => {
      if (res.status === 200) {
        fetchcustomerstate(true)
        fetchcustomers(res.data)
      } else {
        fetchcustomers([])
        fetchcustomerstate(false)
      }
    })
  }, [])

  return (
    <div>
      <div className={'p-10 mt-12'}>
        {/* customer lists */}
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            <div>
              <h2 class="text-2xl justify-center font-semibold leading-tight">
                Customer Lists
              </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="min-w-full shadow-lg  overflow-hidden">
                <table class="min-w-full leading-normal table-auto">
                  <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                    <tr>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Customer ID
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Mobile
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Address
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        City
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Pincode
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerstate ? (
                      <>
                        {customers.map((e) => (
                          <tr>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.cust_id}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.cust_name}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.mobile}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.address}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.city}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.pincode}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.salary}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      ''
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* customer lists */}
      </div>
    </div>
  )
}
