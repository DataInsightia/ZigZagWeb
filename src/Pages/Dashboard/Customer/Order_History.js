import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import API from '../../../api'

const CustomerOrderHistory = () => {
    const {custid} = useParams();

    // const custid = "ZC43434"
    // const orderid = "ZA786"

    const [orders,setOrders] = useState([]);

    useEffect(() => {
        axios.get(API + `/api/customer_orders/${custid}/`).then(res => {
            setOrders(res.data)
        }).catch(err => console.log(err))
    },[]);
    return (
        <div>
            <div class="mt-16 container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl justify-center font-semibold leading-tight">Order History</h2>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table class="min-w-full leading-normal">
                                <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Client / Invoice
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Issued / Due
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Delivery Status
                                    </th>
                                    <th
                                        class=" py-3 border-b-2 border-gray-200 bg-gray-100"
                                    ></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    orders.map(e =>
                                            <tr>
                                                <td class="px-auto py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div class="flex">
                                                        <div class="flex-shrink-0 w-10 h-10">
                                                            <Link
                                                            to={"/dashboard/invoice/" + custid +"/" + e.order_id}
                                                            className="w-full h-full rounded-full"
                                                            >
                                                                <img
                                                                    className="w-full h-full rounded-full"
                                                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div class="ml-3">
                                                            <p class="text-gray-900 whitespace-no-wrap">
                                                                {e.work_name}
                                                            </p>
                                                            <p class="text-gray-600 whitespace-no-wrap">{e.order_id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">₹{e.price}</p>
                                                    <p class="text-gray-600 whitespace-no-wrap">INR</p>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                                                    <p class="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
                                                </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span
                                                    aria-hidden
                                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                    ></span>
                                                    <span class="relative">Paid</span>
                                                </span>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                >
                                                <span
                                                aria-hidden
                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                ></span>
                                                <span className="relative">Deliverd</span>
                                                </span>
                                            </td>
                                        </tr>

                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerOrderHistory;