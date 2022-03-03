import React, { useState } from 'react'
import axios from 'axios'
import API from '../../../../api'
import styles from '../../Staf/Style/Styles'

export const Staff_register = async (
 data
) => {
  const response = await axios.post(
     '/api/staff_register/',
    {
      data : data,
    },
    {
      headers: { 'Content-Type': 'form-data/multipart' },
    },
    { withCredentials: true },
  )
  console.log(response)
}

export default function StaffRegister() {
  const [formData, setFormData] = useState({
    staff_name: '',
    password: '',
    mobile: '',
    address: '',
    city: '',
    salary_type: '',
    salary: '',
    worktype: '',
    acc_no: '',
    ifsc: '',
  })
  const {
    staff_name,
    password,
    mobile,
    address,
    city,
    salary_type,
    salary,
    worktype,
    acc_no,
    ifsc,
  } = formData

  const [file,setFile] = useState('');

  const onFileChange = (e) => setFile(e.target.files[0]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async(e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', file)
    data.append('data', JSON.stringify(formData))
    const res = await axios.post("/api/staff_register/",data);
  }
  return (
    <div>
      <div className="px-20 py-6 mt-12 bg-white">
        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <center>
                <h2>STAFF REGISTER</h2>
              </center>
              <br />
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  Name
                </label>
                <input
                  type="text"
                  onChange={onChange}
                  value={staff_name}
                  id="name"
                  name="staff_name"
                  className={styles.select}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={onChange}
                  value={password}
                  className={styles.select}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="mobile"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  Mobile
                </label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  onChange={onChange}
                  value={mobile}
                  className={styles.select}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="address"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  address
                </label>
                <input
                  type="address"
                  id="address"
                  name="address"
                  onChange={onChange}
                  value={address}
                  className={styles.select}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="city"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  city
                </label>
                <input
                  type="city"
                  id="city"
                  name="city"
                  onChange={onChange}
                  value={city}
                  className={styles.select}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="salary_type"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  salary_type
                </label>
                <select
                  name="salary_type"
                  value={salary_type}
                  onChange={onChange}
                  className={styles.select}
                >
                  <option selected>Please select</option>
                  <option value={'monthly'}>Monthly</option>
                  <option value={'wage'}>Wages</option>
                </select>
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="salary"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  salary
                </label>
                <input
                  type="salary"
                  id="salary"
                  name="salary"
                  onChange={onChange}
                  value={salary}
                  className={styles.select}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="acc_no"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  acc_no
                </label>
                <input
                  type="acc_no"
                  id="acc_no"
                  name="acc_no"
                  onChange={onChange}
                  value={acc_no}
                  className={styles.select}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="worktype"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  worktype
                </label>

                <select
                  name="worktype"
                  value={worktype}
                  onChange={onChange}
                  className={styles.select}
                >
                  <option selected>Please select</option>
                  <option value="tailor">tailor</option>
                  <option value="aari">aari</option>
                  <option value="embroidery">embroidery</option>
                  <option value="photo">photo</option>
                </select>
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="ifsc"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  ifsc
                </label>
                <input
                  type="ifsc"
                  id="ifsc"
                  name="ifsc"
                  onChange={onChange}
                  value={ifsc}
                  className={styles.select}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="ifsc"
                  className="block uppercase text-black text-sm font-bold mb-2 border-0"
                >
                  Profile
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={onFileChange}
                  className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-offset-rose-500 w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            
            <div className="p-2 w-full">
              <div className="flex justify-between">
                <button type="submit" className={styles.pinkbutton}>
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
