import React from 'react'
import Navbar from "./navbar/Navbar";
import Carousel from "./slider/Slider";
import Footer from "./footer/Footer"

export default function App() {
  return (
      <div>
          {/*Download app*/}
          <section className="bg-black text-white">
              <div className="flex justify-center py-2">
                  <span>ZigZag launches Android app.</span>
                  <span><a className="m-2 bg-yellow-600 border border-yellow-600 border-2 rounded">Download Now</a></span>
                  <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </span>
              </div>
          </section>
         <Navbar/>

              <div className="w-screen flex justify-center">
                  <Carousel />
              </div>

          <div className="m-2">
              <Footer/>
          </div>


      </div>
  )
}