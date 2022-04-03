import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Protected(props) {
  let Component = props.cmp
  const history = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  console.log(isAuthenticated)
  useEffect(() => {
    if (isAuthenticated) {
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
