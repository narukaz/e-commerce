import {Schema, model} from 'mongoose'

const ReviewSchema = new Schema({
    productId:String,
    userId:String,
    userName:String,
    reviewMessage:String,
    reviewValue:Number
},{
    timestamps:true
})

export default model('ProductReview', ReviewSchema)