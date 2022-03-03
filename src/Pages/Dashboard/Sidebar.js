import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()
  const auth = localStorage.getItem('role')
  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" className="block p-4 text-white font-bold">
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

      <div className="sidebar bg-rose-500 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <a href="#" className="text-white flex items-center space-x-2 px-4">
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span className="text-2xl font-extrabold">ZigZag</span>
        </a>

        <nav>
          {(() => {
            if (auth === 'admin') {
              return (
                <div>
                  <Link
                    to="/dashboard/dhome"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    HOME
                  </Link>
                  <Link
                    to="/dashboard/takeorder"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    TAKE ORDER
                  </Link>
                  <Link
                    to="/dashboard/invoice"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    ORDER STATUS
                  </Link>
                  <Link
                    to="/dashboard/work_assign"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    ORDER ASSIGN
                  </Link>
                  <Link
                    to="/dashboard/order_approval"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    ORDER  APPROVAl
                  </Link>
                  <Link
                    to="/dashboard/staff_register"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
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
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    HOME
                  </Link>
                  <Link
                    to="/dashboard/dhome"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    PAGE REPORT
                  </Link>
                  <Link
                    to="/dashboard/orders"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    CURRENT WORKS
                  </Link>
                  <Link
                    to="/dashboard/work_complete"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    WORK STAGE COMPLETE
                  </Link>
                  <Link
                    to="/dashboard/completed_work"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    COMPLETED ORDERS
                  </Link>
                  <Link
                    to="/dashboard/dhome"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    WAGE
                  </Link>
                  <Link
                    to="/dashboard/dhome"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    WAGE GIVEN
                  </Link>
                  <Link
                    to="/dashboard/dhome"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    STATUS
                  </Link>
                </div>
              )
            } else if (auth === 'customer') {
              return (
                <div>
                  <Link
                    to="/dashboard/dhome"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    HOME
                  </Link>
                  <Link
                    to="/dashboard/invoice"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    INVOICE
                  </Link>
                  <Link
                    to="/dashboard/dhome"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
                  >
                    ORDER HISTORY
                  </Link>
                  <Link
                    to="/dashboard/dhome"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
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
            <button
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black"
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
            >
              LOGOUT
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
