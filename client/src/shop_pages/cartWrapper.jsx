import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'
import CartItemContent from './cartItemContent'
import { useNavigate } from 'react-router-dom'

function CartWrapper({cartItems}) {
  const navigate = useNavigate()
const totalCartItem = cartItems && cartItems.length>0 ? cartItems.reduce((sum,item)=>{
  if(item?.salePrice>0){
    return sum += item?.salePrice*item?.quantity
  }
  sum += item?.price*item?.quantity}, 0):null

  return (
    <SheetContent className='sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>User Cart</SheetTitle>
        </SheetHeader>

        <div className='mt-8 space-y-4'>

          {
            cartItems &&
            cartItems.length > 0 ? cartItems.map(item =>
            <CartItemContent item={item}/>):null
          }

        </div>

        <div className='mt-8 space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='font-bold'>total price</span>
            <span  className='font-bold'>${totalCartItem}</span>
          </div>
        </div>
        <Button
        onClick={()=>navigate('checkout')}
        className='mt-6 w-full'>Checkout</Button>
    </SheetContent>
  )
}

export default CartWrapper
