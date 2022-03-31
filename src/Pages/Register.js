import React, { useState, Fragment } from 'react'
import API from '../api'
import axios from 'axios'
import slideImg1 from '../assets/img/register_bg_2.png'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Register() {
  const Styles = {
    InputError: 'text-red-500 font-bold',
    LoginButton:
      'bg-red-500 text-white border border-red-500 hover:text-red-500 hover:bg-transparent text-sm font-bold uppercase px-6 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150',
    Label: 'block border-none uppercase text-black text-xs font-bold mb-2',
    Input:
      'border px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-2xl text-sm focus:ring-red-500 w-full  ease-linear transition-all duration-150',
  }
  const [data, setData] = useState({})
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleEvent = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  const mobile_val = (e) => {
    const mobile = e.target.value
    
    if (mobile.length > 10) {
      alert("Enter only 10 digits without +91")
      e.target.value = ""
      // if (mobile === '+91') {
      //   // openModal()
      //   alert("Avoid Using +91")
      //   e.target.value = ''
      // }
      //  if (mobile.length <= 10){
      //    alert("10 Number only allowed")
      //  }else{
      //    alert('10 Number only allowed')
      //  }
    }
  }

  const [Login, isLogin] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    reset,

    formState: { errors },
  } = useForm()
  const onSubmit = (e) => {
    const mobile = data.mobile
    const name = e.username
    const email = e.email
    const address = e.address
    const pincode = e.pincode
    const city = e.city
    const password = e.password
    const family_members = e.family_members
    axios
      .post(API + '/api/customer_register/', {
        name,
        mobile,
        email,
        address,
        pincode,
        city,
        password,
      })
      .then((res) => {

        if (res.data.status) {
          // Insert Family members if present
          if (family_members !== ""){
            // REGISTER FAMILY MEMBERS
            axios.post(`${API}/api/family_members/`,{'mobile' : mobile ,'members' : family_members}).then(
                res => {
                  alert(`Family Members [${res.data.members}] Added`);
                }
            ).catch(err => console.log(err))

            // Get Customer Details for Popup
            axios.post(`${API}/api/customer_details/`,{"cust_id" : mobile}).then(res => {
              const customer = res.data[0];
              console.log(res.data[0])
              console.log(res.data.status)
              alert(`Registration Success,\nYour Customer ID : ${customer.cust_id}\n Your Mobile No : ${customer.mobile}\n\tYour Can Login with your CUSTOMER ID or MOBILE NUMBER`)
            }).catch(err => console.log(err))
              isLogin(true)
            }else{
              alert(res.data.message);
            }
          }else{
            alert("Family Members Field is Empty")
          }



      })
      .catch((err) => {
        console.log(err)
        alert('Already Register Your Email Id')
      })
    // reset()
  }

  const is_user = (e,mobile) => {
    axios.post(`${API}/api/is_user/`,{"cust_id" : mobile}).then(res => {
        if (res.data.status) {
          alert(res.data.message)
          e.target.value = ""
        }
    }).catch(err => console.log(err))
  };

  return Login ? (
    <Navigate to="/login" />
  ) : (
    <>
      <section className="relative w-full h-full py-24 min-h-screen">
        <div className="absolute md:fixed top-0 w-full h-full bg-gradient-to-tr from-red-50 to-red-200 blur-sm">
          <img src={slideImg1} alt={'#'}/>
        </div>

        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full  lg:w-5/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white border-none shadow-2xl rounded-2xl">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h1 className="text-black font-semibold text-2xl">
                      Customer Registeration
                    </h1>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Name
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="Name"
                        // value={data.username}
                        onChange={handleEvent}
                        name={'username'}
                        id="username"
                        {...register('username', { required: true })}
                        onKeyUp={() => {
                          trigger('username')
                        }}
                      />
                      {errors.username && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Mobile
                      </label>
                      <TextField
                        type="number"
                        className={Styles.Input}
                        placeholder="Mobile"
                        onBlur={(e) => is_user(e,e.target.value)}
                        // value={data.mobile}
                        onChange={(e) => {
                          handleEvent(e)
                          mobile_val(e)
                        }}
                        name={'mobile'}
                        maxLength={10}
                        minLength={10}
                        id="mobile"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">
                             +91
                             </InputAdornment>,
                        }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Email
                      </label>
                      <input
                        type="email"
                        className={Styles.Input}
                        placeholder="Email"
                        id="email"
                        name={'email'}
                        onChange={handleEvent}
                        {...register('email', {
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'invalid email address',
                          },
                        })}
                        onKeyUp={() => {
                          trigger('email')
                        }}
                      />
                      {errors.email && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Address
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="Address"
                        onChange={handleEvent}
                        id="address"
                        {...register('address', { required: true })}
                        onKeyUp={() => {
                          trigger('address')
                        }}
                      />
                      {errors.address && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        City
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="City"
                        onChange={handleEvent}
                        id="city"
                        {...register('city', { required: true })}
                        onKeyUp={() => {
                          trigger('city')
                        }}
                      />
                      {errors.city && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="Pincode"
                        onChange={handleEvent}
                        id="pincode"
                        {...register('pincode', { required: true })}
                        onKeyUp={() => {
                          trigger('pincode')
                        }}
                      />
                      {errors.pincode && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Password
                      </label>
                      <input
                        type="password"
                        className={Styles.Input}
                        placeholder="Password"
                        onChange={handleEvent}
                        id="password"
                        name={'password'}
                        // ref={register({
                        //   required: "You must specify a password",
                        //   minLength: {
                        //     value: 4,
                        //     message: "Password must have at least 4 characters"
                        //   }
                        // })}

                        // onKeyUp={() => {
                        //   trigger('password')
                        // }}
                        // />
                        // {/* {errors.password && (
                        //   <span className="text-red-500">
                        //     {errors.password}
                        //   </span>
                        // )} */}
                        {...register('password', { required: true,minLength : 5,maxLength : 8 })}
                        onKeyUp={() => {
                          trigger('password')
                        }}
                      />
                      {errors.password && (
                        <span className="text-red-500">
                          This field is required with minimum of 5 charectors
                        </span>
                      )}
                    </div>


                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Family Members
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="Eg: Asha,Abu,"
                        onChange={handleEvent}
                        id="family_members"
                        name={'family_members'}
                      {...register('family_members', { required: true,minLength : 3 })}
                        onKeyUp={() => {
                          trigger('family_members')
                        }}
                      />
                      {errors.family_members && (
                        <span className="text-red-500">
                          This field is required with minimum of 5 charectors
                        </span>
                      )}
                    </div>


                    <div className="text-center mt-6">
                      <button className={Styles.LoginButton} type={'submit'}>
                        Create Account
                      </button>
                    </div>
                    <div className="text-center mb-3">
                      <h6 className="text-red-500 font-bold underline">
                        <Link to="/login">Log In</Link>
                      </h6>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                  Please enter mobile number only
                </Dialog.Title>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got ahead
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

const AlertDialog = (message, isOpen, closeModal) => {
  return (
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
                {message}
              </Dialog.Title>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Got ahead
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
