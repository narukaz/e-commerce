import { Button } from '@/components/ui/button'
import {LogOut, Menu } from 'lucide-react'
import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-store/authSlice'


function AdminHeader({setOpen}) {
    const navigate =useNavigate()
    const dispatch =  useDispatch()
    const handleOnLogOut = ( ) =>{
      dispatch(logoutUser())
    } 


  return (
    <header className='flex gap-2 justify-between items-center px-4 py-3 border-b'>
    <Button className='lg:hidden sm:block'
        onClick={()=> setOpen(true)}>
        <Menu/>
    </Button>
    
    <div className='hidden lg:block lg:mx-auto'>
    <Navbar setOpen={setOpen}/>
    </div>

    <Button 
    onClick={()=> {
      handleOnLogOut()
      navigate('/auth')}}
    className='flex-inline gap-2 items-center
    px-4 py-2 rounded-sm text-sm font-medium shadow '>Logout<LogOut/></Button>
    </header>
  )
}

export default AdminHeader
