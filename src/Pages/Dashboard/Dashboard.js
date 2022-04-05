import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './Dashboard.css'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { getUser } from '../../../src/services/DashboardCountServices'

export default function Dashboard() {
  const [auth, setAuth] = useState('')

  
   useEffect(() => {
    getUser()
      .then((res) => {
        const auth = res.data.user.role
        setAuth(auth)
      })
  }, [])
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar auth={auth} />
      <Navbar />

      <div className="flex-1 body_content p-0 text-2xl font-bold bg-gray-50 h-[1000px] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  )
}
