
import AdminHeader from './Header'
import AdminSidebar from './Sidebar'
import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  const [openSidebar , setOpenSidebar] = useState(false)
  return (
    <div className='flex min-h-screen w-full'>
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
      <div className='flex flex-1 flex-col'><AdminHeader setOpen={setOpenSidebar}/>
      
      <main className='flex-1 flex bg-muted/40 '>
        <Outlet/>
      </main>
    </div>
    </div>
  )
}

export default AdminLayout
