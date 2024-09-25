import express from  'express'; //import
const app = express();
import connectToMongoose from './controller/connection.js'; //import
import cookieParser from 'cookie-parser'; //import
import authRouter from './routes/auth-routes.js'
import productsRouter from './routes/admin/products-routes.js'
import cors from 'cors'


const PORT = process.env.PORT || 3000;//environment PORT variable

connectToMongoose('mongodb://localhost:27017/e-commerce')
.then(console.log("mongoDBconnected"))//success
.catch(err => console.log("connection error with mongo"))//failed

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'cache-control', 'Expires'] 
}))


app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/admin/products',productsRouter)



app.listen(PORT, ()=> console.log(`port is running at ${PORT}`))



