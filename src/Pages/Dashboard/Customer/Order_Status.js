import React,{useEffect,useState} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import API from '../../../api'

function OrderStatus() {
    const [stage,setStage] = useState([])
    const [wa_stage,setWAstage] = useState([])
    useEffect(async() => {
        const os_res = await axios.post(API + '/api/order_status/',{"order_id": "ZA786"})
        if (os_res.data.status) {setStage(os_res.data.details)} else {
            alert("order not found")
        }

        const wsa_os_res = await axios.post(API + '/api/order_status_oa/',{"order_id": "ZA786"})
        if (wsa_os_res) {setWAstage(wsa_os_res.data)} else {
            alert("no data")
        }
        
    },[]);
    return (
        <div className="bg-gray-50 mt-16">
        <div className="p-4 mt-4">
            <h1 className="text-4xl text-center font-semibold mb-6">Package status</h1>
            <br/>


            <div className="container">

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
                                    <div className="inline-flex items-center">
                                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                            <img src="https://randomuser.me/api/portraits/men/5.jpg"/>
                                        </div>
                                        <div className="flex-1 pl-2">
                                            <h2 className="text-white mb-1">Luke Nunez</h2>
                                            <p className="text-white opacity-50 text-xs">May 18</p>
                                        </div>
                                    </div>
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
                      <h3 className={"font-semibold text-lg mb-1 text-white"}>{e.status}{e.stage}</h3>
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
      <h3 className={"font-semibold text-lg mb-1 text-white"}>(On Going) {e.work_staff_completion_stage}</h3>
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

export default OrderStatus;