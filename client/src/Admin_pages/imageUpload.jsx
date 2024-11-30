import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import {FileIcon, Upload, XIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

function ImageUpload({imagefile, setImageFile , imageUrl, setImageUrl
  , setImageUploadingState, imageUploadingState,currentEditedId
 }) {

  const inputRef = useRef(null)
  const handleImageFile = (e) => {
   
    const selectedFile = e.target.files?.[0];
    setImageFile(selectedFile)

  }
  const handleDragOver =(e)=>{e.preventDefault()
    if(currentEditedId) return
  }
  const handleDrop =(e)=>{
    e.preventDefault()
    if(currentEditedId) return
    const droppedFile = e.dataTransfer.files?.[0]
    if(droppedFile){
      return setImageFile(droppedFile)
    }


  }
  const handleRemoveImage = () =>{
          setImageFile(null)
          if(inputRef.current){
            inputRef.current.value = ''
            
          }
  }


const uploadImageToCloudinary = async () => {
      setImageUploadingState(true)
      const imagedata = new FormData()
      imagedata.append('my_file', imagefile)
      axios.defaults.withCredentials = true
      const {data} = await axios.post('http://localhost:3000/admin/products/upload-image', imagedata)
  
      
        setImageUrl(data.url)
        setImageUploadingState(false)
      
}

  useEffect(()=>{
        if(imagefile !== null) uploadImageToCloudinary()

        
  },[imagefile])




  

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} className={"mt-5"}>
    
    <Input
    disabled={currentEditedId? true:false}
    id='image-upload' type='file' className='hidden' onChange ={handleImageFile} ref={inputRef} />
    {
      !imagefile ?( <Label htmlFor ='image-upload'
      className=
      {`${currentEditedId? 'cursor-not-allowed border-gray-400 ' : 'cursor-pointer border-blue-500 '}
      flex flex-col gap-4 border-2 items-center justify-center
      border-dashed bg-muted p-8 rounded-lg mt-12 mb-10 `}>
        <Upload size={40} className={`${currentEditedId? "text-gray-600" :"text-blue-600"}`}/>
        <span className={`${currentEditedId ? "font-normal text-gray-600":"font-normal text-blue-600"}`}>Drag and drop or click to upload</span>
        </Label>)

      :
      (
      imageUploadingState ? <Skeleton className='h-10 bg-gray-100'/> :
      <div className='flex items-center justify-between bg-muted rounded-md border-dashed border-blue-500'>
       <div className='flex items-center'>
       <FileIcon width={12} height={12} className='text-primary m-2 w-5 h-5' />
       </div>
       <p className='text-sm font-medium'>{imagefile?.name}</p>
       <Button
        onClick={handleRemoveImage}
        size='icon'
        className='text-muted-foreground hover:text-foreground'
        variant='ghost'><XIcon/></Button>
        </div>)
    }


    </div>
  )
}

export default ImageUpload
