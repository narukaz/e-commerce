import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import ShoppingOrderDetailsView from './OrderDetails'
import { Dialog } from '@/components/ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from '@/store/shop/order/order-slice'
import { Badge } from '@/components/ui/badge'

function ShoppingOrders() {
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
    
    const {orderList, orderDetail} = useSelector(state => state?.shopOrder)
    const {user} = useSelector(state => state?.auth)
    const dispatch = useDispatch()

    function handleOrderFetchDetails(id){
        dispatch(getOrderDetails(id))
        
    }
    
   

    useEffect(()=>{
        dispatch(getAllOrdersByUser(user?.userId))
    },[dispatch])

    useEffect(()=>{
        if(orderDetail != null)  setOpenDetailsDialog(true)
    },[orderDetail])





  return (
    <Card>
        <CardHeader>
        <CardTitle>Order Histroy</CardTitle>
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
                        order?.orderStatus == "confirmed" ? "bg-green-500" : "bg-red-700"
                        }`}>{order?.orderStatus}</Badge></TableCell>
                        <TableCell>${order?.totalAmount}</TableCell>
                        <TableCell>
                        <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() =>{
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleOrderFetchDetails(order?._id)
                          }
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView setOpenDetailsDialog={setOpenDetailsDialog} orderDetail={orderDetail} />
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

export default ShoppingOrders
