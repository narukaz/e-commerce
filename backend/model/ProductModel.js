import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    imageUrl: String,
    title: String,
    description: String,
    category: String,
    brand:String,
    price:Number,
    salePrice:Number,
    totalStock:{
      type: Number,
      min: [0, 'Value must be at least 0'],  // Enforcing the minimum value of 0
      default: 0
    }


  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
