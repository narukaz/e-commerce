import express from 'express'
const routes = express.Router()
import { getAllOrders,getOrderDetailsForAdmin } from '../../../controllers/admin/order-controller.js'
import { updateOrderById } from '../../../controllers/admin/order-controller.js'


routes.get('/get', getAllOrders)
routes.get('/details/:id', getOrderDetailsForAdmin)
routes.put('/update/:id',updateOrderById)


export default routes