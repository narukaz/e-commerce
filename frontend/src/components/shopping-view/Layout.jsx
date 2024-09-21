import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppinHeader from './Header'

function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      <ShoppinHeader/>
      <main className='flex flex-col w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout
