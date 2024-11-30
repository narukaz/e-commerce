import React from 'react'
import ShoppingViewHeader from './header'
import { Outlet } from 'react-router-dom'

function ShopLayout() {



  return (
    <div>
      <ShoppingViewHeader/>
      <Outlet/>
    </div>
  )
}

export default ShopLayout
