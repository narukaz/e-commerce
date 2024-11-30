import express from 'express'
import { handleSignIn, handleRegister } from '../../controllers/auth-controller/auth-controller.js'
import { VerifyMiddelware } from '../../middleware/VerifyMiddelware.js'
const authRoute = express.Router()

authRoute.post('/signIn',handleSignIn)
authRoute.post('/register',handleRegister)
authRoute.get('/get',VerifyMiddelware)
authRoute.get('/logout', async(req,res)=>{
    res.cookie('token', "")
    res.status(200).json({
        success:true,
        message:'logged out'
    })
}
)

export default authRoute