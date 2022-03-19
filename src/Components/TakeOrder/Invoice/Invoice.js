import React, {useEffect, useState, useRef} from "react";
import invoiceimg from "../../../assets/img/logo.png";
import QRCode from "react-qr-code";
import axios from "axios";
import API from "../../../api";
import "../invoice.css";
import { useParams } from "react-router-dom";
import ReactToPrint from 'react-to-print';

export default function Invoice(){

  const componentRef = useRef();
  const [customerdetails,setCustomerDetails] = useState([]);

  const [order,setOrder] = useState({});
  const [orderWork,setOrderWork] = useState([{}]);
  const [orderMaterial,setOrderMaterial] = useState([{}]);

  const {custid,orderid} = useParams();

  //  const custid = "ZC43434"  
  //   const orderid = "ZA786"


  console.log(custid,orderid)

  useEffect(() => {
    axios.post(API + "/api/order_invoice/",{"order_id" : orderid ,"cust_id" : custid})
    .then(res => {
      if (res.data.status) {
      setOrder(res.data.order[0]);
      setOrderWork(res.data.order_work);
      setOrderMaterial(res.data.order_material);
    }
  })
    axios
    .post(API + "/api/customer_details/", {"cust_id" : custid})
    .then((res) => {
      if (res.data.length !== 0) {
        setCustomerDetails(res.data[0])
      }else{
        console.log("This is Admin or Staff Mobile Number")
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);


  return (
    <div className="flex scroll items-center mt-16 justify-center min-h-screen bg-gray-100">
      <div ref={componentRef} className="w-1/2 bg-white shadow-lg">
        <div  className="flex justify-center p-1 flex">
          <div className="flex justify-center">
            <img src={invoiceimg} className="w-20 md:w-32 lg:w-28"/>
           <div className="w-30 text-center">
             <br/>
           <span className="text-rose-500 text-2xl">
             Chettinad ZigZag
           </span><br/>
           <span className="text-xl">
             Mobile:+91 9940682836
           </span><br/>
             <span className="text-sm font-bold">
            Address: 333A Poisolla Meiyar Street Near Daily Market, Udhyam Lodge Building, Karaikudi, Tamil Nadu 630001 
           </span>
           
           </div>
          </div>
          <div className="p-2">
          </div>
        </div>
        <div className="w-full h-0.5 bg-indigo-500"></div>
        <div className="flex justify-between p-4">
          <div>
              <h6 className="font-bold text-xl">ORDER ID : {orderid}</h6>
            <span className="text-sm">Customer Name : {customerdetails.cust_name}</span>
            <address className="text-sm">
              <span className="font-bold"> Address : </span>
              {customerdetails.address}
            </address>
          </div>
          <div className="w-50">
          <QRCode
              size={80}
              className="object-contain qr-code "
              value={window.location.href}/>
          </div>
          <div></div> 
        </div>

        <div className="flex justify-center ">
          <div className="border-b border-gray-200 shadow">
            <table className="w-5/5">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-xs text-gray-500 ">
                    Product Name
                  </th>
                  <th className="px-2 py-2 text-xs text-gray-500 ">Quantity</th>
                  <th className="px-2 py-2 text-xs text-gray-500 ">Rate</th>
                  <th className="px-2 py-2 text-xs text-gray-500 ">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white">

                
                {
                  orderWork.map((e) => <Row prod_name={e.work_name} qty={e.quantity} price={e.amount} subtotal={parseInt(e.quantity) * e.amount} />)
                }

              
                {
                 orderMaterial.map((e) => <Row prod_name={e.material_name} qty={e.quantity} price={e.amount} subtotal={parseInt(e.quantity) * e.amount} />)
                }  

                


                <tr className="bg-gray-800">
                  <th colSpan="2"></th>
                  <td className="text-lg font-bold text-center text-white">
                    <b>Total</b>
                  </td>
                  <td className="text-lg font-bold text-center text-white">
                    <b>₹ {order.total_amount}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <AllAmount total={order.total_amount} balance={order.balance_amount} advance={order.advance_amount} courier_charge={order.courier_amount}/>


        <TotalStrip order_id={orderid} cust_name={customerdetails.cust_name} total={order.total_amount} balance={order.balance_amount} advance={order.advance_amount} courier_charge={order.courier_amount} mobile={customerdetails.mobile} />


        <div className="flex justify-end">
          <div className="p-4">
            <h3>Signature</h3>
            <div className="text-2xl italic text-indigo-500">AAAAA</div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex text-xl items-center justify-center">
            Thank you very much for ordering with us.
          </div>
          <br/>
          <PrintButton componentRef={componentRef}/>
        </div>
        
      </div>
      
    </div>
  );
}


const TotalStrip = (props) => {
  return (
    <div>
      <div id="scissors"></div>
        <div className="flex justify-between p-4">
          <div>
            <h3 className="text-xl">Order ID: {props.order_id}</h3>
            <h3 className="text-xl">Customer Name: {props.cust_name}</h3>
            <h3 className="text-xl">Mobile: {props.mobile}</h3>
          </div>
          <div className="p-4">
            <QRCode
                size={60}
                className="object-contain qr-code "
                value={window.location.href} />
          </div>
          
        </div>
        <AllAmount total={props.total} advance={props.advance} courier_charge={props.courier_charge} balance={props.balance}/>
    </div>
  )
}

const AllAmount = (props) => {
  return (<div className="mt-2">
    <div className="w-full h-0.5 bg-black" ></div>
    <div className="flex justify-center columns-5 space-x-5 mx-10">
          <div className="text-lg">Amount : ₹{props.total}</div>
          <div className="text-lg">Advance : ₹{props.advance} </div>
          <div className="text-lg">Courier Charge : ₹{props.courier_charge}</div>
          <div className="text-lg">Balance : ₹{props.balance}</div>
        </div>
    <div className="w-full h-0.5 bg-black" ></div>
  </div>)
}


const PrintButton = (props) => {
  return (
    <div className="flex items-end justify-end space-x-3">
  

            <ReactToPrint
              trigger={() => <button className="px-4 py-2 text-sm text-green-600 bg-green-100">
              Print
            </button>}
              content={() => props.componentRef.current}
      />          
            {/* <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100">
              Save
            </button>
            <button className="px-4 py-2 text-sm text-red-600 bg-red-100">
              Cancel
            </button> */}
    </div>
  )
}

const Row = (props) => {
    return(
      <tr className="whitespace-nowrap">
        <td className="px-2 py-2 md:px-10">
          <div className="text-sm text-gray-900">
            {props.prod_name}
          </div>
        </td>
        <td className="px-2 py-2 md:px-10">
          <div className="text-sm text-gray-500">{props.qty}</div>
        </td>
        <td className="px-2 md:px-10 py-2 text-sm text-gray-500">₹{props.price}</td>
        <td className="px-2 md:px-10 py-2 text-sm font-bold">₹{props.subtotal}</td>
      </tr>
    )
}
