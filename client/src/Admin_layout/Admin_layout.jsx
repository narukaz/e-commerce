import React, { useState } from 'react'
import {Outlet } from 'react-router-dom'
import AdminHeader from './Admin_header'
import AdminSideBar from '@/Admin_pages/Sidebar'

function AdminLayout() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  return (
    <div className='flex flex-col min-h-screen w-full'>
    <AdminSideBar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
    <div className='flex-1 flex flex-col'><AdminHeader setOpen={setIsOpenSidebar}/>
    <Outlet/>
    </div>
   
    </div>
  )
}

export default AdminLayout
