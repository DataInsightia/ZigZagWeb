import React from 'react'

export default function App() {
  return (
      <div>
          {/*Download app*/}
          <section className="bg-black text-white">
              <div className="flex justify-center py-2">
                  <span>ZigZag launches Android app.</span>
                  <span><button className="m-2 bg-yellow-600 border border-yellow-600 border-2 rounded">Download Now</button></span>
                  <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </span>
              </div>
          </section>
          {/*Navigation bar*/}
          <section>
              <div className="m-2">
                  <div className="flex">
                      ZigZag
                  </div>
              </div>
          </section>
      </div>
  )
}