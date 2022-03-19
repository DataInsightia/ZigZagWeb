import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const auth = localStorage.getItem('role')

    const [open, setOpen] = React.useState(false);
  return (


    <div className="relative">

        {/*Mobile  Navbar*/}
        <div className="bg-rose-500 text-gray-100 flex justify-between md:hidden">
            <a href="#" className="block p-4 text-white font-bold">
                Zig Zag
            </a>

            <button className="mobile-menu-button p-4 focus:outline-none"
                    onClick={() => setOpen(!open)}>
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
        {/*Mobile  Navbar*/}


        <div
            className={
               open
                    ? " opacity-100 translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                    : " opacity-0 translate-y-1 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
            }
        >


        {/*Mobile  DropDown*/}

        <div className="ml-6 -mt-16 mr-auto rounded-lg lg:hidden shadow-lg ring-1 justify-center mb-0 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-4 px-5">
                <div className="flex items-center justify-between">
                    <div>
                        {/*<img*/}
                        {/*    className="h-8 w-auto"*/}
                        {/*    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"*/}
                        {/*    alt="Workflow"*/}
                        {/*/>*/}
                        <a href="#" className="block p-4 text-black text-2xl font-bold">
                            Zig Zag
                        </a>
                    </div>
                    <div className="-mr-2">
                        <button
                            type="button"
                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setOpen(!open)}
                        >
                            <span className="sr-only">Close menu</span>
                            {/* Heroicon name: outline/x */}
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                    <nav className="grid gap-y-8">
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

                                        {/*Product Management*/}
                                        <div className="dropdown inline-block relative">
                                            <button
                                                className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">
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

                                        {/*Order Management*/}
                                        <div className="dropdown inline-block relative">
                                            <button
                                                className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">
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
                                                            to={"/dashboard/work_assign/"}
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
                                            <button
                                                className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">
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
                                            <button
                                                className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500">
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
                                            to={`/dashboard/customer_order_history/${localStorage.getItem('cid')}`}
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
                                    </div>
                                )
                            }
                        })()}
                    </nav>
                </div>
            </div>
            <div className="py-6 px-5 space-y-6">
                <div>
                    <a
                        href="#"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rose-500 hover:bg-indigo-700"
                        onClick={() => {
                            localStorage.clear()
                            navigate('/login')
                        }}
                    >
                       Logout
                    </a>
                </div>
            </div>
        </div>
        </div>



        {/*Mobile  DropDown*/}



        {/*Desktop  Navbar*/}
        <nav
        id="header"
        className="md:fixed hidden md:block w-full bg-gradient-to-r from-rose-600 to-rose-400 border-r-black z-30 top-0 border-0  text-black"
      >

        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          <div className="pl-1 flex items-center">
            <a
              className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
            >
              {/*{JSON.parse(localStorage.getItem("cinfo"))[0].name}*/}
              {(() => {
                if (auth === 'admin') {
                  return (
                    <div>
                      <h4>ADMIN</h4>
                    </div>
                  )
                } else if (auth === 'staff') {
                  return (
                    <div>
                      <h4>
                        <span className="capitalize">
                          {localStorage.getItem('staff_name')}
                        </span>{' '}
                        (STAFF)
                      </h4>
                    </div>
                  )
                } else if (auth === 'customer') {
                  return (
                    <div>
                      <h4>
                        <span className="capitalize">
                          {localStorage.getItem('cust_name')}
                        </span>{' '}
                        (CUSTOMER)
                      </h4>
                    </div>
                  )
                }
              })()}
            </a>
          </div>

          {/*<div className="block lg:hidden pr-4">*/}
          {/*    <button id="nav-toggle"*/}
          {/*            className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">*/}
          {/*        <svg className="fill-current h-6 w-6" viewBox="0 0 20 20"*/}
          {/*             xmlns="http://www.w3.org/2000/svg">*/}
          {/*            <title>Menu</title>*/}
          {/*            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>*/}
          {/*        </svg>*/}
          {/*    </button>*/}

          {/*</div>*/}

          <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              {/*<li className="mr-3">*/}
              {/*    <a className="inline-block py-2 px-4 text-black font-bold no-underline" href="#">HOME</a>*/}
              {/*</li>*/}
              {/*<li className="mr-3">*/}
              {/*    <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">ABOUT</a>*/}
              {/*</li>*/}
              {/*<li className="mr-3">*/}
              {/*    <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">PRODUCTS</a>*/}
              {/*</li>*/}
              {/*<li className="mr-3">*/}
              {/*    <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">CONTACT US</a>*/}
              {/*</li>*/}
            </ul>
            <div className="group text-lg relative h-full sm:w-10/12 md:w-3/12">
              <button
                className="block font-bold py-2.5 px-4 text-white  rounded transition duration-200 hover:bg-white hover:text-black"
                onClick={() => {
                  localStorage.clear()
                  navigate('/login')
                }}
              >
                LOGOUT
              </button>
            </div>

            {/*<Link to="/login"*/}
            {/*      className="mx-auto lg:mx-0 hover:underline bg-red-500 text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"*/}
            {/*>*/}

            {/*</Link>*/}
          </div>
        </div>
        <hr className=" border-b border-gray-100 opacity-25 my-0 py-0" />
        {/*<div className="pt-24 gradient">*/}
        {/*    <div className=" container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/*<div className="gradient relative  lg:-mt-24">*/}
        {/*    <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">*/}
        {/*        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">*/}
        {/*            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fill-rule="nonzero">*/}
        {/*                <path*/}
        {/*                    d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"*/}
        {/*                    opacity="0.100000001"></path>*/}
        {/*                <path*/}
        {/*                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"*/}
        {/*                    opacity="0.100000001"*/}
        {/*                ></path>*/}
        {/*                <path*/}
        {/*                    d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"*/}
        {/*                    id="Path-4" opacity="0.200000003"></path>*/}
        {/*            </g>*/}
        {/*            <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fill-rule="nonzero">*/}
        {/*                <path*/}
        {/*                    d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"*/}
        {/*                ></path>*/}
        {/*            </g>*/}
        {/*        </g>*/}
        {/*    </svg>*/}
        {/*</div>*/}
      </nav>
        {/*Desktop  Navbar*/}
      </div>
  )
}
