import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'

function ShoppingProductTile({product,handleGetProductDetails,handleAddToCart}) {
  



  return (
    <Card className='w-full max-w-sm mx-auto'>
        <div onClick={()=> handleGetProductDetails(product._id)}>
            <div className='relative'>
                <img src={product?.imageUrl} alt={product?.title}
                className='w-full h-[300px] object-cover rounded-t-lg'
                />
                {   
                    product?.totalStock == 0? <Badge
                    className= 'absolute top-2 left-2 bg-red-500 hover:bg-red-700 '
                    >out of Stock</Badge> : product?.totalStock < 10? <Badge
                    className= 'absolute top-2 left-2 bg-red-500 hover:bg-red-700 '
                    >{`only ${product.totalStock} items left`}</Badge>:
                    product.salePrice>0 ? <Badge
                    className= 'absolute top-2 left-2 bg-red-500 hover:bg-red-700 '
                    >sale</Badge> : null
                }
            </div>
        </div>
        <CardContent className="p-4">
                <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                <div className='flex items-center justify-between mb-2'>
                    <span className='text-[16px] text-muted-foreground'>{product?.category}</span>
                    <span className='text-[16px] text-muted-foreground'>{product?.brand}</span>
                </div>
                <div className='flex items-center justify-between mb-2'>
                    <span className={`${product?.salePrice>0 ?'line-through' : ''} text-sm text-muted-foreground`}>${product?.price}</span>
                    {product.salePrice > 0 ?<span className='text-sm text-muted-foreground'>${product?.salePrice}</span> : null}
                </div>
        </CardContent>
        <CardFooter>
            {
                product.totalStock ==0? <Button
                isDisabled={true}
                className='w-full opacity-60 cursor-not-allowed'>
                    Out of stock
                </Button>:
                <Button
            onClick={()=>handleAddToCart(product?._id, product?.totalStock)}
            className='w-full'>
                Add to cart
            </Button>
            }
            
        </CardFooter>
    </Card>
  )
}

export default ShoppingProductTile
