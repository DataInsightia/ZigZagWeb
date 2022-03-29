import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import API from '../../../api'
import React from 'react';

export default function Product() {

  let [isOpen, setIsOpen] = useState(false)
  let [isUpdateOpen, setUpdateIsOpen] = useState(false)
  const [product,setProduct] = useState({});
  const [picture,setPicture] = useState('');
  const [currentPicture,setCurrentPicture] = useState('');
  const [productList,setProductList] = useState([]);
  const [currentProduct,setCurrentProduct] = useState({});

  const closeUpdateModal = () => setUpdateIsOpen(false);
  const openUpdateModal = () => setUpdateIsOpen(true);
  const resetPicture = () => setPicture('');
  const resetProduct = () => setProduct({});
  const resetCurrentProduct = () => setCurrentProduct({});


  const styles = {
    'rose-button' : "inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500"
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    fetch();
  } ,[])

  const addButton = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data",JSON.stringify(product))
    formData.append("picture",picture)
    axios.post(API + "/api/product/",formData).then(res => {
        console.log(res.data);
        fetch();
        resetCurrentProduct();
        resetPicture();
    }).catch(err => {
      console.log(err);
      fetch();
    });

  }

  const getProduct = (e,pid) => {
    const api = `${API}/api/get_product/?pid=${pid}`
    axios.get(api).then(res =>{
      if (res.data.status) {setCurrentProduct(res.data.data)}
      console.log(res.data)
    }).catch(err => console.log(err));
  }

  const updateButton = (e,productid) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data",JSON.stringify(currentProduct))
    formData.append("picture",currentPicture)
    axios.put(`${API}/api/product/${productid}/`,formData).then(res => {
        console.log(res.data);
        fetch();
        resetCurrentProduct();
    }).catch(err => console.log(err))

  }

const handleEvent = (e) => setProduct({ ...product, [e.target.name] : e.target.value })

const handleUpdateEvent = (e) => setCurrentProduct({ ...currentProduct, [e.target.name] : e.target.value })

const handleFile = (e) => setPicture(e.target.files[0]);


const handleCurrentFile = (e) => setCurrentPicture(e.target.files[0]);


const handleToggler = (e,value) => setProduct({ ...product, [e.target.name] : !value });

const handleCurrentToggler = (e,value) => setCurrentProduct({ ...currentProduct, [e.target.name] : !value });


