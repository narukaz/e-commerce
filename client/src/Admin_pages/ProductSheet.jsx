import CommonForm from "@/Common_form/common_form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductSheetControls } from "@/Generators/config";
import React, {useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice/product-slice";

const initialState = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};


function ProductSheet({currentEditedId,setCurrentEditedId,
  openCreateProductsDialouge,setOpenCreateProductsDialouge, setFormData,formData}) {
  const [imagefile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploadingState ,setImageUploadingState] = useState(false)
  const dispatch = useDispatch()
  const {productList} = useSelector(state => state?.adminProduct)
  

  const onSubmit = (e) => {
        
        e.preventDefault()
        currentEditedId != null ? dispatch(editProduct({id:currentEditedId,formData}))
                           .then(({payload})=> {
                        
                           if(payload?.success){
                            setOpenCreateProductsDialouge(false)
                              setFormData(initialState)
                                dispatch(fetchAllProducts())
                                }
                                   })
        :
        dispatch(addNewProduct({...formData, imageUrl:imageUrl})).then(
          ({payload})=> {
            if(payload.success){
              setOpenCreateProductsDialouge(false)
              setImageUrl('')
              setImageFile(null)
              setFormData(initialState)
              dispatch(fetchAllProducts())
            }
          })


  };


  const checkFormValidity = (formData) => {
    for (let field of Object.values(formData)) {
      if (field == false) return true;
    }
    return false;
  };


  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])


  return (
    <>
    <Button
    onClick={()=>setOpenCreateProductsDialouge(true)}
    variant="outline" className="self-end ">
          add products
        </Button>
    <Sheet
    open={openCreateProductsDialouge} onOpenChange={()=>{
      setCurrentEditedId('')
      setFormData(initialState)
      setOpenCreateProductsDialouge(false)}}>
      <SheetContent side="right" className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add your product</SheetTitle>
          <SheetDescription>
            fill all the field to submit the product
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          {/* defining field to show in here */}
          <ImageUpload
          currentEditedId={currentEditedId}
            imagefile={imagefile}
            setImageFile={setImageFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            imageUploadingState={imageUploadingState}
            setImageUploadingState ={setImageUploadingState}
          />

          <CommonForm
            formControls={ProductSheetControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            isBtnDisabled={checkFormValidity(formData)}
            buttonText={`${currentEditedId ? "EDIT" :"ADD"}`}
          />
        </div>
      </SheetContent>
    </Sheet>
    </>
  );
}

export default ProductSheet;
