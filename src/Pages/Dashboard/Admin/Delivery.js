import axios from 'axios';
import React, { useState } from 'react'
import API from '../../../api';

function Delivery() {
    const [data,setData] = useState({});
    const [staffs,setStaffs] = useState([]);
    const [orderid,setOrderID] = useState('');
    const [workid,setWorkID] = useState('');
    const [balance,setBalance] = useState(0);
    const [amount2pay,setAmountToPay] = useState({});
    const handleEvent = (e) => setData({...data,[e.target.name]:e.target.value});
    const handleEventProceed = (e) => setAmountToPay({...data,[e.target.name]:e.target.value});
    const checkButton = (e) => {
        e.preventDefault();
        axios.post(`${API}/api/is_order_completed/`,data)
        .then(res => {
            if (res.data.status) {
                axios.post(`${API}/api/delivery/`,data).then(res => {
                    alert(JSON.stringify(res.data.order_work_staff_assign[0].order.balance_amount))
                    setOrderID(res.data.order_work_staff_assign[0].order.order_id)
                    setWorkID(res.data.order_work_staff_assign[0].work.work_id)
                    setBalance(res.data.order_work_staff_assign[0].order.balance_amount)
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
        axios.get(`${API}/api/staff/`).then(res => setStaffs(res.data)).catch(err => console.log(err));
    }

    const checkout = (e) => {
        e.preventDefault()
        // Insert To Delivery Model
        const payload = {"order_id": e.target.order_id.value, "staff_id" : e.target.staff_id.value,"amount_to_pay" : e.target.amount_to_pay.value}
        axios.post(`${API}/api/proceed_delivery/`,payload).then(res => {
            alert(JSON.stringify(res.data))
        }).catch(err => console.log(err))
    }


    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);


  return (
    <div>

        <div className="flex scroll items-center mt-16 justify-center min-h-screen bg-gray-100">
            <div className="w-2/5 bg-white shadow-lg">

                    <form onSubmit={checkButton}>
                        <input type="text" name="order_id" onChange={handleEvent}/>
                        <input type="submit" value="Search" className='button bg-rose-500'/>
                    </form>
            </div>
            <div className='flex w-full'>
            {staffs.length > 0 ? (
                <form onSubmit={checkout} >
                <table>
                <tr>
                    <th>ORDER ID</th>
                    <th>WORK ID</th>
                    <th>STAFFS</th>
                    <th>DELIVERY DATE</th>
                    <th>BALANCE</th>
                    <th>AMOUNT TO PAY</th>
                </tr>

                <tr>
                    <td><input name="order_id" value={orderid} disabled/></td>
                    <td><input name="work_id" value={workid} disabled/></td>
                    <td>
                        <select name="staff_id" onChange={handleEventProceed} required>
                            <option selected hidden>Select Staff</option>
                            {
                            staffs.length > 0 ? staffs.map(e => <option value={e.staff_id}>{e.staff_name}</option>) : ""
                            }
                        </select>
                    </td>
                    <td>
                        <input
                              className="form-control block font-extrabold  w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              type={"date"}
                              defaultValue={date}
                          />
                    </td>
                </tr>
                <td><input name="blance_amount" value={balance} disabled/></td>
                <td><input name="amount_to_pay" onChange={handleEventProceed} /></td>
                <td><input type="submit" value="Checkout"/></td>
            </table>

                </form>
                )  : ""}
            </div>

        </div>
    </div>
  )
}

export default Delivery