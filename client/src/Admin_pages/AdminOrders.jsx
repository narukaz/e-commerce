import React, { useEffect, useState } from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, getOrderDetailsForAdmin, resetOrderDetailsForAdmin } from '@/store/admin/order-slice'
import { Badge } from '@/components/ui/badge'
import AdminOrderDetails from './OrderDetails'
function AdminOrders() {
    const [openDetailDialog, setOpenDetailDialog] = useState(false)
    const {orderList, orderDetail} = useSelector(state => state.adminOrder)
    const [orderId, setOrderId] = useState('')
    const dispatch = useDispatch()
    
    function handleOrderFetchDetails(orderId){
             setOrderId(orderId)
             dispatch(getOrderDetailsForAdmin(orderId))
    }


    useEffect(()=>{
    dispatch(getAllOrders())
    },[dispatch])

    useEffect(()=>{
        if(orderDetail != null) setOpenDetailDialog(true) 
    },[orderDetail])


  return (
    <Card>
        <CardHeader>
        <CardTitle>All Orders</CardTitle>
        </CardHeader>
        
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order_Id</TableHead>
                        <TableHead>Order_Date</TableHead>
                        <TableHead>Order_Status</TableHead>
                        <TableHead>Order_Price</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                        orderList && orderList.length>0?
                        orderList.map((order)=> <TableRow key={order?._id}>
                        <TableCell>{order?._id}</TableCell>
                        <TableCell>{order?.orderDate?.split('T')[0]}</TableCell>
                        <TableCell><Badge className={`${
                        order?.orderStatus == "inProccess"||
                        order.orderStatus == 'pending' ||
                        order.orderStatus == 'inShipping'||
                        order.orderStatus == 'delivered'
                        ? "bg-green-500" : "bg-red-700"
                        }`}>{order?.orderStatus}</Badge></TableCell>
                        <TableCell>${order?.totalAmount}</TableCell>
                        <TableCell>
                        <Dialog
                        open={openDetailDialog}
                        onOpenChange={() =>{
                            setOpenDetailDialog(false);
                            dispatch(resetOrderDetailsForAdmin());
                            dispatch(getAllOrders())
                            setOrderId('')
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleOrderFetchDetails(order?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetails setOpenDetailDialog={setOpenDetailDialog} orderId={orderId} orderDetail={orderDetail} />
                      </Dialog>
                        </TableCell>
                    </TableRow>) : null
                    }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

export default AdminOrders
