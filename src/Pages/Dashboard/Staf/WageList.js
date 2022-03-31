import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../../api'
import styles from '../../Dashboard/Staf/Style/Styles'
import { Link } from 'react-router-dom'
import Constants from '../../../constants/Constants'
import PaginationBar from '../../../widget/PaginationBar'

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
  const [filteredData, setFilteredData] = useState(fetchstaff)
  const [filteredPendingData, setFilteredPendingData] = useState(
    fetchiwageComplete,
  )
  const [filteredGivenData, setFilteredGivenData] = useState(fetchwageCompletei)

  useEffect(() => {
    axios.get(API + '/api/staff/').then((res) => {
      if (res.data != []) {
        setStaff(res.data)
        setFilteredData(res.data)
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
            setFilteredPendingData(res.data.data)
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
            setfetchwageCompletei(res.data.data)
            setfetchwageCompleteibool(true)
          } else {
            setfetchwageCompletei([])
            setfetchwageCompleteibool(false)
          }
        })
    }
  }, [])

  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = fetchstaff.filter((data) => {
      return data.mobile.search(value) != -1
    })
    setFilteredData(result)
  }

  const handlePendingSearch = (event) => {
    let value = event.target.value
    let result = []
    result = fetchstaff.filter((data) => {
      return data.order.search(value) != -1
    })
    setFilteredPendingData(result)
  }

  const handleGivenSearch = (event) => {
    let value = event.target.value
    let result = []
    result = fetchstaff.filter((data) => {
      return data.order.search(value) != -1
    })
    setFilteredGivenData(result)
  }

  const auth = localStorage.getItem('role')
  return (
    <div>
      {(() => {
        if (auth === 'staff') {
          return (
            <div>

              {/* PAGINATION */}
              <PaginationPending
                data={filteredPendingData}
                pageLimit={2}
                dataLimit={10}
                handlePendingSearch={handlePendingSearch}
              />
              {/* PAGINATION */}
              {/* PAGINATION */}
              <PaginationGiven
                data={filteredGivenData}
                pageLimit={2}
                dataLimit={10}
                handleGivenSearch={handleGivenSearch}
              />
              {/* PAGINATION */}
            </div>
          )
        } else if (auth === 'admin') {
          return (
            <div>
              {/* PAGINATION */}
              <Pagination
                data={filteredData}
                pageLimit={2}
                dataLimit={10}
                handleSearch={handleSearch}
              />
              {/* PAGINATION */}
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

function Pagination({ data, pageLimit, dataLimit, handleSearch }) {
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
      <div className=" p-10 mt-10">
        <div className="flex overflow-auto  justify-between">
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => handleSearch(event)}
            className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
          />
        </div>
        <div className="h-8"></div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 mb-6">
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
                        Mobile
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
                    {getPaginatedData().map((e, index) => (
                      <>
                        <tr className="border-b border-x-0 border-8 border-white bg-white">
                          <td className="py-4 px-6 text-sm text-white whitespace-nowrap text-center uppercase ">
                            {e.salary_type == 'wage' ? (
                              <Link
                                className="bg-rose-600 py-2 px-4 border-2 border-rose-600 hover:bg-transparent hover:border-rose-600 hover:text-rose-600"
                                to={`${e.staff_id}`}
                                staff_id={e.staff_id}
                              >
                                {e.staff_id}
                              </Link>
                            ) : (
                              <button
                                type="button"
                                className="bg-gray-600 py-2 px-4 border-2 border-gray-600  font-bold"
                              >
                                Disabled
                              </button>
                            )}
                          </td>
                          <td className="py-4 px-6 text-sm text-black whitespace-nowrap text-center uppercase ">
                            {e.staff_name}
                          </td>
                          <td className="py-4 px-6 text-sm text-black whitespace-nowrap text-center uppercase ">
                            {e.address}
                          </td>
                          <td className="py-4 px-6 text-sm text-black whitespace-nowrap text-center uppercase ">
                            {e.mobile}
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

function PaginationPending({
  data,
  pageLimit,
  dataLimit,
  handlePendingSearch,
  custid,
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

  return (
    <div>
      <div className="container p-10">
      <div className="flex overflow-auto  justify-between  md:mt-20 mb-10">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => handlePendingSearch(event)}
          className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
        />
      </div>
      <div className="flex flex-col">
        <h1> Wage Pending</h1>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-lg">
              <table className="min-w-full rounded-md p-2 text-white text-xl font-bold">
                <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                    >
                      Work ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                    >
                      Wage
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                    >
                      Completion Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                    >
                      Approval Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData().map((e) => (
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
                        {new Date(e.completion_date_time).toLocaleString(
                          'en-GB',
                        )}
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
    </div>
  )
}

function PaginationGiven({
  data,
  pageLimit,
  dataLimit,
  handleGivenSearch,
  custid,
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

  return (
    <div>
      <div className="container p-10">
        <div className="flex overflow-auto  justify-between mb-10">
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => handleGivenSearch(event)}
            className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
          />
        </div>
        <div className="flex flex-col">
          <h1> Wage Given</h1>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-lg">
                <table className="min-w-full bg-white">
                  <thead className="bg-gradient-to-r from-rose-600 to-rose-400 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                      >
                        Work ID
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                      >
                        Wage
                      </th>

                      <th
                        scope="col"
                        className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                      >
                        Completion Date
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-3 text-xl font-bold tracking-wider text-white uppercase"
                      >
                        Approval Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData().map((e) => (
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
                          {new Date(e.completion_date_time).toLocaleString(
                            'en-GB',
                          )}
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
