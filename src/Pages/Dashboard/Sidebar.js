import React from 'react'
import { Link } from 'react-router-dom'
import nav_logo from '../../assets/img/logo.png'
import './sidebar.css'

export default function Sidebar() {
  const auth = localStorage.getItem('role')
  return (
    <div className="relative  min-h-screen hidden sm:block md:flex-wrap">
      <div className="sidebar  bg-white text-blue-100 w-72 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <button className="text-black flex items-center space-x-2 px-4">
          {/*<svg*/}
          {/*  className="w-8 h-8"*/}
          {/*  xmlns="http://www.w3.org/2000/svg"*/}
          {/*  fill="none"*/}
          {/*  viewBox="0 0 24 24"*/}
          {/*  stroke="currentColor"*/}
          {/*>*/}
          {/*  <path*/}
          {/*    stroke-linecap="round"*/}
          {/*    stroke-linejoin="round"*/}
          {/*    stroke-width="2"*/}
          {/*    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"*/}
          {/*  />*/}
          {/*</svg>*/}
          {/*<span className="text-2xl text-black font-extrabold">ZigZag</span>*/}
          <img src={nav_logo} sizes="50" />
        </button>

        <nav>
          {(() => {
            if (auth === 'admin') {
              return (
                <div>
                  <Link
                    to="/dashboard/dhome"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    HOME
                  </Link>

                  {/*Order Management*/}
                  <div className="dropdown inline-block relative">
                    <button className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">
                      <span className="mr-1">ORDER MANAGEMENT</span>
                    </button>
                    <ul className="dropdown-menu  hidden font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
                      <li className="">
                        <Link
                          to="/dashboard/takeorder"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          TAKE ORDER
                        </Link>
                        <li>
                          <Link
                            to="/dashboard/order_status"
                            className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                          >
                            ORDER STATUS
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={'/dashboard/work_assign/'}
                            className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                          >
                            ORDER ASSIGN
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/order_approval"
                            className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                          >
                            ORDER APPROVAL
                          </Link>
                        </li>
                      </li>
                    </ul>
                  </div>

                  {/*Order Management*/}

                  {/*Staff Management*/}

                  <div className="dropdown inline-block relative">
                    <button className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">
                      <span className="mr-1">STAFF MANAGEMENT</span>
                    </button>
                    <ul className="dropdown-menu  hidden font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
                      <li className="">
                        <Link
                          to="/dashboard/wage"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          WAGE
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/staff_register"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          STAFF REGISTER
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/staffs"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          STAFF LISTS
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/*Staff Management*/}

                  {/*Customer Management*/}
                  <div className="dropdown inline-block relative">
                    <button className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">
                      <span className="mr-1">CUSTOMER MANAGEMENT</span>
                    </button>
                    <ul className="dropdown-menu  hidden font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
                      <li className="">
                        <Link
                          to="/dashboard/customers"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          CUSTOMER LISTS
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/delivery"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          DELIVERY
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/*Customer Management*/}
                  {/*Product Management*/}
                  <div className="dropdown inline-block relative">
                    <button className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">
                      <span className="mr-1">PRODUCT MANAGEMENT</span>
                    </button>
                    <ul className="dropdown-menu  hidden font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
                      <li className="">
                        <Link
                          to="/dashboard/work"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          WORK
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/dashboard/material"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          MATERIAL
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/dashboard/products"
                          className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                          PRODUCT
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/*Product Management*/}
                </div>
              )
            } else if (auth === 'staff') {
              return (
                <div>
                  <Link
                    to="/dashboard/dhome"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    HOME
                  </Link>
                  <Link
                    to="/dashboard/dhome"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    PAGE REPORT
                  </Link>
                  <Link
                    to="/dashboard/orders"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    CURRENT WORKS
                  </Link>

                  <Link
                    to="/dashboard/work_complete"
                    className="font-bold text-1lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    WORK STAGE COMPLETE
                  </Link>
                  <Link
                    to="/dashboard/completed_work"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    COMPLETED ORDERS
                  </Link>
                  <Link
                    to="/dashboard/wage"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    WAGE
                  </Link>

                  <Link
                    to="/dashboard/dhome"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    STATUS
                  </Link>
                  <Link
                    to="/dashboard/edit_profile"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    EDIT PROFILE
                  </Link>
                </div>
              )
            } else if (auth === 'customer') {
              return (
                <div>
                  <Link
                    to="/dashboard/dhome"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    HOME
                  </Link>

                  <Link
                    to={`/dashboard/customer_order_history/${localStorage.getItem(
                      'cid',
                    )}`}
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    ORDERS
                  </Link>
                  <Link
                    to="/dashboard/edit_profile"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    PROFILE EDIT
                  </Link>

                  <Link
                    to="/dashboard/customer_order_status"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    ORDER STATUS
                  </Link>
                </div>
              )
            }
          })()}
        </nav>
        <ul className="flex-col  w-100 flex list-none absolute bottom-1">
          <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white mb-2"></li>
        </ul>
      </div>
    </div>
  )
}
