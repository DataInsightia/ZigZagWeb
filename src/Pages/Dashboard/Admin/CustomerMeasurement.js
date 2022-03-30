import React, { Fragment,useState, useEffect } from 'react'
import axios from 'axios'
import API from "../../../api";
import './qr.css'
import './button.css'
import { Dialog, Transition } from '@headlessui/react'

function CustomerMeasurement() {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [orderid, setOrderid] = useState('')
    const [cust, setCust] = useState(false)
    const [works, setWorks] = useState([{}])
    const [data,setData] = useState({})
    const [image,setImage] = useState('')
    const [customer, setCustomer] = useState({
        cust_id: '',
    })

    var date = (new Date()).toLocaleDateString('en-GB')

    const [customer_details, SetCustomerDetails] = useState({})
    const [family_members,setFamilyMembers] = useState([])

    useEffect(() => {
        fetch_works()
        axios
            .get(API + '/api/generate_orderid/')
            .then((res) => {
                setOrderid(res.data['order_id'])
                // console.log(res.data['order_id']);
            })
            // setInterval(calculate,1000)
            .catch((err) => {
                console.log(err)
            })
    }, [orderid])

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value })

    const handleFile = (e) => setImage(e.target.files[0])

    const fetch_works = async () => {
        var works = await axios.get(API + '/api/works/')
        setWorks(works.data)
    }

    const handleCustomer = (e) =>
        setCustomer({ ...customer, [e.target.name]: e.target.value })


    const findCustomer = (e) => {
        e.preventDefault()
        axios
            .post(API + '/api/takeorder_customer_details/', customer)
            .then((res) => {
                if (res.data.length !== 0) {
                    SetCustomerDetails(res.data[0])
                    axios.post(`${API}/api/get_family_members/`,{"mobile" : res.data[0].mobile})
                        .then(res => {
                            if (res.data.length !== 0) {
                                setFamilyMembers(res.data.data[0].members.split(','))
                            } else{
                                setFamilyMembers([])
                            }
                        }).catch(err => console.log(err));
                    setCust(true)
                }
            })
            .catch((err) => {
                openModal()
                console.log(err)

            })
    }


    const store = (e) => {
        e.preventDefault()
        const work_id = e.target.work_id.value;
        const measurement = e.target.measurement.value;
        const family_member = e.target.family_member.value;

        const formData = new FormData()
        formData.append("image",image)
        formData.append("data", JSON.stringify({"work_id" : work_id,"measurement" : measurement,"cust_id" : customer_details.cust_id,"family_member" : family_member}))

        console.log({"work_id" : work_id,"measurement" : measurement,"cust_id" : customer_details.cust_id,"family_member" : family_member})
        console.log(image)

        axios.post(`${API}/api/customer_measurement/`,formData)
            .then(res => {
                alert(res.data.message)
                // window.location.reload()
            }).catch(err => console.log(err));
    }

    return (
        <div>
            {/*{() => setInterval(calculate,1000)}*/}
            <div className="md:mt-10">
                <div className="border-x-0 rounded  px-8 pt-8 pb-8 mb-4">
                    <div className="mt-10 flex flex-wrap justify-evenly bg-white shadow-2xl">
                        <div className="flex flex-col">
                            <div className="grid justify-center mt-4">
                                <form onSubmit={findCustomer}>
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
                                    />
                                </form>
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
                                <form onSubmit={store} className="flex flex-wrap -md:mx-3 md:mb-6 md:space-x-20 justify-center p-10">
                                    <select
                                        className="border-2 rounded w-50 h-15 my-auto p-1"
                                        name={'work_id'}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option selected hidden>
                                            Work
                                        </option>
                                        {works.map((e) => (
                                            <option value={e.work_id}>{e.work_name}</option>
                                        ))}
                                    </select>


                                    <select
                                        className="border-2 rounded w-50 h-15 my-auto p-1"
                                        name={'family_member'}
                                        onChange={handleChange}
                                    >
                                        <option selected hidden value={''}>
                                            Family Members
                                        </option>
                                        {family_members.map((e) => (
                                            <option value={e}>{e}</option>
                                        ))}
                                    </select>

                                    <input
                                        className="border-2 rounded w-60 h-15 my-auto p-1"
                                        type={'text'}
                                        name={'measurement'}
                                        onChange={handleChange}
                                        placeholder={'Measurement'}
                                        required
                                    />
                                    <input type={'file'} name={'size_image'} onChange={handleFile} />
                                    <input
                                        type={'submit'}
                                        value={'Insert'}
                                        className="font-bold text-lg text-white bg-rose-500 rounded-xl my-auto p-1"
                                    />
                                </form>

                                <img src={image !== "" ? URL.createObjectURL(image) : 'https://via.placeholder.com/150'} alt={"#"} height={150} width={150}/>
                            </div>


                            <div className="grid justify-center">
                                <div className="flex flex-wrap mx-auto mb-7 md:space-x-40">
                                    <div className="flex  items-center  justify-center">
                                        <div className="datepicker md:relative inline-flex justify-center form-floating md:mb-3 xl:w-96">
                                            Measurement Date:
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
                                </div>
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


                                    {/*<Link to="/register" target="_blank">*/}
                                    {/*    <button*/}
                                    {/*        type="button"*/}
                                    {/*        target="_blank"*/}
                                    {/*        className="m-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"*/}
                                    {/*        onClick={(e) => {closeModal(e);}}*/}
                                    {/*    >*/}
                                    {/*        Register*/}
                                    {/*    </button>*/}
                                    {/*</Link>*/}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default CustomerMeasurement;