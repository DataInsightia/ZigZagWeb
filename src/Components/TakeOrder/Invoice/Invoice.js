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
  const [delivery_invoice,setDeliveryInvoice] = useState(false);

  const pageStyle = `@media print{
    @page {
        size: a5;
        margin: 0;
    }
}`;

  const [order,setOrder] = useState({});
  const [orderWork,setOrderWork] = useState([{}]);
  const [orderMaterial,setOrderMaterial] = useState([{}]);

  let {custid,orderid,current_amount,pending_amount} = useParams();

  //  const custid = "ZC43434"  
  //   const orderid = "ZA786

  if (current_amount !== undefined && pending_amount !== undefined) {
    setDeliveryInvoice(true);
  }

  current_amount = current_amount ? current_amount : 0
  pending_amount = pending_amount ? pending_amount : 0


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

      <div ref={componentRef} className="flex items-center md:mt-16 ml-10 mr-10 justify-center min-h-screen mx-auto my-auto">
        <div className="md:w-1/2 bg-white shadow-lg">
          <div className="">
            <div  className="justify-center p-1">
              <div className="flex justify-center">
                <img src={invoiceimg} className="w-20 md:w-32 lg:w-28"/>
                <div className="w-30 text-center">
                  <br/>
                  <span className="text-rose-500 text-2xl">
                Chettinad ZigZag
              </span>
                  <br/>
                  <span className="text-xl">
                Mobile:+91 9940682836
              </span><br/>
                  <span className="text-sm font-bold">
              Address: 333A Poisolla Meiyar Street Near Daily Market, Udhyam Lodge Building, Karaikudi, Tamil Nadu 630001
              </span>
                </div>
              </div>
              <div className="w-full h-0.5 bg-indigo-500"></div>
              <div className="p-2"></div>
              <div className="flex justify-between">
                <div className="font-bold text-lg">ORDER ID : {orderid}</div>
                <div className="font-bold text-lg">MOBILE : {customerdetails.mobile}</div>
              </div>

              <div className="flex justify-between">
                <div className="font-bold text-lg text-transform: uppercase">CUSTOMER NAME : {customerdetails.cust_name}</div>
                <div className="font-bold text-lg">CUSTOMER ID : {customerdetails.cust_id}</div>
              </div>
              <div className="p-2"></div>
            </div>
            <div className="w-full h-0.5 bg-indigo-500"></div>
            <div className="flex justify-between p-4">
              <div>
                <div className="font-bold text-lg">Family Member Name:{(order.family_member === "" ? customerdetails.cust_name : order.family_member)}</div>
                <address className="text-sm">
                  <span className="font-bold"> Address : </span>
                  {customerdetails.address}
                </address>
              </div>
              <div className="w-50">
                <QRCode
                    size={80}
                    className="object-contain qr-code"
                    value={`${window.location.origin}/#/dashboard/invoicemob/${custid}/${orderid}`}/>
              </div>
              <div></div>
            </div>

            <div className="flex justify-center mx-10">
              <div className="border-b border-gray-200 shadow">
                <table className="p-96">
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


            {/* <TotalStrip order_id={orderid} cust_name={customerdetails.cust_name} total={order.total_amount} balance={order.balance_amount} advance={order.advance_amount} courier_charge={order.courier_amount} mobile={customerdetails.mobile} /> */}

            {
              delivery_invoice ? <NewAmount current_amount={current_amount} pending_amount={pending_amount}/> : ""
            }

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
              <PrintButton  componentRef={componentRef}/>
            </div>
          </div>
        </div>

        <div className="lg:w-1/1">
          <div className=" border-l-4 border-l-black h-full"></div>
        </div>

        <div className="md:w-1/2 bg-white shadow-lg">
          <div className="">
            <div  className="justify-center p-1">
              <div className="flex justify-center">
                <img src={invoiceimg} className="w-20 md:w-32 lg:w-28"/>
                <div className="w-30 text-center">
                  <br/>
                  <span className="text-rose-500 text-2xl">
                Chettinad ZigZag
              </span>
                  <br/>
                  <span className="text-xl">
                Mobile:+91 9940682836
              </span><br/>
                  <span className="text-sm font-bold">
              Address: 333A Poisolla Meiyar Street Near Daily Market, Udhyam Lodge Building, Karaikudi, Tamil Nadu 630001
              </span>
                </div>
              </div>
              <div className="w-full h-0.5 bg-indigo-500"></div>
              <div className="p-2"></div>
              <div className="flex justify-between">
                <div className="font-bold text-lg">ORDER ID : {orderid}</div>
                <div className="font-bold text-lg">MOBILE : {customerdetails.mobile}</div>
              </div>

              <div className="flex justify-between">
                <div className="font-bold text-lg text-transform: uppercase">CUSTOMER NAME : {customerdetails.cust_name}</div>
                <div className="font-bold text-lg">CUSTOMER ID : {customerdetails.cust_id}</div>
              </div>
              <div className="p-2"></div>
            </div>
            <div className="w-full h-0.5 bg-indigo-500"></div>
            <div className="flex justify-between p-4">
              <div>
                <div className="font-bold text-lg">Family Member Name:{(order.family_member === "" ? customerdetails.cust_name : order.family_member)}</div>
                <address className="text-sm">
                  <span className="font-bold"> Address : </span>
                  {customerdetails.address}
                </address>
              </div>
              <div className="w-50">
                <QRCode
                    size={80}
                    className="object-contain qr-code"
                    value={`${window.location.origin}/#/dashboard/invoicemob/${custid}/${orderid}`}/>
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


             {/*<TotalStrip order_id={orderid} cust_name={customerdetails.cust_name} total={order.total_amount} balance={order.balance_amount} advance={order.advance_amount} courier_charge={order.courier_amount} mobile={customerdetails.mobile} current_amount={0} pending_amount={0} />*/}


            {
              delivery_invoice ? <NewAmount current_amount={current_amount} pending_amount={pending_amount}/> : ""
            }
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
              <PrintButton  componentRef={componentRef}/>
            </div>
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

const NewAmount = (props) => {
  return (<div className="mt-2">
    {/*<div className="w-full h-0.5 bg-black" ></div>*/}
    <div className="flex justify-center columns-5 space-x-5 mx-10">
      <div className="text-lg">Current Amount : ₹{props.current_amount}</div>
      <div className="text-lg">Pending Amount : ₹{props.pending_amount} </div>
    </div>
    <div className="w-full h-0.5 bg-black" ></div>
  </div>)
}


const PrintButton = (props) => {
  return (
      <div className="flex items-end justify-end space-x-3">


        <ReactToPrint
            width={2}
            scale={0.8}
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
        <td className="px-2 py-2">
          <div className="text-xs text-gray-900">
            {props.prod_name}
          </div>
        </td>
        <td className="px-2 py-2 ">
          <div className="text-sm text-gray-500">{props.qty}</div>
        </td>
        <td className="px-2 py-2 text-sm text-gray-500">₹{props.price}</td>
        <td className="px-2 py-2 text-sm font-bold">₹{props.subtotal}</td>
      </tr>
  )
}
