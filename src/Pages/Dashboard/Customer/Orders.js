import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import API from '../../../api'


function Orders() {
    const {custid,orderid} = useParams();
    // const custid = "ZC43434"
    // const orderid = "ZA786"

    console.log(custid,orderid);

    const [orders,setOrders] = useState([]);

    useEffect(() => {
        axios.get(API + `/api/customer_orders/${custid}/${orderid}/`).then(res => {
            setOrders(res.data)
        }).catch(err => console.log(err))
    },[]);

  return (
    <div className="flex scroll items-center mt-16 justify-center min-h-screen bg-gray-100">
        <div className="w-2/5 bg-white shadow-lg">
            <div className="flex justify-center p-1 flex">
                <div className="flex justify-center">
                    <div>
                        <table>
                            <tr>
                                <th>Orders</th>
                            </tr>
                            <tr>
                                {
                                    orders.map(e => <td>
                                           <Link
                                            to={"/dashboard/invoice/" + custid +"/"+ orderid}
                                            className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                                            >
                                                {e.work.work_name}
                                            </Link>
                                    </td>)
                                }
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Orders