import express from  'express'; //import
const app = express();
import connectToMongoose from './controller/connection.js'; //import
import cookieParser from 'cookie-parser'; //import
import authRouter from './routes/auth-routes.js'
import cors from 'cors'


const PORT = process.env.PORT || 3000;//environment PORT variable

connectToMongoose('mongodb://localhost:27017/e-commerce')
.then(console.log("mongoDBconnected"))//success
.catch(err => console.log("connection error with mongo"))//failed

app.use(cors({
    origin:'http://localhost:5173/',
    methods: ['POST','DELETE', 'PUT'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma" ],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRouter)



app.listen(PORT, ()=> console.log(`port is running at ${PORT}`))



