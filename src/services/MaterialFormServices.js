import axios from 'axios'

// GET DATA FROM API

export const GetMaterial = () => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/mat/`)
}

// GET FORM DATA SENT TO API
export const AddMaterial = async (material_name, amt, measurement) => {
  var amount = parseInt(amt)
  console.log(amount)
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/api/mat/`, {
    material_name,
    amount,
    measurement,
  })
}

// UPDATE FORM DATA SENT TO API
export const UpdateMaterial = async (material_name, material_id, amt, measurement) => {
  var amount = parseInt(amt)
  return await axios.put(`${process.env.REACT_APP_BASE_URL}/api/mat/`, {
    material_name,
    material_id,
    amount,
    measurement,
  })
}

// DELETE FORM DATA SENT TO API
export const DeleteMaterial = async (mat_id) => {
  return await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/mat/${mat_id}/`)
}
