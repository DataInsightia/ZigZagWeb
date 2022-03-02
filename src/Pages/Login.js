import React, { useState } from 'react'
import Google from '../assets/img/google.svg'
import API from '../api'
import axios from 'axios'
import slideImg1 from '../assets/img/register_bg_2.png'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router'



export default function Login() {
  const [data, setData] = useState({
    cust_id: '',
    password: '',
  })
  const [login, setLogin] = useState(false)

  const handleEvent = (e) => {
    var newData = { ...data }
    newData[e.target.name] = e.target.value
    setData(newData)
  }

  const setLocalStorage = (name,data) =>{
    localStorage.setItem(name, data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post(
        '/api/customer_login/',
        data,
        {
          headers: {
            'access-control-allow-origin': '*',
            'Content-Type': 'application/json',
          },
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data.user.role)
        if (res.data.status) {
          if (res.data.user.role == 'customer') {
            setLocalStorage('login_id', res.data.user.login_id)
            setLocalStorage('role', res.data.user.role)
            setLogin(true)
            setLocalStorage('cid', res.data.user.login_id)
            setLocalStorage('isAuthenticated', 'true')
          } else if (res.data.user.role == 'staff') {
            setLocalStorage('login_id', res.data.user.login_id)
            setLocalStorage('role', res.data.user.role)
            setLogin(true)
            setLocalStorage('cid', res.data.user.login_id)
            setLocalStorage('isAuthenticated', 'true')
          } else {
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
  }

  return login | (localStorage.getItem('cid') !== null) ? (
    <Navigate to="/dashboard/dhome" />
  ) : (
    <>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div className="absolute md:fixed top-0 w-full h-full bg-red-50 bg-no-repeat bg-full">
          <img src={slideImg1} />
        </div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full  lg:w-6/12 px-4">
              <div className="relative border-2 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blue-500 text-sm font-bold">
                      Login up with
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img alt="..." className="w-5 mr-1" src={Google} />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Or sign up with credentials</small>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email or Mobile Number
                      </label>
                      <input
                        type="text"
                        required="required"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        value={data.cust_id}
                        onChange={handleEvent}
                        name={'cust_id'}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        required="required"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleEvent}
                        name={'password'}
                      />
                    </div>

                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          required="required"
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          I agree with the{' '}
                          <a
                            href="#pablo"
                            className="text-lightBlue-500"
                            onClick={(e) => e.preventDefault()}
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type={'submit'}
                      >
                        Login
                      </button>
                    </div>
                    <br />
                    <div className="text-center mb-3">
                      <h6 className="text-blue-500 text-sm font-bold">
                        Dont have an account?
                        {/*<Link to="/register">Sign Up.</Link>*/}
                      </h6>
                      <Link className="text-blueGray-500" to="/register">
                        <small>Create new account</small>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
