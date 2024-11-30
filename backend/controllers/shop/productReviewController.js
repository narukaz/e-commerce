import { Order } from "../../model/order.js"
import Product from "../../model/ProductModel.js"
import Review from "../../model/review.js"



export const addProductReview = async(req,res) => {
    try {

        const {productId, userId, reviewMessage, reviewValue, userName} = req.body
        const order = await Order.findOne({
            userId, "cartItems.productId":productId,
            orderStatus:'confirmed'
        })


        if(!order){
            return res.status(403).json({
                success:false,
                message:'not allowed to write a review'
            })
        }


        const findExistingReview = await Review.findOne({
            productId, userId
        })

        if(findExistingReview){
            return res.status(404).json({
                success:false,
                message:'already reviewed this product'

            })
        }
        
        const newReview = await Review.create({
            productId,
            userId,
            reviewMessage,
            reviewValue,
            userName
        })

        const reviews = await Review.find({productId});
        const totalReviewLength = reviews.length
        const averageReview =reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue , 0)/totalReviewLength
        await Product.findByIdAndUpdate(productId, {averageReview})

        res.status(201).json({
            success:true,
            data: newReview
        })


    } catch (e) {
        console.log(e)
        res.status(500).json({
            success:true,
            message:'internal server error /productreview-controller'
        })
        
    }
}

export const getProductReview = async(req,res) => {
    try {

        const {productId} = req.params;
        const reviews = await Review.find({productId})


        res.status(201).json({
            success:true,
            data: reviews
        })

        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success:true,
            message:'internal server error /getProductReview-controller'
        })
        
    }
}