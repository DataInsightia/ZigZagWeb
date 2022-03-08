import React from 'react'
import Router from './Router/Router'
import CustomerRouter from './Router/CustomerRouter'
import StaffRouter from './Router/StaffRouter'
import AdminRouter from './Router/AdminRouter'
import CommonRouter from './Router/CommonRouter'

export default function App() {
  const auth = localStorage.getItem('role')

  

  return <Router/>

  // (() => {
  //   if (auth === 'admin') {
  //     return (
  //       <>
  //         <AdminRouter />
  //       </>
  //     )
  //   } else if (auth === 'staff') {
  //     return (
  //       <>
  //         <StaffRouter />
  //       </>
  //     )
  //   } else if (auth === 'customer') {
  //     return (
  //       <>
  //         <CustomerRouter />
  //       </>
  //     )
  //   } else {
  //     return (
  //       <>
  //         <CommonRouter />
  //       </>
  //     )
  //   }
  // })() 
}
