import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/config'
import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {registerUser} from '../../store/auth-slice/index'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  userName: "",
  email:"",
  password:""
}

function AuthRegister() {

  const [formData, setFormData]= useState(initialState);
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const {toast} = useToast()
  function onSubmit(e){
    e.preventDefault();
    dispatch(registerUser(formData)).then(({payload})=> {
      
      if(payload?.success == true){
        toast({
          title: payload?.message,
        })
        navigate('/auth/login')
      }
      else{
        toast({
          title: payload?.message,
          variant: 'destructive'
        })
      }
    })
  };

  console.log(formData)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new Account</h1>
      <p className='mt-2'>Already have an account
        <Link className='font-medium text-primary ml-2 hover:underline ' to='/auth/login'>Login</Link>
      </p>
    </div>
    <CommonForm formControls={registerFormControls}
      buttonText={"Create Account"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
    </div>
  )
}

export default AuthRegister
