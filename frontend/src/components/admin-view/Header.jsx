import React from 'react'
import { Button } from '../ui/button'
import { LogOut, Menu } from 'lucide-react'

function AdminHeader({setOpen}) {
  return (
    <header className='flex justify-center items-center px-4 py-3 border-b'>
     <Button className= "lg:hidden sm:block" onClick ={()=>setOpen(true)}>
     <Menu />
     <span className='sr-only'>hamburger menu</span>
     </Button>
     <div className='flex flex-1 justify-end'>
      <Button className='inline-flex gap-2  items-center px-4 py-2 rounded-sm text-sm font-medium shadow'>Logout
      <LogOut />
      </Button>
     </div>
    </header>
  )
}

export default AdminHeader
