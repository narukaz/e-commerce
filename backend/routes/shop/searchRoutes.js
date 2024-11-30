import express from 'express'
const router = express.Router()

import { searchProducts } from '../../controllers/shop/search-controllers.js'


router.get('/:keyword', searchProducts)


export default router