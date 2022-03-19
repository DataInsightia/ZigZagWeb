import React,{useState} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import API from '../../../api'

function OrderStatus() {
    const [stage,setStage] = useState([])
    const [wa_stage,setWAstage] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [staffPic,setStaffPic] = useState('');
    const [orderid,setOrderID] = useState({});
    const [materialLocation,setMaterialLocation] = useState([{}]);

    const handleEvent = (e) => setOrderID({ ...orderid, [e.target.name] : e.target.value });

    const checkOrder = (e) => {
        e.preventDefault();

        axios.post(API + '/api/order_status_admin/',orderid).then(res => {
            if (res.data.status) {
                res.data.details !== undefined ? setStage(res.data.details) : setStage([]);
            } else {
                console.log(res.data.details)
                setShowModal(false)
            }
        }).catch(err => alert(err))
        

        axios.post(API + '/api/order_status_oa_admin/',orderid).then(res => {
            if (res.data.status) {
                if (res.data.data !== undefined) { setWAstage(res.data.data); } else { setWAstage({}); }
            } else {
                console.log("no data")
                setShowModal(false)
            }
        }).catch(err => alert(err))

        axios.get(API + `/api/material/${orderid.order_id}/`).then(res => {
            if (res.data !== undefined) {setMaterialLocation(res.data[0]);} else {setMaterialLocation([{}]);}
            console.log(res.data);
        }).catch(err => alert(err))


        if (materialLocation === undefined | materialLocation.length === 1) { alert("Not Found") } 
        // alert(materialLocation.length)
        
    }
    return (
        <div className="bg-gray-50 md:mt-16">
        <div className="p-4 mt-4">
            <h1 className="text-4xl text-center font-semibold mb-6">Order status</h1>
            <br/>
            <div className="container">

            <form className="grid justify-center" onSubmit={checkOrder}>
                <input required  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="order_id" placeholder={'Order ID'} onChange={handleEvent}/>
                <div className="grid justify-center">
                    <input  className={"justify-center button text-white rounded p-3 m-3 bg-pink-600"} type="submit" /></div>
            </form>



                {/*product status start*/}


                <div className="flex py-6 px-16  justify-center">

                    <div className="md:w-full px-3 mb-12 w-full">
                        <div className="flex w-full h-full  flex-wrap bg-rose-500 overflow-hidden rounded">
                            <div className="md:w-2/6">
                                <img className="object-cover h-full w-full" alt="#"
                                     src="https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg"/>
                            </div>
                            <div className="md:w-4/6 p-5">
                                <h2 className="text-white leading-normal text-lg">Work Complete</h2>
                                <div className="flex flex-wrap justify-between items-center md:mt-20">
                                    <div className="inline-flex items-center">
                                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                            {/* <img src="https://randomuser.me/api/portraits/men/5.jpg"/> */}
                                        </div>
                                            <div className="flex-1 pl-2">
                                                <h2 className="text-white mb-1">Current Material Location : {(materialLocation !== undefined) ? materialLocation.material_location : "Not Found"}</h2>
                                                {/* <p className="text-white opacity-50 text-xs">May 18</p> */}
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


                </div>
            </div>       
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
                                    <h3 className={"font-semibold text-lg mb-1 text-white"}>{e.stage} - by ({e.staff_name})</h3>
                                    <h5>{new Date(e.completion_date_time).toLocaleString('en-TN')}</h5>
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
                onClick={() => {setShowModal(true);setStaffPic(API + e.staff.photo);}}
                    className={"bg-gray-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full"}>
                    <h3 className={"font-semibold text-lg mb-1 text-white"}>(On Going) {e.orderworkstaffassign.order_work_label} {e.work_staff_completion_stage} - {e.orderworkstaffassign.staff.staff_name}</h3>
                </div>
            </div>)}



  {showModal ? (
        <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex bg-pink-700 items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold text-white">
                    Staff Photo
                </h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    x
                    </span>
                </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <img src={staffPic} height={500} width={400} alt="#"/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
                </div>
            </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null}
                  
        </div>
        </div>
    );
}

export default OrderStatus;