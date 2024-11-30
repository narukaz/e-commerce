
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React, { useEffect, useState } from 'react'
import ProductSheet from './ProductSheet'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '@/store/admin/products-slice/product-slice'
import AdminProductTile from '@/Admin_layout/Product-tile'
import { deleteProduct } from '@/store/admin/products-slice/product-slice'


const initialState = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const {productList} =useSelector(state=> state.adminProduct)
  const [openCreateProductsDialouge, setOpenCreateProductsDialouge] = useState(false)
  const [currentEditedId,setCurrentEditedId] = useState(null)
  

  const removeProduct =(id)=>{
      dispatch(deleteProduct(id)).then(({payload})=>{
        if(payload?.success){
          dispatch(fetchAllProducts())
        }
      })
  }

 useEffect(()=>{
  dispatch(fetchAllProducts())
 },[])


  return (
    <div className='flex flex-col space-y-8 p-4'>
      <ProductSheet
      currentEditedId={currentEditedId}
      setCurrentEditedId={setCurrentEditedId}
      formData={formData} setFormData={setFormData} openCreateProductsDialouge={openCreateProductsDialouge} setOpenCreateProductsDialouge={setOpenCreateProductsDialouge} />
      <div className='grid md:grid-cols-3 gap-4 sm:gap-2 sm:grid-cols-2 lg:gap-2 lg:grid-flow-col-4 '>
      {productList && productList.length>0 ? productList.map(product =><AdminProductTile
        removeProduct={removeProduct}
       product={product} setCurrentEditedId={setCurrentEditedId}
       setFormData={setFormData}
       setOpenCreateProductsDialouge={setOpenCreateProductsDialouge} 
       />):null}
      </div>
    </div>
  )
}

export default AdminProducts
