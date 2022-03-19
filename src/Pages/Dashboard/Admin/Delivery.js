import axios from 'axios';
import React, { useEffect, useState } from 'react'
import API from '../../../api';

function Delivery() {
    const [data,setData] = useState({});
    const [staffs,setStaffs] = useState({});
    const handleEvent = (e) => setData({...data,[e.target.name]:e.target.value});
    const checkButton = async (e) => {
        e.preventDefault();
        let res = await axios.post(`${API}/api/is_order_completed/`,data)
        if (res.data.status) {
            let values = await axios.post(`${API}/api/delivery/`,data)
            alert(JSON.stringify(values))
        }
    }

    useEffect(() => {
        axios.get(`${API}/api/staff/`).then(res => setStaffs(res.data)).catch(err => console.log(err));
    },[])
  return (
    <div>
        <div className="flex scroll items-center mt-16 justify-center min-h-screen bg-gray-100">
            <div className="w-2/5 bg-white shadow-lg">
                    <form onSubmit={checkButton}>
                        <input type="text" name="order_id" onChange={handleEvent}/>
                        <input type="submit" className='button bg-rose-500'/>
                    </form>
            </div>
            <table>
                <tr>
                    <th>ORDER ID</th>
                    <th>WORK ID</th>
                    <th>STAFFS</th>
                    <th>DELIVERY DATE</th>
                    <th>BALANCE</th>
                    <th>AMOUNT TO PAY</th>
                </tr>
                {
                <tr>
                    <td></td>
                </tr>
                }
            </table>
        </div>
    </div>
  )
}

export default Delivery