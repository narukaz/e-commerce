import { Button } from '@/components/ui/button'
import { deleteCartItem, fetchCartItems, updateCartItem } from '@/store/shop/cart-slice'
import { Trash } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CartItemContent({item}) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state?.auth)
    const {cartItems} = useSelector(state => state?.cart)
    const {productList} = useSelector(state => state?.shopProducts)

function handleDeleteCartItem (item){
    dispatch(deleteCartItem({userId:user.userId, productId:item?.productId  })).then(
        (data)=> {if(data?.payload?.success){
            dispatch(fetchCartItems(user?.userId))
        }})}
function handleCartUpdate (item, typeOfAction){
    
        if(typeOfAction == 'plus'){
            
        let getCartItems = cartItems|| []

        

        if(getCartItems.length){
        
            const currentQuantity = item?.quantity;
            const productId = item?.productId;
            
            const currentIndexOfProduct = productList.findIndex(item => item?._id == productId)
   
            if(currentIndexOfProduct > -1){
                if(currentQuantity +1 > productList[currentIndexOfProduct].totalStock){
                  
                    return;
                }
            }
           
        } 
    }




    dispatch(updateCartItem({
        userId:user?.userId,
        productId:item?.productId,
        quantity: typeOfAction == 'plus'? item?.quantity+1 : item?.quantity-1
    })).then(data =>{
        if(data?.payload?.success){
            dispatch(fetchCartItems(user.userId))
        }
    })
}

  return (
    <div className='flex items-center space-x-4'>
     <img
     src={item?.imageUrl}
     alt={item?.title}
     className='h-20 w-20 rounded object-cover'
     />
     <div className='flex-1'>
        <h3 className='font-extrabold mb-2'>{item?.title}</h3>
        <div className='flex items-center mt-1'>
            <Button
            disabled={item?.quantity ==1 ? true:false}
            onClick={()=>handleCartUpdate(item,'minus')}
            variant='outline' className='rounded-full'>-</Button>
           <span className='font-bold ml-2 mr-2'>{item?.quantity}</span>
            <Button
            onClick={()=>handleCartUpdate(item,'plus')}
            variant='outline' className='rounded-full'>+</Button>
        </div>
     </div>
     <div className='flex flex-col items-end'>
        <p className='font-semibold'>
            ${((item?.salePrice>0 ? item?.salePrice : item?.price) * item?.quantity).toFixed(2)}
        </p>
        <Trash onClick={()=> handleDeleteCartItem(item)} className='cursor-pointer mt-1' size={20}/>
     </div>
    </div>
  )
}

export default CartItemContent
