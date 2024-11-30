import CommonForm from '@/Common_form/common_form'
import { registerFormControls } from '@/Generators/config'
import { register, signIn } from '@/store/auth-store/authSlice'


import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const initialState = {
  email:"",
  password:""}



function AuthLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState);
  const onSubmit = (e ) => {
    e.preventDefault()
    dispatch(register(formData)).then(data => {})
  }
  
         
       
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Register your account
      </h1>
      <p className="mt-2">
       already have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/signIn"
        >
          login
        </Link>
      </p>
    </div>
    <CommonForm
      formControls={registerFormControls}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      isBtnDisabled={false}
    />
  </div>
  )
}

export default AuthLogin
