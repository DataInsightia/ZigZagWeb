import axios from 'axios'

// GET DATA FROM API

export const GetMaterial = () => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/mat/`)
}

// GET FORM DATA SENT TO API
export const AddMaterial = async (material_name, amount, measurement) => {
  var amount = parseInt(amount)
  const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/mat/`, {
    material_name,
    amount,
    measurement,
  })
  return res
}

// UPDATE FORM DATA SENT TO API
export const UpdateMaterial = async (material_name, material_id, amount, measurement) => {
  var amount = parseInt(amount)
  const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/mat/`, {
    material_name,
    material_id,
    amount,
    measurement,
  })
  return res
}

// DELETE FORM DATA SENT TO API
export const DeleteMaterial = async (mat_id) => {
  const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/mat/${mat_id}`)
  return res
}
