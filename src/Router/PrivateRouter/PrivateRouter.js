import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected(props) {
  let Component = props.cmp
  const history = useNavigate()
  useEffect((res) => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      history('/dashboard/dhome')
    } else {
      // !(localStorage.getItem("isAuthenticated"));
      history('/login')
    }
  }, [])
  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected
