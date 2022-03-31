import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../../api'
import Constants from '../../../constants/Constants'
import PaginationBar from '../../../widget/PaginationBar'
import ReactToPrint from "react-to-print";

export default function Staff() {
  const [staff, fetchstaff] = useState([])
  const [staffstate, fetchstaffstate] = useState(false)
  const [filteredData, setFilteredData] = useState(staff)

  useEffect(() => {
    axios.get(`${API}/api/staff/`).then((res) => {
      if (res.status === 200) {
        fetchstaffstate(true)
        fetchstaff(res.data)
        setFilteredData(res.data)
      } else {
        fetchstaff([])
        fetchstaffstate(false)
      }
    })
  }, [])

  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = staff.filter((data) => {
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
        staffstate={staffstate}
      />
      {/* PAGINATION */}
    </div>
  )
}

function Pagination({ data, pageLimit, dataLimit, handleSearch, staffstate }) {
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

  return (
    <div>
      <div className="flex scroll md:mt-16 justify-center min-h-screen">
        <div className="md:w-50 overflow-auto overflow-x-scroll bg:hidden  p-4">
          <div className="py-4">
            <h2 className="text-2xl justify-center font-semibold">
              Staff Lists
            </h2>
            <div className="flex overflow-auto  justify-between">
              <input
                type="text"
                placeholder="Search"
                onChange={(event) => handleSearch(event)}
                className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
              />
            </div>
            <div className="w-full overflow-x-auto">
              <table className="overflow-x-auto md:mt-10 shadow-lg">
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
                    {/* <th className="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                 Password
               </th> */}
                  </tr>
                </thead>
                <tbody>
                  {staffstate ? (
                    <>
                      {getPaginatedData().map((e, index) => (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                            <img
                              src={`${API}${e.photo}`}
                              className="h-14 w-14"
                            />
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
                          {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                           {e.password}
                         </td> */}
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
