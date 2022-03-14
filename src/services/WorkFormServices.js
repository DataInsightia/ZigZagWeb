import axios from 'axios'

// GET DATA FROM API

export const GetWork = () => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/works/`)
}

// GET FORM DATA SENT TO API
export const AddWork = async (work_name, amount, wage_type) => {
  var amount = parseInt(amount)
  const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/works/`, {
    work_name,
    amount,
    wage_type,
  })
  return res
}

// UPDATE FORM DATA SENT TO API
export const UpdateWork = async (work_name, work_id, amount, wage_type) => {
  var amount = parseInt(amount)
  const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/works/`, {
    work_name,
    work_id,
    amount,
    wage_type,
  })
 return res
}

// DELETE FORM DATA SENT TO API
export const DeleteWork = async (work_id) => {
  const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/works/${work_id}`)
  return res
}
