import CommonForm from '@/Common_form/common_form'
import { loginFormControls } from '@/Generators/config'
import { signIn } from '@/store/auth-store/authSlice'


import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const initialState = {
  email:"",
  password:""}



function AuthLogin() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialState);
  const {user} = useSelector(state => state.auth)
  
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(signIn(formData))
  }


  const checkFormValidity = () =>{
    for ( let field of Object.values(formData)){
      if(field == "") return true
    }
    return false
  }
    
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Sign in to your account
      </h1>
      <p className="mt-2">
        Don't have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </div>
    <CommonForm
      formControls={loginFormControls}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      isBtnDisabled={checkFormValidity()}
    />
  </div>
  )
}

export default AuthLogin
