import React, { useState } from 'react'
import API from '../api'
import axios from 'axios'
import slideImg1 from '../assets/img/register_bg_2.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function Register() {
  const Styles = {
    InputError: 'text-red-500 font-bold',
    LoginButton:
      'bg-red-500 text-white border border-red-500 hover:text-red-500 hover:bg-transparent text-sm font-bold uppercase px-6 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150',
    Label: 'block border-none uppercase text-black text-xs font-bold mb-2',
    Input:
      'border px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-2xl text-sm focus:ring-red-500 w-full  ease-linear transition-all duration-150',
  }
  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    password: '',
  })
  // const [register, setRegister] = useState(false)

  // const formLogin = () => {
  //   console.log('Callback function when form is submitted!')
  //   console.log('Form Values ', values)
  // }

  //Custom hook call
  // const { handleChange, values, errors, handleSubmit } = useForm()

  // console.log(handleChange)

  // const handleEvent = async (e) => {
  //   var newData = { ...data }
  //   newData[e.target.name] = e.target.value
  //   setData(newData)
  //   // console.log(newData);
  // }

  // const handleSubmit =  (e) => {
  //   e.preventDefault()

  // axios
  //   .post(API + '/api/customer_register/', data)
  //   .then((res) => {
  //     if (res.data.status) {
  //       alert(res.data.message)
  //       return (
  //         <div
  //           className="px-4 py-3 leading-normal text-red-50 bg-green-600 rounded-lg"
  //           role="alert"
  //         >
  //           <p>Login Sucess</p>
  //         </div>
  //       )
  //     }
  //     console.log(res.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     alert('Already Register Your Email Id')
  //   })
  // }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()
  // const onSubmit = (data) => console.log(data)
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = (e) => {
    console.log(e.username)
    // e.mobile,
    // e.email
    // e.address
    // e.pincode
    // e.city
    // e.password
    reset()
  }

  return (
    <>
      <section className="relative w-full h-full py-24 min-h-screen">
        <div className="absolute md:fixed top-0 w-full h-full bg-gradient-to-tr from-red-50 to-red-200 blur-sm">
          <img src={slideImg1} />
        </div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full  lg:w-5/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white border-none shadow-2xl rounded-2xl">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h1 className="text-black font-semibold text-2xl">
                      Register
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
                        // value={data.name}
                        // onChange={handleEvent}
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
                      <input
                        type="number"
                        className={Styles.Input}
                        placeholder="Mobile"
                        // value={data.mobile}
                        // onChange={handleEvent}
                        name={'mobile'}
                        maxLength={10}
                        minLength={10}
                        id="mobile"
                        {...register('mobile', {
                          required: true,
                          maxLength: 10,
                          minLength: 10,
                        })}
                        onKeyUp={() => {
                          trigger('mobile')
                        }}
                      />
                      {errors.mobile && (
                        <span className="text-red-500">10 Number needed</span>
                      )}
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
                        id="password"
                        name={'password'}
                        ref={register({
                          required: "You must specify a password",
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                          }
                        })}
                      
                        onKeyUp={() => {
                          trigger('password')
                        }}
                      />
                      {errors.password && (
                        <span className="text-red-500">
                          {errors.password}
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

                  {/* <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Name
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="Name"
                        // value={data.name}
                        onChange={handleChange}
                        name={'name'}
                      />
                      {errors.username && <h3 className={Styles.InputError}>{errors.username}</h3>}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Mobile
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="Mobile"
                        // value={data.mobile}
                        onChange={handleChange}
                        name={'mobile'}
                        maxLength={10}
                        minLength={10}
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
                        // value={data.email}
                        onChange={handleChange}
                        name={'email'}
                      />
                      {errors.email && <h3 className={Styles.InputError}>{errors.email}</h3>}
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Address
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="Address"
                        // value={data.address}
                        onChange={handleChange}
                        name={'address'}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        City
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="City"
                        // value={data.city}
                        onChange={handleChange}
                        name={'city'}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className={Styles.Input}
                        placeholder="City"
                        // value={data.pincode}
                        onChange={handleChange}
                        name={'pincode'}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className={Styles.Label} htmlFor="grid-password">
                        Password
                      </label>
                      <input
                        minLength="8"
                        type="password"
                        name="password"
                        className={Styles.Input}
                        placeholder="Password"
                        onChange={handleChange}
                      />

                      {errors.password && <h3 className={Styles.InputError}>{errors.password}</h3>}
                    </div>
                    <div className="text-center mt-6">
                      <button className={Styles.LoginButton} type={'submit'}>
                        Create Account
                      </button>
                    </div>
                  </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
