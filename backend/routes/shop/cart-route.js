import express from 'express'
const router = express.Router()

import {fetchCartItems,addToCart,updateCartItemQuantity,deleteCartItem} from '../../controllers/shop/cart-controllers.js'




    router.post('/add',addToCart)
    router.get('/get/:userId',fetchCartItems)
    router.put('/update-cart',updateCartItemQuantity)
    router.delete('/delete/:userId/:productId',deleteCartItem)



export default router