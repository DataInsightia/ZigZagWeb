import React, {useEffect, useState, useRef} from "react";
import invoiceimg from "../../../assets/img/logo.png";
import QRCode from "react-qr-code";
import axios from "axios";
import API from "../../../api";
import "../invoice.css";
import { useParams } from "react-router-dom";
import ReactToPrint from 'react-to-print';
import {Navigate} from "react-router";

export default function CheckOutInvoice(){

  const componentRef = useRef();
  // const [currectOrder.customer,setcurrectOrder.customer] = useState([]);
  const [delivery_invoice,setDeliveryInvoice] = useState(false);
  const [currectOrder, setCurrentOrder] = useState([{}]);

  const [order,setOrder] = useState({});
  const [orderWork,setOrderWork] = useState([{}]);
  const [orderMaterial,setOrderMaterial] = useState([{}]);
  const [edit,setEdit] = useState(false);

  const [cust_id,setCustID] = useState('');
  const [cust_name,setCustName] = useState('');
  const [cust_mobile,setCustMobile] = useState('');
  const [cust_address,setCustAddress] = useState('');
  let [cust_family_member,setCustFamilyMember] = useState('');

  const [completed_orders,setCompletedOrders] = useState([]);

  let {custid,orderid,current_amount,pending_amount} = useParams();

  //  const custid = "ZC43434"
  //   const orderid = "ZA786

  if (current_amount !== undefined && pending_amount !== undefined) {
    setDeliveryInvoice(true);
  }

  current_amount = current_amount ? current_amount : 0;
  pending_amount = pending_amount ? pending_amount : 0;

  useEffect(() => {
    // axios.post(API + "/api/order_invoice/",{"order_id" : orderid ,"cust_id" : custid})
    //     .then(res => {
    //       if (res.data.status) {
    //         setOrder(res.data.order[0]);
    //         setOrderWork(res.data.order_work);
    //         setOrderMaterial(res.data.order_material);
    //       }
    //     })
    // axios
    //     .post(API + "/api/customer_details/", {"cust_id" : custid})
    //     .then((res) => {
    //       if (res.data.length !== 0) {
    //         setcurrectOrder.customer(res.data[0])
    //       }else{
    //         console.log("This is Admin or Staff Mobile Number")
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    axios.get(`${API}/api/find_order/${orderid}/`)
    .then((res) => {
      const data = res.data.data;
      setCurrentOrder(res.data.data);
      console.log("data",res.data.data);
      setCustID(res.data.data.customer.cust_id);
      setCustName(res.data.data.customer.cust_name);
      setCustMobile(res.data.data.customer.mobile);
      setCustAddress(res.data.data.customer.address);
      setCustFamilyMember(res.data.data.customer.family_member === undefined ? res.data.data.customer.cust_name : res.data.data.customer.family_member);
    })
    .catch(err => console.log(err));

    axios.get(`${API}/api/completed_orders/${orderid}/`)
    .then((res) => {
      setCompletedOrders(res.data.data);
    })
    .catch(err => console.log(err));

  },[orderid]);


  const delete_order = () => {
  // <Navigate to="/dashboard/edit_order" />
  axios.delete(`${API}/api/delete_order/${orderid}/`).then(res => {
     if (res.data.status) {
       setEdit(true);
     }
  }).catch(err => console.log(err));

  if (custid !== undefined && orderid !== undefined){
      console.log("order Recipt");
      console.log(custid,orderid);
  }
}

  return edit ? (<Navigate to={`/dashboard/edit_order/${cust_id}/${orderid}/`} />) : (

      <div ref={componentRef} className="flex items-center md:mt-16 ml-10 mr-10 justify-center min-h-screen mx-auto my-auto">
        <div className="md:w-1/2 bg-white shadow-lg">
          <div className="">
            <div className="text-center p-2">Delivery Receipt</div>
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
              333A Poisolla Meiyar Street Near Daily Market, Udhyam Lodge Building, Karaikudi, Tamil Nadu 630001
              </span>
                </div>
              </div>
              <div className="w-full h-0.5 bg-indigo-500"></div>
              <div className="p-2"></div>
              <div className="flex justify-between">
                <div className="font-bold text-lg">ORDER ID : {orderid}</div>
                <div className="font-bold text-lg">MOBILE : {cust_mobile}</div>
              </div>

              <div className="flex justify-between">
                <div className="font-bold text-lg text-transform: uppercase">CUSTOMER NAME : {cust_name}</div>
                <div className="font-bold text-lg">CUSTOMER ID : {cust_id}</div>
              </div>
              <div className="p-2"></div>
            </div>
            <div className="w-full h-0.5 bg-indigo-500"></div>
            <div className="flex justify-between p-4">
              <div>
                <div className="font-bold text-lg">Family Member Name:{cust_family_member}</div>
                <address className="text-sm">
                  <span className="font-bold"> Address : </span>
                   {cust_address}
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
                      Work
                    </th>
                    <th className="px-2 py-2 text-xs text-gray-500 ">Staff</th>
                    <th className="px-2 py-2 text-xs text-gray-500 ">Delivery</th>
                  </tr>
                  </thead>
                  {/*{JSON.stringify(completed_orders)}*/}
                  <tbody className="bg-white">

                  {completed_orders != null ? completed_orders.map(e =>
                      <tr>
                        <td>{e.order_work_label}</td>
                        <td>{e.staff.staff_name}</td>
                      </tr>) : ""}


                  {/* {
                    orderMaterial.map((e) => <Row prod_name={e.material_name} qty={e.quantity} price={e.amount} subtotal={parseInt(e.quantity) * e.amount} />)
                  } */}

                  {/* <tr className="bg-gray-800">
                    <th colSpan="2"></th>
                    <td className="text-lg font-bold text-center text-white">
                      <b>Total</b>
                    </td>
                    <td className="text-lg font-bold text-center text-white">
                      <b>₹ {order.total_amount}</b>
                    </td>
                  </tr> */}
                  </tbody>
                </table>
              </div>
            </div>

            <AllAmount total={order.total_amount} balance={order.balance_amount} advance={order.advance_amount} courier_charge={order.courier_amount}/>


            {/* <TotalStrip order_id={orderid} cust_name={cust_name} total={order.total_amount} balance={order.balance_amount} advance={order.advance_amount} courier_charge={order.courier_amount} mobile={cust_mobile} /> */}

            {
              delivery_invoice ? <NewAmount current_amount={current_amount} pending_amount={pending_amount}/> : ""
            }

            <div className="flex justify-end">
              <div className="p-4">
                <h3>Signature</h3>
                {/* <div className="text-2xl italic text-indigo-500">AAAAA</div> */}
              </div>
            </div>

            <div className="p-4">
              <div className="flex text-xl items-center justify-center">
                Thank you very much for ordering with us.
              </div>
              <br/>
              {/*<PrintButton  componentRef={componentRef}/>*/}

                    <div className="flex items-end justify-end space-x-3">


                      <ReactToPrint
                          width={2}
                          scale={0.8}
                          trigger={() => <button className="px-4 py-2 text-sm text-green-600 bg-green-100">
                            Print
                          </button>}
                          content={() => componentRef.current}
                      />
                      <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100" onClick={delete_order}>
                            Edit
                      </button>
                          {/*<button className="px-4 py-2 text-sm text-red-600 bg-red-100">*/}
                          {/*  Cancel*/}
                          {/*</button>*/}
                    </div>

                  </div>
                </div>
              </div>

        <div className="lg:w-1/1">
          <div className=" border-l-4 border-l-black h-full"></div>
        </div>

        <div className="md:w-1/2 bg-white shadow-lg">
          <div className="">
          <div className="text-center p-2">Delivery Receipt</div>
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
              333A Poisolla Meiyar Street Near Daily Market, Udhyam Lodge Building, Karaikudi, Tamil Nadu 630001
              </span>
                </div>
              </div>
              <div className="w-full h-0.5 bg-indigo-500"></div>
              <div className="p-2"></div>
              <div className="flex justify-between">
                <div className="font-bold text-lg">ORDER ID : {orderid}</div>
                <div className="font-bold text-lg">MOBILE : {cust_mobile}</div>
              </div>

              <div className="flex justify-between">
                <div className="font-bold text-lg text-transform: uppercase">CUSTOMER NAME : {""}</div>
                <div className="font-bold text-lg">CUSTOMER ID : {cust_id}</div>
              </div>
              <div className="p-2"></div>
            </div>
            <div className="w-full h-0.5 bg-indigo-500"></div>
            <div className="flex justify-between p-4">
              <div>
                <div className="font-bold text-lg">Family Member Name:{(order.family_member === "" ? cust_name : order.family_member)}</div>
                <address className="text-sm">
                  <span className="font-bold"> Address : </span>
                  {cust_address}
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
                      Work
                    </th>
                    <th className="px-2 py-2 text-xs text-gray-500 ">Staff</th>
                    <th className="px-2 py-2 text-xs text-gray-500 ">Delivery</th>
                  </tr>
                  </thead>
                  <tbody className="bg-white">


                  {/* {
                    orderWork.map((e) => <Row prod_name={e.work_name} qty={e.quantity} price={e.amount} subtotal={parseInt(e.quantity) * e.amount} />)
                  }


                  {
                    orderMaterial.map((e) => <Row prod_name={e.material_name} qty={e.quantity} price={e.amount} subtotal={parseInt(e.quantity) * e.amount} />)
                  } */}




                  {/* <tr className="bg-gray-800">
                    <th colSpan="2"></th>
                    <td className="text-lg font-bold text-center text-white">
                      <b>Total</b>
                    </td>
                    <td className="text-lg font-bold text-center text-white">
                      <b>₹ {order.total_amount}</b>
                    </td>
                  </tr> */}
                  </tbody>
                </table>
              </div>
            </div>

            <AllAmount total={order.total_amount} balance={order.balance_amount} advance={order.advance_amount} courier_charge={order.courier_amount}/>


             {/*<TotalStrip order_id={orderid} cust_name={cust_name} total={order.total_amount} balance={order.balance_amount} advance={order.advance_amount} courier_charge={order.courier_amount} mobile={cust_mobile} current_amount={0} pending_amount={0} />*/}


            {
              delivery_invoice ? <NewAmount current_amount={current_amount} pending_amount={pending_amount}/> : ""
            }
            <div className="flex justify-end">
              <div className="p-4">
                <h3>Signature</h3>
                {/* <div className="text-2xl italic text-indigo-500">AAAAA</div> */}
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
      <div className="text-sm">Total : ₹{props.total}</div>
      <div className="text-sm">Already Paid : ₹{props.already_paid}</div>
      <div className="text-sm">Current Amount : ₹{props.current_amount}</div>
      <div className="text-sm">Balance Amount : ₹{props.balance_amount} </div>
      {/* <div className="text-lg">Courier Charge : ₹{props.courier_charge}</div>
      <div className="text-lg">Balance : ₹{props.balance}</div> */}
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
