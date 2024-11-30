import express from 'express'
const route = express.Router()

import { createOrder,capturePayment, getAllOrdersByUser,getOrderDetails } from '../../../controllers/shop/order/order-controller.js'


route.post('/create',createOrder)
route.post('/capture',capturePayment)
route.get('/list/:userId',getAllOrdersByUser)
route.get('/details/:id',getOrderDetails)



export default route