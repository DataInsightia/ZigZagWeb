import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../api";
import QRCode from "react-qr-code";
import "./qr.css";
import $ from "jquery";
import "./button.css";
import {useNavigate} from 'react-router-dom'
import {Navigate} from 'react-router'

function TakeOrder() {
  $(function () {
    $("#datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      duration: "fast",
    });
  });

  let history = useNavigate();

  const [orderid, setOrderid] = useState("");
  const [isInvoice,setIsinvoice] = useState(false);
  const [cust, setCust] = useState(false);
  const [works, setWorks] = useState([{}]);
  const [materials, setMaterials] = useState([{}]);
  const [tmpworks, setTmpworks] = useState([]);
  const [tmpmaterials, setTmpmaterials] = useState([]);
  let [total, setTotal] = useState(0);
  let [balance, setBalance] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [customer, setCustomer] = useState({
    cust_id: "",
  });


var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0,10);

  const [customer_details, SetCustomerDetails] = useState({});

  const [others, setOthers] = useState({
    pickup_type: "",
    due_date: "",
    courier_amount: "0",
    advance_amount: "0",
    balance_amount: "0",
  });

  const [material, setMaterial] = useState({
    material_id: "",
    qty: "",
    amount: "",
  });

  const [work, setWork] = useState({
    work_id: "",
    qty: "",
    amount: "",
  });

  const fetch = async () => {
    var materials = await axios.post(API + "/api/tmp_materials/", {
      order_id: orderid,
    });
    var works = await axios.post(API + "/api/tmp_works/", { order_id: orderid });
    var total =
        (works.data.status === undefined ? works.data.total.total__sum : 0) +
        (materials.data.status === undefined
            ? materials.data.total.total__sum
            : 0);
    setTotal(total);
    setBalance(total);
  };

  useEffect(() => {
    fetch_works();
    fetch_materials();
    axios
      .get(API + "/api/generate_orderid/")
      .then((res) => {
        setOrderid(res.data["order_id"]);

        fetch_work_table();
        fetch_material_table();
        fetch();
        // console.log(res.data['order_id']);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orderid]);

  const current_date = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;
    return today;
  };

  const yyyymmdd = (dateIn) => {
    var parts = dateIn.split("-");
    return parts[0] + "-" + parts[1] + "-" + parts[2];
  };

  const update_advance_amount = () =>
      setAdvance(parseInt(others.advance_amount));
  const fetch_work_table = () =>
      axios
          .post(API + "/api/tmp_works/", { order_id: orderid })
          .then((res) => {
            if ("status" in res.data) {
              console.log(res.data);
              setTmpworks([]);
            } else {
              setTmpworks(res.data["data"]);
            }
          })
          .catch((err) => {
            console.log(err);
          });

  const fetch_material_table = () =>
      axios
          .post(API + "/api/tmp_materials/", { order_id: orderid })
          .then((res) => {
            if ("status" in res.data) {
              console.log(res.data);
              setTmpmaterials([]);
            } else {
              setTmpmaterials(res.data["data"]);
            }
          })
          .catch((err) => {
            console.log(err);
          });

  const fetch_materials = async () => {
    var materials = await axios.get(API + "/api/materials/");
    setMaterials(materials.data);
  };

  const fetch_works = async () => {
    var works = await axios.get(API + "/api/works/");
    setWorks(works.data);
  };

  const handleWorkEvent = (e) =>
      setWork({ ...work, [e.target.name]: e.target.value });
  const handleMaterialEvent = (e) =>
      setMaterial({ ...material, [e.target.name]: e.target.value });
  const handleCustomer = (e) =>
      setCustomer({ ...customer, [e.target.name]: e.target.value });
  const handleOther = (e) =>
      setOthers({ ...others, [e.target.name]: e.target.value });

  const getWorkAmount = (wn) =>
      setWork({
        ...work,
        ["amount"]: works.find((e) => e.work_id === wn)["amount"],
      });
  const getMaterialAmount = (mn) =>
      setMaterial({
        ...material,
        ["amount"]: materials.find((e) => e.material_id === mn)["amount"],
      });

  const addWork = (e) => {
    e.preventDefault();
    work["cust_id"] = customer_details["cust_id"];
    work["order_id"] = orderid;
    work["total"] = parseInt(work["qty"]) * parseInt(work["amount"]);
    console.log(work);
    // Insert to tmp_work
    axios
        .post(API + "/api/tmp_work/", work)
        .then((res) => {
          console.log(res.data);
          fetch_work_table();
          fetch();
        })
        .catch((err) => console.log(err));
    fetch_work_table();
    fetch();
  };

  const addMaterial = (e) => {
    e.preventDefault();
    material["cust_id"] = customer_details["cust_id"];
    material["order_id"] = orderid;
    material["total"] =
        parseInt(material["qty"]) * parseInt(material["amount"]);
    // Insert to tmp_material
    axios
        .post(API + "/api/tmp_material/", material)
        .then((res) => {
          fetch_material_table();
          fetch();
        })
        .catch((err) => console.log(err));
    fetch_material_table();
    fetch();
  };

  const delTmpWork = (id) => {
    axios
        .post(API + "/api/del_tmpwork/", { id: id })
        .then((res) => {
          console.log(res.data);
          fetch_work_table();
          fetch();
        })
        .catch((err) => {
          console.log(err);
        });
    fetch_work_table();
    fetch();
  };

  const delTmpMaterial = (id) => {
    axios
        .post(API + "/api/del_tmpmaterial/", { id: id })
        .then((res) => {
          console.log(res.data);
          fetch_material_table();
          fetch();
        })
        .catch((err) => {
          console.log(err);
        });
    fetch_material_table();
    fetch();
  };
  const findCustomer = (e) => {
    e.preventDefault();
    axios
        .post(API + "/api/customer_details/", customer)
        .then((res) => {
          if (res.data.length !== 0) {
            SetCustomerDetails(res.data[0]);
            setCust(true);
            console.log(res.data);
          }else{
            console.log("This is Admin or Staff Mobile Number")
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const update_balance_with_courier = (e) => {
    var courier = parseInt(e.target.value);
    // setTotal(total + parseInt(courier));
    setBalance((total + parseInt(courier)) - advance);
  };

  const update_balance_with_advance = (e) => {
    var advance = parseInt(e.target.value);
    setAdvance(advance);
    setBalance(total - advance);
  };

  const nextChar = (c) => {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  };

  const get_courier_address = (pickup_type) => {
    if (pickup_type === "self"){
      return customer_details.address
    }else if (pickup_type === "courier") {
      return others.courier_address
    }else if (pickup_type === "other") {
      return ""
    }
  }

  const printOrder = (e) => {
    e.preventDefault();

    if (others.due_date !== "") {
      const order_payload = {
        ...{
          order_id: orderid,
          cust_id: customer_details["cust_id"],
          due_date: yyyymmdd(others.due_date),
          pickup_type: others.pickup_type,
          total_amount: total,
          advance_amount: advance,
          balance_amount: balance,
          courier_amount: parseInt(others.courier_amount),
          courier_address: get_courier_address(others.pickup_type)
        },
      };

      axios
          .post(API + "/api/add_order/", order_payload)
          .then((res) => {
            console.log("add_order", res.data);
            if (res.data.status) {
              var wc = "A";
              for (var i = 0; i < tmpworks.length; i++) {
                const tmpwork_payload = {
                  ...{
                    order_id: orderid,
                    work_id: tmpworks[i].work_id,
                    qty: tmpworks[i].quantity,
                    work_amount: tmpworks[i].amount,
                    work_name: tmpworks[i].work_name,
                  },
                };
                axios
                    .post(API + "/api/add_order_work/", tmpwork_payload)
                    .then((res) => console.log("add_order_work", res.data))
                    .catch((err) => console.log(err));

                for (var k = 0; k < parseInt(tmpworks[i].quantity); k++) {
                  console.log({
                    order_id: orderid,
                    work_id: tmpworks[i].work_id,
                    order_work_label: tmpworks[i].work_id + wc,
                  });
                  axios
                      .post(API + "/api/order_work_staff_assign/", {
                        order_id: orderid,
                        order_work_label: tmpworks[i].work_id + wc,
                        work_id: tmpworks[i].work_id,
                      })
                      .then((res) => {
                        console.log("order_work_staff_assign", res.data);
                      })
                      .catch((err) => console.log(err));
                  wc = nextChar(wc);
                }

                for (var j = 0; j < tmpmaterials.length; j++) {
                  const tmpmaterial_payload = {
                    ...{
                      order_id: orderid,
                      material_id: tmpmaterials[j].material_id,
                      qty: tmpmaterials[j].quantity,
                      material_amount: tmpmaterials[j].amount,
                      material_name: tmpmaterials[j].material_name,
                    },
                  };
                  axios
                      .post(API + "/api/add_order_material/", tmpmaterial_payload)
                      .then((res) => console.log("add_order_material", res.data))
                      .catch((err) => console.log(err));
                }
                
              }
              setIsinvoice(true)
              // setTimeout(() => setIsinvoice(true),3000);
            } else {
              console.log("Unable to add Order");
              // setTimeout(() => setIsinvoice(true),3000);
            }
          })
          .catch((err) => console.log(err));
    } else {
      alert("DueDate Required!");
      setIsinvoice(false);
    }

    console.log("advance",advance,"balance",balance,'total',total)
  };

  return (
      <div>
        <div className="mt-10">
          <div className="bg-white border-x-0 shadow-md rounded px-8 pt-8 pb-8 mb-4">
              <div className="flex flex-wrap justify-evenly">
                  <div className="flex flex-col">
                  <div className="text-center grid grid-cols-0">
                      <h6 className="text-black">Order No : {orderid}</h6>
                  </div>
                  <br />
                  <div className="grid justify-items-center ">
                      <QRCode
                          size={100}
                          className="object-contain shadow-2xl qr-code "
                          value={orderid}
                      />
                  </div>
                  <br />
                  <div className="grid justify-center">
                      <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type={"text"}
                          placeholder={"Mobile or Customer ID"}
                          value={customer.cust_id}
                          onChange={handleCustomer}
                          name={"cust_id"}
                      />
                      <input
                          type={"submit"}
                          className={"button text-white cursor-pointer rounded p-3 m-3 bg-pink-600"}
                          value={"Check"}
                          onClick={findCustomer}
                      />
                  </div>
                  </div>
                  <div className="grid mt-5">
                      <span className="text-xl">Customer Id:{customer_details.cust_id}</span>
                      <span className="text-xl">Name :{customer_details.cust_name}</span>
                      <span className="text-xl">Mobile :{customer_details.mobile}</span>
                      <span className="text-xl">Email:{customer_details.email}</span>
                  </div>
              </div>

              <br/>


          {cust ? (
            <div>
              <div className="flex flex-wrap -mx-3 mb-6 space-x-20 justify-center">
                <select
                  className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-3"
                  name={"work_id"}
                  onChange={handleWorkEvent}
                  required
                >
                  <option selected hidden>
                    Work
                  </option>
                  {works.map((e) => (
                    <option value={e.work_id}>{e.work_name}</option>
                  ))}
                </select>

                <input
                  className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type={"text"}
                        name={"qty"}
                        placeholder={"Qty"}
                        onChange={handleWorkEvent}
                        onBlur={() => getWorkAmount(work.work_id)}
                        required
                    />
                    <input
                        className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type={"text"}
                        name={"amount"}
                        placeholder={"Amount"}
                        onChange={handleWorkEvent}
                        value={work.amount}
                        required
                    />
                    <input
                        type={"submit"}
                        value={"ADD"}
                        className="mb-3 xl:w-30 bg-rose-500 cursor-pointer text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        onClick={addWork}
                    />
                  </div>

              <div className="flex flex-wrap -mx-3 mb-6 space-x-20 justify-center">
                <select
                  className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        name={"material_id"}
                        onChange={handleMaterialEvent}
                        required
                    >
                      <option selected hidden>
                        Material
                      </option>
                      {materials.map((e) => (
                          <option value={e.material_id}>{e.material_name}</option>
                      ))}
                    </select>
                    <input
                        className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type={"text"}
                        name={"qty"}
                        placeholder={"Qty"}
                        onChange={handleMaterialEvent}
                        onBlur={() => getMaterialAmount(material.material_id)}
                        required
                    />
                    <input
                        className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type={"text"}
                        name={"amount"}
                        placeholder={"Amount"}
                        onChange={handleMaterialEvent}
                        value={material.amount}
                        required
                    />
                    <input
                        type={"submit"}
                        value={"ADD"}
                        className={
                          "mb-3 xl:w-30 bg-rose-500 cursor-pointer text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        }
                        onClick={addMaterial}
                    />
                  </div>

                  <div className="grid justify-center">
                    <div className="flex flex-wrap -mx-2 mb-7 space-x-40">
                      <div className="flex items-center justify-center">
                        <div className="datepicker relative form-floating mb-3 xl:w-96">
                          Booking Date:
                          <input
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              type={"date"}
                              name={"due_date"}
                              onChange={handleOther}
                              defaultValue={date}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="datepicker relative form-floating mb-3 xl:w-96">
                          Due Date:
                          <input
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              type={"date"}
                              name={"due_date"}
                              onChange={handleOther}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center -mx-3 mb-6 space-x-20">
                      <snap>
                        <p>Advance Amount</p>
                      <input
                          className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none h-15"
                          type={"text"}
                          value={others.advance_amount}
                          name={"advance_amount"}
                          onChange={(e) => {
                            handleOther(e);
                            // update_balance(e);
                            update_balance_with_advance(e);
                          }}
                          placeholder={"Advance Amount"}
                      />
                      </snap>
                      <snap>
                        <p className="font-semibold">Pickup Type : </p>
                        <select
                            className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name={"pickup_type"}
                            onChange={handleOther}
                        >
                          <option selected hidden>
                            Choose Type
                          </option>
                          <option value={"self"}>SELF</option>
                          <option value={"courier"}>COURIER</option>
                          <option value={"other"}>OTHER</option>
                        </select>
                      </snap>

                      {others.pickup_type === "courier" ? (
                          <snap>
                            <input
                                className="mb-3 xl:w-96 form-select form-select-lg mb-3 appearance-none block w-full px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 h-20 focus:outline-none"
                                type={"text"}
                                name={"courier_amount"}
                                placeholder={"Courier Charge"}
                                onChange={(e) => {
                                  handleOther(e);
                                  update_balance_with_courier(e);
                                }}
                                onBlur={() => {
                                  // update_advance_amount();
                                  fetch();
                                }}
                            />


<textarea
      className="mb-6 xl:w-96 form-select form-select-lg mb-3 appearance-none block px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 h-20 focus:outline-none"
                                name={"courier_address"}
                                placeholder={"Courier Address"}
                                onChange={(e) => {
                                  handleOther(e);
                                  update_balance_with_courier(e);
                                }}
                                onBlur={() => {
                                  // update_advance_amount();
                                  fetch();
                                }}
                            />
                          </snap>
                      ) : (
                          ""
                      )}
                      
                    </div>
                  </div>
                  {/*take order table*/}
                  <div className={"flex justify-center"}>
                    <table className={"border-collapse text-center"}>
                      <tr>
                        <th className={"border border-slate-600 p-3"}>Work Name</th>
                        <th className={"border border-slate-600 p-3"}>Quantity</th>
                        <th className={"border border-slate-600 p-3"}>Amount</th>
                        <th className={"border border-slate-600 p-3"}>Total</th>
                        <th className={"border border-slate-600 p-3"}>Options</th>
                      </tr>
                      {tmpworks !== []
                          ? tmpworks.map((e) => (
                              <tr>
                                <td className={"border border-slate-600"}>
                                  {e.work_name}
                                </td>
                                <td className={"border border-slate-600"}>
                                  {e.quantity}
                                </td>
                                <td className={"border border-slate-600"}>
                                  {e.amount}
                                </td>
                                <th className={"border border-slate-600"}>
                                  {e.total}
                                </th>
                                <td className={"border border-slate-600"}>
                                  <button
                                      className={
                                        "m-2 bg-rose-500 rounded p-2 text-white"
                                      }
                                      onClick={() => {
                                        delTmpWork(e.id);
                                      }}
                                  >
                                    <i className="fa fa-remove"></i>delete
                                  </button>
                                </td>
                              </tr>
                          ))
                          : ""}

                      {tmpmaterials !== []
                          ? tmpmaterials.map((e) => (
                              <tr>
                                <td className={"border border-slate-600"}>
                                  {e.material_name}
                                </td>
                                <td className={"border border-slate-600"}>
                                  {e.quantity}
                                </td>
                                <td className={"border border-slate-600"}>
                                  {e.amount}
                                </td>
                                <th className={"border border-slate-600"}>
                                  {e.total}
                                </th>
                                <td className={"border border-slate-600"}>
                                  <button
                                      className={
                                        "m-2 bg-rose-500 rounded p-2 text-white"
                                      }
                                      onClick={() => delTmpMaterial(e.id)}
                                  >
                                    <i className="fa fa-remove"></i>delete
                                  </button>
                                </td>
                              </tr>
                          ))
                          : ""}

                      <tr>
                        <td className={"border border-slate-600 p-3"} colSpan={"3"}>
                          Total
                        </td>
                        <td className={"border border-slate-600 p-3"}>
                          <b>{total}</b>
                        </td>
                      </tr>

                      <tr>
                        <td className={"border border-slate-600 p-3"} colSpan={"3"}>
                          Advance Amount
                        </td>
                        <td className={"border border-slate-600 p-3"}>
                          <b>{advance}</b>
                        </td>
                      </tr>

                      <tr>
                        <td className={"border border-slate-600 p-3"} colSpan={"3"}>
                          Courier Amount
                        </td>
                        <td className={"border border-slate-600 p-3"}>
                          <b>{others.courier_amount}</b>
                        </td>
                      </tr>

                      <tr>
                        <td className={"border border-slate-600 p-3"} colSpan={"3"}>
                          Balance Amount
                        </td>
                        <td className={"border border-slate-600 p-3"}>
                          <b>{balance}</b>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {/*take order end*/}

                  <div className={"flex justify-center"}>
                 
                    <button
                        className={
                          "text-white text-lg rounded button rounded p-3 m-3 bg-pink-600"
                        }
                        onClick={printOrder}
                    >
                      Print Order
                    </button>
                    

                    {
                      isInvoice ? (<Navigate
                        to={`/dashboard/invoice/${customer_details.cust_id}/${orderid}`}
                        // onClick={printOrder}
                        className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                        >
                            Print
                    </Navigate>) : ''
                    }
                  </div>
                </div>
            ) : (
                ""
            )}
          </div>
        </div>
      </div>
  );
}

export default TakeOrder;
