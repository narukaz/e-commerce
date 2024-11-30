import jwt from 'jsonwebtoken'

        export const VerifyMiddelware =  async(req,res)=>{
              try  {if(req.cookies?.token)
                {  const user =  jwt.verify(req.cookies?.token , "my key that runs" )
                   return res.status(200).json({
                        success:true,
                        message: 'successfull',
                        user:user
                    })

                }}
                catch(error){

                
                return res.status(401).json({
                    success:false,
                    message:error.message
                })
                
                }
            }