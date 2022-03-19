import React, { useState } from 'react'

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
      email:'',
      password:''
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    setErrors(validate(values))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((values) => {
      return { ...values, [name]: value }
    })
  }

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
}

export default useForm
