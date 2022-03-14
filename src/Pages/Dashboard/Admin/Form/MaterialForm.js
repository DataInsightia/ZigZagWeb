import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import styles from '../../Staf/Style/Styles'
import axios from 'axios'
import API from '../../../../api'

import {
  AddMaterial,
  DeleteMaterial,
  UpdateMaterial,
} from '../../../../services/MaterialFormServices'

export default function MaterialForm() {
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

  let [isDeleteOpen, setIsDeleteOpen] = useState(false)
  function closeDeleteModal() {
    setIsDeleteOpen(false)
  }
  function openDeleteModal() {
    setIsDeleteOpen(true)
  }
  //Modal Controls

  const [material, fetchMaterials] = useState([])
  const [MaterialState, fetchMaterialState] = useState(false)

  //GET MATERIALS

  const getMaterials = () => {
    axios.get(`${API}/api/mat/`).then((res) => {
      if (res.status === 200) {
        fetchMaterialState(true)
        fetchMaterials(res.data)
      } else {
        fetchMaterialState(false)
      }
    })
  }

  // GET MATERIALS

  useEffect(() => {
    getMaterials()
  }, [])

  const [addmaterialdata, setAddFormMaterialdata] = useState({
    material_name: '',
    amount: '',
    measurement: '',
  })
  const handleAddMaterialFormChange = (event) => {
    event.preventDefault()
    const fieldname = event.target.getAttribute('name')
    const fieldvalue = event.target.value
    const newWorkData = { ...addmaterialdata }
    newWorkData[fieldname] = fieldvalue
    setAddFormMaterialdata(newWorkData)
  }

  // ADD FORM DATA SENTS TO SERVICES PAGE
  const AddMaterialHandler = async (e) => {
    e.preventDefault()
    const { material_name, measurement, amount } = addmaterialdata
    const res = await AddMaterial(material_name, amount, measurement)
    if (res.data.status) {
      getMaterials()
    }
    // const newAddedMaterial = {
    //   material_name: addmaterialdata.material_name,
    //   measurement: addmaterialdata.measurement,
    //   amount: addmaterialdata.amount,
    // }
    // const insertAddedmaterial = [...material, newAddedMaterial]
    // fetchMaterials(insertAddedmaterial)
    e.target.reset()

    openModal()
  }

  // UPDATE FORM DATA SENTS TO SERVICES PAGE
  const UpdateMaterialHandler = async (y) => {
    y.preventDefault()
    const material_name = y.target.material_name.value
    const material_id = y.target.material_id.value
    const amount = y.target.amount.value
    const measurement = y.target.measurement.value
    const res = await UpdateMaterial(
      material_name,
      material_id,
      amount,
      measurement,
    )
    if (res.data.status) {
      getMaterials()
    }
  }

  // DELETE FORM DATA SENTS TO SERVICES PAGE
  const DeleteMaterialHandler = async (y) => {
    y.preventDefault()
    const mat_id = y.target.id.value
    const res = await DeleteMaterial(mat_id)
    if (res.data.status) {
      getMaterials()
    }
    openDeleteModal()
  }

  return (
    <div>
      <div className={'p-10 mt-12'}>
        {/* work add */}
        <form onSubmit={AddMaterialHandler} className="flex flex-wrap">
          <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
              <div>
                <h2 class="text-2xl justify-center font-semibold leading-tight">
                  Add Material
                </h2>
              </div>
              <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class=" min-w-full shadow-lg  overflow-hidden">
                  <table class="min-w-full leading-normal">
                    <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                      <tr>
                        <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Material Name
                        </th>
                        <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Amount
                        </th>
                        <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                          Measurement Type
                        </th>

                        <th class=" py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="px-5 py-5 bg-white text-sm">
                          <input
                            type="text"
                            name="material_name"
                            className={Styles.WorkFormInput}
                            onChange={handleAddMaterialFormChange}
                          />
                        </td>
                        <td class="px-5 py-5 bg-white text-sm">
                          <input
                            type="text"
                            id="amount"
                            name="amount"
                            className={Styles.WorkFormInput}
                            onChange={handleAddMaterialFormChange}
                          />
                        </td>
                        <td class="px-5 py-5 bg-white text-sm">
                          <select
                            id="measurement"
                            name="measurement"
                            className={Styles.WorkFormInput}
                            onChange={handleAddMaterialFormChange}
                          >
                            <option selected>Please select</option>

                            <option value={'number'}>Number</option>
                            <option value={'inch'}>Inch</option>
                            <option value={'Meter'}>Meter</option>
                          </select>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex justify-between">
                            <button type="submit" className={styles.pinkbutton}>
                              Add Material
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
                Material Lists
              </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow-lg  overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                    <tr>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Material Name
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Amount
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Measurement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MaterialState ? (
                      <>
                        {material.map((e) => (
                          <tr>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.material_name}
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
                                <span className="relative">
                                  {e.measurement}
                                </span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      ''
                    )}
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
                Material Update
              </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="min-w-full shadow-lg  overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                    <tr>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Material Name
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Amount
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Measurement
                      </th>

                      <th class=" py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {MaterialState ? (
                      <>
                        {material.map((y) => 
                          
                            <form onSubmit={UpdateMaterialHandler}>
                            <tr>
                              <input
                                type="text"
                                name="material_id"
                                value={y.material_id}
                                id="material_id"
                                hidden
                              />
                              <td class="px-5 py-5 bg-white text-sm">
                                <input
                                  type="text"
                                  name="material_name"
                                  className={Styles.WorkFormInput}
                                  defaultValue={y.material_name}
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
                                  id="measurement"
                                  name="measurement"
                                  className={Styles.WorkFormInput}
                                >
                                  <option
                                    value={y.measurement}
                                    selected
                                    className="uppercase"
                                  >
                                    {y.measurement}
                                  </option>

                                  <option value={'number'}>Number</option>
                                  <option value={'inch'}>Inch</option>
                                  <option value={'meter'}>Meter</option>
                                </select>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                <button
                                  type="submit"
                                  className={styles.pinkbutton}
                                >
                                  Update
                                </button>
                              </td>
                            </tr>
                            </form>
                         
                        )}
                      </>
                    ) : (
                      ''
                    )}
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
                Material Delete
              </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="min-w-full shadow-lg  overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead className="bg-gradient-to-r from-rose-600 to-rose-400">
                    <tr>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Material Name
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Amount
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Measurement
                      </th>
                      <th class="px-5 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MaterialState ? (
                      <>
                        {material.map((e) => (
                          <tr>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                              {e.material_name}
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
                              <form onSubmit={DeleteMaterialHandler}>
                                <input
                                  type="text"
                                  name="id"
                                  value={e.material_id}
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
                    ) : (
                      ''
                    )}
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
                  Material Added
                </Dialog.Title>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* delete modal */}
      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
          onClose={closeDeleteModal}
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
                  Material Deleted
                </Dialog.Title>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeDeleteModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* delete modal  */}
    </div>
  )
}
