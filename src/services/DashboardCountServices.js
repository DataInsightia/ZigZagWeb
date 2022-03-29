import axios from 'axios'

// CUSTOMER SERVICES

export const OngoingOrdersServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/customer_pending_orders/`,
    { login_id },
  )
  return res
}

export const CompletedOrdersServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/customer_completed_orders/`,
    { login_id },
  )
  return res
}

export const TotalOrderServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/customer_total_orders/`,
    { login_id },
  )
  return res
}

export const DeliveryReadyOrdersServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/customer_delivery_ready/`,
    { login_id },
  )
  return res
}

// STAFF SERVICES

export const TotalWorksServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_total_works/`,
    { login_id },
  )
  return res
}

export const StaffTakenWorksServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_taken_works/`,
    { login_id },
  )
  return res
}

export const StaffNotTakenWorksServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_not_taken_works/`,
    { login_id },
  )
  return res
}

export const TodayDueWorksServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_today_due_works/`,
    { login_id },
  )
  return res
}

export const WeekDueWorksServices = async (login_id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/staff_week_due_works/`,
    { login_id },
  )
  return res
}

// SUPERVISOR SERVICES

export const UnAssignedWorksServices = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/unassigned_works/`,
  )
  return res
}

export const AssignedNotTakenWorksServices = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/not_taken_works/`,
  )
  return res
}
export const TodayDeliveryOrdersServices = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/today_due_works/`,
  )
  return res
}
export const WeekDeliveryOrdersServices = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/week_due_works/`,
  )
  return res
}


