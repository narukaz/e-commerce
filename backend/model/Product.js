import { Schema, model } from "mongoose";

const ProductSchema =  new Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    salePrice: Number,
    totalStock:Number
},
{timestamps:true})

export const Product =  model('product' , ProductSchema)