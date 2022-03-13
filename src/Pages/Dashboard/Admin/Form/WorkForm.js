import React, { Fragment,useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import styles from '../../Staf/Style/Styles'
import axios from 'axios'
import API from '../../../../api'

import {
  AddWork,
  UpdateWork,
  DeleteWork,
  GetWork,
} from '../../../../services/WorkFormServices'
import { Link } from 'react-router-dom'

export default function WorkForm() {
  const Styles = {
    TabHeadButton:
      'shadow-lg mx-4 py-1 uppercase font-bold px-3 font-xs bg-rose-500 border-2 border-rose-500 text-white hover:text-rose-500 hover:border-rose-500 hover:bg-transparent rounded-md',
    TabPanel: '',
    WorkFormInput:
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2',
  }

   //Modal Controls
   let [isOpen, setIsOpen] = useState(false)
   function closeModal() {
     setIsOpen(false)
   }
   function openModal() {
     setIsOpen(true)
   }
   //Modal Controls


  const [works, fetchWorks] = useState([])
  const [workState, fetchWorkState] = useState(false)

  useEffect(() => {
    axios.get(`${API}/api/works/`).then((res) => {
      if (res.status === 200) {
        fetchWorkState(true)
        fetchWorks(res.data)
      } else {
        fetchWorks([])
        fetchWorkState(false)
      }
    })
  }, [])

  const [addworkformdata, setAddFormWorkdata] = useState({
    work_name: '',
    amount: '',
    wage_type: '',
  })
  const handleAddWorkFormChange = (event) => {
    event.preventDefault()
    const fieldname = event.target.getAttribute('name')
    const fieldvalue = event.target.value
    const newWorkData = { ...addworkformdata }
    newWorkData[fieldname] = fieldvalue
    setAddFormWorkdata(newWorkData)
  }
  
  // ADD FORM DATA SENTS TO SERVICES PAGE
  const AddWorkHandler = (e) => {
    e.preventDefault()
    const { work_name, wage_type, amount } = addworkformdata
    AddWork(work_name, amount, wage_type)
    const newAddedWork = {
      work_name: addworkformdata.work_name,
      wage_type: addworkformdata.wage_type,
      amount: addworkformdata.amount,
    }
    const insertAddedwork = [...works, newAddedWork]
    fetchWorks(insertAddedwork)
    e.target.reset()
    openModal()
  }

  // UPDATE FORM DATA SENTS TO SERVICES PAGE
  const UpdateWorkHandler = (y) => {
    y.preventDefault()
    const work_name = y.target.work_name.value
    const work_id = y.target.work_id.value
    const amount = y.target.amount.value
    const wage_type = y.target.wage_type.value
    UpdateWork(work_name, work_id, amount, wage_type)
  }

  // DELETE FORM DATA SENTS TO SERVICES PAGE
  const DeleteWorkHandler = (y) => {
    y.preventDefault()
    const work_id = y.target.id.value
    DeleteWork(work_id)
  }

  return (
    <div>
      <div className={'p-10 mt-12'}>
        {/* work add */}
        <form onSubmit={AddWorkHandler} className="flex flex-wrap">
          <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
              <div>
                <h2 class="text-2xl justify-center font-semibold leading-tight">
                  Add Work
                </h2>
              </div>
              <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class=" min-w-full shadow-lg  overflow-hidden">
                  <table class="min-w-full leading-normal">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                      <tr>
                        <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Work Name
                        </th>
                        <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Amount
                        </th>
                        <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Wage Type
                        </th>

                        <th class=" py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="px-5 py-5 bg-white text-sm">
                          <input
                            type="text"
                            name="work_name"
                            className={Styles.WorkFormInput}
                            onChange={handleAddWorkFormChange}
                          />
                        </td>
                        <td class="px-5 py-5 bg-white text-sm">
                          <input
                            type="text"
                            id="amount"
                            name="amount"
                            className={Styles.WorkFormInput}
                            onChange={handleAddWorkFormChange}
                          />
                        </td>
                        <td class="px-5 py-5 bg-white text-sm">
                          <select
                            id="wage_type"
                            name="wage_type"
                            className={Styles.WorkFormInput}
                            onChange={handleAddWorkFormChange}
                          >
                            <option selected>Please select</option>

                            <option value={'full'}>Full</option>
                            <option value={'half'}>Half</option>
                            <option value={'10half'}>10 Half</option>
                          </select>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex justify-between">
                            <button type="submit" className={styles.pinkbutton}>
                              Add Work
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* work add */}
        {/* work lists */}
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            <div>
              <h2 class="text-2xl justify-center font-semibold leading-tight">
                Work Lists
              </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow-lg  overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                    <tr>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Work Name
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Amount
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Wage Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workState?(
                      <>
                    {works.map((e) => (
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                          {e.work_name}
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                          {e.amount}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">{e.wage_type}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                    </>
                    ):''}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* work lists */}

        {/* work update */}
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            <div>
              <h2 class="text-2xl justify-center font-semibold leading-tight">
                Work Update
              </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="min-w-full shadow-lg  overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                    <tr>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Work Name
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Amount
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Wage Type
                      </th>

                      <th class=" py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                   
                    {workState?(
                    <>
                    {works.map((y) => (
                      <form onSubmit={UpdateWorkHandler}>
                        <tr>
                          <input
                            type="text"
                            name="work_id"
                            value={y.work_id}
                            id="work_id"
                            hidden
                          />
                            <td class="px-5 py-5 bg-white text-sm">
                              <input
                                type="text"
                                name="work_name"
                                className={Styles.WorkFormInput}
                                defaultValue={y.work_name}
                              />
                            </td>
                          <td class="px-5 py-5 bg-white text-sm">
                            <input
                              type="text"
                              id="amount"
                              name="amount"
                              className={Styles.WorkFormInput}
                              defaultValue={y.amount}
                            />
                          </td>
                          <td class="px-5 py-5 bg-white text-sm">
                            <select
                              id="wage_type"
                              name="wage_type"
                              className={Styles.WorkFormInput}
                            >
                              <option
                                value={y.wage_type}
                                selected
                                className="uppercase"
                              >
                                {y.wage_type}
                              </option>

                              <option value={'full'}>Full</option>
                              <option value={'half'}>Half</option>
                              <option value={'10half'}>10 Half</option>
                            </select>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                            <button type="submit" className={styles.pinkbutton}>
                              Update
                            </button>
                          </td>
                        </tr>
                      // </form>
                    ))}
                    </>
                    ):''}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* work update */}
        {/* work delete */}
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            <div>
              <h2 class="text-2xl justify-center font-semibold leading-tight">
                Work Delete
              </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="min-w-full shadow-lg  overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                    <tr>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Work Name
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Amount
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Wage Type
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {workState?(
                    <>
                    {works.map((e) => (
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                          {e.work_name}
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                          {e.amount}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Full</span>
                          </span>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <form onSubmit={DeleteWorkHandler}>
                            <input
                              type="text"
                              name="id"
                              value={e.work_id}
                              hidden
                            />
                            <button
                              type="submit"
                              className="bg-red-500 shadow-lg text-white px-2 py-2 rounded-md border border-red-500 hover:text-red-500 hover:bg-transparent"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
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
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                    </>
                    ):''}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* work delete */}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Work Added
                </Dialog.Title>
               
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    <Link to="/dashboard/work">
                      Close
                    </Link>
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
