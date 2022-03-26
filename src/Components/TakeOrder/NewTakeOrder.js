import React, { Fragment,useState, useEffect } from 'react'
import axios from 'axios'
import API from '../../api'
import QRCode from 'react-qr-code'
import './qr.css'
import './button.css'
import { Navigate } from 'react-router'
import {Link} from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'

function NewTakeOrder() {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [orderid, setOrderid] = useState('')
    const [isInvoice, setIsinvoice] = useState(false)
    const [cust, setCust] = useState(false)
    const [works, setWorks] = useState([{}])
    const [materials, setMaterials] = useState([{}])
    const [tmpworks, setTmpworks] = useState([])
    const [tmpmaterials, setTmpmaterials] = useState([])
    let [total, setTotal] = useState(0)
    let [balance, setBalance] = useState(0)
    const [advance, setAdvance] = useState(0)
    const [customer, setCustomer] = useState({
        cust_id: '',
    })

    var date = (new Date()).toLocaleDateString('en-GB')

    const [customer_details, SetCustomerDetails] = useState({})

    const [others, setOthers] = useState({
        "advance_amount":'0',
        "pickup_type":"",
        "courier_amount":'0',
        "courier_address": "",
        "balance_amount" : '0',
        "due_date" : ''
    })

    const [material, setMaterial] = useState({
        material_id: '',
        qty: '',
        amount: '',
    })

    const [work, setWork] = useState({
        work_id: '',
        qty: '',
        amount: '',
    })

    const fetch = async () => {
        var materials = await axios.post(API + '/api/tmp_materials/', {
            order_id: orderid,
        })
        var works = await axios.post(API + '/api/tmp_works/', { order_id: orderid })
        var total =
            (works.data.status === undefined ? works.data.total.total__sum : 0) +
            (materials.data.status === undefined
                ? materials.data.total.total__sum
                : 0)
        setTotal(total)
        setBalance(total)
    }

    useEffect(() => {
        fetch_works()
        fetch_materials()
        axios
            .get(API + '/api/generate_orderid/')
            .then((res) => {
                setOrderid(res.data['order_id'])

                fetch_work_table()
                fetch_material_table()
                fetch()
                // console.log(res.data['order_id']);
            })
            // setInterval(calculate,1000)
            .catch((err) => {
                console.log(err)
            })
    }, [orderid])

    const yyyymmdd = (dateIn) => {
        var parts = dateIn.split('/')
        return parts[0] + '-' + parts[1] + '-' + parts[2]
    }

    const update_advance_amount = () =>
        setAdvance(parseInt(others.advance_amount))
    const fetch_work_table = () =>
        axios
            .post(API + '/api/tmp_works/', { order_id: orderid })
            .then((res) => {
                if ('status' in res.data) {
                    console.log(res.data)
                    setTmpworks([])
                } else {
                    setTmpworks(res.data['data'])
                }
            })
            .catch((err) => {
                console.log(err)
            })

    const fetch_material_table = () =>
        axios
            .post(API + '/api/tmp_materials/', { order_id: orderid })
            .then((res) => {
                if ('status' in res.data) {
                    console.log(res.data)
                    setTmpmaterials([])
                } else {
                    setTmpmaterials(res.data['data'])
                }
            })
            .catch((err) => {
                console.log(err)
            })

    const fetch_materials = async () => {
        var materials = await axios.get(API + '/api/materials/')
        setMaterials(materials.data)
    }

    const fetch_works = async () => {
        var works = await axios.get(API + '/api/works/')
        setWorks(works.data)
    }

    const handleWorkEvent = (e) =>
        setWork({ ...work, [e.target.name]: e.target.value })
    const handleMaterialEvent = (e) =>
        setMaterial({ ...material, [e.target.name]: e.target.value })
    const handleCustomer = (e) =>
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    const handleOther = async  (e) =>
        await setOthers({ ...others, [e.target.name]: e.target.value })

    const [is_calculate,setIsCalculate] = useState(false);

    const getWorkAmount = (wn) =>
        setWork({
            ...work,
            'amount': works.find((e) => e.work_id === wn)['amount'],
        })
    const getMaterialAmount = (mn) =>
        setMaterial({
            ...material,
            'amount': materials.find((e) => e.material_id === mn)['amount'],
        })

    const addWork = (e) => {
        e.preventDefault()
        work['cust_id'] = customer_details['cust_id']
        work['order_id'] = orderid
        work['total'] = parseInt(work['qty']) * parseInt(work['amount'])
        // Insert to tmp_work
        axios
            .post(API + '/api/tmp_work/', work)
            .then((res) => {
                console.log(res.data)
                fetch_work_table()
                fetch()
                e.target.work_id.value = ""
                e.target.qty.value = ""
                e.target.amount.value = ""
            })
            .catch((err) => console.log(err))
        fetch_work_table()
        fetch()
    }

    const addMaterial = (e) => {
        e.preventDefault()
        material['cust_id'] = customer_details['cust_id']
        material['order_id'] = orderid
        material['total'] = parseInt(material['qty']) * parseInt(material['amount'])
        // Insert to tmp_material
        axios
            .post(API + '/api/tmp_material/', material)
            .then((res) => {
                if (res.data.status){
                    fetch_material_table()
                    fetch()
                    e.target.material_id.value = ""
                    e.target.qty.value = ""
                    e.target.amount.value = ""
                }
            })
            .catch((err) => console.log(err))
        fetch_material_table()
        fetch()
    }

    const delTmpWork = (id) => {
        axios
            .post(API + '/api/del_tmpwork/', { id: id })
            .then((res) => {
                console.log(res.data)
                fetch_work_table()
                fetch()
            })
            .catch((err) => {
                console.log(err)
            })
        fetch_work_table()
        fetch()
    }

    const delTmpMaterial = (id) => {
        axios
            .post(API + '/api/del_tmpmaterial/', { id: id })
            .then((res) => {
                console.log(res.data)
                fetch_material_table()
                fetch()
            })
            .catch((err) => {
                console.log(err)
            })
        fetch_material_table()
        fetch()
    }
    const findCustomer = (e) => {
        e.preventDefault()
        axios
            .post(API + '/api/takeorder_customer_details/', customer)
            .then((res) => {
                if (res.data.length !== 0) {

                    SetCustomerDetails(res.data[0])
                    setCust(true)
                }
            })
            .catch((err) => {
                openModal()

                console.log(err)

            })
    }

    const update_balance_with_courier = (e,courier_amount) => {
        var courier = parseInt(courier_amount)
        // setBalance(total + (isNaN(courier) ? 0 : courier) - advance)
        setBalance(total + (isNaN(courier) ? 0 : courier) - advance)
        setOthers({...others,['courier_amount'] : isNaN(courier) ? 0 : courier})
    }

    const calculate = () => {
        var courier = parseInt(others.courier_amount)
        var advance = parseInt(others.advance_amount)
        setOthers({...others,['courier_amount'] : isNaN(courier) ? 0 : courier})
        setOthers({...others,['advance_amount'] : isNaN(advance) ? 0 : advance})
        setOthers({...others,['balance_amount'] : total + (isNaN(courier) ? 0 : courier) - advance})
        setBalance((total + parseInt(others.courier_amount)) - parseInt(others.advance_amount))
        console.log((parseInt(total) + parseInt(others.courier_amount)) - parseInt(others.advance_amount))
        console.log("total : " + (total) ,"courier_amount : " + parseInt(others.courier_amount) ,"advance_amount : " + parseInt(others.advance_amount))
        setIsCalculate(true);
  }

    const update_balance_with_advance = (e,advance_amount) => {
        var advance = parseInt(advance_amount)
        // advance = (advance) ? 0 : advance
        console.log(isNaN(advance),advance)
        setAdvance(isNaN(advance) ? 0 : advance)
        setBalance(total - (isNaN(advance) ? 0 : advance))

        // setAdvance(advance)
        // setBalance(total - ((advance) ? 0 : advance))
    }

    const nextChar = (c) => {
        return String.fromCharCode(c.charCodeAt(0) + 1)
    }

    const get_courier_address = (pickup_type) => {
        if (pickup_type === 'self') {
            return customer_details.address
        } else if (pickup_type === 'courier') {
            return others.courier_address
        } else if (pickup_type === 'other') {
            return others.courier_address
        }
    }

  const printOrder = (e) => {
    e.preventDefault()

    if (others.due_date !== '') {
      const order_payload = {
        ...{
          order_id: orderid,
          cust_id: customer_details['cust_id'],
          due_date: others.due_date,
          pickup_type: others.pickup_type,
          total_amount: total,
          advance_amount: others.advance_amount,
          balance_amount: others.balance_amount,
          courier_amount: parseInt(others.courier_amount),
          courier_address: get_courier_address(others.pickup_type),

        },
      }



      axios
        .post(API + '/api/add_order/', order_payload)
        .then((res) => {

          console.log('add_order', res.data)
          if (res.data.status) {

            axios.post(`${API}/api/takeorder_other_option/`,{"order_id" : orderid,"mobile" : others.other_mobile})
            .then(res => {
              alert(res.data.message)
            }).catch(err => console.log(err));

            var wc = 'A'
            for (var i = 0; i < tmpworks.length; i++) {
              const tmpwork_payload = {
                ...{
                  order_id: orderid,
                  work_id: tmpworks[i].work_id,
                  qty: tmpworks[i].quantity,
                  work_amount: tmpworks[i].amount,
                  work_name: tmpworks[i].work_name,
                },
              }
              axios
                .post(API + '/api/add_order_work/', tmpwork_payload)
                .then((res) => console.log('add_order_work', res.data))
                .catch((err) => console.log(err))

              for (var k = 0; k < parseInt(tmpworks[i].quantity); k++) {
                axios
                  .post(API + '/api/order_work_staff_assign/', {
                    order_id: orderid,
                    order_work_label: `${tmpworks[i].work_name}-${wc}`,
                    work_id: tmpworks[i].work_id,
                  })
                  .then((res) => {
                    console.log('order_work_staff_assign', res.data)
                  })
                  .catch((err) => console.log(err))
                wc = nextChar(wc)
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
                }
                axios
                  .post(API + '/api/add_order_material/', tmpmaterial_payload)
                  .then((res) => console.log('add_order_material', res.data))
                  .catch((err) => console.log(err))
              }
            }
            setIsinvoice(true)
            // setTimeout(() => setIsinvoice(true),3000);
          } else {
            console.log('Unable to add Order')
            // setTimeout(() => setIsinvoice(true),3000);
          }
        })
        .catch((err) => console.log(err))
    } else {
      alert('DueDate Required!')
      setIsinvoice(false)
    }

    console.log('advance', advance, 'balance', balance, 'total', total)
  }

    return (
        <div>
            {/*{() => setInterval(calculate,1000)}*/}
            <div className="md:mt-10">
                <div className="border-x-0 rounded  px-8 pt-8 pb-8 mb-4">
                    <div className="mt-10 flex flex-wrap justify-evenly bg-white shadow-2xl">
                        <div className="flex flex-col">
                            <div className="text-center grid grid-cols-0 mt-10">
                                <h6 className="text-black">Order No : {orderid}</h6>
                                <p>{JSON.stringify(others)}</p>
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
                            <div className="grid justify-center mt-4">
                                <input
                                    className="uppercase shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type={'text'}
                                    placeholder={'Mobile or Customer ID'}
                                    value={customer.cust_id}
                                    onChange={handleCustomer}
                                    name={'cust_id'}
                                />
                                <input
                                    type={'submit'}
                                    className={
                                        'button text-white cursor-pointer rounded p-2 my-2 bg-red-500 border border-red-500 hover:text-red-500 hover:bg-transparent'
                                    }
                                    value={'Check'}
                                    onClick={findCustomer}
                                />
                            </div>
                        </div>
                        <div className="grid mt-12">
                            <div className="flex flex-wrap">
                                <div className=" w-10 h-10">
                                    <img
                                        className="w-full h-full rounded-full"
                                        src={
                                            'data:image/png;base64,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'
                                        }
                                        alt=""
                                    />
                                </div>
                                Customer Id:{customer_details.cust_id}
                            </div>
                            <div className="flex flex-wrap">
                                <div className=" w-10 h-10">
                                    <img
                                        className="w-full h-full rounded-full"
                                        src={
                                            'https://static.thenounproject.com/png/1946983-200.png'
                                        }
                                        alt=""
                                    />
                                </div>
                                Name :{customer_details.cust_name}
                            </div>
                            <div className="flex flex-wrap">
                                <div className=" w-10 h-10">
                                    <img
                                        className="w-full h-full rounded-full"
                                        src={
                                            'https://cdn.icon-icons.com/icons2/2248/PNG/512/phone_icon_136322.png'
                                        }
                                        alt=""
                                    />
                                </div>
                                Mobile :{customer_details.mobile}
                            </div>
                            <div className="flex flex-wrap">
                                <div className=" w-10 h-10">
                                    <img
                                        className="w-full h-full rounded-full"
                                        src={
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpdHWJg7i_tQSZnkW-0Ovp9ORPGcBLB4q7Q&usqp=CAU'
                                        }
                                        alt=""
                                    />
                                </div>
                                Email:{customer_details.email}
                            </div>

                            <div className="flex flex-wrap">
                                <div className=" w-10 h-10">
                                    <img
                                        className="w-full h-full rounded-full"
                                        src={
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpdHWJg7i_tQSZnkW-0Ovp9ORPGcBLB4q7Q&usqp=CAU'
                                        }
                                        alt=""
                                    />
                                </div>
                                Address :{customer_details.address}
                            </div>
                        </div>
                    </div>

                    <br />

                    {cust ? (
                        <div className="bg-white drop-shadow-2xl ">
                            <div >
                                <form onSubmit={addWork} className="flex flex-wrap -md:mx-3 md:mb-6 md:space-x-20 justify-center">
                                    <select
                                        className="mb-3 sm:justify-center md:mt-12 inline-flex mt-12 inline-block xl:w-96 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                        name={'work_id'}
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
                                        className="mb-3 md:mt-10 xl:w-20 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                        type={'text'}
                                        name={'qty'}
                                        placeholder={'Qty'}
                                        onChange={handleWorkEvent}
                                        onBlur={() => getWorkAmount(work.work_id)}
                                        required
                                    />
                                    <input
                                        className="mb-3 md:mt-10 xl:w-28 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                        type={'text'}
                                        name={'amount'}
                                        placeholder={'Amount'}
                                        onChange={handleWorkEvent}
                                        value={work.amount}
                                        required
                                    />
                                    <input
                                        type={'submit'}
                                        value={'ADD'}
                                        className="mb-3 md:mt-10 xl:w-30 bg-rose-500 cursor-pointer text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"

                                    />
                                </form>
                            </div>


                            <div>
                                <form className='flex flex-wrap -md:mx-3 md:mb-6 md:space-x-20 justify-center' onSubmit={addMaterial}>
                                    <select
                                        className="mb-3 xl:w-96 md:mt-12 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                        name={'material_id'}
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
                                        className="mb-3 xl:w-20 md:mt-10 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                        type={'text'}
                                        name={'qty'}
                                        placeholder={'Qty'}
                                        onChange={handleMaterialEvent}
                                        onBlur={() => getMaterialAmount(material.material_id)}
                                        required
                                    />
                                    <input
                                        className="mb-3 xl:w-28 md:mt-10 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                        type={'text'}
                                        name={'amount'}
                                        placeholder={'Amount'}
                                        onChange={handleMaterialEvent}
                                        value={material.amount}
                                        required
                                    />
                                    <input
                                        type={'submit'}
                                        value={'ADD'}
                                        className={
                                            'mb-3 xl:w-30 bg-rose-500 md:mt-10 cursor-pointer text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                                        }
                                    />
                                </form>
                            </div>

                            <div className="grid justify-center">
                                <div className="flex flex-wrap mx-auto mb-7 md:space-x-40">
                                    <div className="flex  items-center  justify-center">
                                        <div className="datepicker md:relative inline-flex justify-center form-floating   md:mb-3 xl:w-96">
                                            Booking Date:
                                            <input
                                                className="form-control block font-bold  w-full mb-8 px-3 py-5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                type={'text'}
                                                defaultValue={date}
                                                // onChange={(e) => handleOther(e).then(() => alert("hi"))}
                                                required
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <div className="datepicker md:relative inline-flex justify-center form-floating mb-3 md:w-96">
                                            Due Date:
                                            <input
                                                className="form-control block w-full text-4xl px-3 date-3xl py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                type={'date'}
                                                name={'due_date'}
                                                onChange={handleOther}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*take order table*/}
                            <div className={'flex md:justify-center inline-block justify-start overflow-auto md:overflow-x-scroll inline-block md:flex'}>
                                <table className={'border-collapse text-center'}>
                                    <tr>
                                        <th className={'border border-slate-600 p-3'}>Work Name</th>
                                        <th className={'border border-slate-600 p-3'}>Quantity</th>
                                        <th className={'border border-slate-600 p-3'}>Amount</th>
                                        <th className={'border border-slate-600 p-3'}>Total</th>
                                        <th className={'border border-slate-600 p-3'}>Options</th>
                                    </tr>
                                    {tmpworks !== []
                                        ? tmpworks.map((e) => (
                                            <tr>
                                                <td className={'border border-slate-600'}>
                                                    {e.work_name}
                                                </td>
                                                <td className={'border border-slate-600'}>
                                                    {e.quantity}
                                                </td>
                                                <td className={'border border-slate-600'}>
                                                    {e.amount}
                                                </td>
                                                <th className={'border border-slate-600'}>
                                                    {e.total}
                                                </th>
                                                <td className={'border border-slate-600'}>
                                                    <button
                                                        className={
                                                            'm-2 bg-rose-500 rounded p-2 text-white'
                                                        }
                                                        onClick={() => {
                                                            delTmpWork(e.id)
                                                        }}
                                                    >
                                                        <i className="fa fa-remove"></i>delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        : ''}

                                    {tmpmaterials !== []
                                        ? tmpmaterials.map((e) => (
                                            <tr>
                                                <td className={'border border-slate-600'}>
                                                    {e.material_name}
                                                </td>
                                                <td className={'border border-slate-600'}>
                                                    {e.quantity}
                                                </td>
                                                <td className={'border border-slate-600'}>
                                                    {e.amount}
                                                </td>
                                                <th className={'border border-slate-600'}>
                                                    {e.total}
                                                </th>
                                                <td className={'border border-slate-600'}>
                                                    <button
                                                        className={
                                                            'm-2 bg-rose-500 rounded p-2 text-white'
                                                        }
                                                        onClick={() => delTmpMaterial(e.id)}
                                                    >
                                                        <i className="fa fa-remove"></i>delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        : ''}

                                    <tr>
                                        <td className={'border border-slate-600 p-3'} colSpan={'3'}>
                                            Total
                                        </td>
                                        <td className={'border border-slate-600 p-3'}>
                                            <b>{total}</b>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <br/>

                            {/*Advance Amount*/}

                            <div className="flex flex-wrap justify-center -mx-3 mb-6 space-x-20">
                                <snap>
                                    <p>Advance Amount</p>
                                    <input
                                        className="mb-3 xl:w-96 inline-block w-72 form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none h-15"
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
                                <div className="md:flex justify-start inline-block">
                                    <snap>
                                        <p className="font-semibold">Pickup Type : </p>
                                        <select
                                            className="mb-3 xl:w-96 inline-block w-52 form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                                </div>

                                {others.pickup_type === "other" ? (
                                    <div>
                                        <p className="font-semibold flex flex-wrap">Other Details : </p>
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
                                            placeholder={"Other Details"}
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}


                                {others.pickup_type === "courier" ? (
                                    <snap>
                                        <p className="font-semibold flex flex-wrap">Courier Charge : </p>
                                        <input
                                            className="mb-3 xl:w-96 inline-block w-52 form-select form-select-lg mb-3 appearance-none block w-full md:px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 md:h-20 focus:outline-none"
                                            type={"text"}
                                            name={"courier_amount"}
                                            placeholder={"Courier Charge"}
                                            onChange={(e) => {
                                                handleOther(e);
                                            }}
                                            onBlur={() => {
                                                // update_advance_amount();
                                                fetch();
                                            }}
                                        />

                                        <p className="font-semibold flex flex-wrap">Courier Address : </p>
                                        <textarea
                                            className="mb-6 xl:w-96 inline-block w-52 form-select form-select-lg mb-3 appearance-none block px-4
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

                            {/*Advance Amount*/}


                            {/*Table 2*/}


                            {
                                is_calculate ? (
                                       <div className={'flex md:justify-center inline-block justify-start overflow-auto md:overflow-x-scroll inline-block md:flex'}>
                                <table className={'border-collapse text-center'}>
                                    <tr>
                                        <th className={'border border-slate-600 p-3'}>Work Name</th>
                                        <th className={'border border-slate-600 p-3'}>Quantity</th>
                                        <th className={'border border-slate-600 p-3'}>Amount</th>
                                        <th className={'border border-slate-600 p-3'}>Total</th>
                                    </tr>

                                    {tmpworks !== []
                                        ? tmpworks.map((e) => (
                                            <tr>
                                                <td className={'border border-slate-600'}>
                                                    {e.work_name}
                                                </td>
                                                <td className={'border border-slate-600'}>
                                                    {e.quantity}
                                                </td>
                                                <td className={'border border-slate-600'}>
                                                    {e.amount}
                                                </td>
                                                <th className={'border border-slate-600'}>
                                                    {e.total}
                                                </th>
                                            </tr>
                                        ))
                                        : ''}

                                    {tmpmaterials !== []
                                        ? tmpmaterials.map((e) => (
                                            <tr>
                                                <td className={'border border-slate-600'}>
                                                    {e.material_name}
                                                </td>
                                                <td className={'border border-slate-600'}>
                                                    {e.quantity}
                                                </td>
                                                <td className={'border border-slate-600'}>
                                                    {e.amount}
                                                </td>
                                                <th className={'border border-slate-600'}>
                                                    {e.total}
                                                </th>

                                            </tr>
                                        ))
                                        : ''}

                                    <tr>
                                        <td className={'border border-slate-600 p-3'} colSpan={'3'}>
                                            Total
                                        </td>
                                        <td className={'border border-slate-600 p-3'}>
                                            <b>{total}</b>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={'border border-slate-600 p-3'} colSpan={'3'}>
                                            Advance Amount
                                        </td>
                                        <td className={'border border-slate-600 p-3'}>
                                            <b>{others.advance_amount}</b>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={'border border-slate-600 p-3'} colSpan={'3'}>
                                            Courier Amount
                                        </td>
                                        <td className={'border border-slate-600 p-3'}>
                                            <b>{others.courier_amount}</b>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={'border border-slate-600 p-3'} colSpan={'3'}>
                                            Balance Amount
                                        </td>
                                        <td className={'border border-slate-600 p-3'}>
                                            <b>{others.balance_amount}</b>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                                ) : ""
                            }


                            {/*Table 2*/}



                            {/*take order end*/}

                            <div className={'flex justify-center'}>
                                <button
                                    className={
                                        'text-white text-lg rounded button rounded p-3 m-3 bg-pink-600'
                                    }
                                    onClick={printOrder}
                                >
                                    Print Order
                                </button>

                                <button
                                    className={
                                        'text-white text-lg rounded button rounded p-3 m-3 bg-pink-600'
                                    }
                                    onClick={calculate}
                                >
                                    Calculate
                                </button>

                                {isInvoice ? (
                                    <Navigate
                                        to={`/dashboard/invoice/${customer_details.cust_id}/${orderid}`}
                                        // onClick={printOrder}
                                        className="font-bold text-lg text-gray-400 block py-2.5 px-4 rounded transition duration-200 hover:bg-rose-50 hover:text-pink-500"
                                    >
                                        Print
                                    </Navigate>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Customer Not Found
                                </Dialog.Title>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="m-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Go Back
                                    </button>


                                    <Link to="/register" target="_blank">
                                        <button
                                            type="button"
                                            target="_blank"
                                            className="m-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={(e) => {closeModal(e);}}
                                        >
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default NewTakeOrder