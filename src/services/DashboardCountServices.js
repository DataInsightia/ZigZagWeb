import axios from 'axios'

// CUSTOMER SERVICES

export const OngoingOrdersServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/customer_pending_orders/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
    
  )
  return res
}

export const CompletedOrdersServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/customer_completed_orders/`,
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    }}
   
  )
  return res
}

export const TotalOrderServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/customer_total_orders/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
   
  )
  return res
}

export const DeliveryReadyOrdersServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/customer_delivery_ready/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
    
  )
  return res
}

// STAFF SERVICES

export const TotalWorksServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_total_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
   
  )
  return res
}

export const StaffTakenWorksServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_taken_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
    
  )
  return res
}

export const StaffNotTakenWorksServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_not_taken_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
    
  )
  return res
}

export const TodayDueWorksServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_today_due_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
    
  )
  return res
}

export const WeekDueWorksServices = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_week_due_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
    
  )
  return res
}

// SUPERVISOR SERVICES

export const UnAssignedWorksServices = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/unassigned_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
  )
  return res
}

export const AssignedNotTakenWorksServices = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/not_taken_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
  )
  return res
}
export const TodayDeliveryOrdersServices = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/today_due_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
  )
  return res
}
export const WeekDeliveryOrdersServices = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/week_due_works/`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },}
  )
  return res
}

// GET USERS

export const getUser = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('key')}`,
    },
  })
  return res
}
