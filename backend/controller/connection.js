import mongoose from "mongoose";

const connectToMongoose = async(url)=>{
               return await mongoose.connect(url)
}
 export default connectToMongoose;