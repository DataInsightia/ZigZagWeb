import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../../../api'
import styles from '../../../Dashboard/Staf/Style/Styles'


export default function DateOrderList() {
  const [Order, fetchOrder] = useState([])
  const [Orderstate, fetchOrderstate] = useState(false)
  
  const dateSearch = (event) => {
    event.preventDefault()
    let date = event.target.date.value
    axios
      .get(
        `${API}/api/order_date_filter/?date=${date}`,
      )
      .then((res) => {
        if (res.status === 200) {
          fetchOrderstate(true)
          fetchOrder(res.data.data)
        } else {
          fetchOrder([])
          fetchOrderstate(false)
        }
      })
  }

  return (
    <div>
      {/* PAGINATION */}
      <Pagination
        dateSearch={dateSearch}
        Order={Order}
        Orderstate={Orderstate}
      />
      {/* PAGINATION */}
    </div>
  )
}

function Pagination({
  dateSearch,
  Order,
  Orderstate,

}) {
  //   const [pages] = useState(Math.round(data.length / dataLimit))
  //   const [currentPage, setCurrentPage] = useState(1)

  //   function goToNextPage() {
  //     setCurrentPage((page) => page + 1)
  //   }

  //   function goToPreviousPage() {
  //     setCurrentPage((page) => page - 1)
  //   }

  //   function changePage(event) {
  //     const pageNumber = Number(event.target.textContent)
  //     setCurrentPage(pageNumber)
  //   }

  //   const getPaginatedData = () => {
  //     const startIndex = currentPage * dataLimit - dataLimit
  //     const endIndex = startIndex + dataLimit
  //     return data.slice(startIndex, endIndex)
  //   }

  //   const getPaginationGroup = () => {
  //     let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
  //     return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  //   }

  //   const getExcel = async () => {
  //     await DownloadExcelFile('staffs')
  //   }
  return (
    <div>
      <div className=" scroll md:mt-16 justify-center w-full min-h-screen">
        <div className="overflow-auto overflow-x-scroll bg:hidden  p-4">
        <p className="uppercase font-bold">Filter By Date</p>
          <div className="py-4">
            {/* <h2 className="text-xl justify-center font-semibold uppercase tracking-wide">
              Order Lists
            </h2> */}
            {/* <div className="flex flex-wrap justify-between mb-5 md:mb-0"> */}
            {/* <div className="md:w-1/3 flex overflow-auto  justify-between">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(event) => orderSearch(event)}
                  className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
                />
              </div> */}
            {/* <div className="md:w-1/3 flex justify-end">
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
              </div> */}
            {/* </div> */}
            <div className="flex flex-wrap justify-between my-5 md:mb-0">
           
                <div className="md:w-full px-2 pb-1">
                  <div className="relative w-full">
                    <form onSubmit={dateSearch}>
                      <div className="flex justify-between">
                         
                          <div className="px-2">
                            <label className={styles.label}>Date</label>
                            <input
                              type="date"
                              placeholder="Search"
                              name="date"
                              className="shadow-lg border-none pr-2 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
                            />
                          </div>

                        <div className="px-2 flex items-end">
                          <input
                            type="submit"
                            placeholder="Search"
                            value="Filter Date"
                            className="px-2 py-2 shadow-lg border border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-500 rounded text-lg font-bold"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
           
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full overflow-x-auto md:mt-10 shadow-lg">
                <thead className="bg-gradient-to-r from-rose-600 to-rose-500">
                  <tr>
                    <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                      S.No
                    </th>
                    <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                      Work
                    </th>
                    <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                      Booking Date
                    </th>
                    <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                      Due Date
                    </th>

                    <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                      Total Amount
                    </th>
                    <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                      Advance
                    </th>
                    <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                      Balance
                    </th>
                    <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                      Delivery Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Orderstate ? (
                    <>
                      {Order.map((e, index) => (
                        <tr className="bg-white">
                          <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-5">
                            {index+1}
                          </td>
                          <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-5">
                            {e.order_id}
                          </td>
                          <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-5">
                            {new Date(e.booking_date_time).toLocaleDateString(
                              'en',
                              'TN',
                            )}
                          </td>
                          <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-5">
                            {new Date(e.due_date).toLocaleDateString(
                              'en',
                              'TN',
                            )}
                          </td>
                          <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-5">
                            {e.total_amount}
                          </td>
                          <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-5">
                            {e.advance_amount}
                          </td>
                          <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-5">
                            {e.balance_amount}
                          </td>
                          <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-5"></td>
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
          {/* <PaginationBar
            goToPreviousPage={goToPreviousPage}
            currentPage={currentPage}
            getPaginationGroup={getPaginationGroup}
            changePage={changePage}
            goToNextPage={goToNextPage}
            pages={pages}
          /> */}
        </div>
      </div>
    </div>
  )
}
