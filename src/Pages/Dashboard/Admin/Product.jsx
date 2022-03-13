import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import API from '../../../api'

export default function Product() {

  let [isOpen, setIsOpen] = useState(false)
  let [isUpdateOpen, setUpdateIsOpen] = useState(false)
  const [product,setProduct] = useState({});
  const [picture,setPicture] = useState('');
  const [productList,setProductList] = useState([]);
  const [currentProduct,setCurrentProduct] = useState({});

  const closeUpdateModal = () => setUpdateIsOpen(false);
  const openUpdateModal = () => setUpdateIsOpen(true);

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
    }).catch(err => console.log(err))
  }

  const updateProduct = async (e,product_id) => {
    const formData = new FormData();
    formData.append("data",JSON.stringify(product))
    formData.append("picture",picture)
    const res = await axios.put(`${API}/api/product/${product_id}/`,formData)
    // if (res.data.status) {setTargetProduct(res.data)}else{console.log(res.data)}
  }

  const getProduct = async (e,pid) => {
    const api = `${API}/api/get_product/?pid=${pid}`
    const res = await axios.get(api)
    if (res.data.status) {setCurrentProduct(res.data.data)}
    console.log(api)
  }

  const updateButton = (e,productid) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data",JSON.stringify(currentProduct))
    formData.append("picture",picture)
    axios.put(`${API}/api/product/${productid}/`,formData).then(res => {
        console.log(res.data);
    }).catch(err => console.log(err))
  }

  const handleEvent = (e) => {setProduct({ ...product, [e.target.name] : e.target.value });
    console.log(product)}

    const handleUpdateEvent = (e) => {setProduct({ ...currentProduct, [e.target.name] : e.target.value });
    console.log(product)}

const handleFile = (e) => {
    setPicture(e.target.files[0]);
    console.log(picture)
}

const fetch = () => {
    axios.get(API + '/api/product/').then(res => {
        setProductList(res.data.data)
    }).catch(err => console.log(err));
}

  return (
    <>
    <div className="flex scroll items-center mt-16 justify-center min-h-screen bg-gray-100">
        <div className="w-1/2 bg-white shadow-lg p-4">
                <div className='mx-auto'>
                    <button
                        type="button"
                        onClick={openModal}
                        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                        ADD
                    </button>
                </div>
                <div>
                    <p>List</p>
                    {
                        productList.map(e => <li>{e.product_name} <button onClick={(k) => {openUpdateModal(k);getProduct(k,e.product_id);}}>Update</button> <DeleteButton product_id={e.product_id}/></li>)
                    }
                </div>
        </div>
    </div>
      

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
                <form encType='multipart/formdata'>
                    <div class="mb-6">
                        <label for="product_name" class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Product Name</label>
                        <input onChange={handleEvent} type="product_name" id="product_name" name="product_name" class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" placeholder="Designer Sari" required />
                    </div>
                    
                    <label class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Your Product Image</label>
                    <input onChange={handleFile} name="product_image" class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                    <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A product picture is useful to confirm your product.</div>

                    <label><input type="checkbox" onChange={handleEvent} name="display" /> Display</label><br />
                    <label><input type="checkbox" onChange={handleEvent} name="new_arrival" /> New Arrival</label><br />

                    <div className='mt-4'>
                    <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500" onClick={(e) => {addButton(e);closeModal(e);}}>Submit</button>    
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
          className="fixed inset-0 z-10 overflow-y-auto"
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
                <form encType='multipart/formdata'>
                    <div class="mb-6">
                        <label for="product_name" class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Product Name </label>
                        <input onChange={handleUpdateEvent} type="product_name" id="product_name" value={currentProduct.product_name} name="product_name" class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" placeholder="Designer Sari" required />
                    </div>
                    
                    <label class="border-0 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Your Product Image</label>
                    <input onChange={handleFile} name="product_image" class="bg-gray-50 border border-gray-300 text-rose-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                    <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A product picture is useful to confirm your product.</div>

                    <label><input type="checkbox" onChange={handleUpdateEvent} checked={currentProduct.display} name="display" /> Display</label><br />
                    <label><input type="checkbox" onChange={handleUpdateEvent} checked={currentProduct.new_arrival} name="new_arrival" /> New Arrival</label><br />

                    <div className='flex'>
                      <div className='m-4'>
                      <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500" onClick={(e) => {updateButton(e,currentProduct.product_id);closeUpdateModal(e);}}>Update</button>    
                      </div> 

                      <div className='m-4'>
                      <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500" onClick={(e) => {closeUpdateModal(e);}}>Close</button>    
                      </div> 
                    </div>
                    {JSON.stringify(currentProduct)}
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

const DeleteButton = (props) => {
  return (
    <button class="inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500"  onClick={() => axios.delete(`${API}/api/product/${props.product_id}/`).then(res => alert(res.data.message))}>{"Delete"}</button>
  )
}
