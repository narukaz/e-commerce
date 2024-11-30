import { Address } from "../../model/address.js"


export const addAddress = async(req,res)=>{
    try {

        const {userId, address, pincode, city, note,phone} = req.body
       
        if(!userId || !address || !pincode || !city || !phone){
            return res.status(400).json({
                message:"invalid data",
                success:false
            })
        }
        const newAddress = await Address.create({
            userId, address, pincode, city, note,phone
        })


        res.status(200).json({
            success:true,
            data:newAddress
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"server error"
        })
    }
}

export const fetchAllAddress = async(req,res)=>{
    try {
        const {userId} = req.params
        if(!userId){
            return res.status(400).json({
                message:"missing userId",
                success:false
            })
        }

        const address = await Address.find({userId})

        res.status(200).json({
            success:true,
            data : address
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"server error"
        })
    }
}

export const editAddress = async(req,res)=>{
    try {
        const {userId, addressId} = req.params
        const formData= req.body
      
        if(!userId || !addressId){
            return res.status(400).json({
                message:"missing data",
                success:false
            })}

            const address = await Address.findByIdAndUpdate(addressId, formData, {new:true})
            if(!address){
                return res.status(404).json({
                    success:false,
                    message:'address not found'
                })
            }
            res.status(200).json({
                success:true,
                data:address
            })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"server error"
        })
    }
}

export const deleteAddress = async(req,res)=>{
    try {
        const {userId, addressId} = req.params
        if(!userId || !addressId){
            return res.status(400).json({
                message:"missing data",
                success:false
            })}

            const removeAddress =  await Address.findByIdAndDelete(addressId)
            if(!removeAddress){
                return res.status(404).json({
                    success:false,
                    message:'address not found'
                })
            }

            
                return res.status(200).json({
                    success:true,
                    message:'message deleted Successfully'
                })
            
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"server error"
        })
    }
}