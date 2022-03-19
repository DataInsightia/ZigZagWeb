import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import DashboardHome from '../DHome'
import axios from 'axios'
import API from '../../../api'

export default function EditProfile() {
  const Styles = {
    InputError: 'text-red-500 text-xs',
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
  const [file, setFile] = useState('')
  const [filebool, setFilebool] = useState(false)
  const onFileChange = (e) => {
    setFile(e.target.files[0])
    setFilebool(true)
  }

  const auth = localStorage.getItem('role')

  const setLocalStorage = (name, data) => {
    localStorage.setItem(name, data)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (auth === 'customer') {
      const username = e.target.username.value
      const address = e.target.address.value
      const city = e.target.city.value
      const pincode = e.target.pincode.value

      const data = new FormData()
      data.append('username', username)
      data.append('cust_id', localStorage.getItem('login_id'))
      data.append('address', address)
      data.append('city', city)
      data.append('pincode', pincode)

      const res =await axios.put(API + '/api/customer_register/', data)
      if (res.data.status) {
        alert('Update Sucessfully')
        setLocalStorage('address', address)
        setLocalStorage('city', city)
        setLocalStorage('pincode', pincode)
      } else {
        alert('Not Updated')
      }
    } else {
      const username = e.target.username.value
      const address = e.target.address.value
      const city = e.target.city.value
      const ifsc = e.target.ifsc.value
      const bank = e.target.bank.value
      const work_type = e.target.work_type.value
      const acc_no = e.target.acc_no.value

      const data = new FormData()
      data.append('staff_id', localStorage.getItem('login_id'))
      data.append('file', file)
      data.append('username', username)
      data.append('address', address)
      data.append('city', city)
      data.append('ifsc', ifsc)
      data.append('bank', bank)
      data.append('work_type', work_type)
      data.append('acc_no', acc_no)

      const res =await axios.put(API + '/api/staff_register/', data)
      if (res.data.status) {
        openModal()
        setLocalStorage('address', address)
        setLocalStorage('photo', file)
        setLocalStorage('ifsc', ifsc)
        setLocalStorage('bank', bank)
        setLocalStorage('work_type', work_type)
        setLocalStorage('acc_no', acc_no)
        setLocalStorage('cid', localStorage.getItem('login_id'))
        setLocalStorage('isAuthenticated', 'true')
      } else {
        alert('Not Updated')
      }
    }
  }

  const removeSelectedImage = () => {
    setFile()
    setFilebool(false)
  }
  return (
    <>
      <DashboardHome />
      <div className="border"></div>
      {(() => {
        if (auth === 'customer') {
          return (
            <>
              <div className="flex justify-center flex-wrap mt-16">
                <div className="w-full lg:w-8/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="flex-auto bg-white py-10 pt-0">
                      <form onSubmit={onSubmit}>
                        <div className="rounded-t bg-gradient-to-r from-rose-600 to-rose-400 mb-0 px-6 py-6">
                          <div className="text-center flex justify-between">
                            <h6 className="text-white text-xl font-bold">
                              Edit account
                            </h6>
                            <button
                              className="bg-lightBlue-500 hover:bg-white hover:text-black text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="submit"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase px-10">
                          User Information
                        </h6>
                        <div className="flex flex-wrap px-10">
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="username"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                id="username"
                                name="usename"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('cust_name')}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="email"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('email')}
                              />
                            </div>
                          </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300 " />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 px-10 font-bold uppercase">
                          Contact Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-12/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="address"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                id="address"
                                name="address"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('address')}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="city"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                id="city"
                                name="city"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('city')}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="postal"
                              >
                                Postal Code
                              </label>
                              <input
                                type="text"
                                id="postal"
                                name="pincode"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('pincode')}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        } else if (auth === 'staff') {
          const photo = localStorage.getItem('photo')
          return (
            <>
              <div className="flex justify-center flex-wrap mt-16">
                <div className="w-full lg:w-8/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="flex-auto bg-white py-10 pt-0">
                      <form onSubmit={onSubmit}>
                        <div className="rounded-t bg-gradient-to-r from-rose-600 to-rose-400 mb-0 px-6 py-6">
                          <div className="text-center flex justify-between">
                            <h6 className="text-white text-xl font-bold">
                              Edit account
                            </h6>
                            <button
                              className="bg-lightBlue-500 hover:bg-white hover:text-black text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="submit"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                        <br />
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-12/12 px-8">
                            <div className="relative w-full mb-3">
                              <label
                                className="block border-none uppercase text-black text-sm font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Profile Update
                              </label>

                              <div className="py-3 center mx-auto flex justify-center">
                                <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
                                  <div className="mb-4">
                                    {filebool ? (
                                      ''
                                    ) : (
                                      <img
                                        className="w-auto mx-auto rounded-full object-cover object-center"
                                        src={`${API}/${photo}`}
                                        alt={localStorage.getItem('staff_name')}
                                      />
                                    )}
                                    {file && (
                                      <div>
                                        <img
                                          src={URL.createObjectURL(file)}
                                          alt="Thumb"
                                        />
                                        <button
                                          onClick={removeSelectedImage}
                                          className="flex rounded bg-red-600 text-white w-full justify-center"
                                        >
                                          <span className="font-bold text-md">
                                            Remove
                                          </span>
                                          <span>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              class="h-7 w-7"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              stroke-width="2"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                              />
                                            </svg>
                                          </span>
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  {filebool ? (
                                    ''
                                  ) : (
                                    <label className="cursor-pointer mt-6">
                                      <span className="mt-2 leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full">
                                        Select Avatar
                                      </span>
                                      <input
                                        type="file"
                                        className=""
                                        multiple="multiple"
                                        accept="accept"
                                        onChange={onFileChange}
                                        hidden
                                      />
                                    </label>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase px-10">
                          User Information
                        </h6>
                        <div className="flex flex-wrap px-10">
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="username"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                id="username"
                                name="username"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem(
                                  'staff_name',
                                )}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="mobile"
                              >
                                Mobile
                              </label>
                              <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('mobile')}
                              />
                            </div>
                          </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300 " />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 px-10 font-bold uppercase">
                          Contact Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-12/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="address"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                id="address"
                                name="address"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('address')}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="city"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                id="city"
                                name="city"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('city')}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="work_type"
                              >
                                Work Type
                              </label>
                              <input
                                type="text"
                                id="work_type"
                                name="work_type"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('work_type')}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="salary_type"
                              >
                                Salary Type
                              </label>
                              <input
                                type="text"
                                id="salary_type"
                                name="salary_type"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem(
                                  'salary_type',
                                )}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="salary"
                              >
                                Salary
                              </label>
                              <input
                                type="text"
                                id="salary"
                                name="salary"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('salary')}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="acc_no"
                              >
                                Account Number
                              </label>
                              <input
                                type="text"
                                id="acc_no"
                                name="acc_no"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('acc_no')}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="ifsc"
                              >
                                IFSC
                              </label>
                              <input
                                type="text"
                                id="ifsc"
                                name="ifsc"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('ifsc')}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-10">
                            <div className="relative w-full mb-3">
                              <label
                                className={Styles.Label}
                                htmlFor="bank"
                              >
                                Bank
                              </label>
                              <input
                                type="text"
                                id="bank"
                                name="bank"
                                className={Styles.Input}
                                defaultValue={localStorage.getItem('bank')}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-20"
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
                          Profile Updated
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Please verify your details.
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={closeModal}
                          >
                            Thanks!
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
      })()}
    </>
  )
}
