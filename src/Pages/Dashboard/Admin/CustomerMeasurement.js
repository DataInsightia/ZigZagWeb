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
                window.location.reload()
            }).catch(err => console.log(err));
    }

    return (
        <div>
            {/*{() => setInterval(calculate,1000)}*/}

            <div className="md:mt-10">
                <div className="border-x-0 rounded  px-8 pt-8 pb-8 mb-4">
                    <h1 className={'uppercase text-center text-4xl m-10'}>customer measurement</h1>
                    <div className="mt-10 flex flex-wrap justify-evenly bg-white shadow-2xl">

                        <div className="flex flex-col">
                            <div className="grid justify-center mt-24">
                                <form onSubmit={findCustomer}>
                                    <input
                                    className="uppercase shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type={'text'}
                                    placeholder={'Mobile or Customer ID'}
                                    value={customer.cust_id}
                                    onChange={handleCustomer}
                                    name={'cust_id'}
                                    />
                                    <div className="flex justify-center">
                                    <input
                                        type={'submit'}
                                        className={
                                            'button text-white  cursor-pointer rounded p-2 my-2 w-full bg-red-500 border border-red-500 hover:text-red-500 hover:bg-transparent'
                                        }
                                        value={'Check'}
                                    />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="grid mt-12">
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">
                                    Customer Id:{customer_details.cust_id}</h3>
                            </div>
                            <br/>
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">
                                    Name :{customer_details.cust_name}</h3>
                            </div><br/>
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">
                                    Mobile :{customer_details.mobile}</h3>
                            </div><br/>
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">
                                    Email:{customer_details.email}</h3>
                            </div>
                            <br/>
                            <div className="flex flex-wrap">
                                <h3 className="text-xl subpixel-antialiased">
                                    Address :{customer_details.address}</h3>
                            </div>
                            <br/>
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
                                    <input
                                        type={'submit'}
                                        value={'Insert'}
                                        className="button text-white  cursor-pointer rounded p-2 my-2 rounded-xl bg-red-500 border border-red-500 hover:text-red-500 hover:bg-transparent"
                                    />

                                </form>

                                <div className="flex flex-col items-center">
                                    <img src={image !== "" ? URL.createObjectURL(image) : 'https://via.placeholder.com/150'} alt={"#"} height={200} width={200}/>
                                    <br/>
                                    <input   className={'form-control\n' +
                                        '    block\n' +
                                        '    w-auto\n' +
                                        '    px-3\n' +
                                        '    py-3\n' +
                                        '    text-base\n' +
                                        '    font-normal\n' +
                                        '    text-gray-700\n' +
                                        '    bg-white bg-clip-padding\n' +
                                        '    border border-solid border-gray-300\n' +
                                        '    rounded\n' +
                                        '    transition\n' +
                                        '    ease-in-out\n' +
                                        '    m-0\n' +
                                        '    focus:text-gray-700 hover:bg-rose-500 hover:text-white focus:bg-rose-500 focus:text-white focus:border-blue-600 focus:outline-none'} type={'file'} name={'size_image'} onChange={handleFile} />
                                </div>

                            </div>
                            <br/>


                            <div className="grid justify-center">
                                <div className="flex flex-wrap mx-auto mb-7 md:space-x-40">
                                    <div className="flex  items-center  justify-center">
                                        <div className="datepicker md:relative inline-flex justify-center form-floating md:mb-3 xl:w-96">
                                            <h3 className="text-xl subpixel-antialiased">Measurement Date:</h3>
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