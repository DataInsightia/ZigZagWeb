import React, { useEffect, useState } from 'react'
import StatusCard from './StatusCard'
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import {
  OngoingOrdersServices,
  CompletedOrdersServices,
  TotalOrderServices,
  DeliveryReadyOrdersServices,
  TotalWorksServices,
  StaffTakenWorksServices,
  StaffNotTakenWorksServices,
  TodayDueWorksServices,
  WeekDueWorksServices,
  UnAssignedWorksServices,
  AssignedNotTakenWorksServices,
  TodayDeliveryOrdersServices,
  WeekDeliveryOrdersServices,
  getUser
} from '../../../src/services/DashboardCountServices'

export default function DashboardHome() {
  // CUSTOMER
  const [ongoing_orders, setOngoingOrders] = useState(0)
  const [completed_orders, setCompletedOrders] = useState(0)
  const [total_orders, setTotalOrder] = useState(0)
  const [delivery_ready_order, setDeliveryReadyOrder] = useState(0)

  // STAFF
  const [total_works, setTotalWorks] = useState(0)
  const [taken_works, setTakenWorks] = useState(0)
  const [not_taken_works, setNotTakenWorks] = useState(0)
  const [todaydue_works, setTodayDueWorks] = useState(0)
  const [weekdue_works, setWeekDueWorks] = useState(0)

  // SUPERVISOR
  const [unassigned_works, setUnAssignedWorks] = useState(0)
  const [assigned_nottaken_works, setAssignedNotTakenWorks] = useState(0)
  const [todaydelivery_orders, setTodayDeliveryOrders] = useState(0)
  const [weekdelivery_orders, setWeekDeliveryOrders] = useState(0)

  // FETCH INITIAL DATA

  const login_id = localStorage.getItem('login_id')
  const auth = localStorage.getItem('role')

  // const [auth,setAuth] =  useState('')

 
  // useEffect( async () => {
    // getUser().then((res)=>{
    // const auth = res.data.user.role
    // setAuth(auth)
      
    if (auth === 'customer') {
      // CUSTOMER ON GOING WORKS
      OngoingOrdersServices().then((res)=>{
        setOngoingOrders(res.data)
      })
      

      // CUSTOMER COMPLETED ORDERS

      CompletedOrdersServices().then((res)=>{
        setCompletedOrders(res.data)
      })
      
      // CUSTOMER TOTAL ORDERS
      TotalOrderServices().then((res)=>{
        setTotalOrder(res.data)
      })
      
    
      // CUSTOMER DELIVERY READY ORDERS
      DeliveryReadyOrdersServices().then((res)=>{
        setDeliveryReadyOrder(res.data)
      })
      
      
    } else if (auth === 'staff') {
      // STAFF TOTAL WORKS
      TotalWorksServices().then((res)=>{
        setTotalWorks(res.data)
      })
      
   
      // STAFF TAKEN WORKS
      StaffTakenWorksServices().then((res)=>{
        setTakenWorks(res.data)
      })
      
   
      // STAFF NOT TAKEN WORKS
      StaffNotTakenWorksServices().then((res)=>{
        setNotTakenWorks(res.data)
      })
   
      // STAFF TODAY DUE WORKS
      TodayDueWorksServices().then((res)=>{
        setTodayDueWorks(res.data)
      })
      
     
      //STAFF WEEK DUE WORKS
      WeekDueWorksServices().then((res)=>{
        setWeekDueWorks(res.data)
      })
   
    } else if (auth === "admin"){
      // SUPERVISOR NOT ASSIGNED WORKS
      UnAssignedWorksServices().then((res)=>{
        setUnAssignedWorks(res.data)
      })
  
      // SUPERVISOR ASSIGN BUT NOT TAKEN WORK
      AssignedNotTakenWorksServices().then((res)=>{
        setAssignedNotTakenWorks(res.data)
      })
      
     
      // SUPERVISOR TODAY DELIVERY
      TodayDeliveryOrdersServices().then((res)=>{
        setTodayDeliveryOrders(res.data)
      })
      
      // SUPERVISOR WEEK DELIVERY

      WeekDeliveryOrdersServices().then((res)=>{
        setWeekDeliveryOrders(res.data)
      })
       
    }
  // }
  // ).catch(
  //   err=>console.log(err)
  // );
  
  // }, [])

  return (
    <div className="px-3 md:px-8">
      <div className="container mx-auto max-w-full ">
        {(() => {
          if (auth === 'admin') {
            return (
              <div className="grid md:mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:h-full mb-4">
                <Link
                  to={'/dashboard/work_assign/'}
                  
                >
                  <StatusCard
                    color="pink"
                    icon="UAW"
                    title="Un Assigned Work"
                    amount={unassigned_works}
                    percentage="7"
                    date="Since last month"
                  />
                </Link>
                <Link
                  to={`/dashboard/lists/not_taken_works`}
                  state={'not_taken_works'}
                >
                  <StatusCard
                    color="red"
                    icon="NTW"
                    title="Not Taken Work"
                    amount={assigned_nottaken_works}
                    percentage="9"
                    date="Since last week"
                  />
                </Link>
                <Link
                  to={`/dashboard/lists/today_due_delivery`}
                  state={'today_due_delivery'}
                >
                <StatusCard
                  color="purple"
                  icon="TWD"
                  title="Today Work Due"
                  amount={todaydelivery_orders}
                  percentage="1.10"
                  date="Since yesterday"
                />
                </Link>
                 <Link
                  to={`/dashboard/lists/week_due_delivery`}
                  state={'week_due_delivery'}
                >
                <StatusCard
                  color="blue"
                  icon="WD"
                  title="This week Due"
                  amount={weekdelivery_orders}
                  percentage="12"
                  date="Since last month"
                />
                </Link>
              </div>
            )
          }
          else if (auth === 'supervisor') {
            return (
              <div className="grid md:mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:h-full mb-4">
                <Link
                  to={'/dashboard/work_assign/'}

                >
                  <StatusCard
                    color="pink"
                    icon="UAW"
                    title="Un Assigned Work"
                    amount={unassigned_works}
                    percentage="7"
                    date="Since last month"
                  />
                </Link>
                <Link
                  to={`/dashboard/lists/not_taken_works`}
                  state={'not_taken_works'}
                >
                  <StatusCard
                    color="red"
                    icon="NTW"
                    title="Not Taken Work"
                    amount={assigned_nottaken_works}
                    percentage="9"
                    date="Since last week"
                  />
                </Link>
                <Link
                  to={`/dashboard/lists/today_due_delivery`}
                  state={'today_due_delivery'}
                >
                <StatusCard
                  color="purple"
                  icon="TWD"
                  title="Today Work Due"
                  amount={todaydelivery_orders}
                  percentage="1.10"
                  date="Since yesterday"
                />
                </Link>
                 <Link
                  to={`/dashboard/lists/week_due_delivery`}
                  state={'week_due_delivery'}
                >
                <StatusCard
                  color="blue"
                  icon="WD"
                  title="This week Due"
                  amount={weekdelivery_orders}
                  percentage="12"
                  date="Since last month"
                />
                </Link>
              </div>
            )
          }
          else if (auth === 'staff') {
            return (
              <div className="grid md:mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                <Link
                  to={`/dashboard/lists/total_works`}
                  state={'total_works'}
                >
                <StatusCard
                  color="pink"
                  icon="TW"
                  title="Total Works"
                  amount={total_works}
                  percentage="3.48"
                  date="Since last month"
                />
                </Link>
                <Link
                  to={`/dashboard/lists/taken_works`}
                  state={'taken_works'}
                >
                <StatusCard
                  color="red"
                  icon="STW"
                  title="Taken Works"
                  amount={taken_works}
                  percentage="3.48"
                  date="Since last week"
                />
                </Link>
                <Link
                  to={`/dashboard/orders/`}
                >
                <StatusCard
                  color="purple"
                  icon="NT"
                  title="Not Taken Work"
                  amount={not_taken_works}
                  percentage="1.10"
                  date="Since yesterday"
                />
                </Link>
                <Link
                  to={`/dashboard/lists/today_due_works`}
                  state={'today_due_works'}
                >
                <StatusCard
                  color="green"
                  icon="OW"
                  title="Today Work Due"
                  amount={todaydue_works}
                  percentage="1.10"
                  date="Since yesterday"
                />
                </Link>
                <Link
                  to={`/dashboard/lists/week_due_works`}
                  state={'week_due_works'}
                >
                <StatusCard
                  color="yellow"
                  icon="WWD"
                  title="This Week Work Due"
                  amount={weekdue_works}
                  percentage="1.10"
                  date="Since yesterday"
                />
                </Link>
              </div>
            )
          } else if (auth === 'customer') {
            return (
              <div className="grid md:mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                 <Link
                  to={`/dashboard/lists/pending_orders`}
                  state={'pending_orders'}
                >
                <StatusCard
                  color="pink"
                  icon="OGO"
                  title="On Going Orders"
                  amount={ongoing_orders}
                  percentage="3.48"
                  date="Since last month"
                />
                </Link>
                <Link
                  to={`/dashboard/lists/completed_orders`}
                  state={'completed_orders'}
                >
                <StatusCard
                  color="red"
                  icon="CO"
                  title="Completed Orders"
                  amount={completed_orders}
                  percentage="3.48"
                  date="Since last week"
                />
                </Link>
                <Link
                  to={`/dashboard/lists/customer_orders`}
                  state={'customer_orders'}
                >
                <StatusCard
                  color="purple"
                  icon="TO"
                  title="Total Orders"
                  amount={total_orders}
                  percentage="1.10"
                  date="Since yesterday"
                />
                </Link>
                <Link
                  to={`/dashboard/lists/delivery_ready_orders`}
                  state={'delivery_ready_orders'}
                >
                <StatusCard
                  color="green"
                  icon="DRO"
                  title="Delivery Ready Orders"
                  amount={delivery_ready_order}
                  percentage="1.10"
                  date="Since yesterday"
                />
                </Link>
              </div>
            )
          }
        })()}
      </div>
    </div>
  )
}
