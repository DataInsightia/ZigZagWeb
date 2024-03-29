import React,{useEffect,useState} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import API from '../../../api'

function CustomerOrderStatus() {
    const [stage,setStage] = useState([])
    const [wa_stage,setWAstage] = useState([])
    const [orderid,setOrderID] = useState({});
    const [oc_stage,setOCstage] = useState([]);

    const handleEvent = (e) => setOrderID({ ...orderid, [e.target.name]: e.target.value.toUpperCase() });

    const checkOrder = (e) => {
        e.preventDefault();
        // // ZA786
        axios.post(API + '/api/order_status_admin/',orderid).then(res => {
            if (res.data.status) {
                setStage(res.data.details);
            } else {
                console.log(res.data.details)
            }
        })

        axios.post(API + '/api/order_status_oa_admin/',orderid).then(res => {
            if (res.data.status) {
                setWAstage(res.data.data);
            } else {
                console.log("no data")
            }
        })

        axios.post(API + '/api/order_completion/',orderid).then(res => {
            if (res.data.status) {
                setOCstage(res.data.data);
            } else {
                console.log("no data")
            }
        })
    }


    return (
        <div className="bg-gray-50 mt-16">
        <div className="p-4 mt-4">
            <h1 className="text-4xl text-center font-semibold mb-6">Order status</h1>
            <br/>

            <div className="container">

            <form className="grid justify-center" onSubmit={checkOrder}>
        <input required  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="order_id" placeholder={'Order ID'} onChange={handleEvent} value={orderid.order_id}/>
        <div className="grid justify-center">
            <input  className={"justify-center button text-white rounded p-3 m-3 bg-pink-600"} type="submit" /></div>
    </form>

                {/*product status start*/}

                <div className="flex justify-center">

                    <div className="md:w-full px-3 mb-12 w-full">
                        <div className="flex w-full h-full  flex-wrap bg-rose-500 overflow-hidden rounded">
                            <div className="w-2/6">
                                <img className="object-cover h-full w-full"
                                     src="https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg"/>
                            </div>
                            <div className="w-4/6 p-5">
                                <h2 className="text-white leading-normal text-lg">Work Complete</h2>
                                <div className="flex flex-wrap justify-between items-center mt-20">
                                    
                                    <span className="text-white opacity-50">
                                        <div>
                                            <i className="fa fa-check-circle text-white"></i>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/*product status end*/}

                <div className="flex flex-col md:grid grid-cols-12 text-gray-50 px-72">

{stage.map((e)=>

                
                e.status ? (<div className="flex md:contents">
                <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                   <div className="h-full w-6 flex items-center justify-center">
                          <i className={(e.status ? "h-full w-2 bg-green-500 pointer-events-none" : "h-full w-2 bg-red-500 pointer-events-none")}></i>
                      </div>
                      <div
                          className={(e.status ?  "w-7 h-7 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center" : "w-7 h-7 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center")}>
                          {(e.status ? <i className="fa fa-check-circle text-white"></i> : <i className="fa fa-times-circle text-white"></i>)}
                      </div>
                  </div>
                  <div
                      className={(e.status ? "bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full" : "bg-red-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full")}>
                      <h3 className={"font-semibold text-lg mb-1 text-white"}>{e.stage}</h3>
                  </div>
              </div>) : ""
)}


{wa_stage.map((e)=>

                
<div className="flex md:contents">
<div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
   <div className="h-full w-6 flex items-center justify-center">
          <i className={"h-full w-2 bg-gray-500 pointer-events-none" }></i>
      </div>
      <div
          className={"w-7 h-7 absolute top-1/2 -mt-3 rounded-full bg-gray-500 shadow text-center"}>
          <i className="fa fa-check-circle text-white"></i>
      </div>
  </div>
  <div
      className={"bg-gray-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full"}>
      <h3 className={"font-semibold text-lg mb-1 text-white"}>(On Going) {e.orderworkstaffassign.order_work_label} {e.work_staff_completion_stage}</h3>
  </div>
</div>
)}


{oc_stage.map((e)=>

                
<div className="flex md:contents">
<div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
   <div className="h-full w-6 flex items-center justify-center">
          <i className={"h-full w-2 bg-green-700 pointer-events-none" }></i>
      </div>
      <div
          className={"w-7 h-7 absolute top-1/2 -mt-3 rounded-full bg-green-700 shadow text-center"}>
          <i className="fa fa-check-circle text-white"></i>
      </div>
  </div>
  <div
      className={"bg-green-700 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full"}>
      <h3 className={"font-semibold text-lg mb-1 text-white"}>Delivered</h3>
  </div>
</div>
)}



                   
{/* 
                    <div className="flex md:contents">
                        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                            <div className="h-full w-6 flex items-center justify-center">
                                <i className="h-full w-2 bg-green-500 pointer-events-none"></i>
                            </div>
                            <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                                <i className="fa fa-check-circle text-white"></i>
                            </div>
                        </div>
                        <div
                            className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                            <h3 className="font-semibold text-lg mb-1">Package Booked</h3>
                            <p className="leading-tight text-justify w-full">
                                21 July 2021, 04:30 PM
                            </p>
                        </div>
                    </div>

                    <div className="flex md:contents">
                        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                            <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-2 bg-green-500 pointer-events-none"></div>
                            </div>
                            <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                                <i className="fa fa-check-circle text-white"></i>
                            </div>
                        </div>
                        <div
                            className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                            <h3 className="font-semibold text-lg mb-1">Out for Delivery</h3>
                            <p className="leading-tight text-justify">
                                22 July 2021, 01:00 PM
                            </p>
                        </div>
                    </div>

                    <div className="flex md:contents">
                        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                            <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-2 bg-red-500 pointer-events-none"></div>
                            </div>
                            <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center">
                                <i className="fa fa-times-circle text-white"></i>
                            </div>
                        </div>
                        <div className="bg-red-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                            <h3 className="font-semibold text-lg mb-1 text-gray-50">Cancelled</h3>
                            <p className="leading-tight text-justify">
                                Customer cancelled the order
                            </p>
                        </div>
                    </div>

                    <div className="flex md:contents">
                        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                            <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-2 bg-rose-500 pointer-events-none"></div>
                            </div>
                            <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-rose-500 shadow text-center">
                                <i className="fa fa-exclamation-circle text-white-500"></i>
                            </div>
                        </div>
                        <div
                            className="bg-rose-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                            <h3 className="font-semibold text-lg mb-1 text-white">Delivered</h3>
                            <p className="leading-tight text-justify">

                            </p>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
        </div>
    );
}

export default CustomerOrderStatus;