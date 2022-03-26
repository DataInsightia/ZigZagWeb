import React, { Fragment, useState } from 'react'
import Google from '../assets/img/google.svg'
import API from '../api'
import axios from 'axios'
import slideImg1 from '../assets/img/register_bg_2.png'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckSquare, faCoffee, faHome} from '@fortawesome/fontawesome-free-solid'

export default function Login() {
  const Styles = {
    LoginButton:
      'bg-red-500 text-white border border-red-500 hover:text-red-500 hover:bg-transparent text-sm font-bold uppercase px-6 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150',
    Label: 'block border-none uppercase text-black text-xs font-bold mb-2',
    Input:
      'border px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-2xl text-sm focus:ring-red-500 w-full  ease-linear transition-all duration-150',
  }

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  // const [data, setData] = useState({
  //   cust_id: '',
  //   password: '',
  // })
  const [login, setLogin] = useState(false)

  // const handleEvent = (e) => {
  //   var newData = { ...data }
  //   newData[e.target.name] = e.target.value
  //   setData(newData)
  // }

  const setLocalStorage = (name, data) => {
    localStorage.setItem(name, data)
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   axios
  //     .post(
  //       `${API}/api/customer_login/`,
  //       data,
  //     )
  //     .then((res) => {
  //       if (res.data.status) {
  //         if (res.data.user.role == 'customer') {
  //           setLocalStorage('login_id', res.data.user.login_id)
  //           setLocalStorage('role', res.data.user.role)
  //           setLocalStorage('cust_name', res.data.data.cust_name)
  //           setLocalStorage('mobile', res.data.data.mobile)
  //           setLocalStorage('email', res.data.data.email)
  //           setLocalStorage('address', res.data.data.address)
  //           setLocalStorage('city', res.data.data.city)
  //           setLocalStorage('pincode', res.data.data.pincode)
  //           setLogin(true)
  //           setLocalStorage('cid', res.data.user.login_id)
  //           setLocalStorage('isAuthenticated', 'true')
  //         } else if (res.data.user.role == 'staff') {
  //           console.log(res.data)
  //           setLocalStorage('login_id', res.data.user.login_id)
  //           setLocalStorage('role', res.data.user.role)
  //           setLocalStorage('staff_name', res.data.data.staff_name)
  //           setLocalStorage('mobile', res.data.user.mobile)
  //           setLocalStorage('email', res.data.data.email)
  //           setLocalStorage('address', res.data.data.address)
  //           setLocalStorage('city', res.data.data.city)
  //           setLocalStorage('pincode', res.data.data.pincode)
  //           setLocalStorage('photo', res.data.data.photo)
  //           setLocalStorage('ifsc', res.data.data.ifsc)
  //           setLocalStorage('bank', res.data.data.bank)
  //           setLocalStorage('work_type', res.data.data.work_type)
  //           setLocalStorage('acc_no', res.data.data.acc_no)
  //           setLocalStorage('salary', res.data.data.salary)
  //           setLocalStorage('salary_type', res.data.data.salary_type)
  //           setLogin(true)
  //           setLocalStorage('cid', res.data.user.login_id)
  //           setLocalStorage('isAuthenticated', 'true')
  //         } else {
  //           setLocalStorage('login_id', res.data.user.login_id)
  //           setLocalStorage('role', res.data.user.role)
  //           setLogin(true)
  //           setLocalStorage('cid', res.data.user.login_id)
  //           setLocalStorage('isAuthenticated', 'true')
  //         }
  //       } else {
  //         alert('Invalid Mobile Number Or Password')
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Something went wrong', error)
  //     })
  // }

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = (e) => {
    const cust_id = e.login_id
    const password = e.password
    axios
      .post(`${API}/api/customer_login/`, {
        cust_id,
        password,
      })
      .then((res) => {
        if (res.data.status) {
          if (res.data.user.role == 'customer') {
            openModal()
            setLocalStorage('login_id', res.data.user.login_id)
            setLocalStorage('role', res.data.user.role)
            setLocalStorage('cust_name', res.data.data.cust_name)
            setLocalStorage('mobile', res.data.data.mobile)
            setLocalStorage('email', res.data.data.email)
            setLocalStorage('address', res.data.data.address)
            setLocalStorage('city', res.data.data.city)
            setLocalStorage('pincode', res.data.data.pincode)
            setLogin(true)
            setLocalStorage('cid', res.data.user.login_id)
            setLocalStorage('isAuthenticated', 'true')
          } else if (res.data.user.role == 'staff') {
            openModal()
            setLocalStorage('login_id', res.data.user.login_id)
            setLocalStorage('role', res.data.user.role)
            setLocalStorage('staff_name', res.data.data.staff_name)
            setLocalStorage('mobile', res.data.user.mobile)
            setLocalStorage('email', res.data.data.email)
            setLocalStorage('address', res.data.data.address)
            setLocalStorage('city', res.data.data.city)
            setLocalStorage('pincode', res.data.data.pincode)
            setLocalStorage('photo', res.data.data.photo)
            setLocalStorage('ifsc', res.data.data.ifsc)
            setLocalStorage('bank', res.data.data.bank)
            setLocalStorage('work_type', res.data.data.work_type)
            setLocalStorage('acc_no', res.data.data.acc_no)
            setLocalStorage('salary', res.data.data.salary)
            setLocalStorage('salary_type', res.data.data.salary_type)
            setLogin(true)
            setLocalStorage('cid', res.data.user.login_id)
            setLocalStorage('isAuthenticated', 'true')
          } else {
            openModal()
            setLocalStorage('login_id', res.data.user.login_id)
            setLocalStorage('role', res.data.user.role)
            setLogin(true)
            setLocalStorage('cid', res.data.user.login_id)
            setLocalStorage('isAuthenticated', 'true')
          }
        } else {
          alert('Invalid Mobile Number Or Password')
        }
      })
      .catch((error) => {
        console.error('Something went wrong', error)
      })
    reset()
  }

  return login | (localStorage.getItem('cid') !== null) ? (
    <Navigate to="/dashboard/dhome" />
  ) : (
    <>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div className="absolute md:fixed top-0 w-full h-full bg-gradient-to-tr from-red-50 to-red-200 blur-sm">
          <img src={slideImg1} />
        </div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full  lg:w-5/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white border-none shadow-2xl rounded-2xl">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h1 className="text-black font-semibold text-2xl">Login</h1>
                  </div>
                  <hr className="mt-6 border-b-1 bg-white" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        User ID / Mobile Number
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="User ID / Mobile Number"
                        // value={data.cust_id}
                        // onChange={handleEvent}
                        name={'login_id'}
                        {...register('login_id', { required: true })}
                        onKeyUp={() => {
                          trigger('login_id')
                        }}
                      />
                      {errors.login_id && (
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
                        // value={data.password}
                        // onChange={handleEvent}
                        id="password"
                        name={'password'}
                        {...register('password', {
                          required: true,
                          maxLength: 30,
                          minLength: 5,
                        })}
                        onKeyUp={() => {
                          trigger('password')
                        }}
                      />
                      {errors.password && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="text-center mt-6">
                      <button className={Styles.LoginButton} type={'submit'}>
                        Login
                      </button>
                    </div>
                    <br />
                    <div className="text-center mb-3">
                      <h6 className="text-black text-sm font-bold">
                        Don't have an account?
                      </h6>
                      <Link
                        className="text-red-500 font-bold underline"
                        to="/register"
                      >
                        <h5>Create new account</h5>
                      </Link>
                      <br/>
                      <Link
                          className="text-red-500 font-bold mb-0"
                          to="/home"
                      >
                        <FontAwesomeIcon icon={faHome}
                                         style={{ height : 30 }}></FontAwesomeIcon>
                      </Link>
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
                  Payment successful
                </Dialog.Title>
    
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Go ahead
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
