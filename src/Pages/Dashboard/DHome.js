import React from 'react'
import StatusCard from './StatusCard'
import 'font-awesome/css/font-awesome.min.css';

export default function DashboardHome() {
  const auth = localStorage.getItem('role')
  return (

    <div className="px-3 md:px-8">
      <div className="container mx-auto max-w-full">

          {(() => {
            if (auth === 'admin') {
              return (
                  <div className="grid mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                  <StatusCard
                      color="pink"
                      icon="home"
                      title="Assign Work"
                      amount="350,897"
                      percentage="3.48"
                      date="Since last month"
                  />
              <StatusCard
                  color="red"
                  icon="OS"
                  title="Order Status"
                  amount="2,356"
                  percentage="3.48"
                  date="Since last week"
              />
              <StatusCard
                  color="purple"
                  icon="TD"
                  title="Today Due"
                  amount="924"
                  percentage="1.10"
                  date="Since yesterday"
              />
              <StatusCard
                  color="blue"
                  icon="WD"
                  title="This weak Due"
                  amount="4956"
                  percentage="12"
                  date="Since last month"
              />
                      <StatusCard
                          color="blue"
                          icon="TC"
                          title="Today Courrier"
                          amount="493"
                          percentage="12"
                          date="Since last month"
                      />

                  </div>
              )
            } else if (auth === 'staff') {
              return (
                  <div className="grid mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                      <StatusCard
                          color="pink"
                          icon="AW"
                          title="Assigned Work"
                          amount="56"
                          percentage="3.48"
                          date="Since last month"
                      />
                      <StatusCard
                          color="red"
                          icon="OGW"
                          title="On Going Work"
                          amount="2"
                          percentage="3.48"
                          date="Since last week"
                      />
                      <StatusCard
                          color="purple"
                          icon="CO"
                          title="Today Due"
                          amount="9247"
                          percentage="1.10"
                          date="Since yesterday"
                      />
                      <StatusCard
                          color="purple"
                          icon="CO"
                          title="This Week Due"
                          amount="924"
                          percentage="1.10"
                          date="Since yesterday"
                      />
                      <StatusCard
                          color="purple"
                          icon="CO"
                          title="Work Update"
                          amount="Complete"
                          percentage="1.10"
                          date="Since yesterday"
                      />
                  </div>
              )
            } else if (auth === 'customer') {
              return (
                  <div className="grid mt-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                      <StatusCard
                          color="pink"
                          icon="OS"
                          title="Order Status"
                          amount="Packed"
                          percentage="3.48"
                          date="Since last month"
                      />
                      <StatusCard
                          color="red"
                          icon="OGO"
                          title="On Going Order"
                          amount="2"
                          percentage="3.48"
                          date="Since last week"
                      />
                      <StatusCard
                          color="purple"
                          icon="CO"
                          title="Completed Order"
                          amount="924"
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
