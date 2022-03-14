import React from 'react'
import hero from '../../assets/img/zig.png'
import hero2 from '../../assets/img/mod.png'
import './home.css'

import Contact from './Contact'
import { Link } from 'react-router-dom'
import Stretch from '../../assets/svg/stitching.svg'
import Logo from '../../assets/img/logo.png'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Scroll from "./Scroll";
import Scroll_Car from "./Scroll_Car";
import Galary from "./Galary";

//nav menu js function

// const button = document.querySelector('#menu-button');
// const menu = document.querySelector('#menu');
//
//
// button.addEventListener('click', () => {
//     menu.classList.toggle('hidden');
// });

const navMenuDiv = document.getElementById('nav-content')
const navMenu = document.getElementById('nav-toggle')

// var sectionStyle = {
//     width: "100%",
//     height: "400px",
//     backgroundImage: "url("")"
// };

document.onclick = check
function check(e) {
  // eslint-disable-next-line no-restricted-globals
  const target = (e && e.target) || (event && event.srcElement)
}
function checkParent(t, elm) {
  while (t.parentNode) {
    if (t == elm) {
      return true
    }
    t = t.parentNode
  }
  return false
}

export default function Home() {

  return (
    //navbar
    <div className="leading-normal  tracking-normal text-black gradient">
     <Navbar/>
      <div className="pt-28">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">
              What business are you?
            </p>
            <h1 className="font-bold text-3xl">
              Main Hero Message to sell yourself!
              <br/>
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Sub-hero message, not too long and not too short. Make it just
              right!
            </p>
            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Subscribe
            </button>
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
        <div className="container max-w-5xl mx-auto m-8">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            New Arrivals
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <Scroll/>
        </div>
      </section>


      <section className="bg-white border-b py-8 pb-0">
        <div className="container max-w-5xl mx-auto m-8">
          <div className="w-full mb-4">

          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 lg:w-1/3 p-0">
              <h1 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
                About US
              </h1>
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
              <img src={Stretch} alt="React Logo" />
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Lorem ipsum dolor sit amet
              </h3>
              <p className="text-gray-600 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                at ipsum eu nunc commodo posuere et sit amet ligula.
                <br />
                <br />
                <center><button className="bg-rose-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Show more
                </button></center>
              </p>
            </div>

            <div className="lg:w-1/3">
              <div className="border-l-4 border-l-black h-full"></div>
            </div>

            <div className="lg:w-1/3">
              <h1 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
               Products
              </h1>
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
              <div className="mt-64">
                  <div className="flex flex-wrap md:-m-60">
                    <div className="flex flex-wrap w-1/3">
                      <div className="w-full p-1 md:p-2 transform transition duration-500 hover:scale-125">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src="https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                      <div className="w-full p-1 md:p-2 transform transition duration-500 hover:scale-125">
                        <img alt="gallery" className=" block object-cover object-center w-full h-full rounded-lg"
                             src="https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                      <div className="w-full p-1 md:p-2 transform transition duration-500 hover:scale-125">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src="https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                      <div className="w-full p-1 md:p-2 transform transition duration-500 hover:scale-125">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src="https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                      <div className="w-full p-1 md:p-2 transform transition duration-500 hover:scale-125">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src="https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                      <div className="w-full p-1 md:p-2 transform transition duration-500 hover:scale-125">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                             src="https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg"/>
                      </div>
                    </div>
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
