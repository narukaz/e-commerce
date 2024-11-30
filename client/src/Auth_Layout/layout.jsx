import React from 'react'
import { Outlet } from 'react-router-dom'

function Authlayout() {
  return (
    <>
    <div className='bg-secondary min-h-screen w-full flex'>
    <div className='hidden lg:flex items-center justify-center bg-black w-1/2 px-12'>
        <div className='max-w-md space-y-6 text-center text-primary-foreground '>
            <h1 className='text-4xl tracking-tight'>Welcome to the shop</h1>
        </div> 
    </div>
    <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 '>
            <Outlet/>
    </div>
            
    </div>
    </>
  )
}

export default Authlayout
