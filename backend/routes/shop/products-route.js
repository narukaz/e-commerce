import express from 'express'
const router = express.Router()


import { getFilteredProducts,getProductById } from '../../controllers/shop/products-controller.js'



router.get('/get', getFilteredProducts)
router.get('/get/:productId', getProductById)


export default router