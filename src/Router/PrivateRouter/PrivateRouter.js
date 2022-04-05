import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {getUser} from '../../services/DashboardCountServices'

function Protected(props) {
  let Component = props.cmp
  const history = useNavigate()

  useEffect(async () => {
    getUser().then((res) => {
      const auth = res.data.isAuthenticated

      if (auth === true) {
        history('/dashboard/dhome')
      } else {
        // !(localStorage.getItem("isAuthenticated"));
        history('/login')
      }
    }, [])
  })
  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected
