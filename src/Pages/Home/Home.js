import React, {useEffect, useState} from 'react'
import hero from '../../assets/img/zig.png'
import hero2 from '../../assets/img/mod.png'
import './home.css'
import API from "../../api"
import axios from 'axios'
import Contact from './Contact'
import Stretch from '../../assets/svg/stitching.svg'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Scroll from "./Scroll";
import "../../pre.css";
import {Link} from 'react-router-dom'



//nav menu js function

// const button = document.querySelector('#menu-button');
// const menu = document.querySelector('#menu');
//
//
// button.addEventListener('click', () => {
//     menu.classList.toggle('hidden');
// });


// var sectionStyle = {
//     width: "100%",
//     height: "400px",
//     backgroundImage: "url("")"
// };

document.onclick = check
function check(e) {
  // eslint-disable-next-line no-restricted-globals
  const target = (e && e.target) || (event && event.srcElement)
  fetch(API).then(response => response.json())
}
function checkParent(t, elm) {
  while (t.parentNode) {
    if (t === elm) {
      return true
    }
    t = t.parentNode
  }
  return false
}



export default function Home() {
  const [new_arrivals,setNewArrivals] = useState([{}]);
  const [product,setProduct] = useState([{}]);
  useEffect(() => {
    axios.get(`${API}/api/new_arrivals/`).then(res => {setNewArrivals(res.data)}).catch(err=>console.log(err))
    axios.get(`${API}/api/product_display/`).then(res => {setProduct(res.data)}).catch(err=>console.log(err))
  },[]);
  return (
    //navbar

    <div className="leading-normal  tracking-normal text-black gradient">
     <Navbar/>
      <div className="pt-28">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">

            <h1 className="font-bold text-white lg:text-5xl">
              Wear our products to feel every occasion as special!
              <br/>
            </h1>
            <p className="uppercase text-white text-2xl flex justify-center tracking-loose w-full">
              Hand-crafted style to suit your frame!
            </p>

            <Link to="#" className="cursor-pointer border-0 w-full flex justify-center tracking-loose uppercase hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-9 shadow-lg focus:outline-none justify-items-center focus:shadow-outline transform transition hover:scale-105 duration-300">
             Get In Touch
            </Link>

              {/*<a className=" uppercase hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-9 shadow-lg focus:outline-none justify-items-center focus:shadow-outline transform transition hover:scale-105 duration-300">*/}
              {/*  Subscribe*/}
              {/*</a>*/}


          </div>
          <div className="w-full flex md:w-3/5 py-6 text-center">
            <div className="container">
              <img className="w-full flex-1 md:w-4/5 z-50" src={hero} />
            </div>
            <div className="container">
              <img className="w-full flex-2 md:w-5/5 z-50" src={hero2} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <svg
            viewBox="0 0 1428 174"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
                transform="translate(-2.000000, 44.000000)"
                fill="#FFFFFF"
                fill-rule="nonzero"
            >
              <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
              ></path>
              <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
              ></path>
              <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  id="Path-4"
                  opacity="0.200000003"
              ></path>
            </g>
            <g
                transform="translate(-4.000000, 76.000000)"
                fill="#FFFFFF"
                fill-rule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>

      {/*New Arrivals*/}

      <section className="bg-white border-b py-8 pb-0">
        <div className="container max-w-5xl md:-space-x-16 mx-auto m-8">
          <h1 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
            New Arrivals
            <div className="w-full mb-4 flex justify-center">
              <div className=" h-1 mx-auto gradient w-64 opacity-25 my-0  py-0 rounded-t"></div>
            </div>
          </h1>

          <Scroll/>
        </div>
      </section>


      <section className="bg-white border-b py-8 pb-0">
        <div className="container max-w-5xl mx-auto m-8">
          <div className="w-full mb-4">
          </div>
          <div className="justify-items-center  flex flex-wrap">
            <div className="w-full lg:w-1/3 p-0">
              <h1 className="w-full  my-2 text-3xl font-bold leading-tight text-center text-gray-800 sm:text-center">
                About US
              </h1>
              <div className="h-1 mx-auto gradient  w-64 opacity-25 my-0 py-0 rounded-t"></div>
              <img src={Stretch} alt="React Logo" />
              <h3 className="text-center text-3xl text-gray-800 inline-block justify-center font-bold md:leading-none mb-3">
                Chettinad Orginal ZigZag Boutique & Tailoring Shop
              </h3>
              <p className="text-gray-600 mb-8 text-center p-2 sm:text-center">
                50 Years Excellence in Delivering Fasion Wears
                <br />
                <br />
                <center><button className="bg-rose-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Show more
                </button></center>
              </p>
            </div>

            <div className="lg:w-1/3">
              <div className="hidden sm:block border-l-4 border-l-black h-full"></div>
            </div>

            <div className="lg:w-1/3">
              <h1 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
               Products
              </h1>
              <div className="h-1 mx-auto gradient  w-64 opacity-25 my-0 py-0 rounded-t"></div>
              <div className=" md:mt-40  inline-block mt-16">
                        <div className="flex flex-wrap md:-m-40">
                          {
                            product.map(e => <>
                          <div className="flex flex-wrap  lg:w-1/3">
                            <div className="w-full p-1 md:p-3 transform transition duration-500 hover:scale-125">
                              <img alt="gallery" className=" block object-cover object-center w-full h-full rounded-lg"
                                   src={`${API}${e.picture}`}/>
                            </div>
                          </div>
                                </>
                            )}
                        </div>



              </div>
            </div>
          </div>
        </div>

        <Contact />
       <Footer/>
      </section>
    </div>
  )
}
