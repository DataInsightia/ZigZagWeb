import React, {useEffect, useState} from "react";
import invoiceimg from "../../../assets/img/logo.png";
import QRCode from "react-qr-code";
import axios from "axios";
import API from "../../../api";
import "../invoice.css";




export default function InvoiceSup(){

    return (
        <div className="flex scroll items-center mt-16 justify-center min-h-screen bg-gray-100">
            <div className="w-2/5 bg-white shadow-lg">
                <div className="flex justify-center p-1 flex">
                    <div className="flex justify-center">
                        <img src={invoiceimg} className="w-20 md:w-32 lg:w-28"/>
                        <div className="w-30">
                            <br/>
                            <span className="text-rose-500 text-xl">
             Chedinadu ZigZag
           </span><br/>
                            <span className="text-xl">
             Mobile:+91 7878787878
           </span><br/>
                            <span className="text-sm">
            Address: Joe Smith 795 Folsom Ave San Francisco, CA 94107
           </span>
                        </div>
                    </div>
                    <div className="p-2">
                    </div>
                </div>
                <div className="w-full h-0.5 bg-indigo-500"></div>
                <div className="flex justify-between p-4">
                    <div>
                        <h6 className="font-bold text-xl">Order Id: ZC001</h6>
                        <span className="text-sm">Customer Name: Anagappan Muthu</span>
                        <address className="text-sm">
                            <span className="font-bold"> Address :</span>
                            Joe Smith 795 Folsom Ave San Francisco, CA 94107
                        </address>
                    </div>
                    <div className="w-50">
                        <QRCode
                            size={80}
                            className="object-contain qr-code "
                            value="ZC001"/>
                    </div>
                    <div></div>
                </div>

                <div className="flex justify-center ">
                    <div className="border-b border-gray-200 shadow">
                        <table className="w-5/5">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-xs text-gray-500 ">#</th>
                                <th className="px-4 py-2 text-xs text-gray-500 ">
                                    Product Name
                                </th>
                                <th className="px-4 py-2 text-xs text-gray-500 ">Quantity</th>
                                <th className="px-4 py-2 text-xs text-gray-500 ">Rate</th>
                                <th className="px-4 py-2 text-xs text-gray-500 ">Subtotal</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            <tr className="whitespace-nowrap">
                                <td className="px-10 py-4 text-sm text-gray-500">1</td>
                                <td className="px-10 py-4">
                                    <div className="text-sm text-gray-900">
                                        AAAAA
                                    </div>
                                </td>
                                <td className="px-10 py-4">
                                    <div className="text-sm text-gray-500">4</div>
                                </td>
                                <td className="px-10 py-4 text-sm text-gray-500">₹20</td>
                                <td className="px-10 py-4">₹30</td>
                            </tr>
                            <tr className="whitespace-nowrap">
                                <td className="px-10 py-4 text-sm text-gray-500">2</td>
                                <td className="px-10 py-4">
                                    <div className="text-sm text-gray-900">
                                        BBBB
                                    </div>
                                </td>
                                <td className="px-10 py-4">
                                    <div className="text-sm text-gray-500">2</div>
                                </td>
                                <td className="px-10 py-4 text-sm text-gray-500">₹60</td>
                                <td className="px-10 py-4">₹12</td>
                            </tr>
                            <tr className="border-b-2 whitespace-nowrap">
                                <td className="px-10 py-4 text-sm text-gray-500">3</td>
                                <td className="px-10 py-4">
                                    <div className="text-sm text-gray-900">
                                        CCCC
                                    </div>
                                </td>
                                <td className="px-10 py-4">
                                    <div className="text-sm text-gray-500">1</div>
                                </td>
                                <td className="px-10 py-4 text-sm text-gray-500">₹10</td>
                                <td className="px-10 py-4">₹13</td>
                            </tr>
                            <tr className="">
                                <td colSpan="3"></td>
                                <td className="text-sm font-bold">Sub Total</td>
                                <td className="text-sm font-bold tracking-wider">
                                    <b>₹950</b>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="3"></th>
                                <td className="text-sm font-bold">
                                    <b>Tax Rate</b>
                                </td>
                                <td className="text-sm font-bold">
                                    <b>₹1.50%</b>
                                </td>
                            </tr>

                            <tr className="text-white bg-gray-800">
                                <th colSpan="3"></th>
                                <td className="text-sm font-bold">
                                    <b>Total</b>
                                </td>
                                <td className="text-sm font-bold">
                                    <b>₹999.0</b>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="flex justify-end">
                    <div className="p-4">
                        <h3>Signature</h3>
                        <div className="text-2xl italic text-indigo-500">AAAAA</div>
                    </div>
                </div>

                <div id="scissors"></div>


                <div className="p-4">
                    <div className="flex text-xl items-center justify-center">
                        Thank you very much for ordering with us.
                    </div>
                    <br/>
                    <div className="flex items-end justify-end space-x-3">
                        <button className="px-4 py-2 text-sm text-green-600 bg-green-100">
                            Print
                        </button>
                        <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100">
                            Save
                        </button>
                        <button className="px-4 py-2 text-sm text-red-600 bg-red-100">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
