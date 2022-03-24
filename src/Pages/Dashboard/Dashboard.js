import React from 'react'
import Navbar from './Navbar'
import './Dashboard.css'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <Navbar />
    
      <div className="flex-1 body_content p-0 text-2xl font-bold bg-gray-50 h-[820px] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  )
}
