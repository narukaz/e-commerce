import mongoose from 'mongoose'


    const connectToMongoose=(link)=>{
        return mongoose.connect(link)
    }


    export default  connectToMongoose