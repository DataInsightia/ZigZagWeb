import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import API from '../../../api'
import ReactToPrint from "react-to-print";

export default function Staff() {
  const componentRef = useRef();
  const [staff, fetchstaff] = useState([])
  const [staffstate, fetchstaffstate] = useState(false)

  useEffect(() => {
    axios.get(`${API}/api/staff/`).then((res) => {
      if (res.status === 200) {
        fetchstaffstate(true)
        fetchstaff(res.data)
      } else {
        fetchstaff([])
        fetchstaffstate(false)
      }
    })
  }, [])

  return (
    <div>
      <div className="flex scroll md:mt-0 justify-center min-h-screen">
        <div ref={componentRef} className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
          <div className="py-4">

            <div className="flex flex-wrap">
              <h2 className="text-2xl w-1/2 mt-12 justify-center font-semibold">
                Staff Lists
              </h2>

            </div>

            <div className="w-full  overflow-x-auto">
              <table className="overflow-x-auto md:mt-24 shadow-lg">
                <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                <tr>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Staff
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Staff ID
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Staff Name
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Mobile
                  </th>
                  {/* <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Address
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        City
                      </th> */}
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Salary Type
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Bank
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    IFSC Code
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Work Type
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Password
                  </th>
                </tr>
                </thead>
                <tbody>
                {staffstate ? (
                    <>
                      {staff.map((e) => (
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              <img src={`${API}${e.photo}`} className="h-14 w-14"/>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.staff_id}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.staff_name}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.mobile}
                            </td>
                            {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.address}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.city}
                            </td> */}
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.salary_type}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.salary}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.bank}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.ifsc}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.work_type}
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
      </div>




      {/*<div className={'p-10 mt-12'}>*/}
      {/*  /!* staff lists *!/*/}
      {/*  <div class="mx-auto px-4 sm:px-3">*/}
      {/*    <div class="py-8">*/}
      {/*      <div>*/}
      {/*        <h2 class="text-2xl justify-center font-semibold">*/}
      {/*          Staff Lists*/}
      {/*        </h2>*/}
      {/*      </div>*/}
      {/*      <div class="py-4">*/}
      {/*        <div class="w-full shadow-lg overflow-x-auto">*/}
      {/*          <table class="overflow-x-auto">*/}
      {/*            <thead className="bg-gradient-to-r from-rose-600 to-rose-500">*/}
      {/*              <tr>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Staff*/}
      {/*                </th>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Staff ID*/}
      {/*                </th>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Staff Name*/}
      {/*                </th>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Mobile*/}
      {/*                </th>*/}
      {/*                /!* <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Address*/}
      {/*                </th>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  City*/}
      {/*                </th> *!/*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Salary Type*/}
      {/*                </th>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Salary*/}
      {/*                </th>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Bank*/}
      {/*                </th>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  IFSC Code*/}
      {/*                </th>*/}
      {/*                <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">*/}
      {/*                  Work Type*/}
      {/*                </th>*/}
      {/*              </tr>*/}
      {/*            </thead>*/}
      {/*            <tbody>*/}
      {/*              {staffstate ? (*/}
      {/*                <>*/}
      {/*                  {staff.map((e) => (*/}
      {/*                    <tr>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                          <img src = {`${API}${e.photo}`} className="h-14 w-14"/>*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.staff_id}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.staff_name}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.mobile}*/}
      {/*                      </td>*/}
      {/*                      /!* <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.address}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.city}*/}
      {/*                      </td> *!/*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.salary_type}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.salary}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.bank}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.ifsc}*/}
      {/*                      </td>*/}
      {/*                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">*/}
      {/*                        {e.work_type}*/}
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
      {/*  /!* staff lists *!/*/}
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