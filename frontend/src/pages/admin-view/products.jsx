import CommonForm from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { addProductFormElements } from '@/config'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { useState } from 'react'
import ProductImageUpload from '@/components/admin-view/image-upload'


function AdminProducts() {

  const [openCreateProductsDialouge, setOpenCreateProductsDialouge] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState("")
  const [imageLoadingState, setImageLoadingState] = useState(false)

  const initialFormData = {

        image: null,
        title:'',
        desciption:'',
        category: '',
        brand:'',
        price:'',
        salePrice:'',
        totalStock:''

  }


  const [formData, setFormData] = useState('')

  function onSubmit(formdata){}

  return (
   <>
   <div className='mb-5 w-full flex justify-end '>
    <Button onClick ={()=> setOpenCreateProductsDialouge(true)}>Add new product</Button>
    <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
      <Sheet open={openCreateProductsDialouge} onOpenChange={()=>setOpenCreateProductsDialouge(false)
      }>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
             <SheetTitle>Add new products</SheetTitle>
             <SheetDescription></SheetDescription>
          </SheetHeader>
          <ProductImageUpload
          imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState}
          uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl}
          file={imageFile} setFile ={setImageFile}/>
          <div className='py-6'>
          <CommonForm formControls ={addProductFormElements} formData={formData} setFormData={setFormData} buttonText={"Add"} onSubmit={onSubmit}   />
          </div>
        </SheetContent>
      </Sheet>
    </div>
   </div>
   </>
  )
}

export default AdminProducts
