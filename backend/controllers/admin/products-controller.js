import { handleImageUtil } from "../../helpers/cloudinary.js";
import Product from "../../model/ProductModel.js";


export const handleImageUpload = async (req,res) =>{
            try {

                const b64 = Buffer.from(req.file.buffer).toString('base64')
                const url = "data:" + req.file.mimetype + ";base64," + b64;
                const result = await handleImageUtil(url)
                
                return res.json({
                    success:true,
                    url:result.url
                })
                

            } catch (error) {
                return res.status(500).json({
                    success:false,
                    message:'server error'
                })
            }
}

//add a new Product
export const addProduct = async (req,res)=>{
    try {
        const {title,description,
            category,brand,price,salePrice,totalStock,imageUrl}= req.body
          
            const newProduct = await Product.create({
                imageUrl,
                title,
                description,
                category,
                brand,price,
                salePrice,
                totalStock
            })

            return res.status(200).json({
            success:true,
            data:newProduct
           })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}


//fetch product
export const fetchAllProducts = async(req,res)=>{
    try {
       const products = await Product.find({}).select('-__v')
     return  res.status(200).json({
        success:true,
        data:products
       })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}
//edit a product
export const editProduct = async(req,res)=>{
    
    const {id}= req.params;
    const {title,description,
        category,brand,price,salePrice,totalStock}= req.body

    const findProduct = await Product.findById(id)

    if(!findProduct){
        return res.status(404).json(
            {
                success:false,
                message:'product not found'
            })}

    findProduct.title = title || findProduct.title
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand || findProduct.brand
    findProduct.price = price || findProduct.price
    findProduct.salePrice = salePrice || findProduct.salePrice
    findProduct.totalStock = totalStock || findProduct.totalStock

        await findProduct.save()
        return res.status(200).json({
            success:true,
            data:findProduct
        })
}
//delete a product
export const deleteProduct = async(req,res)=>{
        
        try {
        const {id} = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)
            if(!deleteProduct){
                return res.status(404).json({
                    success:false,
                    message:"product could not be found"
                })
            }

        return res.status(200).json({
            success:true,
            message:'product deleted successfully'
        })


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }
}
