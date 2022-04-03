import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import API from '../../../api'
import Constants from '../../../constants/Constants'
import PaginationBar from '../../../widget/PaginationBar'
import ReactToPrint from 'react-to-print'
import { saveAs } from 'file-saver'
import { DownloadExcelFile } from '../../../../src/utils/ExportToExcel'

export default function Customer() {
  const componentRef = useRef()

  const [customers, fetchcustomers] = useState([])
  const [customerstate, fetchcustomerstate] = useState(false)
  const [filteredData, setFilteredData] = useState(customers)

  useEffect(() => {
    axios.get(`${API}/api/customers/`).then((res) => {
      if (res.status === 200) {
        fetchcustomerstate(true)
        fetchcustomers(res.data)
        setFilteredData(res.data)
      } else {
        fetchcustomers([])
        fetchcustomerstate(false)
      }
    })
  }, [])
  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = customers.filter((data) => {
      return data.mobile.search(value) != -1
    })
    setFilteredData(result)
  }

  return (
    <div>
      {/* PAGINATION */}
      <Pagination
        data={filteredData}
        pageLimit={2}
        dataLimit={10}
        handleSearch={handleSearch}
        customerstate={customerstate}
      />
      {/* PAGINATION */}

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

function Pagination({
  data,
  pageLimit,
  dataLimit,
  handleSearch,
  customerstate,
}) {
  const [pages] = useState(Math.round(data.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)

  function goToNextPage() {
    setCurrentPage((page) => page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1)
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent)
    setCurrentPage(pageNumber)
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return data.slice(startIndex, endIndex)
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  const getExcel = async () => {
    await DownloadExcelFile('customers')
  }

  return (
    <div>
      <div className="p-4 md:mt-24">
      <div className="flex flex-wrap justify-between -mb-2">
            <div className="md:w-1/3 flex overflow-auto  justify-between">
              <input
                type="text"
                placeholder="Search"
                onChange={(event) => handleSearch(event)}
                className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
              />
            </div>
            <div className="md:w-1/3 flex justify-end">
              <button
                type="button"
                className="bg-green-500 py-3 px-2 rounded-md"
                onClick={getExcel}
              >
                <div className="flex">
                  <span className="font-bold text-sm text-white">
                    Export to Excel
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            </div>
            </div>
      </div>
      
      <div className="flex flex-col p-4">
        <div className="overflow-x-auto">
          <div className="inline-block py-2 min-w-full">
            <table className="w-full md:mt-2 shadow-lg">
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
                    {getPaginatedData().map((e, index) => (
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
          <PaginationBar
            goToPreviousPage={goToPreviousPage}
            currentPage={currentPage}
            getPaginationGroup={getPaginationGroup}
            changePage={changePage}
            goToNextPage={goToNextPage}
            pages={pages}
          />
        </div>
      </div>
    </div>
  )
}
