import StarRatingComponent from '@/components/start-rating'
import { Avatar,AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { setProductDetails } from '@/store/shop/product-slice'
import { addProductReviews, getProductReviews } from '@/store/shop/reviewSlice'
import { ShoppingBagIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ProductDetailsDialog({open,setOpen,productDetails}) {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state?.auth)
    const {cartItems} = useSelector(state => state?.cart)
    const [reviewMessage, setReviewMessage] = useState('');
    const [rating, setRating] = useState(0);
    const {reviews} = useSelector(state => state?.review)

    function handleRatingChange(value){
setRating(value)
    }
    function handleAddtoCart(productId, getTotalStock){
        let getCartItems = cartItems || []
        if(getCartItems.length){

            const indexOfCuurentItem = getCartItems.findIndex(item => item.productId === productId)
            if(indexOfCuurentItem >-1){
              const getQuantity = getCartItems[indexOfCuurentItem].quantity;

              if(getQuantity +1 > getTotalStock){
                  return;
              }
            }
            
        }




       dispatch(addToCart({
        userId:user?.userId,
        productId,
        quantity:1
       })).then(data=>{
        if(data?.payload?.success){
            dispatch(fetchCartItems(user?.userId,))
        }
       })
    }

    function handleDialogClose(){
        setOpen(false)
        dispatch(setProductDetails())
    }


    function handleAddReview(){
        dispatch(addProductReviews({
            productId:productDetails._id,
            userId:user?.userId,
            userName:user?.userName,
            reviewMessage,
            reviewValue:rating
        })
    
    ).then(({payload})=>{
        if(payload?.success){
            dispatch(getProductReviews(productDetails?._id))
            setRating(0)
            setReviewMessage('')
        }
    })
    }

    const averageReview = reviews && reviews.length >0 ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue , 0)/reviews.length : 0;

    useEffect(()=>{
        if(productDetails !== null){
            dispatch(getProductReviews(productDetails?._id))
        }
    },[productDetails])


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent
        className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
            <div className='relative overflow-hidden rounded-lg'>
                <img
                src={productDetails?.imageUrl}
                alt={productDetails?.title}
                width={600}
                height={600}
                className='aspect-square w-full object-cover'
                />
            </div>
            <div className=''>
                <div>
                    <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
                    <p className='text-muted-foreground text-2xl  mt-4'>{productDetails?.description}</p>
                    <div className='flex gap-[0.5] items-center mb-5'>
                                        <StarRatingComponent rating={Math.abs(averageReview)}/>
                                        <span className='text-muted-foreground ml-4'>({averageReview.toFixed(2)})</span>
                </div>
                
                </div>
               
                <div className='flex items-center justify-between'>
                
               <p className={`${productDetails?.salePrice>0 ? 'line-through' : ''} text-3xl text-primary font-bold`}>{productDetails?.price}</p>
                {productDetails?.salePrice > 0?  <p text-3xl text-primary font-bold>{productDetails?.salePrice}</p> : null}
                </div>
                <div className='w-full mb-5 '>
                {
                    productDetails?.totalStock === 0 ? <Button
                    className='w-full opacity-60 cursor-not-allowed text-xl flex gap-2'>Out of Stock <ShoppingBagIcon size={24}/></Button>
                    :
                    <Button
                onClick={()=>handleAddtoCart(productDetails?._id , productDetails?.totalStock)}
                className='w-full  cursor-pointer text-xl flex gap-2'>Add to cart <ShoppingBagIcon size={24}/></Button>
                }
                </div>
                <Separator/>
                <div className='max-h-[300px] overflow-auto'>
                    <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                    {
                        reviews && reviews.length >0 ? 
                        reviews.map(review=><div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar>
                                <AvatarFallback>{review?.userName[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-bold'>{review?.userName}</h3>
                                        </div>
                                        <div className='flex gap-[1] items-center'>
                                        <StarRatingComponent rating={review?.reviewValue}/>
                                        </div>
                                        <p className='text-muted-foreground'>{review?.reviewMessage}</p>
                                </div>
                            </div>
                        </div>) :<h1>No reviews</h1>
                    }
                    
                    
                </div>
                 <Separator/>
                <div className='mt-10 flex flex-col gap-2 '>
                    <Label>write a review</Label>
                    <div className='flex'>
                        <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange}/>
                    </div>
                    <input
                    value={reviewMessage}
                    onChange={(e)=>setReviewMessage(e.target.value)}
                    name='reviewMessage'
                    className='pl-2 w-full' placeholder='write a review'/>
                    <Button
                    onClick={handleAddReview}
                    disabled ={reviewMessage.trim() === ''}>Submit </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog
