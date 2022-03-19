import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../../api'


export default function Customer() {
  // const Styles = {
  //   TabHeadButton:
  //     'shadow-lg mx-4 py-1 uppercase font-bold px-3 font-xs bg-rose-500 border-2 border-rose-500 text-white hover:text-rose-500 hover:border-rose-500 hover:bg-transparent rounded-md',
  //   TabPanel: '',
  //   WorkFormInput:
  //     'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2',
  // }

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

      <div className="flex scroll items-center md:mt-0 justify-center min-h-screen bg-gray-100">

      <div className="md:w-1/2 overflow-auto overflow-x-scroll bg-white shadow-lg p-4">

          <div className="">
            <table className="w-full">
              <thead className="w-full  bg-gradient-to-r from-rose-600 to-rose-500">
              <tr>
                <th className="py-3 text-center text-xs font-semibold text-white uppercase">
                  Customer ID
                </th>
                <th className="py-3 text-center text-xs font-semibold text-white uppercase">
                  Customer Name
                </th>
                <th className="py-3 text-center text-xs font-semibold text-white uppercase">
                  Mobile
                </th>
                <th className="py-3 text-center text-xs font-semibold text-white uppercase">
                  Address
                </th>
                <th className="py-3 text-center text-xs font-semibold text-white uppercase">
                  City
                </th>
                <th className="py-3 text-center text-xs font-semibold text-white uppercase">
                  Pincode
                </th>
              </tr>
              </thead>
              <tbody>
              {customerstate ? (
                  <>
                    {customers.map((e) => (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                            {e.cust_id}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                            {e.cust_name}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                            {e.mobile}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                            {e.address}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                            {e.city}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                            {e.pincode}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
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


      {/*<div className={'p-10 md:mt-12'}>*/}

      {/*  /!* customer lists *!/*/}
      {/*  <div class="container px-4 sm:px-8">*/}
      {/*    <div class="py-8">*/}
      {/*      <div>*/}
      {/*        <h2 class="text-2xl justify-center font-semibold leading-tight">*/}
      {/*          Customer List*/}
      {/*        </h2>*/}
      {/*      </div>*/}


      {/*      */}
      {/*      <div class="my-2 shadow-2xl overflow-auto">*/}
      {/*        <div class="">*/}
      {/*          <table class="w-full overflow-x-scroll">*/}
      {/*            <thead className="w-full  bg-gradient-to-r from-rose-600 to-rose-500">*/}
      {/*              <tr>*/}
      {/*                <th class="py-3 text-center text-xs font-semibold text-white uppercase">*/}
      {/*                  Customer ID*/}
      {/*                </th>*/}
      {/*                <th class="py-3 text-center text-xs font-semibold text-white uppercase">*/}
      {/*                  Customer Name*/}
      {/*                </th>*/}
      {/*                <th class="py-3 text-center text-xs font-semibold text-white uppercase">*/}
      {/*                  Mobile*/}
      {/*                </th>*/}
      {/*                <th class="py-3 text-center text-xs font-semibold text-white uppercase">*/}
      {/*                  Address*/}
      {/*                </th>*/}
      {/*                <th class="py-3 text-center text-xs font-semibold text-white uppercase">*/}
      {/*                  City*/}
      {/*                </th>*/}
      {/*                <th class="py-3 text-center text-xs font-semibold text-white uppercase">*/}
      {/*                  Pincode*/}
      {/*                </th>*/}
      {/*              </tr>*/}
      {/*            </thead>*/}
      {/*            <tbody>*/}
      {/*              {customerstate ? (*/}
      {/*                <>*/}
      {/*                  {customers.map((e) => (*/}
      {/*                    <tr>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.cust_id}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.cust_name}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.mobile}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.address}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.city}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.pincode}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.salary}*/}
      {/*                      </td>*/}
      {/*                    </tr>*/}
      {/*                  ))}*/}
      {/*                </>*/}
      {/*              ) : (*/}
      {/*                ''*/}
      {/*              )}*/}
      {/*            </tbody>*/}
      {/*          </table>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  /!* customer lists *!/*/}
      {/*</div>*/}
    </div>
  )
}
