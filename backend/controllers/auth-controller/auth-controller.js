
import User from "../../model/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'





   export const handleRegister = async (req,res) => {

                try {
                   

                    const {userName, email, password} = req?.body;
                    if(!userName && !email && !password){
                        return res.status(400).json({
                            succes:false,
                            message: 'Please fill all the fields'
                        })
                    }

                    //checking if user exist
                    const existingUser = await User.findOne({email})
                    if(existingUser){
                        return res.status(400).json({
                            succes:false,
                            message: "user already exsists"
                        })
                    }




                    const hashPasswrd = await bcrypt.hash(password ,12)
                 

                    const user  = await User.create({
                        userName,
                        email,
                        password:hashPasswrd,
                        role:"user" })
                    
                        
                    
                  return  res.status(200).json({ //returning the results
                        succes:true,
                        user:{userName:user?.userName,
                                email:email,
                                role:"user"}})


                    
                } catch (error) {
                            console.log("handleRegister", error.message)
                            

                            return res.status(500).json({
                                succes:true,
                                message: "Error in register",
                            })

                }
    }




   export const handleSignIn = async (req,res) => {
         try {const {email, password}= req.body

           if(!email && !password){
            return res.status(400).json({
                succes:false,
                message:"please provide email and password"
            })
           }
           const user = await User.findOne({email})
           if(!user){
            return res.status(404).json({
                succes:false,
                message:'user not found'
            })
            }
            const checkPassword =  bcrypt.compare(password, user?.password)

            if(checkPassword){
                const token = jwt.sign({userId:user?._id,userName :user.userName ,email:user?.email, role:user?.role} , "my key that runs", {expiresIn:'1h'})


                res.cookie('token',token)
                return res.status(200).json({
                    succes:true,
                    message:'Login Successfull',
                    user:{userId:user?._id, userName :user.userName ,email:user?.email, role:user?.role }
                })
            }





           

            } catch (error) {
                res.status(500).json({
                    succes:false,
                    message:'server error'
                })
            }

    }