

import Product from '../../model/ProductModel.js'

export const searchProducts = async(req,res)=>{

            try {
               const {keyword} = req.params;
               if(!keyword || typeof keyword !== 'string'){
                    return res.status(400).json({
                        success:false,
                        message:'Keyword is required and must be in String format'
                    })
               }


               const regEx = new RegExp(keyword,'i')

               const createSerachQuery ={
                $or :[
                    {title: regEx},
                    {description: regEx},
                    {category: regEx},
                    {brand: regEx},
                ]
               }

               const searchResults = await Product.find(createSerachQuery)


               res.status(200).json({
                success:true,
                data:searchResults
               })
                
            } catch (e) {
                console.log(e)
                res.status(500).json({
                    message:'internal Server error',
                    success:false
                })
                
            }
}