import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'

cloudinary.config({ 
    cloud_name: 'dlobzcqvr', 
    api_key: '259882398131156', 
    api_secret: '4PMU4LsSGuPd1OZT6TaWtpcibIU' // Click 'View API Keys' above to copy your API secret
});


 const storage = new multer.memoryStorage()

 
 export const upload = multer({storage})
export async function imageUploadUtils (file){
        
        const result = await cloudinary.uploader.upload(file,{
            resource_type:'auto'
        })
        return result
}





