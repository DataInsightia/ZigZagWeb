import React, {useState} from 'react';
import axios from "axios";
import API from "../../../api";
import {Navigate} from 'react-router'

const SearchInvoice = () => {
    const [order,setOrder] = useState({});
    const [gotoInvoice,setGotoInvice] = useState(false);
    const [order_id,setOrderID] = useState('');
    const [cust_id,setCustID] = useState('');
    const handleEvent = (e) => setOrder({ ...order, [e.target.name] : e.target.value });

    const checkOrder = (e) => {
        e.preventDefault();
        axios.get(`${API}/api/find_order/${order.order_id}/`).then(res => {
            setOrderID(res.data.order_id);
            setCustID(res.data.customer.cust_id);
            setGotoInvice(true);
        }).catch(err => {
            console.log(err);
            alert("Order Not Found!")
        });
    }
    return gotoInvoice && order_id !== "" && cust_id !== "" ? (<Navigate to={`/dashboard/view_invoice/${cust_id}/${order_id}/`} />) : (
        <div>
          <div className="md:mt-16">
            <div className="p-4 mt-4">
            <h1 className={'uppercase text-center text-4xl m-10'}>search invoice</h1>
                <br/>
                <div className="container">
                    <form className="grid justify-center" onSubmit={checkOrder}>
                        <input required  className="uppercase shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="order_id" placeholder={'Order ID'} onChange={handleEvent}/>
                        <div className="grid justify-center">
                            <input  className={"justify-center button text-white rounded p-3 m-3 bg-pink-600"} type="submit" />
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
    );
};

export default SearchInvoice;