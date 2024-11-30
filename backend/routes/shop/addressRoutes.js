import express from 'express'
const route = express.Router()
import { addAddress,deleteAddress,editAddress,fetchAllAddress } from '../../controllers/shop/addressController.js'



route.get('/get/:userId',fetchAllAddress)
route.post('/add',addAddress)
route.delete('/delete/:userId/:addressId',deleteAddress)
route.put('/update/:userId/:addressId',editAddress)

export default route