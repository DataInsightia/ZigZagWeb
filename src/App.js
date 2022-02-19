import React from 'react'
import CustomerRegister from "./Pages/CustomerRegister";
import CustomerLogin from "./Pages/CustomerLogin";
import TakeOrder from "./Pages/TakeOrder";

export default function App() {
  return (
      <div>
          {/*Register*/}
          <CustomerRegister />

          {/*Take Order*/}
          <TakeOrder />
      </div>

  )
}