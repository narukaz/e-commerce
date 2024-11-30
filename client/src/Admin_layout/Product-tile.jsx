import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'


function AdminProductTile({
    removeProduct,
    product, setCurrentEditedId,setFormData,setOpenCreateProductsDialouge}) {
  return (
    
    <Card className='w-full max-w-sm mx-auto'>
      <div>
      <div className='relative'>
        <img
        src={product?.imageUrl}
        alt={product?.title}
        className='w-full h-[300px] object-cover rounded-t-lg'
        />
      </div>

      <CardContent>
        <h2 className='text-xl mb-2 font-bold'>{product?.title}</h2>
        <div className='flex justify-between items-center mb-2'>
                <span className={`text-xl font-semibold text-primary ${product?.salePrice > 0 ? 'line-through':''}`}>${product?.price}</span>
                {product?.salePrice >0 ? <span className=''>${product?.salePrice}</span> :null}
        </div>
      </CardContent>
    <CardFooter>
        <div className='flex w-full justify-between items-center'>
        <Button
        onClick={()=>{
            setCurrentEditedId(product?._id)
            setOpenCreateProductsDialouge(true)
            setFormData(product)
        }}
        
        >Edit</Button>
        <Button
        onClick={()=>removeProduct(product?._id)}
        >Remove</Button>
        </div>
    </CardFooter>
      </div>
    </Card>
  )
}

export default AdminProductTile