const fetch = () => {
    axios.get(API + '/api/product/').then(res => {
        setProductList(res.data.data)
    }).catch(err => console.log(err));
}

  return (
    <>
    <div className="flex scroll items-center md:mt-16 justify-center min-h-screen bg-gray-100">
        <div className="md:w-1/2 overflow-auto overflow-x-scroll bg-white shadow-lg p-4">
                <div className='mx-auto'>
                    <button
                        type="button"
                        onClick={(e) => {openModal(e);resetProduct(e);resetPicture(e);}}
                        className="px-8 py-2 text-lg font-medium bg-red-500 text-white rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                        ADD
                    </button>
                </div>
                <div>
                    {/* <p>List</p>
                    {
                        productList.map(e => <li>{e.product_name} <button className={styles['rose-button']} onClick={(k) => {openUpdateModal(k);getProduct(k,e.product_id);}}>Update</button> <button class={styles['rose-button']}  onClick={() => axios.delete(`${API}/api/product/${e.product_id}/`).then(res => {alert(res.data.message);fetch();})}>{"Delete"}</button></li>)
                    } */}

<br/>
                     <table className="min-w-full leading-normal">
                         <thead>
                         <tr>
                             <th
                                 className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                             >
                                 Product Image
                             </th>
                             <th
                                 className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                             >
                                 Product Name
                             </th>
                             <th
                                 className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                             >
                                 Display
                             </th>
                             <th
                                 className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                             >
                                 New Arraval
                             </th>
                             <th
                                 className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                             >
                                 Update
                             </th>
                             <th
                                 className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                             >
                                 Delete
                             </th>
                             <th
                                 className=" py-3 border-b-2 border-gray-200 bg-gray-100"
                             ></th>
                         </tr>
                         </thead>
                         <tbody>
                         {
                             productList.map(e =><>
                         <tr>

                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                 <div className="flex">
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
                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                 <p className="text-gray-900 whitespace-no-wrap">{e.product_name}</p>
                             </td>
                             
                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <span
                     className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                 >
                   <span
                       aria-hidden
                       className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                   ></span>
                   <span className="relative">{e.display ? "True" : "False"}</span>
                 </span>
                             </td>
                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                 <span
                     className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                 >
                   <span
                       aria-hidden
                       className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                   ></span>
                   <span className="relative">{e.new_arrival ? "True" : "False"}</span>
                 </span>
                             </td>


                          <td>
                            <button className={styles['rose-button']} onClick={(k) => {openUpdateModal(k);getProduct(k,e.product_id);}}>Update</button>
                          </td>

                          <td>
                            
                          <button class={styles['rose-button']}  onClick={() => axios.delete(`${API}/api/product/${e.product_id}/`).then(res => {alert(res.data.message);fetch();})}>{"Delete"}</button>
                          </td>

                         </tr>
                             </> )}
                         </tbody>
                     </table>

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
                  Add Product
                </Dialog.Title>
                <div className="mt-2">
                <form encType='multipart/formdata' onSubmit={(e) => {addButton(e);closeModal(e);}}>
                    <div class="mb-6">
                        <label for="product_name" class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Product Name</label>
                        <input onChange={handleEvent} defaultValue={product.product_name} type="product_name" id="product_name" name="product_name" class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" placeholder="Designer Sari" required />
                    </div>
                    
                    <img src={picture !== "" ? URL.createObjectURL(picture) : 'https://via.placeholder.com/150'} alt={"#"} height={150} width={150}/>
                    <label class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Your Product Image</label>
                    <input required onChange={handleFile} name="product_image" class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                    <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A product picture is useful to confirm your product.</div>

                    <label className={ product.display ? 'button border-none rounded-2xl bg-green-500 text-white font-bold' : 'button border-none rounded-2xl bg-red-500 text-white font-bold'}><input type="button" onClick={(e) => handleToggler(e,product.display)} defaultValue={product.display ? "Click to Hide " : "Click to Show "} name="display" /> Product</label><br />
                    <label className={ product.new_arrival ? 'button border-none rounded-2xl bg-green-500 text-white font-bold' : 'button border-none rounded-2xl bg-red-500 text-white font-bold'}><input type="button" onClick={(e) => handleToggler(e,product.new_arrival)} defaultValue={product.new_arrival ? "Click to Hide " : "Click to Show "} name="new_arrival" /> New Arrival</label><br />

                    <div className='mt-4'>
                    <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500" >Submit</button>    
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
                  Update Product
                </Dialog.Title>
                <div className="mt-2">
                <form encType='multipart/formdata' onSubmit={(e) => {updateButton(e,currentProduct.product_id);closeUpdateModal(e);}}>
                    <div class="mb-6">
                        <label for="product_name" class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Product Name </label>
                        <input onChange={handleUpdateEvent} type="product_name" id="product_name" defaultValue={currentProduct.product_name} name="product_name" class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" placeholder="Designer Sari" required />
                    </div>
                    
                    <img src={currentPicture !== "" ? URL.createObjectURL(currentPicture) : API + currentProduct.picture} alt="#" />
                    <label class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Your Product Image</label>
                    <input onChange={handleCurrentFile} name="product_image" accept='image/jpeg' class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                    <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A product picture is useful to confirm your product.</div>

                    <label><input type="button" onClick={(e) => handleCurrentToggler(e,currentProduct.display)} value={currentProduct.display ? "show" : "hide"} name="display" /> Display</label><br />
                    <label><input type="button" onClick={(e) => handleCurrentToggler(e,currentProduct.new_arrival)} value={currentProduct.new_arrival ? "show" : "hide"} name="new_arrival" /> New Arrival</label><br />

                    <div className='flex'>
                      <div className='m-4'>
                      <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500" >Update</button>    
                      </div> 

                      <div className='m-4'>
                      <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500" onClick={(e) => {closeUpdateModal(e);}}>Close</button>    
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
