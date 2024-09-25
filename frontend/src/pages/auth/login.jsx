import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/Form';
import { loginFormControls } from '@/config';
import {loginUser} from '../../store/auth-slice/index'
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
const initialState = {
  email:"",
  password:""}

function AuthLogin() {
const [formData, setFormData]= useState(initialState);
const {toast} = useToast()
const dispatch = useDispatch()
function onSubmit(event) {
  event.preventDefault();

  dispatch(loginUser(formData)).then((data) => {
    if (data?.payload?.success) {
      toast({
        title: data?.payload?.message,
      });
    } else {
      toast({
        title: data?.payload?.message,
        variant: "destructive",
      });
    }
  });
}


  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>sign in to your account</h1>
      <p className='mt-2'>Don't have an account
        <Link className='font-medium text-primary ml-2 hover:underline ' to='/auth/register'>register</Link>
      </p>
    </div>
    <CommonForm formControls={loginFormControls}
      buttonText={"SignIn"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
    </div>
  )
}

export default AuthLogin
