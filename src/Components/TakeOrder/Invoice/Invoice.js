import React, {useEffect, useState} from "react";
import invoiceimg from "../../../assets/img/logo.png";
import QRCode from "react-qr-code";
import axios from "axios";
import API from "../../../api";
import "../invoice.css";
import { useParams } from "react-router-dom";

export default function Invoice(){

  const [tmpwork,setTmpWork] = useState([]);
  const [tmpmaterial,setTmpMaterial] = useState([]);
  const [tmpworktotal,setTmpWorkTotal] = useState(0)
  const [tmpmaterialtotal,setMaterialTotal] = useState(0)
  const [customerdetails,setCustomerDetails] = useState([]);

  const [orderInvoice,setOrderInvoice] = useState([{}]);

  const {custid,orderid} = useParams();

  //  const custid = "ZC43434"  
  //   const orderid = "ZA786"


  console.log(custid,orderid)

  useEffect(() => {
    axios.post(API + "/api/order_invoice/",{"order_id" : orderid ,"cust_id" : custid})
    .then(res => {
      if (res.data.status) {
      setOrderInvoice(res.data);
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

                
                {
                  orderInvoice.order_work.map((e) => <Row prod_name={e.work_name} qty={e.quantity} price={e.amount} subtotal={parseInt(e.quantity) * e.amount} />)
                }


                {/* {
                  orderInvoice.order_material.map((e) => <Row prod_name={e.material_name} qty={e.quantity} price={e.amount} subtotal={parseInt(e.quantity) * e.amount} />)
                }   */}


                <tr className="bg-gray-800">
                  <th colSpan="3"></th>
                  <td className="text-lg font-bold text-center text-white">
                    <b>Total</b>
                  </td>
                  <td className="text-lg font-bold text-center text-white">
                    <b>₹ {0}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <TotalStrip order_id={orderid} cust_name={customerdetails.cust_name} total={(tmpmaterialtotal + tmpworktotal)} balance={0} advance={0} other_charge={0} mobile={customerdetails.mobile} />


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
                value="ZC001"/>
          </div>
        </div>
        <div className="w-full h-0.5 bg-black" ></div>
        <div className="flex justify-center columns-5 space-x-5 mx-10">
          <div className="text-lg">Amount : ₹{props.total}</div>
          <div className="text-lg">Advance : ₹{props.advance} </div>
          <div className="text-lg">Other Charge : ₹{props.other_charge}</div>
          <div className="text-lg">Balance : ₹{props.balance}</div>
        </div>

        <div className="w-full h-0.5 bg-black" ></div>
    </div>
  )
}

const Row = (props) => {
    return(
      <tr className="whitespace-nowrap">
        <td className="px-10 py-2 text-sm text-gray-500">{1}</td>
        <td className="px-10 py-2">
          <div className="text-sm text-gray-900">
            {props.prod_name}
          </div>
        </td>
        <td className="px-10 py-2">
          <div className="text-sm text-gray-500">{props.qty}</div>
        </td>
        <td className="px-10 py-2 text-sm text-gray-500">₹{props.price}</td>
        <td className="px-10 py-2 text-sm font-bold">₹{props.subtotal}</td>
      </tr>
    )
}
