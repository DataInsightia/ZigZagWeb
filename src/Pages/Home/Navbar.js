import React, { useState, useEffect } from 'react';
import Logo from "../../assets/img/logo.png";
import {Link} from "react-router-dom";

const auth = localStorage.getItem('isAuthenticated')
let menu
if (auth) {
    menu = (
        <>
            <Link
                to="/dashboard/dhome"
                className="mx-auto lg:mx-0 hover:underline bg-red-500 text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
                Dashboard
            </Link>
        </>
    )
} else {
    menu = (
        <>
            <Link
                to="/login"
                className="mx-auto lg:mx-0 hover:underline bg-red-500 text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
                Login
            </Link>
        </>
    )
}

const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

const Navbar = () => {
    const [open, setOpen] = React.useState(true);
    return (
        <nav id="header" className="fixed w-full bg-white z-30 top-0 text-black">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <img src={Logo} className="md:w-28 w-16 md:w-32 lg:w-20" /> <a href="#" className="block md:p-4 text-black md:text-2xl font-bold">
                Chettinad Orginal ZigZag
            </a>
                <div className="pl-4 flex items-center ml-auto">

                    <div className="pr-4">
                        <button
                            type="button"
                            className=" lg:hidden  items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                            onClick={() => setOpen(!open)}
                        >

                            <div
                                className={`${genericHamburgerLine} ${
                                    !open
                                        ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                                        : "opacity-50 group-hover:opacity-100"
                                }`}
                            />
                            <div
                                className={`${genericHamburgerLine} ${
                                    !open ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                                }`}
                            />
                            <div
                                className={`${genericHamburgerLine} ${
                                    !open
                                        ? "-rotate-45 -translate-y-1 opacity-50 group-hover:opacity-100"
                                        : "opacity-50 group-hover:opacity-100"
                                }`}
                            />
                            {/*<svg*/}
                            {/*    className="fill-current h-6 w-6"*/}
                            {/*    viewBox="0 0 20 20"*/}
                            {/*    xmlns="http://www.w3.org/2000/svg"*/}
                            {/*>*/}
                            {/*    <title>Menu</title>*/}
                            {/*    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />*/}
                            {/*</svg>*/}

                        </button>
                    </div>
                </div>
                <div className="block lg:hidden">

                    {/*Small Device*/}
                    <div
                        className={
                            open
                                ? "w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
                                : "w-full flex-grow lg:flex lg:items-center lg:w-auto  lg:mt-0 bg-white lg:bg-transparent text-black lg:p-0 z-20"
                        }
                    >

                        <ul className=" list-reset  flex-1 items-center">
                            <li className="ml-1.5">
                                <a className=" py-2 px-4 text-black font-bold no-underline"
                                   href="#">Home</a>
                            </li>
                            <li className="ml-1.5">
                                <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                   href="#">About</a>
                            </li>
                            <li className="ml-1.5">
                                <Link className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                      to="/product_home">Product</Link>
                            </li>
                            <li className="ml-1.5">
                                <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                   href="#">Contact US</a>
                            </li>
                            <li className="ml-1.5">
                                <Link className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                      to="/order_status_home">Order Status</Link>
                            </li>

                        </ul>
                        <button
                            id="navAction"
                            className=" mx-28 lg:mx-0 hover:underline bg-rose-500 text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                        >
                            {menu}
                        </button>
                    </div>
                </div>
                <div
                    className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
                    id="nav-content"
                >
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        <li className="mr-3">
                            <a
                                className="inline-block py-2 px-4 text-black font-bold no-underline"
                                href="#"
                            >
                                HOME
                            </a>
                        </li>
                        <li className="mr-3">
                            <a
                                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                href="#"
                            >
                                ABOUT
                            </a>
                        </li>
                        <li className="mr-3">
                            <Link
                                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                to="/product_home"
                            >
                                PRODUCTS
                            </Link>
                        </li>
                        <li className="mr-3">
                            <a
                                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                href="#"
                            >
                                CONTACT US
                            </a>
                        </li>
                        <li className="mr-3">
                            <Link
                                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                to="/order_status_home"
                            >
                                ORDER STATUS
                            </Link>
                        </li>
                    </ul>
                    {menu}
                </div>
            </div>
            <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
        </nav>
    );
};

export default Navbar;