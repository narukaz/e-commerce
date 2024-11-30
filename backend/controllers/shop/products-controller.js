
import Product from "../../model/ProductModel.js"


export const getFilteredProducts = async(req,res)=>{
    try {
        const {category =[], brand=[], sortBy ='price-lowtohigh'}= req.query
        let filters = {}
        if(category.length){
            filters.category = {$in : category.split(',')}
        }

        if(brand.length){
            filters.brand = {$in : brand.split(',')}
        }
        let sort ={}

       switch(sortBy){

        case 'price-lowtohigh':
            sort.price = 1
            break;
        
        case 'price-hightolow':
            sort.price = -1
            break;

        case 'title-atoz':
            sort.price = 1
            break;
        
        case 'title-ztoa':
            sort.price = -1
            break;

            default:
            sort.price = 1
                break;
       }





        const product = await Product.find(filters).sort(sort)

        return res.status(200).json({
            data:product,
            success:false
        })
        
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            success:false,
            message:"some error occured"})
    }
}

export const getProductById =async(req,res)=>{
    try {
        const {productId} = req.params
        const product = await Product.findById(productId)
    
        if(!product){
            return res.status(404).json({
                message:'product not found',
                success:false
            })
        }


        return res.status(200).json({
            success:true,
            data:product
        })
        
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            success:false,
            message:'internal server Error'})
    }
}