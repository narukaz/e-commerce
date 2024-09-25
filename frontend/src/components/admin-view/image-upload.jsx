import React, { useEffect, useRef } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from '../ui/input'
import { FileIcon, UploadCloud, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

function ProductImageUpload({setFile, file, uploadImageUrl, setUploadImageUrl,setImageLoadingState, imageLoadingState}) {
    const inputRef = useRef(null)
    const  handleImagefileChange  = (e) => {
            const selectedFile = e.target.files?.[0]
            if(selectedFile) setFile(selectedFile)
    }


    const handleDragOver = (e)=>{
        e.preventDefault()
    }

    const handleDrop=(e)=>{
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0];
        console.log(droppedFile)
        if(droppedFile) setFile(droppedFile)
    }

    const handleRemoveImage =(e)=>{
        setFile(null)
        if(inputRef.current){
            inputRef.current.value =""
        }
    }

    async function uploadImageToCloudinary(value) {
        setImageLoadingState(true)
            const data = new FormData();
            data.append('my_file', value);
            axios.defaults.withCredentials=true;
            const {data:{result}} = await axios.post('http://localhost:3000/admin/products/upload-image', data)
            console.log(data)
            if(data?.result){
                setImageLoadingState(false)
                setUploadImageUrl(result.url)
            }

    }




   useEffect(()=>{
    if(file !==null){
        console.log("file being send" , file)
      uploadImageToCloudinary(file)
    }
   }, [file])


  return (
    <>
    <div className='w-full max-w-md mx-auto mt-4'>
        <Label className='text-lg font-semibold mb-2 block'>Upload image</Label>
        
        <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className='border-2 border-dashed p-4 rounded-lg'>
        {!file ? <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                <UploadCloud size={40}/>
                <span>drag & drop or click to upload</span>
            </Label>
            :( !imageLoadingState ? <Skeleton className='h-10 bg-gray-100'/>:
                <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                <FileIcon className='w-7 h-7 text-primary m-2'/>
                </div>
                <p className='text-sm font-medium'>{file.name}</p>
                <Button variant='ghost' size="icon" className='text-muted-foreground hover:text-foreground'
                onClick={handleRemoveImage}>
                    <XIcon className='w-4 h-4 '/>
                    <span className='sr-only'>Remove file</span>
                </Button>
            </div>   ) 
        }
            <Input id='image-upload' type='file' 
            className='hidden' 
            ref={inputRef} onChange={handleImagefileChange}></Input>
           
        </div>
    </div>
    </>
  )
}

export default ProductImageUpload
