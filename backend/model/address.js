import {Schema, model} from 'mongoose'

const addressSchema = new Schema({
    userId:String,
    address:String,
    city:String,
    pincode:String,
    phone:String,
    note:{type:String,
        default:""
    }
},{timestamps:true})

export const Address =  model('Address', addressSchema)
