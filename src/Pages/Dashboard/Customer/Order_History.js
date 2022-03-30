import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../../api'
import Constants from '../../../constants/Constants'
import PaginationBar from '../../../widget/PaginationBar'

const CustomerOrderHistory = () => {
  const { custid } = useParams()

  // const custid = "ZC43434"
  // const orderid = "ZA786"

  const [orders, setOrders] = useState([])
  const [filteredData, setFilteredData] = useState(orders)

  useEffect(() => {
    axios
      .get(API + `/api/customer_orders/${custid}/`)
      .then((res) => {
        setFilteredData(res.data)
        setOrders(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = orders.filter((data) => {
      return data.work_name.search(value) != -1
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
        custid = {custid}
      />
      {/* PAGINATION */}
     
    </div>
  )
}

export default CustomerOrderHistory



function Pagination({
    data,
    pageLimit,
    dataLimit,
    handleSearch,
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
        <div className="flex overflow-auto  justify-between  md:mt-20 p-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => handleSearch(event)}
          className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
        />
      </div>
      <div class=" container mx-auto px-4 sm:px-8">
        <div class="py-8">
          <div>
            <h2 class="text-2xl justify-center font-semibold leading-tight">
              Order History
            </h2>
          </div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Client / Invoice
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Quantity
                    </th>

                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Price / Item
                    </th>
                  </tr>
                </thead>
                <tbody>
                {getPaginatedData().map((e, index) => (
                    <tr>
                      <td class="px-auto py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex">
                          <div class="flex-shrink-0 w-10 h-10">
                            <Link
                              to={
                                '/dashboard/invoicemob/' +
                                custid +
                                '/' +
                                e.order_id
                              }
                              className="w-full h-full rounded-full"
                            ></Link>
                          </div>
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap ml-2">
                              {e.work_name}
                            </p>
                            <p class="text-gray-600 whitespace-no-wrap ml-2">
                              {e.order_id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {e.quantity}
                        </p>
                        <p class="text-gray-600 whitespace-no-wrap"></p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          ₹{e.amount}
                        </p>
                        <p class="text-gray-600 whitespace-no-wrap">INR</p>
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
    )
  }
  