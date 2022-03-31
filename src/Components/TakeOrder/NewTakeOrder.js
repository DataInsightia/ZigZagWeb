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
    const [family_members, setFamilyMembers] = useState([])

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
        "due_date" : '',
        "family_member" : ''
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

                    axios.post(`${API}/api/get_family_members/`,{"mobile" : res.data[0].mobile})
                        .then(res => {
                            if (res.data.length !== 0) {
                                setFamilyMembers(res.data.data[0].members.split(','))
                            } else{
                                setFamilyMembers([])
                            }
                        }).catch(err => console.log(err));
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
          family_member : others.family_member
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
                  family_member : others.family_member
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
                    family_member : others.family_member
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

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    return (
        <div>
            {/*{() => setInterval(calculate,1000)}*/}
            <div className="md:mt-10">
                <div className="border-x-0 rounded  px-8 pt-8 pb-8 mb-4">
                    <div className="mt-10 flex flex-wrap justify-evenly bg-white shadow-2xl">
                        <div className="flex flex-col">
                            <div className="text-center grid grid-cols-0 mt-10">
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
                        <div className="grid col-auto mt-12 md:w-1/4 mb-16">
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">Customer Id:{customer_details.cust_id}</h3>
                            </div>
                           <br/>
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">Name :{customer_details.cust_name}</h3>
                            </div>
                            <br/>
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">Mobile :{customer_details.mobile}</h3>
                            </div>
                            <br/>
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">Email : {customer_details.email}</h3>
                            </div>

                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">Address : {customer_details.address}</h3>
                            </div>
                        </div>
                    </div>

                    <br />

                    {cust ? (
                        <div className="bg-white drop-shadow-2xl ">
                            <div>
                                <form onSubmit={addWork} className="flex flex-wrap -md:mx-3  md:mb-6 md:space-x-20 justify-center">
                                <snap className={'md:w-1/3 mt-10'}>
                                    <p className="font-semibold flex justify-center">Family Member</p>
                                    <select
                                        className=" sm:justify-center md:mt-2 inline-flex mt-12 inline-block xl:w-96 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                        name={'family_member'}
                                        required
                                        onChange={handleOther}
                                    >
                                        <option selected hidden>
                                            Choose Family Member
                                        </option>
                                        {family_members.map((e) => (
                                            <option value={e}>{e}</option>
                                        ))}
                                    </select>
                                </snap>
                                </form>

                                <form onSubmit={addWork} className="flex flex-wrap -md:mx-3  md:mb-6 md:space-x-20 justify-center">

                                    <snap>
                                        <p className="font-semibold">Work</p>
                                        <select
                                            className=" sm:justify-center md:mt-2 inline-flex mt-12 inline-block xl:w-96 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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

                                    </snap>



                                    <snap>
                                        <p className="font-semibold">Qty</p>
                                    <input
                                        className="mb-3 md:mt-2 xl:w-20 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                    </snap>

                                    <snap>
                                        <p className="font-semibold">Amount</p>
                                    <input
                                        className="mb-3 md:mt-2 xl:w-28 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                    </snap>

                                    <input
                                        type={'submit'}
                                        value={'ADD'}
                                        className="mb-3 md:mt-10 xl:w-30 bg-rose-500 cursor-pointer text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"

                                    />
                                </form>
                            </div>


                            <div>
                                <form className='flex flex-wrap -md:mx-3 md:mb-6 md:space-x-20 justify-center' onSubmit={addMaterial}>
                                    <snap>
                                        <p className="font-semibold">Material</p>
                                    <select
                                        className="mb-3 xl:w-96 md:mt-2 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                    </snap>
                                    <snap>
                                        <p className="font-semibold">Qty</p>
                                    <input
                                        className="mb-3 xl:w-20 md:mt-2 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                    /></snap>
                                    <snap>
                                        <p className="font-semibold">Amount</p>
                                    <input
                                        className="mb-3 xl:w-28 md:mt-2 form-select form-select-lg mb-3 appearance-none block md:w-full inline-block w-72 px-4
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
                                    /></snap>
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
                                                min={disablePastDate()}
                                                className="datepicker max-h-860-px form-control block w-full text-4xl px-3 date-3xl py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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

                            <div className={'text-center'}>
                                <button
                                    className={
                                        'text-white text-lg rounded button rounded p-3 m-3 bg-pink-600'
                                    }
                                    onClick={calculate}
                                >
                                    Calculate
                            </button>
                            </div>


                            {/*Table 2*/}


                            {
                                is_calculate ? (
                                       <div>
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
                                           <div className={'flex justify-center'}>
                                <button
                                    className={
                                        'text-white text-lg rounded button rounded p-3 m-3 bg-pink-600'
                                    }
                                    onClick={printOrder}
                                >
                                    Print Order
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
                                ) : ""
                            }


                            {/*Table 2*/}



                            {/*take order end*/}

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