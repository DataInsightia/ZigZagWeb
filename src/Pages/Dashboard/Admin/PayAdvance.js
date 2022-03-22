import axios from 'axios';
import React, { useState } from 'react'
import API from '../../../api';


function PayAdvance() {
    const [data,setData] = useState({});
    const [staffs,setStaffs] = useState([]);
    const [orderid,setOrderID] = useState('');
    const [workid,setWorkID] = useState('');
    const [balance,setBalance] = useState(0);
    const [amount2pay,setAmountToPay] = useState({});
    const [address,setAddress] = useState('');
    const handleEvent = (e) => setData({...data,[e.target.name]:e.target.value});
    const handleEventProceed = (e) => setAmountToPay({...amount2pay,[e.target.name]:e.target.value});
    const handleEventAddress = (e) => setAddress({...address,[e.target.name] : e.target.value});
    const checkButton = (e) => {
        e.preventDefault();
        axios.post(`${API}/api/is_order_completed/`,data)
        .then(res => {
            if (res.data.status) {
                axios.post(`${API}/api/delivery/`,data).then(res => {
                    alert(`₹ ${JSON.stringify(res.data.order_work_staff_assign[0].order.balance_amount)} to pay !`)
                    setOrderID(res.data.order_work_staff_assign[0].order.order_id)
                    setWorkID(res.data.order_work_staff_assign[0].work.work_id)
                    setBalance(res.data.order_work_staff_assign[0].order.balance_amount)
                }).catch(err => console.log(err))

                axios.get(`${API}/api/find_order/${data.order_id}`).then(res => {
                    setAddress(res.data.courier_address)
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
        axios.get(`${API}/api/staff/`).then(res => setStaffs(res.data)).catch(err => console.log(err));
    }
    const fix_address = (e) => axios.get(`${API}/api/find_order/${data.order_id}`).then(res => {
        setAddress(res.data.courier_address)
    }).catch(err => console.log(err))


    const checkout = (e) => {
        e.preventDefault()
        // Insert To Delivery Model
        const order_id = e.target.order_id.value;
        const amount_to_pay = e.target.amount_to_pay.value;
        const pickup_type = e.target.pickup_type.value;
        const payment_mode = e.target.payment_mode.value;
        const payment_ref_no = e.target.payment_ref_no.value;
        const payment_date = e.target.payment_date.value;
        const payment_ref_proof = e.target.payment_ref_proof.files[0];



        const formData = new FormData()
        const other_delivery = {"order_id" : order_id,"payment_mode" : payment_mode,"amount_to_pay" : amount_to_pay, "pickup_type" : pickup_type, "payment_ref_no" : payment_ref_no, "payment_date" : payment_date}
        formData.append("data",JSON.stringify(other_delivery))
        formData.append("payment_ref_proof",payment_ref_proof)


        axios.post(`${API}/api/proceed_pay_advance/`,formData).then(res => {
            alert(JSON.stringify(res.data))
            // axios.put(`${API}/api/find_order/`,{"order_id" : e.target.order_id.value,"address" : address}).then(res => console.log(res.data)).catch(err => console.log(err))
            alert(amount2pay.courier_address);
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
                        <input type="text" name="order_id" onChange={handleEvent} className={'uppercase'}/>
                        <input type="submit" value="Search" className='button bg-rose-500'/>
                    </form>
            </div>
            <div className='flex w-full'>
            {staffs.length > 0 ? (
                <form onSubmit={checkout} >
                    <input name="order_id" value={orderid} disabled/>
                    <input name="work_id" value={workid} disabled/>

                        <select name={"pickup_type"} onChange={(e) => {handleEventProceed(e)}} onBlur={fix_address} required>
                            <option selected hidden value={''}>Select Pickup Type</option>
                            <option value={'courier'}>COURIER</option>
                            <option value={'other'}>OTHER</option>
                        </select>


                        {
                            (amount2pay.pickup_type) === "courier" ? (<textarea name={'courier_address'} defaultValue={address} onChange={handleEventAddress} placeholder={'Your Address'} required/>) : (amount2pay.pickup_type) === "other" ? (<textarea name={'courier_address'} onChange={handleEventAddress} placeholder={'Enter Alternative address'} required/>) : ""
                        }

                        <select name={"payment_mode"} onChange={handleEventProceed} required>
                            <option selected hidden value={''}>Select Payment Mode</option>
                            <option value={'self'}>SELF</option>
                            <option value={'other'}>OTHER</option>
                            <option value={'online'}>ONLINE</option>
                        </select>

                        <select name="staff_id" onChange={handleEventProceed} required>
                            <option selected hidden value={''}>Select Staff</option>
                            {
                            staffs.length > 0 ? staffs.map(e => <option value={e.staff_id}>{e.staff_name}</option>) : ""
                            }
                        </select>

                        <input
                              className="form-control block font-extrabold  w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              type={"date"}
                              defaultValue={date}
                          />

                <input type="text" name="blance_amount" value={balance} disabled/>
                <input type="text" name="amount_to_pay" placeholder={'amount to pay'} required/>
                <input type="text" name="payment_ref_no" placeholder={'payment ref no'} required />
                <input type="date" name="payment_date" placeholder={'payment_date'} required/>
                <input type="file" name="payment_ref_proof" required/>
                <input type="submit" value="Checkout"/>

                </form>
                )  : ""}
            </div>

        </div>
    </div>
  )
}

export default PayAdvance