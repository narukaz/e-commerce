
import AdminHeader from './Header'
import AdminSidebar from './Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='flex min-h-screen w-full'>
      <AdminSidebar/>
      <div className='flex flex-1 flex-col'></div>
      <AdminHeader/>
      <main className='flex-1 flex bg-muted/40 '>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout
