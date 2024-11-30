
import CommonForm from '@/Common_form/common_form'
import { Badge } from '@/components/ui/badge'
import {DialogContent, DialogTitle} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { getOrderDetailsForAdmin, updateOrderStatusById } from '@/store/admin/order-slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialData = {
    orderStatus:''
}


function AdminOrderDetails({orderDetail}) {
    const [formData, setFormData] = useState(initialData)
    const {user}= useSelector(state => state?.auth)
   
    const dispatch = useDispatch()

    function handleUpdateStatus(e){
            e.preventDefault()
      
            dispatch(updateOrderStatusById({id:orderDetail?._id , orderStatus:formData?.orderStatus})).then(({payload})=>
            {if(payload?.success){
                setFormData(initialData)
                dispatch(getOrderDetailsForAdmin(orderDetail._id))
            }
            })}

  return (
   <DialogContent className='sm:max-w-[600px] '>
    <DialogTitle></DialogTitle>
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
                        orderDetail?.orderStatus == "inProccess"||
                        orderDetail?.orderStatus == 'pending' ||
                        orderDetail?.orderStatus == 'inShipping'||
                        orderDetail?.orderStatus == 'delivered'
                        ? "bg-green-500" : "bg-red-700"
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


                <div>
                 <CommonForm formData={formData}
                    setFormData={setFormData}
                    buttonText={'Update Order Status'}
                    onSubmit={handleUpdateStatus}
                    formControls={[{
                            id:'status',
                            name:'orderStatus',
                            componentType:'select',
                            options:[
                                {id:'inProcess', label:'In Process'},
                                {id:'pending', label:'Pending'},
                                {id:'inShipping', label:'In Shipping'},
                                {id:'rejected', label:'Rejected'},
                                {id:'delivered', label:'Delivered'},]
                        
                        
                    },]}
                    />
                    
                </div>
            </div>
   </DialogContent>

  )
}

export default AdminOrderDetails
