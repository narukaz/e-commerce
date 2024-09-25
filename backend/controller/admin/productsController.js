import { imageUploadUtils } from "../../Helpers/cloudinary.js";
import {Product} from '../../model/Product.js'
import User from "../../model/User.js";




 const  handleImageUpload = async(req,res)=>{

    try {
        const b64 =Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype +";base64,"+b64;
        const result = await imageUploadUtils(url)

        return res.json({
            success:true,
            result})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:'error occurred'})
        
    }



}

//add products
const addProducts = async(req,res) => {
    try {

    const {image, title, description, category, brand , price, salePrice, totalStock} = req.body;
    const newlyCreateProduct = new Product({
        image,
        title, 
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock
    })

    await newlyCreateProduct.save()

    return res.status(200).json({
        success:true,
        data:newlyCreateProduct
    })
        
    } catch (e) {
        console.log(e)
        res.status(500)
        .json({
            message:true,
            message:'Error occured'
        })
    }

}

//fetch all products

const fetchAllProducts = async(res) =>{
    try {

        const allProducts = await Product.find({})
        res.status(200).json({
            success:true,
            data:allProducts
        })

    } catch (e) {
        console.log(e)
        res.status(500)
        .json({
            message:true,
            message:'Error occured'
        })
    }
}



//edit a product
const editProduct = async(req,res) =>{
    try {
        const {image, title, description, category, brand , price, salePrice, totalStock} = req.body;
        const {id} = req.params

        const findProduct = await Product.findById(id)
        if(!findProduct){
            return res.json({
                success:false,
                message:'product not foud'
            })
        }

        findProduct.title = title || findProduct.title
        findProduct.desciption = description || findProduct.desciption
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image


        await findProduct.save()

        return res.status(200).json({
            success:true,
            data: findProduct
        })

        
    } catch (e) {
        console.log(e)
        res.status(500)
        .json({
            message:true,
            message:'Error occured'
        })
    }
}


//delete a product

const deleteProduct = async(req,res) =>{
    try {
        const {id} = req.params

        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({
                success:true,
                message:"product could not be found"
            })
        }

        return res.status(200).json({
            success:true,
            message:'product removed successfully'
        })



        
    } catch (e) {
        console.log(e)
        res.status(500)
        .json({
            message:true,
            message:'Error occured'
        })
    }
}

export default handleImageUpload
export {addProducts, fetchAllProducts, editProduct, deleteProduct}