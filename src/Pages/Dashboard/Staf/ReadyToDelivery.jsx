import axios from 'axios'
import React, { useEffect } from 'react'
import API from '../../../api'

function ReadyToDelivery() {
  useEffect(async () => {
    ready_to_delivery = await axios.get(`${API}/api/ready_to_delivery/`)
  } , [])
  return (
    <div>

    </div>
  )
}

export default ReadyToDelivery