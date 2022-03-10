import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import nav_logo from "../../assets/img/logo.png"

export default function Sidebar() {
  const navigate = useNavigate()
  const auth = localStorage.getItem('role')
  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" className="block p-4 text-black font-bold">
          Zig Zag
        </a>

        <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="sidebar bg-white text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <a href="#" className="text-black flex items-center space-x-2 px-4">
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
          <img src={nav_logo} sizes="50"/>
        </a>

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
                  <Link
                    to="/dashboard/takeorder"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    TAKE ORDER
                  </Link>
                  <Link
                    to="/dashboard/order_status"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    ORDER STATUS
                  </Link>
          

                  
                  <Link
                    to={"/dashboard/work_assign/"}
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    ORDER ASSIGN
                  </Link>
                  <Link
                    to="/dashboard/order_approval"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    ORDER  APPROVAl
                  </Link>
                  <Link
                    to="/dashboard/wage"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    WAGE
                  </Link>
                  <Link
                    to="/dashboard/staff_register"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    STAFF REGISTER
                  </Link>
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
                  to={`/dashboard/customer_orders/${localStorage.getItem('cid')}/`}
                  className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    ORDERS
                  </Link>
                  <Link
                    to="/dashboard/invoice"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    INVOICE
                  </Link>
                  <Link
                    to="/dashboard/order_status"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    ORDER STATUS
                  </Link>
                  <Link
                    to="/dashboard/dhome"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    ORDER HISTORY
                  </Link>
                  <Link
                    to="/dashboard/edit_profile"
                    className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                  >
                    PROFILE EDIT
                  </Link>
                </div>
              )
            }
          })()}
        </nav>
        <ul className="flex-col  w-100 flex list-none absolute bottom-1">
          <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white mb-2">
          </li>
        </ul>
      </div>
    </div>
  )
}
