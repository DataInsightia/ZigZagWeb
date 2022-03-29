import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import API from '../../../api'
import ReactToPrint from "react-to-print";

export default function Customer() {
  const componentRef = useRef();

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
      <div className="flex scroll  md:mt-0 justify-center min-h-screen">
        <div ref={componentRef} className="md:w-1/1 overflow-auto overflow-x-scroll p-4">

          <div className="py-4">
            <table className="w-full md:mt-24 shadow-lg">
              <thead className=" bg-gradient-to-r from-rose-600 to-rose-500">
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
                <th className="py-3 text-center text-xs font-semibold text-white uppercase">
                  Password
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
                          {e.password}
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
          <br/>
          <PrintButton className={'w-1/2'} componentRef={componentRef}/>
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

const PrintButton = (props) => {
  return (
      <div className="flex items-end justify-end space-x-3">


        <ReactToPrint
            width={2}
            scale={0.8}
            trigger={() => <button className="px-4 py-2 text-sm text-white bg-rose-500">
              Print
            </button>}
            content={() => props.componentRef.current}
        />
        {/* <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100">
              Save
            </button>
            <button className="px-4 py-2 text-sm text-red-600 bg-red-100">
              Cancel
            </button> */}
      </div>
  )
}