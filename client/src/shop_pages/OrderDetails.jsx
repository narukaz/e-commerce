
import { Badge } from '@/components/ui/badge'
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import React from 'react'
import { useSelector } from 'react-redux'



function OrderDetails({orderDetail}) {
    const {user} = useSelector(state => state.auth)
  return (
    <DialogContent className='sm:max-w-[600px] '>
    <DialogTitle></DialogTitle>
    <DialogDescription></DialogDescription>
    <div className='grid gap-6 mt-5'>
        <div className='grid gap-2'>
            <div className='flex items-center justify-between'>
                <p className='font-medium'>Order Id</p>
                <Label>{orderDetail?._id}</Label>
            </div>

            <div className='flex mt-2 items-center justify-between'>
                <p className='font-medium'>Order Date</p>
                <Label>{orderDetail?.orderDate.split("T")[0]}</Label>
            </div>

            <div className='flex mt-2 items-center justify-between'>
                <p className='font-medium'>Order Price</p>
                <Label>${orderDetail?.totalAmount}</Label>
            </div>
            <div className='flex mt-2 items-center justify-between'>
                <p className='font-medium'>payment method</p>
                <Badge>{orderDetail?.paymentMethod}</Badge>
            </div>
            <div className='flex mt-2 items-center justify-between'>
                <p className='font-medium'>payment status</p>
                <Badge>{orderDetail?.paymentStatus}</Badge>
            </div>

            <div className='flex mt-2 items-center justify-between'>
                <p className='font-medium'>Order Status</p>
                <Badge className={`${
                        orderDetail?.orderStatus == "confirmed" ? "bg-green-500" : "bg-red-700"
                        }`}>{orderDetail?.orderStatus}</Badge>
            </div>
        </div>
        <Separator/>
        <div className='grid gap-4'>
            <div className='grid gap-2'>
                <div className='font-medium'>Order Details</div>
                <ul className='grid gap-3'>
                    {
                       orderDetail && orderDetail?.cartItems && orderDetail.cartItems.length>0 ?
                       orderDetail.cartItems.map(item=><li key={item?.title} className='flex items-center justify-between'>
                        <Label>{item?.title}</Label>
                        <Label>${item?.price}</Label>
                    </li>) :null
                    }
                    
                </ul>
            </div>
        </div>
        <div className='grid gap-4'>
            <div className='grid gap-2'>
                <div className='font-medium'>Shipping Details</div>
                <div className='grid gap-[0.5] text-muted-foreground'>
                    <span>Name: {user?.userName}</span>
                    <span>Address: {orderDetail?.addressInfo?.address}</span>
                    <span>City: {orderDetail?.addressInfo?.city}</span>
                    <span>Pincode: {orderDetail?.addressInfo?.pincode}</span>
                    <span>Phone: {orderDetail?.addressInfo?.phone}</span>
                    <span>Note: {orderDetail?.addressInfo?.note}</span>
                </div>
            </div>
        </div>
       
    </div>
</DialogContent>
  )
}

export default OrderDetails
