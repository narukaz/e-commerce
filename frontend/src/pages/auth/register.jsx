import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/config'
import React ,{useState} from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  userName: "",
  email:"",
  password:""
}

function AuthRegister() {

  const [formData, setFormData]= useState(initialState);
  function onSubmit(e){
    e.preventDefault();
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