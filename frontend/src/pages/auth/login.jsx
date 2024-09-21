import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/Form';
import { loginFormControls } from '@/config';

const initialState = {
  email:"",
  password:""}

function AuthLogin() {
const [formData, setFormData]= useState(initialState);
function onSubmit(){};


  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>sign in to your account</h1>
      <p className='mt-2'>Don't have an account
        <Link className='font-medium text-primary ml-2 hover:underline ' to='/auth/register'>register</Link>
      </p>
    </div>
    <CommonForm formControls={loginFormControls}
      buttonText={"Create Account"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
    </div>
  )
}

export default AuthLogin
