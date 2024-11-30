import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import authRoute from './routes/auth-router/auth-router.js'
import AdminProductRouter from './routes/admin/products-routes.js'
import connectToMongoose from './config/config.js'
import ShopProductRouter from './routes/shop/products-route.js'
import ShopCartRouter from './routes/shop/cart-route.js'
import AddressRouter  from './routes/shop/addressRoutes.js'
import shopOrderRouter from './routes/shop/order/order-routes.js'
import shopSearchRouter from './routes/shop/searchRoutes.js'
import AdminOrderRouter from './routes/admin/orders/order-routes.js'
import shopReviews from './routes/shop/reviewRoute.js'
import commonFeatureRoute from './routes/common/features-Routes.js'
const app = express()



app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'cache-control', 'Expires'] 
}))

app.use(express.json())//setting up json parser
app.use(cookieParser())//setting up cookie parsing


connectToMongoose('mongodb://localhost:27017/e-commerce')
.then(data => {
    if(data){
        console.log('connected to database')
    }})
.catch(err => console.log(err?.message))








app.use('/auth', authRoute)
app.use('/admin/products', AdminProductRouter)
app.use('/admin/orders', AdminOrderRouter)
app.use('/shop/products', ShopProductRouter)

app.use('/shop/cart', ShopCartRouter)
app.use('/shop/address', AddressRouter)
app.use('/shop/order', shopOrderRouter)
app.use('/shop/search', shopSearchRouter)
app.use('/shop/reviews', shopReviews)
app.use('/common/features', commonFeatureRoute)


// enviroment variables
const PORT = 3000

app.listen(3000, ()=> console.log('app live on port --> ' , PORT))