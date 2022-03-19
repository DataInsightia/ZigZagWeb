import React, { useState, Fragment } from 'react'
import axios from 'axios'
import API from '../../../../api'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { Link, Navigate } from 'react-router-dom'


export default function StaffRegister() {
  const Styles = {
    InputError: 'text-red-500 text-xs',
    LoginButton:
      'bg-red-500 text-white border border-red-500 hover:text-red-500 hover:bg-transparent text-sm font-bold uppercase px-6 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150',
    Label: 'block border-none uppercase text-black text-xs font-bold mb-2',
    Input:
      'border px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-2xl text-sm focus:ring-red-500 w-full  ease-linear transition-all duration-150',
  }
  const [formData, setFormData] = useState({
    staff_name: '',
    password: '',
    mobile: '',
    address: '',
    city: '',
    salary_type: '',
    salary: '',
    worktype: '',
    acc_no: '',
    ifsc: '',
  })
 
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const [file, setFile] = useState('')

  const onFileChange = (e) => setFile(e.target.files[0])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const mobile_val = (e) => {
    const mobile = e.target.value
    if (mobile.length < 4) {
      if (mobile === '+91') {
        openModal()
        e.target.value = ''
      }
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
  const onSubmit = async (e) => {
    console.log(e)

    const data = new FormData()
      data.append('file', file)
      data.append('mobile',formData.mobile)
      data.append('salary_type',formData.salary_type)
      data.append('work_type',formData.work_type)
      data.append('data', JSON.stringify(e))
      const res = await axios.post(API + "/api/staff_register/",data);
      if(res.data.status){
        isLogin(true)
        alert("Register Sucessfully")
        setFormData({
          staff_name: '',
          password: '',
          mobile: '',
          address: '',
          city: '',
          salary_type: '',
          salary: '',
          worktype: '',
          acc_no: '',
          ifsc: '',
        })
      }else{
        alert("Not Register Check Now")
        setFormData(
          {
            staff_name: '',
            password: '',
            mobile: '',
            address: '',
            city: '',
            salary_type: '',
            salary: '',
            worktype: '',
            acc_no: '',
            ifsc: '',
          }
        )
      }
    reset()
  }
  return  Login ? (
    <Navigate to="/dashboard/dhome" />
  ) : (
    <div>
      <div className="container mx-auto px-4 h-full  bg-gradient-to-tr from-red-50 to-red-200">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full  lg:w-8/12 px-4 py-10 mt-10">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white border-none shadow-2xl rounded-2xl">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-full">
                      <center>
                        <h2>STAFF REGISTER</h2>
                      </center>
                      <br />
                      <div className="relative">
                        <label htmlFor="name" className={Styles.Label}>
                          Name
                        </label>
                        <input
                          type="text"
                          // onChange={onChange}
                          // value={staff_name}
                          id="name"
                          name="staff_name"
                          className={Styles.Input}
                          onChange={onChange}
                          id="staff_name"
                          {...register('staff_name', { required: true })}
                          onKeyUp={() => {
                            trigger('staff_name')
                          }}
                        />
                        {errors.staff_name && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="password" className={Styles.Label}>
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          onChange={onChange}
                          // value={password}
                          className={Styles.Input}
                          // required
                          {...register('password', { required: true })}
                          onKeyUp={() => {
                            trigger('password')
                          }}
                        />
                        {errors.password && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="mobile" className={Styles.Label}>
                          Mobile
                        </label>
                        <input
                          type="number"
                          id="mobile"
                          name="mobile"
                          // onChange={onChange}
                          // value={mobile}
                          className={Styles.Input}
                          onChange={(e) => {
                            onChange(e)
                            mobile_val(e)
                          }}
                          // required
                          // {...register('mobile', { required: true })}
                          // onKeyUp={() => {
                          //   trigger('mobile')
                          // }}
                        />
                        {/* {errors.mobile && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )} */}
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="address" className={Styles.Label}>
                          address
                        </label>
                        <input
                          type="address"
                          id="address"
                          name="address"
                          // onChange={onChange}
                          // value={address}
                          className={Styles.Input}
                          // required
                          {...register('address', { required: true })}
                          onKeyUp={() => {
                            trigger('address')
                          }}
                        />
                        {errors.address && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="city" className={Styles.Label}>
                          city
                        </label>
                        <input
                          type="city"
                          id="city"
                          name="city"
                          // onChange={onChange}
                          // value={city}
                          className={Styles.Input}
                          // required
                          {...register('city', { required: true })}
                          onKeyUp={() => {
                            trigger('city')
                          }}
                        />
                        {errors.city && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="salary_type" className={Styles.Label}>
                          salary_type
                        </label>
                        <select
                          name="salary_type"
                          // value={salary_type}
                          // onChange={onChange}
                          className={Styles.Input}
                          // required
                          onChange={onChange}
                        >
                          <option selected disabled>
                            Please select
                          </option>
                          <option value={'monthly'} >Monthly</option>
                          <option value={'wage'}>Wages</option>
                        </select>
                      </div>
                    </div>
                    {formData.salary_type == 'monthly'?
                   
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="salary" className={Styles.Label}>
                          salary
                        </label>
                        <input
                          type="salary"
                          id="salary"
                          name="salary"
                          onChange={onChange}
                          // value={salary}
                          className={Styles.Input}
                          {...register('salary', { required: true })}
                          onKeyUp={() => {
                            trigger('salary')
                          }}
                        />
                        {errors.salary && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )}
                      </div>

                    </div>:''
                    }
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="acc_no" className={Styles.Label}>
                          acc_no
                        </label>
                        <input
                          type="acc_no"
                          id="acc_no"
                          name="acc_no"
                          // onChange={onChange}
                          // value={acc_no}
                          className={Styles.Input}
                          {...register('acc_no', { required: true })}
                          onKeyUp={() => {
                            trigger('acc_no')
                          }}
                        />
                        {errors.acc_no && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="worktype" className={Styles.Label}>
                          worktype
                        </label>

                        <select
                          name="worktype"
                          // value={formData.worktype}
                          onChange={onChange}
                          className={Styles.Input}
                        >
                          <option selected disabled>
                            Please select
                          </option>
                          <option value="tailor">tailor</option>
                          <option value="aari">aari</option>
                          <option value="embroidery">embroidery</option>
                          <option value="photo">photo</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="ifsc" className={Styles.Label}>
                          ifsc
                        </label>
                        <input
                          type="ifsc"
                          id="ifsc"
                          name="ifsc"
                          // onChange={onChange}
                          // value={ifsc}
                          className={Styles.Input}
                          // required

                          {...register('ifsc', { required: true })}
                          onKeyUp={() => {
                            trigger('ifsc')
                          }}
                        />
                        {errors.ifsc && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label htmlFor="ifsc" className={Styles.Label}>
                          Profile
                        </label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          accept="image/jpeg"
                          onChange={onFileChange}
                          className={Styles.Input}
                          // {...register('file', { required: true })}
                          // onKeyUp={() => {
                          //   trigger('file')
                          // }}
                        />
                        {/* {errors.file && (
                          <span className={Styles.InputError}>
                            This field is required
                          </span>
                        )} */}
                      </div>
                    </div>

                    <div className="p-2 w-full">
                      <div className="flex justify-between">
                        <button type="submit" className={Styles.LoginButton}>
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
    </div>
  )
}
