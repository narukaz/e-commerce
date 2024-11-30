import express from 'express'
const router = express.Router()

import { getProductReview,addProductReview } from '../../controllers/shop/productReviewController.js'


router.post('/add',addProductReview)
router.get('/:productId',getProductReview)


export default router