import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import API from '../../../api'
import React from 'react'
import Constants from '../../../constants/Constants'
import PaginationBar from '../../../widget/PaginationBar'
import { DownloadExcelFile } from '../../../utils/ExportToExcel'

export default function Product() {
  let [isOpen, setIsOpen] = useState(false)
  let [isUpdateOpen, setUpdateIsOpen] = useState(false)
  const [product, setProduct] = useState({})
  const [picture, setPicture] = useState('')
  const [currentPicture, setCurrentPicture] = useState('')
  const [productList, setProductList] = useState([])
  const [currentProduct, setCurrentProduct] = useState({})
  const [filteredData, setFilteredData] = useState(productList)

  const closeUpdateModal = () => setUpdateIsOpen(false)
  const openUpdateModal = () => setUpdateIsOpen(true)
  const resetPicture = () => setPicture('')
  const resetProduct = () => setProduct({})
  const resetCurrentProduct = () => setCurrentProduct({})

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    fetch()
  }, [])

  const addButton = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('data', JSON.stringify(product))
    formData.append('picture', picture)
    axios
      .post(API + '/api/product/', formData)
      .then((res) => {
        console.log(res.data)
        fetch()
        resetCurrentProduct()
        resetPicture()
      })
      .catch((err) => {
        console.log(err)
        fetch()
      })
  }

  const getProduct = (e, pid) => {
    const api = `${API}/api/get_product/?pid=${pid}`
    axios
      .get(api)
      .then((res) => {
        if (res.data.status) {
          setCurrentProduct(res.data.data)
        }
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }

  const updateButton = (e, productid) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('data', JSON.stringify(currentProduct))
    formData.append('picture', currentPicture)
    axios
      .put(`${API}/api/product/${productid}/`, formData)
      .then((res) => {
        console.log(res.data)
        fetch()
        resetCurrentProduct()
      })
      .catch((err) => console.log(err))
  }

  const handleEvent = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value })

  const handleUpdateEvent = (e) =>
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value })

  const handleFile = (e) => setPicture(e.target.files[0])

  const handleCurrentFile = (e) => setCurrentPicture(e.target.files[0])

  const handleToggler = (e, value) =>
    setProduct({ ...product, [e.target.name]: !value })

  const handleCurrentToggler = (e, value) =>
    setCurrentProduct({ ...currentProduct, [e.target.name]: !value })

  const fetch = () => {
    axios
      .get(API + '/api/product/')
      .then((res) => {
        setProductList(res.data.data)
        setFilteredData(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = productList.filter((data) => {
      return data.product_name.search(value) != -1
    })
    setFilteredData(result)
  }

  return (
    <>
      {/* PAGINATION */}
      <Pagination
        data={filteredData}
        pageLimit={2}
        dataLimit={10}
        handleSearch={handleSearch}
        openModal={openModal}
        resetPicture={resetPicture}
        resetProduct={resetProduct}
        getProduct={getProduct}
        openUpdateModal={openUpdateModal}
      />
      {/* PAGINATION */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25 p-10"
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
                  Add Product
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    encType="multipart/formdata"
                    onSubmit={(e) => {
                      addButton(e)
                      closeModal(e)
                    }}
                  >
                    <div class="mb-6">
                      <label
                        for="product_name"
                        class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your Product Name
                      </label>
                      <input
                        onChange={handleEvent}
                        defaultValue={product.product_name}
                        type="product_name"
                        id="product_name"
                        name="product_name"
                        class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        placeholder="Designer Sari"
                        required
                      />
                    </div>

                    <img
                      src={
                        picture !== ''
                          ? URL.createObjectURL(picture)
                          : 'https://via.placeholder.com/150'
                      }
                      alt={'#'}
                      height={150}
                      width={150}
                    />
                    <label
                      class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      for="user_avatar"
                    >
                      Your Product Image
                    </label>
                    <input
                      required
                      onChange={handleFile}
                      name="product_image"
                      class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                      aria-describedby="user_avatar_help"
                      id="user_avatar"
                      type="file"
                    />
                    <div
                      class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="user_avatar_help"
                    >
                      A product picture is useful to confirm your product.
                    </div>

                    <label
                      className={
                        product.display
                          ? 'button border-none rounded-2xl bg-green-500 text-white font-bold'
                          : 'button border-none rounded-2xl bg-red-500 text-white font-bold'
                      }
                    >
                      <input
                        type="button"
                        onClick={(e) => handleToggler(e, product.display)}
                        defaultValue={
                          product.display ? 'Click to Hide ' : 'Click to Show '
                        }
                        name="display"
                      />{' '}
                      Product
                    </label>
                    <br />
                    <label
                      className={
                        product.new_arrival
                          ? 'button border-none rounded-2xl bg-green-500 text-white font-bold'
                          : 'button border-none rounded-2xl bg-red-500 text-white font-bold'
                      }
                    >
                      <input
                        type="button"
                        onClick={(e) => handleToggler(e, product.new_arrival)}
                        defaultValue={
                          product.new_arrival
                            ? 'Click to Hide '
                            : 'Click to Show '
                        }
                        name="new_arrival"
                      />{' '}
                      New Arrival
                    </label>
                    <br />

                    <div className="mt-4">
                      <button
                        type="submit"
                        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isUpdateOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25 p-10"
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
                  Update Product
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    encType="multipart/formdata"
                    onSubmit={(e) => {
                      updateButton(e, currentProduct.product_id)
                      closeUpdateModal(e)
                    }}
                  >
                    <div class="mb-6">
                      <label
                        for="product_name"
                        class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your Product Name{' '}
                      </label>
                      <input
                        onChange={handleUpdateEvent}
                        type="product_name"
                        id="product_name"
                        defaultValue={currentProduct.product_name}
                        name="product_name"
                        class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        placeholder="Designer Sari"
                        required
                      />
                    </div>

                    <img
                      src={
                        currentPicture !== ''
                          ? URL.createObjectURL(currentPicture)
                          : API + currentProduct.picture
                      }
                      alt="#"
                    />
                    <label
                      class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      for="user_avatar"
                    >
                      Your Product Image
                    </label>
                    <input
                      onChange={handleCurrentFile}
                      name="product_image"
                      accept="image/jpeg"
                      class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                      aria-describedby="user_avatar_help"
                      id="user_avatar"
                      type="file"
                    />
                    <div
                      class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="user_avatar_help"
                    >
                      A product picture is useful to confirm your product.
                    </div>

                    {/*<label className={ product.display ? 'button border-none rounded-2xl bg-green-500 text-white font-bold' : 'button border-none rounded-2xl bg-red-500 text-white font-bold'}><input type="button" onClick={(e) => handleCurrentToggler(e, currentProduct.display)} value={currentProduct.display ? "show" : "hide"} name="display" /> Display</label><br />*/}
                    {/*<label><input type="button" onClick={(e) => handleCurrentToggler(e, currentProduct.new_arrival)} value={currentProduct.new_arrival ? "show" : "hide"} name="new_arrival" /> New Arrival</label><br />*/}

                    <label
                      className={
                        currentProduct.display
                          ? 'button border-none rounded-2xl bg-green-500 text-white font-bold'
                          : 'button border-none rounded-2xl bg-red-500 text-white font-bold'
                      }
                    >
                      <input
                        type="button"
                        onClick={(e) =>
                          handleCurrentToggler(e, currentProduct.display)
                        }
                        defaultValue={
                          currentProduct.display
                            ? 'Click to Hide '
                            : 'Click to Show '
                        }
                        name="display"
                      />{' '}
                      Product
                    </label>
                    <br />
                    <label
                      className={
                        currentProduct.new_arrival
                          ? 'button border-none rounded-2xl bg-green-500 text-white font-bold'
                          : 'button border-none rounded-2xl bg-red-500 text-white font-bold'
                      }
                    >
                      <input
                        type="button"
                        onClick={(e) =>
                          handleCurrentToggler(e, currentProduct.new_arrival)
                        }
                        defaultValue={
                          currentProduct.new_arrival
                            ? 'Click to Hide '
                            : 'Click to Show '
                        }
                        name="new_arrival"
                      />{' '}
                      New Arrival
                    </label>
                    <br />

                    <div className="flex">
                      <div className="m-4">
                        <button
                          type="submit"
                          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500"
                        >
                          Update
                        </button>
                      </div>

                      <div className="m-4">
                        <button
                          type="submit"
                          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500"
                          onClick={(e) => {
                            closeUpdateModal(e)
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function Pagination({
  data,
  pageLimit,
  dataLimit,
  handleSearch,
  openModal,
  resetPicture,
  resetProduct,
  getProduct,
  openUpdateModal,
}) {
  const styles = {
    'rose-button':
      'inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500',
  }
  const [pages] = useState(Math.round(data.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)

  function goToNextPage() {
    setCurrentPage((page) => page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1)
  }
  function changePage(event) {
    const pageNumber = Number(event.target.textContent)
    setCurrentPage(pageNumber)
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return data.slice(startIndex, endIndex)
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  const getExcel = async () => {
    await DownloadExcelFile('products')
  }

  return (
    <div>
      <div className="p-4 mt-24">
      <div className="flex overflow-auto mb-6 justify-between">
              <h2 className="text-xl justify-center  font-semibold leading-tight uppercase tracking-wide">
                Products
              </h2>
              <button
              type="button"
              onClick={(e) => {
                openModal(e)
                resetProduct(e)
                resetPicture(e)
              }}
              className="px-8 py-2 text-lg font-medium bg-rose-500 text-white rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              ADD
            </button>
            </div>
        <div className="flex flex-wrap justify-between mb-5 md:mb-0">
          <div className="md:w-1/3 flex overflow-auto  justify-between">
            <input
              type="text"
              placeholder="Search"
              onChange={(event) => handleSearch(event)}
              className="shadow-lg border-none px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded-md text-sm  w-full  ease-linear transition-all duration-150"
            />
          </div>
          <div className="md:w-1/3 flex justify-end">
            <button
              type="button"
              className="bg-green-500 py-3 px-2 rounded-md"
              onClick={getExcel}
            >
              <div className="flex">
                <span className="font-bold text-sm text-white">
                  Export to Excel
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex scroll items-center justify-center p-4">
        <div className="md:w-full md:h-auto overflow-auto overflow-x-scroll">
          <div>
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-rose-600 to-rose-500">
                  <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                    Product Image
                  </th>
                  <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                    Product Name
                  </th>
                  <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                    Display
                  </th>
                  <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                    New Arraval
                  </th>
                  <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                    Update
                  </th>
                  <th className="px-2 text-center text-xs font-semibold text-white uppercase tracking-wider py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((e, index) => (
                  <tr className="bg-white">
                    <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-3">
                      <div className="flex justify-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src={`${API}${e.picture}`}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-600 whitespace-no-wrap"></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {e.product_name}
                      </p>
                    </td>

                    <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-3">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">
                          {e.display ? 'True' : 'False'}
                        </span>
                      </span>
                    </td>
                    <td className="px-2 text-center text-xs font-semibold text-black uppercase tracking-wider py-3">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">
                          {e.new_arrival ? 'True' : 'False'}
                        </span>
                      </span>
                    </td>

                    <td>
                      <button
                        className={styles['rose-button']}
                        onClick={(k) => {
                          openUpdateModal(k)
                          getProduct(k, e.product_id)
                        }}
                      >
                        Update
                      </button>
                    </td>

                    <td>
                      <button
                        class={styles['rose-button']}
                        onClick={() =>
                          axios
                            .delete(`${API}/api/product/${e.product_id}/`)
                            .then((res) => {
                              alert(res.data.message)
                              fetch()
                            })
                        }
                      >
                        {'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <PaginationBar
          goToPreviousPage={goToPreviousPage}
          currentPage={currentPage}
          getPaginationGroup={getPaginationGroup}
          changePage={changePage}
          goToNextPage={goToNextPage}
          pages={pages}
        />
      </div>
    </div>
  )
}