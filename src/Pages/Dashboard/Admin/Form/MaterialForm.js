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
  let [isFormAddOpen, setIsFormAddOpen] = useState(false)
  let [isFormUpdateOpen, setIsFormUpdateOpen] = useState(false)
  let [isFromDeleteOpen, setIsFormDeleteOpen] = useState(false)
  const [updateworkid, setUpdateWorkID] = useState('')
  const [deleteworkid, setDeleteWorkID] = useState('')
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  //ADD MODAL FORM
  function closeFromAddModal() {
    setIsFormAddOpen(false)
  }
  function openFromAddModal() {
    setIsFormAddOpen(true)
  }

  // UPDATE MODAL FORM
  function openFromUpdateModal(id) {
    setIsFormUpdateOpen(true)
    console.log(id)
    axios
      .get(API + `/api/material/${id}/`)
      .then((res) => setUpdateWorkID(res.data))
  }

  function closeFromUpdateModal() {
    setIsFormUpdateOpen(false)
    setUpdateWorkID({})
  }

  // DELETE MODAL FORM
  function openFromDeleteModal(id) {
    setIsFormDeleteOpen(true)
    setDeleteWorkID(id)
  }

  function closeFromDeleteModal(id) {
    setIsFormDeleteOpen(false)
    setDeleteWorkID()
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

  // ADD FORM DATA SENTS TO SERVICES PAGE
  const AddMaterialHandler = async (e) => {
    e.preventDefault()
    const res = await AddMaterial(
      e.target.material_name.value,
      e.target.amount.value,
      e.target.measurement.value,
    )
    if (res.data.status) {
      getMaterials()
    }
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
      closeFromUpdateModal()
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
      <div class="mt-16 container mx-auto px-4 sm:px-8">
        <div class="py-24">
          <div>
            <h2 class="text-2xl justify-center font-semibold leading-tight">
              Material
            </h2>
            <button
              onClick={openFromAddModal}
              className="px-2 py-1 shadow-lg bg-red-200 text-red-900 rounded text-lg font-bold"
            >
              Add Material
            </button>
          </div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal ">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Material Name
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Measurement
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {MaterialState ? (
                    <>
                      {material.map((e) => (
                        <tr className="text-center">
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm uppercase">
                            {e.material_name}
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm uppercase">
                            {e.amount}
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm uppercase">
                            {e.measurement}
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm uppercase">
                            <button
                              onClick={() =>
                                openFromUpdateModal(`${e.material_id}`)
                              }
                              className="px-2 py-1 bg-red-200 text-red-900 rounded font-bold"
                            >
                              Update
                            </button>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button
                              onClick={() =>
                                openFromDeleteModal(`${e.material_id}`)
                              }
                              className="px-2 py-1 bg-red-200 text-red-900 rounded font-bold"
                            >
                              Delete
                            </button>
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

      {/* add form modal */}
      <Transition appear show={isFormAddOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25"
          onClose={closeFromAddModal}
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
              className="inline-block h-screen align-middle mt-3"
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
                  Add Material
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={AddMaterialHandler}>
                    <div class="relative z-0 mb-6 w-full group">
                      <input
                        type="text"
                        id="floating_materialname"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                        name="material_name"
                      />
                      <label
                        for="floating_materialname"
                        class="border-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Material Name
                      </label>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                      <input
                        type="number"
                        id="floating_amount"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                        name="amount"
                      />
                      <label
                        for="floating_amount"
                        class="border-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Amount
                      </label>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                      <label
                        for="measurement"
                        class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Select Measurement
                      </label>

                      <select
                        id="measurement"
                        name="measurement"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      >
                        <option selected>Please select</option>

                        <option value={'number'}>Number</option>
                        <option value={'inch'}>Inch</option>
                        <option value={'Meter'}>Meter</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    >
                      Add Material
                    </button>
                  </form>
                </div>
                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={closeFromAddModal}
                  >
                    Got it, thanks!
                  </button>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* add form modal */}
      {/* update form modal */}
      <Transition appear show={isFormUpdateOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25"
          onClose={closeFromUpdateModal}
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
              className="inline-block h-screen align-middle mt-3"
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
                  Update Material
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={UpdateMaterialHandler}>
                    <div class="relative z-0 mb-6 w-full group">
                      <input
                        type="text"
                        name="material_id"
                        value={updateworkid.material_id}
                        hidden
                      />{' '}
                      <input
                        type="text"
                        name="floating_materialname"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        defaultValue={updateworkid.material_name}
                        required
                        name="material_name"
                      />
                      <label
                        for="floating_materialname"
                        class="border-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Material Name
                      </label>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                      <input
                        type="number"
                        name="floating_amount"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                        name="amount"
                        defaultValue={updateworkid.amount}
                      />
                      <label
                        for="floating_amount"
                        class="border-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Amount
                      </label>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                      <select
                        id="floating_measurement"
                        name="measurement"
                        className={Styles.WorkFormInput}
                      >
                        <option value={updateworkid.measurement}>
                          Please select
                        </option>

                        <option value={'number'}>Number</option>
                        <option value={'inch'}>Inch</option>
                        <option value={'Meter'}>Meter</option>
                      </select>
                      <label
                        for="floating_measurement"
                        class="border-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Wage Type
                      </label>
                    </div>
                    <button
                      type="submit"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    >
                      Update Work
                    </button>
                  </form>
                </div>

                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={closeFromUpdateModal}
                  >
                    Got it, thanks!
                  </button>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* update form modal */}
      {/* delete form modal */}
      <Transition appear show={isFromDeleteOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25"
          onClose={closeFromDeleteModal}
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
                  Delete Work
                </Dialog.Title>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you want to delete,Please confirm
                  </p>
                </div>

                <div className="mt-4 flex">
                  <button
                    type="button"
                    className="mx-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={closeFromDeleteModal}
                  >
                    Cancel
                  </button>
                  <form onSubmit={DeleteMaterialHandler}>
                    <input type="text" name="id" value={deleteworkid} hidden />
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* delete form modal */}
  
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
