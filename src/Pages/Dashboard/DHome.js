import React, { useEffect, useState } from 'react'
import StatusCard from './StatusCard'
import 'font-awesome/css/font-awesome.min.css'
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

  useEffect(async () => {
    if (auth === 'customer') {
      // CUSTOMER ON GOING WORKS
      const ongoingorders_res = await OngoingOrdersServices(login_id)
      setOngoingOrders(ongoingorders_res.data)

      // CUSTOMER COMPLETED ORDERS
      const completedorders_res = await CompletedOrdersServices(login_id)
      setCompletedOrders(completedorders_res.data)

      // CUSTOMER TOTAL ORDERS
      const totalorders_res = await TotalOrderServices(login_id)
      setTotalOrder(totalorders_res.data)

      // CUSTOMER DELIVERY READY ORDERS
      const deliveryreadyorders_res = await DeliveryReadyOrdersServices(
        login_id,
      )
      setDeliveryReadyOrder(deliveryreadyorders_res.data)
    } else if (auth === 'staff') {
      // STAFF TOTAL WORKS
      const stafftotalworks_res = await TotalWorksServices(login_id)
      setTotalWorks(stafftotalworks_res.data)

      // STAFF TAKEN WORKS
      const stafftokenworks_res = await StaffTakenWorksServices(login_id)
      setTakenWorks(stafftokenworks_res.data)

      // STAFF NOT TAKEN WORKS
      const staffnottakenworks_res = await StaffNotTakenWorksServices(login_id)
      setNotTakenWorks(staffnottakenworks_res.data)

      // STAFF TODAY DUE WORKS
      const todaydueworks_res = await TodayDueWorksServices(login_id)
      setTodayDueWorks(todaydueworks_res.data)

      //STAFF WEEK DUE WORKS
      const weekdueworks_res = await WeekDueWorksServices(login_id)
      setWeekDueWorks(weekdueworks_res.data)
    } else {
      // SUPERVISOR NOT ASSIGNED WORKS
      const unassignedworks_res = await UnAssignedWorksServices()
      setUnAssignedWorks(unassignedworks_res.data)

      // SUPERVISOR ASSIGN BUT NOT TAKEN WORK
      const assignnottakenworks_res = await AssignedNotTakenWorksServices()
      setAssignedNotTakenWorks(assignnottakenworks_res.data)

      // SUPERVISOR TODAY DELIVERY
      const todaydeliveryorders = await TodayDeliveryOrdersServices()
      setTodayDeliveryOrders(todaydeliveryorders.data)

      // SUPERVISOR WEEK DELIVERY
      const weekdeliveryorders = await WeekDeliveryOrdersServices()
      setWeekDeliveryOrders(weekdeliveryorders.data)
    }
  }, [])

  return (
    <div className="px-3 md:px-8">
      <div className="container mx-auto max-w-full">
        {(() => {
          if (auth === 'admin') {
            return (
              <div className="grid mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                <StatusCard
                  color="pink"
                  icon="UAW"
                  title="Un Assigned Work"
                  amount={unassigned_works}
                  percentage="7"
                  date="Since last month"
                />
                <StatusCard
                  color="red"
                  icon="NTW"
                  title="Not Taken Work"
                  amount={assigned_nottaken_works}
                  percentage="9"
                  date="Since last week"
                />
                <StatusCard
                  color="purple"
                  icon="TWD"
                  title="Today Work Due"
                  amount={todaydelivery_orders}
                  percentage="1.10"
                  date="Since yesterday"
                />
                <StatusCard
                  color="blue"
                  icon="WD"
                  title="This week Due"
                  amount={weekdelivery_orders}
                  percentage="12"
                  date="Since last month"
                />
              </div>
            )
          } else if (auth === 'staff') {
            return (
              <div className="grid mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                <StatusCard
                  color="pink"
                  icon="TW"
                  title="Total Works"
                  amount={total_works}
                  percentage="3.48"
                  date="Since last month"
                />
                <StatusCard
                  color="red"
                  icon="STW"
                  title="Taken Works"
                  amount={taken_works}
                  percentage="3.48"
                  date="Since last week"
                />
                <StatusCard
                  color="purple"
                  icon="NT"
                  title="Not Taken Work"
                  amount={not_taken_works}
                  percentage="1.10"
                  date="Since yesterday"
                />
                <StatusCard
                  color="green"
                  icon="OW"
                  title="Today Work Due"
                  amount={todaydue_works}
                  percentage="1.10"
                  date="Since yesterday"
                />
                <StatusCard
                  color="yellow"
                  icon="WWD"
                  title="This Week Work Due"
                  amount={weekdue_works}
                  percentage="1.10"
                  date="Since yesterday"
                />
              </div>
            )
          } else if (auth === 'customer') {
            return (
              <div className="grid mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                <StatusCard
                  color="pink"
                  icon="OGO"
                  title="On Going Orders"
                  amount={ongoing_orders}
                  percentage="3.48"
                  date="Since last month"
                />
                <StatusCard
                  color="red"
                  icon="CO"
                  title="Completed Orders"
                  amount={completed_orders}
                  percentage="3.48"
                  date="Since last week"
                />
                <StatusCard
                  color="purple"
                  icon="TO"
                  title="Total Orders"
                  amount={total_orders}
                  percentage="1.10"
                  date="Since yesterday"
                />
                <StatusCard
                  color="green"
                  icon="DRO"
                  title="Delivery Ready Orders"
                  amount={delivery_ready_order}
                  percentage="1.10"
                  date="Since yesterday"
                />
              </div>
            )
          }
        })()}
      </div>
    </div>
  )
}
