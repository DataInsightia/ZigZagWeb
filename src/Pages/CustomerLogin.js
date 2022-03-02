import React, { useState } from 'react'
import API from '../api'
import axios from 'axios'

export default function CustomerLogin() {
  const [data, setData] = useState({
    cust_id: '',
    password: '',
  })
  const [login, setLogin] = useState(false)

  const handleEvent = (e) => {
    var newData = { ...data }
    newData[e.target.name] = e.target.value
    setData(newData)
    console.log(newData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(API + '/api/customer_login/', data)
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message)
          setLogin(true)
        }
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type={'text'}
          placeholder={'Mobile or Customer ID'}
          value={data.cust_id}
          onChange={handleEvent}
          name={'cust_id'}
        />
        <input
          type={'password'}
          placeholder={'Password'}
          value={data.password}
          onChange={handleEvent}
          name={'password'}
        />

        <input
          type={'submit'}
          className={'button rounded p-3 m-3 bg-green-400'}
          value={'Login'}
        />
        <input
          type={'reset'}
          className={'button rounded p-3 m-3 bg-red-400'}
          value={'Reset'}
        />
      </form>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
